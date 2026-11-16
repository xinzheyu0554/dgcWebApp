# Doncaster Garden Club — Neon PostgreSQL + Netlify Functions + GitHub PDF commits

## Scope and content guarantee

This patch **keeps the original React pages, page text, styles, images and all existing historical newsletters**. It changes only the app shell/router/navbar and the Newsletters list to add login and new newsletter entries. It adds a private server-side API in the SAME repo (`netlify/functions/api.mjs`); no separate Express deployment.

Roles: `admin` and `member`. Administrators create/disable member accounts, reset passwords, change roles and upload/delete **new** newsletters. Members see My Account and can change password. No public registration. Sessions use hashed database session IDs and HttpOnly cookies. Original historical PDFs are read-only in the dashboard to avoid accidental loss; all files present in `public/` remain untouched.

**PDFs stay in GitHub repo**: admin upload creates a GitHub API commit in `main` at `public/documentation/newsletter/<year>/DGC Newsletter <Month> <Year> <random>.pdf`. Admin delete creates a GitHub commit deleting that file. Netlify should be linked to the same GitHub repo with Production branch `main` and automatic builds enabled. The public PDF URL will become active **after** the Git-triggered Netlify deploy completes. **Do not expect immediate availability.** Neon saves only metadata, users and sessions. No Netlify Blobs or object storage account.

## 1. Install in existing macOS repository

1. Download the accompanying `dgc-neon-netlify-github-patch.zip` to your Downloads (or Desktop).
2. Open Terminal and `cd` to the REAL full repository (not the earlier source-only export).
3. Paste:

```bash
# Run from the existing doncaster-garden-club repository root
if [ -n "$(git status --porcelain)" ]; then
  echo 'STOP: repository has uncommitted changes. Commit/stash them and rerun.'
else
  git switch feature/auth-admin-dashboard 2>/dev/null || git switch -c feature/auth-admin-dashboard
  PATCH_FILE="$(find "$HOME/Downloads" "$HOME/Desktop" -maxdepth 1 -name 'dgc-neon-netlify-github-patch.zip' -print -quit)"
  if [ -z "$PATCH_FILE" ]; then
    echo 'STOP: Put the ZIP in Downloads or Desktop first.'
  else
    BACKUP="$HOME/Desktop/dgc-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    tar -czf "$BACKUP" src/App.js src/components/NavBar.js src/pages/Newsletters.js src/router/index.js package.json package-lock.json
    unzip -oq "$PATCH_FILE" -d .
    npm install @neondatabase/serverless
    npm install --save-dev netlify-cli
    npm pkg set 'scripts.db:setup=node scripts/setup-db.mjs' 'scripts.admin:create=node scripts/create-admin.mjs' 'scripts.dev=netlify dev'
    grep -qxF '.netlify' .gitignore || printf '\n.netlify\n' >> .gitignore
    if [ ! -f .env ]; then cp .env.example .env; fi
    echo "Patch installed. Backup: $BACKUP"
  fi
fi
```

Don't run this command in a shell containing only the source export! It deliberately does **not** include/replace `public/`, which holds the historical PDF and image assets.

## 2. Set up Neon connection

Neon dashboard: project `dgc` > branch `production` > **Connect** > copy your *pooled* PostgreSQL connection URI. Keep it private. Open `nano .env` and add or update:

```dotenv
DATABASE_URL=postgresql://NEON_USER:NEON_PASSWORD@NEON_POOLER_HOST/NEON_DATABASE?sslmode=require
```

Use the real URL *exactly* as provided by Neon, not the placeholder. If password contains special characters, copying the full URL avoids errors. Do not post the URI in chat and do not commit `.env`. Keep any existing env keys for the gallery etc.

## 3. GitHub Fine-grained PAT (required for PDFs in the repo)

Visit https://github.com/settings/personal-access-tokens/new

- **Resource owner**: GitHub account or organisation that owns the DGC repo.
- **Repository access**: **Only select repositories** > select DGC repo.
- **Repository permissions** > **Contents: Read and write**. Leave extra permissions at their minimal defaults.
- **Expiration**: GitHub fine-grained PATs must have a supported expiration; set a reasonable period and calendar a renewal before it expires. Do not assume this credential is permanent. If GitHub organisation approval is required, approve it.
- Save the token privately; GitHub shows the secret only on creation.

Then configure the rest of your local `.env`:

```dotenv
GITHUB_TOKEN=github_pat_REPLACE_WITH_REAL_TOKEN
GITHUB_OWNER=REPO_OWNER_FROM_GITHUB_URL
GITHUB_REPO=REPO_NAME_FROM_GITHUB_URL
GITHUB_BRANCH=main
```

To check repo owner/name in Terminal, run `git remote get-url origin`. For example `https://github.com/example/doncaster-garden-club.git` means owner=`example`, repo=`doncaster-garden-club`. No `https://` and no `.git` in the variables.

**This token can write to the selected GitHub repo. Never add it to `REACT_APP_*` or expose it in frontend code.** Do not share `.env` or GitHub token with ChatGPT or other people.

## 4. Initialise DB & create first admin (run locally only once)

```bash
npm run db:setup
npm run admin:create
```

Enter admin email, full name and a strong password (minimum 12 characters). Password is hidden when you type. The admin can create other accounts from Dashboard, and you can leave public registration disabled.

## 5. Configure Netlify environment variables

Netlify > **existing DGC site** > **Project configuration > Environment variables**. Add these **five** variables with runtime scope **Functions** (or **All scopes**) for the **Production** context:

| Key | Value |
| --- | --- |
| `DATABASE_URL` | Full Neon PostgreSQL pooled connection string |
| `GITHUB_TOKEN` | Fine-grained GitHub PAT with Contents read/write for only DGC repo |
| `GITHUB_OWNER` | GitHub account/org name |
| `GITHUB_REPO` | Exact repo name (no `.git`) |
| `GITHUB_BRANCH` | `main` |

The `.env` file is for local use; Netlify does not automatically use it. **Do not** use `REACT_APP_` prefixes for secrets; React will bundle them into public JavaScript. **Do not** put secrets in `netlify.toml` because runtime Functions do not receive those values. Existing Cloudinary/environment variables must remain as they are.

Netlify Git integration must use the same GitHub repo and production branch `main`, with automatic builds enabled. Build settings (configured by `netlify.toml`): command `npm run build`, publish `build`, functions `netlify/functions`, Node 22.

## 6. Test & deploy

To run the full site locally (frontend AND API together):

```bash
npm run dev
```

Visit **http://localhost:8888/login**. You can check **http://localhost:8888/api/health** (returns `{ "ok": true }` when the DB is reachable). Verify login, dashboard, and existing Home, Newsletters, Gallery etc.

**CAUTION: The .env values point to real Neon and real GitHub `main`. Running a test PDF upload locally WILL COMMIT IT TO PRODUCTION MAIN and trigger a production deploy.** Test a small throwaway PDF only if you deliberately intend that. To avoid affecting the live site, test uploading only after first releasing or use separate staging credentials/database/branch.

Verify the frontend compiles:

```bash
npm run build
```

Release to Netlify through your existing connected Git repo:

```bash
git status
git add src server netlify database scripts netlify.toml .env.example DGC_SETUP.md .gitignore package.json package-lock.json
git commit -m "feat: add login and Neon/Netlify dashboard with GitHub PDF publishing"
git push -u origin feature/auth-admin-dashboard

git switch main
git pull --ff-only origin main
git merge --no-ff feature/auth-admin-dashboard
git push origin main
```

**Before merging to `main`**, verify Netlify production environment variables are set; otherwise login will fail with a 500 error. Once deployed, test the production Login and Dashboard and upload a small test file, checking the next Netlify deployment completes. If the local `main` has moved remotely due to dashboard uploads, first `git pull --rebase origin main` while your working tree is clean, then proceed with your next local work.

## 7. Limitations / operational notes

- Buffered Netlify Function uploads are constrained; to stay safe under Netlify's 6 MB payload limit (binary uploads Base64 inflate by ~33%), this patch imposes **3 MiB per PDF**. That is a site policy, not a promise that all PDF files of any size are supported.
- Existing 2021–2026 PDFs remain in their original directory and their original hard-coded list. Only Dashboard-uploaded files can be removed through Dashboard; this protects the previous site content. You can later migrate legacy PDFs to a managed list if desired.
- GitHub stores every uploaded binary in Git history, even after deleting it; the repository grows over time. This approach is suitable only while the PDF volume is small. Later moving to object storage is more scalable.
- Public `/newsletters` dynamically retrieves metadata from Neon. If it cannot reach the database, the original hard-coded list remains visible.
- After an upload, the database entry may be visible before Netlify has redeployed the PDF. The PDF link will not work until the new deploy finishes. Likewise, deleted PDFs may remain accessible at the previous static URL until the new deploy completes.
- Dashboard uploads commit directly to `main`. This may conflict with strict GitHub branch protection requiring pull requests, or with GitHub organization token restrictions. Configure permissions accordingly; **do not disable protections blindly**.
- Maintain Neon backups and periodically renew the GitHub token. Free tiers and platform policies may change. Token expiry will break uploads/deletes, but will not break login or old PDFs.
