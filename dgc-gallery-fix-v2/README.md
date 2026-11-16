# Doncaster Garden Club — Gallery fixes

This incremental patch assumes the previous Gallery Management patch is already installed. It can install the earlier detail/upload UI if it was not applied successfully.

Fixes:
- Cloudinary sync pages are limited to 12 files per API request. Only 4 Neon upserts run concurrently. Frontend loops until all pages in both albums complete, with a spinner and progress counter. On error, the existing imported photos remain available to edit after the spinner stops; retry to continue. Errors still require checking Netlify CLI logs if the failure is credentials, network or SQL rather than function timeout.
- Gallery cards have fixed metadata area height with a **two-line CSS line clamp** for both title and description; blank metadata reserves the same space.
- Clicking image opens `/gallery/photo/:assetId` with existing global Navbar and Footer. Full text appears there.
- Signed-in users clicking **Upload Image** get a modal requiring image and title; description is optional. On submit the same Netlify function uploads to Cloudinary and inserts metadata into Neon. Does not require legacy Railway `/images` upload.

## Install

From `feature/admin-gallery-management` with uncommitted edits reviewed, download ZIP to Downloads and run from repo root:

```
unzip -oq "$HOME/Downloads/dgc-gallery-fix-v2.zip" -d .
python3 dgc-gallery-fix-v2/install.py
npm run build
npm run dev
```

Create a separate feature branch first if you have not already. The installer backs up changed files to Desktop. Do not commit the patch folder; commit only changed project files.

## Verify

- `http://localhost:8888/dashboard` → Photo management → Sync from Cloudinary: expect spinner and increasing count, no cards until complete.
- Existing photos remain, and can edit title/description, Save, and reopen after refresh.
- `http://localhost:8888/gallery`: maximum two lines of title + description, fixed card heights; click photo to view its detail route.
- Click Upload Image while signed in; modal should request JPG/PNG, title and description. Test an expendable photo (writes real Cloudinary/Neon if configured to production).
- If sync still returns 502/500, inspect the **server terminal running `npm run dev`**, which will log the underlying Cloudinary / Neon error. Check CLOUDINARY_* env variables and free tier quota; do not share secret values.

## Security

Do not add `.env` to git. This patch does not migrate or delete existing images. Permanently deleting from Dashboard is destructive and touches Cloudinary even during local testing.
