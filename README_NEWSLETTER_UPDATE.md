# DGC Newsletter management update

This patch updates only the five core files listed below and adds one server-side legacy index:
- `src/pages/Dashboard.js`: Year dropdown, upload, replace or delete existing PDFs
- `src/pages/Newsletters.js`: newest PDF preview and newest year accordion open; others collapsed
- `netlify/functions/api.mjs`: admin-restricted legacy and new PDF replacement/deletion
- `server/github.mjs`: GitHub Contents API replacement while keeping original URL
- `server/legacy-newsletters.mjs`: existing historical PDF filenames and URLs, kept verbatim
- `database/schema.sql`: adds legacy tombstone table via `CREATE TABLE IF NOT EXISTS`

Does not include, overwrite or delete existing PDF/images under `public/`.

## Installation
From the existing feature branch and project root, unzip this patch with `unzip -oq /path/to/dgc-newsletter-manager-patch.zip -d .`, run `npm run db:setup`, restart `npm run dev`, and test `/dashboard` then `/newsletters` on port 8888. Do not push to production until validated.

## Operational notes
- All upload, replace and delete operations commit immediately to `GITHUB_BRANCH` (typically remote `main`), including while you run the frontend locally. They trigger Netlify deploys if configured.
- An API newsletter record is updated after the corresponding GitHub commit. If the DB update fails, reconcile via GitHub history.
- Delete is permanent from the live website after deployment, but Git history retains the old file.
- Existing historical newsletters are represented by a server-side snapshot. If you manually add PDFs to the repo outside Dashboard, add them to `server/legacy-newsletters.mjs` (or upload through Dashboard).
- The public page keeps its original hard-coded list as an emergency fallback if the API is unavailable, which may temporarily show an older deleted link during outages.
- PDF upload limit is 3 MiB.
- Folder selection is year (2021 onward) and month; do not change year when replacing an existing PDF.
- GitHub integration requires `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`; database requires `DATABASE_URL` in Netlify Functions environment.
