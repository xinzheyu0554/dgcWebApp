from pathlib import Path
from datetime import datetime
import shutil

root=Path.cwd(); here=Path(__file__).resolve().parent
if not (root/'src/pages/Dashboard.js').exists() or not (root/'netlify/functions/api.mjs').exists():
    raise SystemExit('Run this installer from the DGC project root.')
files=['src/pages/Dashboard.js','netlify/functions/api.mjs','src/components/Posts.js','database/schema.sql']
backup=Path.home()/'Desktop'/f'dgc-gallery-backup-{datetime.now().strftime("%Y%m%d-%H%M%S")}'
backup.mkdir(parents=True,exist_ok=True)
for f in files:
    (backup/f).parent.mkdir(parents=True,exist_ok=True)
    shutil.copy2(root/f,backup/f)
api=root/'netlify/functions/api.mjs'; s=api.read_text()
assert "import { db } from '../../server/db.mjs';" in s
assert "if (method === 'GET' && route === '/newsletters')" in s
assert "if (route.startsWith('/admin/')) {" in s
if "galleryRoute" not in s:
    s=s.replace("import { db } from '../../server/db.mjs';", "import { db } from '../../server/db.mjs';\nimport { galleryRoute } from '../../server/gallery.mjs';",1)
    s=s.replace("  if (method === 'GET' && route === '/newsletters') {", "  if (method === 'GET' && route === '/gallery') return galleryRoute(sql,request,method,route,false);\n\n  if (method === 'GET' && route === '/newsletters') {",1)
    s=s.replace("    if (!user) return error('Administrator access required.', 403);", "    if (!user) return error('Administrator access required.', 403);\n    if (route.startsWith('/admin/gallery')) return galleryRoute(sql,request,method,route,true);",1)
    api.write_text(s)

dash=root/'src/pages/Dashboard.js';s=dash.read_text()
assert 'import "../styles/dgc-dashboard.css";' in s
assert '            {admin && <Button variant={tab === "users"' in s
assert '          {tab === "account"' in s
if 'GalleryManager' not in s:
    s=s.replace('import "../styles/dgc-dashboard.css";', 'import "../styles/dgc-dashboard.css";\nimport GalleryManager from "../components/GalleryManager";',1)
    needle='            {admin && <Button variant={tab === "users"'
    idx=s.index(needle)
    s=s[:idx]+'            {admin && <Button variant={tab === "gallery" ? "success" : "outline-secondary"} onClick={() => { setTab("gallery"); setAlert(null); }}>Photo management</Button>}\n'+s[idx:]
    s=s.replace('          {tab === "account"', '          {admin && tab === "gallery" && <GalleryManager />}\n          {tab === "account"',1)
    dash.write_text(s)

posts=root/'src/components/Posts.js';s=posts.read_text()
if 'galleryMetadata' not in s:
    assert 'import React, { useMemo, useState } from "react";' in s
    assert '  const imageUrls = useMemo(() => {' in s
    s=s.replace('import React, { useMemo, useState } from "react";', 'import React, { useEffect, useMemo, useState } from "react";',1)
    s=s.replace('  const imageUrls = useMemo(() => {', '''  const [galleryMetadata, setGalleryMetadata] = useState({images:[],suppressed:[]});
  useEffect(() => {
    let alive=true;
    fetch(`/api/gallery?album=${encodeURIComponent(album.key)}`)
      .then(r=>r.ok?r.json():Promise.reject(new Error('Gallery metadata unavailable')))
      .then(data=>{if(alive)setGalleryMetadata(data);})
      .catch(()=>{}); // Keep legacy gallery working if API unavailable.
    return ()=>{alive=false;};
  },[album.key,refetch]);
  const knownImages=useMemo(()=>new Map((galleryMetadata.images||[]).map(i=>[i.secure_url,i])),[galleryMetadata]);
  const suppressedUrls=useMemo(()=>new Set(galleryMetadata.suppressed||[]),[galleryMetadata]);

  const imageUrls = useMemo(() => {''',1)
    s=s.replace('      .filter((u) => !!u)\n      .reverse();','      .filter((u) => !!u && !suppressedUrls.has(u))\n      .reverse();',1)
    s=s.replace('  }, [imageUrlsRaw]);','  }, [imageUrlsRaw, suppressedUrls]);',1)
    s=s.replace('alt={`${album.albumTitle} image`}', 'alt={knownImages.get(url)?.title || `${album.albumTitle} image`}',1)
    s=s.replace('alt={`${album.albumTitle} archive image`}', 'alt={knownImages.get(url)?.title || `${album.albumTitle} archive image`}',1)
    s=s.replace('''                </AspectRatio>
              </Box>''','''                </AspectRatio>
                {(knownImages.get(url)?.title || knownImages.get(url)?.description) && <Box p={3}>
                  {knownImages.get(url)?.title && <Text fontWeight="semibold" color="gray.800">{knownImages.get(url).title}</Text>}
                  {knownImages.get(url)?.description && <Text fontSize="sm" color="gray.600">{knownImages.get(url).description}</Text>}
                </Box>}
              </Box>''')
    posts.write_text(s)

schema=root/'database/schema.sql';s=schema.read_text()
if 'dgc_gallery_images' not in s: schema.write_text(s+'\n'+(here/'database/gallery.sql').read_text())
for path in ['server/gallery.mjs','scripts/sync-gallery.mjs','src/components/GalleryManager.js']:
    dest=root/path;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(here/path,dest)
print('Installed gallery administration and Neon schema. Backup:',backup)
print('Next: npm run db:setup && node scripts/sync-gallery.mjs && npm run dev')
