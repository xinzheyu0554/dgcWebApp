import cloudinary from 'cloudinary';
const cld = cloudinary.v2;
const ALBUMS = ['plants', 'events'];
const PREFIX = 'doncaster-garden-club/';
function config() {
  const { CLOUDINARY_CLOUD_NAME: cloud_name, CLOUDINARY_API_KEY: api_key, CLOUDINARY_API_SECRET: api_secret } = process.env;
  if (!cloud_name || !api_key || !api_secret) throw new Error('Cloudinary environment variables are missing.');
  cld.config({cloud_name, api_key, api_secret, secure:true});
}
function respond(payload, status=200){return Response.json(payload,{status,headers:{'Cache-Control':'no-store'}});}
function fail(message,status=400){return respond({error:message},status);}
const fields='asset_id, public_id, album, secure_url, original_filename, format, bytes, uploaded_at, title, description, hidden';
export async function syncGallery(sql) {
  config();
  let count = 0;
  for (const album of ALBUMS) {
    let cursor;
    do {
      const page = await cld.api.resources({type:'upload',resource_type:'image',prefix:`${PREFIX}${album}/`,max_results:100,...(cursor?{next_cursor:cursor}:{})});
      for (const item of (page.resources||[])) {
        if (!item.asset_id || !item.public_id.startsWith(`${PREFIX}${album}/`)) continue;
        await sql`INSERT INTO dgc_gallery_images(asset_id,public_id,album,secure_url,original_filename,format,bytes,uploaded_at)
          VALUES(${item.asset_id},${item.public_id},${album},${item.secure_url},${item.filename || item.public_id.split('/').pop()},${item.format||null},${item.bytes||null},${item.created_at||null})
          ON CONFLICT(asset_id) DO UPDATE SET
            public_id=EXCLUDED.public_id, album=EXCLUDED.album, secure_url=EXCLUDED.secure_url,
            original_filename=EXCLUDED.original_filename, format=EXCLUDED.format,
            bytes=EXCLUDED.bytes, uploaded_at=EXCLUDED.uploaded_at, updated_at=NOW()
          WHERE dgc_gallery_images.deleted_at IS NULL`;
        count++;
      }
      cursor=page.next_cursor;
    } while(cursor);
  }
  return count;
}
export async function galleryRoute(sql, request, method, route, admin=false) {
  if (method === 'GET' && (route === '/gallery' || (admin && route === '/admin/gallery'))) {
    const album=new URL(request.url).searchParams.get('album');
    if (!ALBUMS.includes(album)) return fail('Unknown album.');
    const rows=admin
      ? await sql`SELECT * FROM dgc_gallery_images WHERE album=${album} AND deleted_at IS NULL ORDER BY uploaded_at DESC NULLS LAST,asset_id`
      : await sql`SELECT asset_id, album, secure_url, title, description, uploaded_at FROM dgc_gallery_images WHERE album=${album} AND deleted_at IS NULL AND hidden=FALSE ORDER BY uploaded_at DESC NULLS LAST,asset_id`;
    const suppressed=await sql`SELECT secure_url FROM dgc_gallery_images WHERE album=${album} AND (hidden=TRUE OR deleted_at IS NOT NULL)`;
    return respond({images:rows,suppressed:suppressed.map(x=>x.secure_url)});
  }
  if (!route.startsWith('/admin/gallery')) return null;
  if (!admin) return fail('Administrator access required.',403);
  if (method==='POST' && route==='/admin/gallery/sync') return respond({imported:await syncGallery(sql)});
  const match=route.match(/^\/admin\/gallery\/([^/]+)$/);
  if (!match) return fail('Gallery endpoint not found.',404);
  const assetId=decodeURIComponent(match[1]);
  if (!/^[a-f0-9-]{10,80}$/i.test(assetId)) return fail('Invalid asset ID.');
  const rows=await sql`SELECT * FROM dgc_gallery_images WHERE asset_id=${assetId} AND deleted_at IS NULL LIMIT 1`;
  if (!rows.length) return fail('Photo not found.',404);
  const current=rows[0];
  if (method==='PATCH') {
    const body=await request.json();
    if (typeof body.title !== 'string' || body.title.length>160 || typeof body.description !== 'string' || body.description.length>1000 || typeof body.hidden !== 'boolean') return fail('Invalid title, description or visibility.');
    // Changing the album here would require moving the asset on Cloudinary;
    // keep its original folder for consistent legacy URLs.
    const updated=await sql`UPDATE dgc_gallery_images SET title=${body.title.trim()},description=${body.description.trim()},hidden=${body.hidden},updated_at=NOW() WHERE asset_id=${assetId} RETURNING *`;
    return respond({image:updated[0]});
  }
  if (method==='DELETE') {
    config();
    const result=await cld.uploader.destroy(current.public_id,{resource_type:'image',invalidate:true});
    if (result.result!=='ok' && result.result!=='not found') return fail('Cloudinary could not delete this photo.',502);
    await sql`UPDATE dgc_gallery_images SET deleted_at=NOW(),hidden=TRUE,updated_at=NOW() WHERE asset_id=${assetId}`;
    return respond({ok:true});
  }
  return fail('Method not allowed.',405);
}
