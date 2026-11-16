from pathlib import Path
from datetime import datetime
import shutil

root = Path.cwd()
patch = Path(__file__).resolve().parent
required = [
 'src/components/Posts.js', 'src/router/index.js',
 'netlify/functions/api.mjs','server/gallery.mjs', 'src/context/AuthContext.js'
]
missing = [p for p in required if not (root/p).is_file()]
if missing:
    raise SystemExit('Missing files: '+', '.join(missing)+'. Install the Gallery Management patch first.')

api_path = root/'netlify/functions/api.mjs'
router_path = root/'src/router/index.js'
api = api_path.read_text()
router = router_path.read_text()
if "galleryRoute" not in api or "galleryMetadata" not in (root/'src/components/Posts.js').read_text():
    raise SystemExit('Gallery Management patch must already be installed; no files modified.')
if 'uploadGalleryPhoto' in api or 'GalleryPhotoDetail' in router:
    raise SystemExit('Parts of the photo UI update already exist. No changes made to avoid overwriting work.')
if "  if (method === 'GET' && route === '/gallery')" not in api:
    raise SystemExit('Cannot locate gallery API routing. No files changed.')
if 'const Gallery = React.lazy(() => import("../pages/Gallery"));' not in router:
    raise SystemExit('Cannot locate gallery route. No files changed.')

backup = Path.home()/'Desktop'/('dgc-gallery-ui-backup-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
backup.mkdir(parents=True,exist_ok=True)
for relative in ['src/components/Posts.js','src/router/index.js','netlify/functions/api.mjs']:
    target = root/relative
    dest=backup/relative
    dest.parent.mkdir(parents=True,exist_ok=True)
    shutil.copy2(target,dest)

api=api.replace("import { db } from '../../server/db.mjs';", "import { db } from '../../server/db.mjs';\nimport { uploadGalleryPhoto } from '../../server/gallery-upload.mjs';",1)
api=api.replace("  if (method === 'GET' && route === '/gallery')", "  if (method === 'POST' && route === '/gallery/upload') {\n    return uploadGalleryPhoto(sql, request, await sessionUser(sql, request));\n  }\n\n  if (method === 'GET' && route === '/gallery')",1)
router=router.replace('const Gallery = React.lazy(() => import("../pages/Gallery"));', 'const Gallery = React.lazy(() => import("../pages/Gallery"));\nconst GalleryPhotoDetail = React.lazy(() => import("../pages/GalleryPhotoDetail"));',1)
router=router.replace('  { path: "/dashboard", element: Dashboard },', '  { path: "/dashboard", element: Dashboard },\n  { path: "/gallery/photo/:assetId", element: GalleryPhotoDetail },',1)

api_path.write_text(api)
router_path.write_text(router)
for relative in ['src/components/Posts.js','src/pages/GalleryPhotoDetail.js','server/gallery-upload.mjs']:
    destination = root/relative
    destination.parent.mkdir(parents=True,exist_ok=True)
    shutil.copy2(patch/relative,destination)

print('Installed: uniform compact cards, photo detail route, metadata-required upload to Cloudinary + Neon.')
print('Backup:',backup)
print('Now run npm run build && npm run dev')
