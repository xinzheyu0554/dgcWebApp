DGC Gallery UI + Upload Update
==============================

Prerequisites: Existing Gallery Management patch has been installed, database `dgc_gallery_images` initialized with `npm run db:setup`, historical Cloudinary metadata synced to Neon. Work on `feature/admin-gallery-management`, not main.

Install from repo root:
    python3 dgc-gallery-ui-upload-patch/install.py
    npm run build
    npm run dev

Changes:
- Every gallery card uses a fixed-height metadata area, reserving the same two lines for the title and two for description. Overlong text is clamped; missing metadata leaves whitespace. Original image aspect ratio 4:3.
- Clicking an image opens /gallery/photo/:assetId, with the existing global Navbar and Footer and unabridged title/description. For images that haven't been imported, a restricted Cloudinary URL fallback route is available.
- Signed-in members/admins see Upload Image. The modal requires a title (1-160 chars), allows description (0-1000 chars), and accepts JPEG/PNG <=2 MiB. Backend validates authenticated session, request origin, file signatures and metadata; writes image to Cloudinary and inserts Neon row. No manual sync is needed for new uploads through this UI.
- Anonymous visitors keep the ability to browse but must sign in before uploading. Old Railway-backed image list remains as a compatibility fallback. Newly uploaded images appear via Neon gallery metadata API, not the Railway image list.

Environment variables (existing; DO NOT COMMIT real values): DATABASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET. Netlify Functions need access to them. Cloudinary API credentials must be server-only (no REACT_APP_ prefix).

IMPORTANT: Uploading while developing locally accesses LIVE Cloudinary and Neon if .env points to production. Test with an expendable image and delete it from Dashboard afterwards. Permanent deletion cannot be undone from Dashboard. Check Cloudinary/Netlify free usage limits before widening maximum uploads.

When ready:
    git add src/components/Posts.js src/pages/GalleryPhotoDetail.js src/router/index.js netlify/functions/api.mjs server/gallery-upload.mjs
    git diff --cached --check
    git commit -m 'feat: add photo detail pages and metadata-first uploads'

Verify npm run build, localhost:8888, admin edit, public details page and upload. Do not push main before testing.
