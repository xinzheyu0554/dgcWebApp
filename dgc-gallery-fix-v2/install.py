from pathlib import Path
from datetime import datetime
import shutil

root = Path.cwd()
patch = Path(__file__).resolve().parent / 'files'
required = [
    'src/components/Posts.js', 'src/components/GalleryManager.js',
    'src/pages/Dashboard.js', 'src/router/index.js',
    'netlify/functions/api.mjs', 'server/gallery.mjs',
    'database/schema.sql', 'src/context/AuthContext.js'
]
missing = [p for p in required if not (root / p).is_file()]
if missing:
    raise SystemExit('Missing Gallery Management files: ' + ', '.join(missing) + '. Install earlier Gallery Management patch first.')

posts = (root/'src/components/Posts.js').read_text()
api = (root/'netlify/functions/api.mjs').read_text()
router = (root/'src/router/index.js').read_text()
if not ('galleryMetadata' in posts or 'LEGACY_URL' in posts or 'const URL = "/images"' in posts):
    raise SystemExit('Unexpected Posts.js version; no changes applied.')
if 'galleryRoute' not in api or 'GalleryManager' not in (root/'src/pages/Dashboard.js').read_text():
    raise SystemExit('Gallery Management integration missing; no changes applied.')
if "if (method === 'GET' && route === '/gallery')" not in api:
    raise SystemExit('Could not locate /gallery API route; no changes applied.')

if 'uploadGalleryPhoto' not in api:
    anchor="import { db } from '../../server/db.mjs';"
    if anchor not in api: raise SystemExit('Unknown API import format; no changes made.')
    api=api.replace(anchor,anchor+"\nimport { uploadGalleryPhoto } from '../../server/gallery-upload.mjs';",1)
    api=api.replace("  if (method === 'GET' && route === '/gallery')", "  if (method === 'POST' && route === '/gallery/upload') {\n    return uploadGalleryPhoto(sql, request, await sessionUser(sql, request));\n  }\n\n  if (method === 'GET' && route === '/gallery')",1)

if 'GalleryPhotoDetail' not in router:
    anchor='const Gallery = React.lazy(() => import("../pages/Gallery"));'
    if anchor not in router or '  { path: "/dashboard", element: Dashboard },' not in router:
        raise SystemExit('Unexpected router format; no changes made.')
    router=router.replace(anchor,anchor+'\nconst GalleryPhotoDetail = React.lazy(() => import("../pages/GalleryPhotoDetail"));',1)
    router=router.replace('  { path: "/dashboard", element: Dashboard },','  { path: "/dashboard", element: Dashboard },\n  { path: "/gallery/photo/:assetId", element: GalleryPhotoDetail },',1)

backup = Path.home()/'Desktop'/('dgc-gallery-fix-backup-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
backup.mkdir(parents=True,exist_ok=True)
modified = ['src/components/Posts.js','src/components/GalleryManager.js','server/gallery.mjs','netlify/functions/api.mjs','src/router/index.js','src/pages/GalleryPhotoDetail.js','server/gallery-upload.mjs']
for path in modified:
    target=root/path
    if target.exists():
        dest=backup/path;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(target,dest)
for path in ['src/components/Posts.js','src/components/GalleryManager.js','server/gallery.mjs','src/pages/GalleryPhotoDetail.js','server/gallery-upload.mjs']:
    dest=root/path;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(patch/path,dest)
(root/'netlify/functions/api.mjs').write_text(api)
(root/'src/router/index.js').write_text(router)
print('Gallery fix installed: paginated sync + loading state + compact card text + metadata upload + detail route.')
print('Backup:', backup)
print('Next: npm run build && npm run dev')
