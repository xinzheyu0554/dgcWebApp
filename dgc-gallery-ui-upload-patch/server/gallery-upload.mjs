import cloudinary from 'cloudinary';
import { randomUUID } from 'node:crypto';

const LIMIT = 2 * 1024 * 1024;
const cld = cloudinary.v2;
const albums = new Set(['plants', 'events']);

export async function uploadGalleryPhoto(sql, request, user) {
  const fail = (message, status = 400) => Response.json({error:message},{status,headers:{'Cache-Control':'no-store'}});
  if (!user) return fail('Sign in to upload photos.',401);
  if (!(request.headers.get('content-type')||'').includes('application/json')) return fail('Expected JSON upload.');
  if (Number(request.headers.get('content-length')||0) > 3_100_000) return fail('Photo is too large (2 MB maximum).',413);
  let data;
  try { data = await request.json(); } catch { return fail('Invalid upload request.'); }
  if (!data || !albums.has(data.album)) return fail('Select Plants or Events.');
  if (typeof data.title !== 'string' || data.title.trim().length < 1 || data.title.trim().length > 160) return fail('Title is required (maximum 160 characters).');
  if (typeof data.description !== 'string' || data.description.length > 1000) return fail('Description must not exceed 1000 characters.');
  const match = typeof data.image === 'string' && data.image.match(/^data:(image\/jpeg|image\/png);base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match) return fail('Use a JPG or PNG image.');
  const bytes = Buffer.from(match[2],'base64');
  if (bytes.length < 20 || bytes.length > LIMIT) return fail('Photo must be 2 MB or smaller.',413);
  const jpeg = bytes[0]===0xff && bytes[1]===0xd8 && bytes[2]===0xff;
  const png = bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  if ((match[1]==='image/jpeg' && !jpeg) || (match[1]==='image/png' && !png)) return fail('Image content does not match its file type.');
  const {CLOUDINARY_CLOUD_NAME:cloud_name,CLOUDINARY_API_KEY:api_key,CLOUDINARY_API_SECRET:api_secret}=process.env;
  if (!cloud_name||!api_key||!api_secret) throw new Error('Cloudinary credentials missing.');
  cld.config({cloud_name,api_key,api_secret,secure:true});
  const public_id = randomUUID();
  const uploaded = await cld.uploader.upload(data.image, {
    folder:`doncaster-garden-club/${data.album}`,public_id,overwrite:false,
    resource_type:'image',
  });
  try {
    const rows = await sql`INSERT INTO dgc_gallery_images
      (asset_id,public_id,album,secure_url,original_filename,format,bytes,uploaded_at,title,description)
      VALUES (${uploaded.asset_id},${uploaded.public_id},${data.album},${uploaded.secure_url},${uploaded.original_filename||public_id},${uploaded.format||null},${uploaded.bytes||null},${uploaded.created_at||new Date().toISOString()},${data.title.trim()},${data.description.trim()})
      RETURNING asset_id,album,secure_url,title,description,uploaded_at`;
    return Response.json({image:rows[0]},{status:201,headers:{'Cache-Control':'no-store'}});
  } catch(e) {
    // If DB persistence failed, do not leave an orphan Cloudinary upload.
    try {await cld.uploader.destroy(uploaded.public_id,{resource_type:'image',invalidate:true});}
    catch(rollbackError){console.error('Gallery upload rollback failed:',uploaded.public_id,rollbackError);}
    throw e;
  }
}
