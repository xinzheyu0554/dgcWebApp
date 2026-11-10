import { randomUUID } from 'node:crypto';
import { githubUploadPdf, githubDeletePdf, githubReplacePdf } from '../../server/github.mjs';
import { legacyNewsletters } from '../../server/legacy-newsletters.mjs';
import { db } from '../../server/db.mjs';
import { uploadGalleryPhoto } from '../../server/gallery-upload.mjs';
import { galleryRoute } from '../../server/gallery.mjs';
import {
  clearSessionCookie, getSessionToken, hashPassword, hashToken, makeToken,
  maxAge, publicUser, sessionCookie, verifyPassword,
} from '../../server/auth.mjs';

const MAX_PDF_BYTES = 3 * 1024 * 1024;
const METHODS_WITH_BODY = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, status = 200, headers = {}) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers },
  });
}
function error(message, status = 400) { return json({ error: message }, status); }
function normalizeEmail(value) { return typeof value === 'string' ? value.trim().toLowerCase() : ''; }
function validName(value) { return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= 100; }
function validId(value) { return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value || ''); }

function routePath(request) {
  const pathname = new URL(request.url).pathname;
  if (pathname.startsWith('/.netlify/functions/api/')) return pathname.slice('/.netlify/functions/api'.length);
  if (pathname === '/.netlify/functions/api') return '/';
  if (pathname.startsWith('/api/')) return pathname.slice('/api'.length);
  return pathname;
}
function verifyOrigin(request) {
  // Same-site cookie plus strict origin verification prevents cross-site form submissions.
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host && new URL(origin).protocol === new URL(request.url).protocol;
  } catch { return false; }
}
async function readJSON(request) {
  if (!(request.headers.get('content-type') || '').includes('application/json')) throw new Error('Expected JSON.');
  const value = await request.text();
  if (value.length > 10000) throw new Error('Request too large.');
  try { return JSON.parse(value); } catch { throw new Error('Invalid JSON.'); }
}
async function sessionUser(sql, request) {
  const token = getSessionToken(request);
  if (!token) return null;
  const rows = await sql`
    SELECT u.id, u.email, u.full_name, u.role, u.active, u.created_at
      FROM dgc_sessions s JOIN dgc_users u ON s.user_id = u.id
     WHERE s.token_hash = ${hashToken(token)} AND s.expires_at > NOW() AND u.active = TRUE
     LIMIT 1`;
  return rows[0] || null;
}
async function requireAdmin(sql, request) {
  const user = await sessionUser(sql, request);
  return user && user.role === 'admin' ? user : null;
}
async function allUsers(sql) {
  const result = await sql`SELECT id, email, full_name, role, active, created_at
                           FROM dgc_users ORDER BY created_at DESC`;
  return result.map(publicUser);
}

function safeNewsletterPath(path) {
  // Only paths in the known year-based newsletter tree may ever be modified.
  return typeof path === 'string' && /^public\/documentation\/newsletter\/20\d{2}\/[^/]+\.pdf$/i.test(path)
    && !path.includes('..');
}
async function readPdf(request) {
  if ((request.headers.get('content-type') || '').split(';')[0] !== 'application/pdf') {
    const e = new Error('Only PDF uploads are allowed.'); e.status = 400; throw e;
  }
  const length = Number(request.headers.get('content-length') || 0);
  if (length > MAX_PDF_BYTES) {
    const e = new Error('PDF exceeds the 3 MB upload limit.'); e.status = 413; throw e;
  }
  const bytes = await request.arrayBuffer();
  if (!bytes.byteLength || bytes.byteLength > MAX_PDF_BYTES) {
    const e = new Error('PDF exceeds the 3 MB upload limit.'); e.status = 413; throw e;
  }
  if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') {
    const e = new Error('File is not a valid PDF.'); e.status = 400; throw e;
  }
  return bytes;
}
function monthSort(a, b) {
  return b.year - a.year || b.month - a.month || String(a.title).localeCompare(String(b.title));
}
async function allNewsletters(sql) {
  const [uploaded, changes] = await Promise.all([
    sql`SELECT id, year, month, title, filename, repo_path, created_at FROM dgc_newsletters`,
    sql`SELECT legacy_id, deleted FROM dgc_legacy_newsletter_changes`,
  ]);
  const statuses = new Map(changes.map(c => [c.legacy_id, c.deleted]));
  const older = legacyNewsletters.filter(item => statuses.get(item.id) !== true);
  const items = [...older, ...uploaded.map(item => ({...item, legacy: false}))];
  return items.map(item => ({...item, url: `/${item.repo_path.slice('public/'.length)}`})).sort(monthSort);
}

async function handle(request) {
  const sql = db();
  const method = request.method.toUpperCase();
  const route = routePath(request);
  if (METHODS_WITH_BODY.has(method) && !verifyOrigin(request)) return error('Invalid request origin.', 403);

  if (method === 'GET' && route === '/health') {
    await sql`SELECT 1`;
    return json({ ok: true });
  }

  if (method === 'POST' && route === '/auth/login') {
    const { email: rawEmail, password } = await readJSON(request);
    const email = normalizeEmail(rawEmail);
    if (!emailPattern.test(email) || typeof password !== 'string') return error('Invalid email or password.', 401);
    const blocked = await sql`SELECT locked_until FROM dgc_login_attempts WHERE email = ${email} AND locked_until > NOW()`;
    if (blocked.length) return error('Too many attempts. Please try again in 15 minutes.', 429);
    const users = await sql`SELECT * FROM dgc_users WHERE email = ${email} LIMIT 1`;
    const user = users[0];
    const valid = user && user.active && await verifyPassword(password, user.password_hash);
    if (!valid) {
      await sql`
        INSERT INTO dgc_login_attempts(email, failures, locked_until, updated_at)
        VALUES (${email}, 1, NULL, NOW())
        ON CONFLICT(email) DO UPDATE SET
          failures = CASE WHEN dgc_login_attempts.updated_at < NOW() - INTERVAL '15 minutes' THEN 1 ELSE dgc_login_attempts.failures + 1 END,
          locked_until = CASE WHEN dgc_login_attempts.updated_at >= NOW() - INTERVAL '15 minutes'
                                AND dgc_login_attempts.failures >= 9 THEN NOW() + INTERVAL '15 minutes' ELSE NULL END,
          updated_at = NOW()`;
      return error('Invalid email or password.', 401);
    }
    await sql`DELETE FROM dgc_login_attempts WHERE email = ${email}`;
    const token = makeToken();
    await sql`INSERT INTO dgc_sessions (token_hash, user_id, expires_at)
              VALUES (${hashToken(token)}, ${user.id}, NOW() + INTERVAL '7 days')`;
    await sql`UPDATE dgc_users SET updated_at = NOW() WHERE id = ${user.id}`;
    return json({ user: publicUser(user), session_expires_in: maxAge }, 200, {
      'Set-Cookie': sessionCookie(token, request),
    });
  }

  if (method === 'POST' && route === '/auth/logout') {
    const token = getSessionToken(request);
    if (token) await sql`DELETE FROM dgc_sessions WHERE token_hash = ${hashToken(token)}`;
    return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie(request) });
  }

  if (method === 'GET' && route === '/auth/me') {
    return json({ user: publicUser(await sessionUser(sql, request)) });
  }

  if (method === 'POST' && route === '/auth/change-password') {
    const user = await sessionUser(sql, request);
    if (!user) return error('Sign in required.', 401);
    const { currentPassword, newPassword } = await readJSON(request);
    const record = await sql`SELECT password_hash FROM dgc_users WHERE id = ${user.id}`;
    if (!(await verifyPassword(currentPassword, record[0]?.password_hash))) return error('Current password is incorrect.', 400);
    const newHash = await hashPassword(newPassword);
    await sql`UPDATE dgc_users SET password_hash = ${newHash}, updated_at = NOW() WHERE id = ${user.id}`;
    const token = getSessionToken(request);
    await sql`DELETE FROM dgc_sessions WHERE user_id = ${user.id} AND token_hash <> ${hashToken(token)}`;
    return json({ ok: true });
  }

  if (method === 'POST' && route === '/gallery/upload') {
    return uploadGalleryPhoto(sql, request, await sessionUser(sql, request));
  }

  if (method === 'GET' && route === '/gallery') return galleryRoute(sql,request,method,route,false);

  if (method === 'GET' && route === '/newsletters') {
    return json({ newsletters: await allNewsletters(sql) });
  }

  const fileMatch = route.match(/^\/newsletters\/([a-f0-9-]+)\/file$/i);
  if (method === 'GET' && fileMatch) {
    const id = fileMatch[1];
    if (!validId(id)) return error('Not found.', 404);
    // The PDF lives at the original public URL after Netlify builds the new Git commit.
    const rows = await sql`SELECT repo_path FROM dgc_newsletters WHERE id = ${id} LIMIT 1`;
    if (!rows.length) return error('Not found.', 404);
    return Response.redirect(new URL(`/${rows[0].repo_path.slice('public/'.length)}`, request.url), 302);
  }

  if (route.startsWith('/admin/')) {
    const user = await requireAdmin(sql, request);
    if (!user) return error('Administrator access required.', 403);
    if (route.startsWith('/admin/gallery')) return galleryRoute(sql,request,method,route,true);

    if (method === 'GET' && route === '/admin/users') return json({ users: await allUsers(sql) });
    if (method === 'POST' && route === '/admin/users') {
      const body = await readJSON(request);
      const email = normalizeEmail(body.email);
      if (!emailPattern.test(email) || !validName(body.full_name)) return error('Valid email and full name are required.');
      if (!['admin', 'member'].includes(body.role)) return error('Invalid role.');
      const passwordHash = await hashPassword(body.password);
      const result = await sql`
        INSERT INTO dgc_users (email, full_name, password_hash, role)
        VALUES (${email}, ${body.full_name.trim()}, ${passwordHash}, ${body.role})
        RETURNING id, email, full_name, role, active, created_at`;
      return json({ user: publicUser(result[0]) }, 201);
    }
    const usersMatch = route.match(/^\/admin\/users\/([a-f0-9-]+)$/i);
    if (usersMatch && validId(usersMatch[1])) {
      const id = usersMatch[1];
      if (method === 'PATCH') {
        const body = await readJSON(request);
        const existing = await sql`SELECT id, role, active FROM dgc_users WHERE id = ${id}`;
        if (!existing.length) return error('User not found.', 404);
        if (!validName(body.full_name) || !['admin', 'member'].includes(body.role) || typeof body.active !== 'boolean') {
          return error('Invalid name, role or account status.');
        }
        if (String(id) === String(user.id) && (body.role !== 'admin' || !body.active)) {
          return error('Cannot revoke your own admin access.');
        }
        if (existing[0].role === 'admin' && existing[0].active && (body.role !== 'admin' || !body.active)) {
          const count = await sql`SELECT COUNT(*)::int AS count FROM dgc_users WHERE role = 'admin' AND active = TRUE`;
          if (count[0].count <= 1) return error('Cannot remove the last active administrator.');
        }
        const newHash = body.password ? await hashPassword(body.password) : null;
        const updated = await sql`
          UPDATE dgc_users SET full_name = ${body.full_name.trim()}, role = ${body.role},
            active = ${body.active},
            password_hash = COALESCE(${newHash}, password_hash), updated_at = NOW()
          WHERE id = ${id}
          RETURNING id, email, full_name, role, active, created_at`;
        if (newHash || !body.active || existing[0].role !== body.role) {
          await sql`DELETE FROM dgc_sessions WHERE user_id = ${id}`;
        }
        return json({ user: publicUser(updated[0]) });
      }
      if (method === 'DELETE') {
        if (String(id) === String(user.id)) return error('You cannot deactivate your own account.');
        const result = await sql`SELECT id, role, active FROM dgc_users WHERE id = ${id}`;
        if (!result.length) return error('User not found.', 404);
        if (result[0].role === 'admin' && result[0].active) {
          const count = await sql`SELECT COUNT(*)::int AS count FROM dgc_users WHERE role='admin' AND active=TRUE`;
          if (count[0].count <= 1) return error('Cannot deactivate the last administrator.');
        }
        await sql`UPDATE dgc_users SET active = FALSE, updated_at = NOW() WHERE id = ${id}`;
        await sql`DELETE FROM dgc_sessions WHERE user_id = ${id}`;
        return json({ ok: true });
      }
    }

    if (method === 'POST' && route === '/admin/newsletters') {
      const url = new URL(request.url);
      const year = Number(url.searchParams.get('year'));
      const month = Number(url.searchParams.get('month'));
      const title = (url.searchParams.get('title') || '').trim();
      const filename = (url.searchParams.get('filename') || '').trim();
      const nowYear = new Date().getUTCFullYear();
      if (!Number.isInteger(year) || year < 2020 || year > nowYear + 2 || !Number.isInteger(month) || month < 1 || month > 12) {
        return error('Invalid newsletter year or month.');
      }
      if (!title || title.length > 180 || filename.length < 5 || filename.length > 180 || !/\.pdf$/i.test(filename)) {
        return error('A title and PDF filename are required.');
      }
      if ((request.headers.get('content-type') || '').split(';')[0] !== 'application/pdf') return error('Only PDF uploads are allowed.');
      const length = Number(request.headers.get('content-length') || 0);
      if (length > MAX_PDF_BYTES) return error('PDF exceeds the 3 MB upload limit.', 413);
      const bytes = await request.arrayBuffer();
      if (!bytes.byteLength || bytes.byteLength > MAX_PDF_BYTES) return error('PDF exceeds the 3 MB upload limit.', 413);
      if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') return error('File is not a valid PDF.');
      const existing = (await allNewsletters(sql)).some(item => item.year === year && item.month === month);
      if (existing) return error('A newsletter already exists for that month. Use Replace PDF instead.', 409);
      // Unique generated filename prevents replacing any existing historical PDF.
      const monthName = new Intl.DateTimeFormat('en-AU', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, 1)));
      const safeFilename = `DGC Newsletter ${monthName} ${year} ${randomUUID().slice(0, 8)}.pdf`;
      const repoPath = `public/documentation/newsletter/${year}/${safeFilename}`;
      await githubUploadPdf(repoPath, bytes, title);
      try {
        const records = await sql`
          INSERT INTO dgc_newsletters (year, month, title, filename, repo_path, uploaded_by)
          VALUES (${year}, ${month}, ${title}, ${filename}, ${repoPath}, ${user.id})
          RETURNING id, year, month, title, filename, repo_path, created_at`;
        const item = records[0];
        return json({ newsletter: { ...item, url: `/${item.repo_path.slice('public/'.length)}`, pending_deploy: true } }, 201);
      } catch (e) {
        // Never risk deleting someone else's file from GitHub in a recovery path.
        console.error('Database insert failed after GitHub commit; repo file requires reconciliation:', repoPath);
        throw e;
      }
    }
    const letterMatch = route.match(/^\/admin\/newsletters\/([a-f0-9-]+)$/i);
    const replaceMatch = route.match(/^\/admin\/newsletters\/([a-f0-9-]+)\/replace$/i);
    if ((method === 'DELETE' && letterMatch) || (method === 'POST' && replaceMatch)) {
      const id = (letterMatch || replaceMatch)[1];
      const legacy = legacyNewsletters.find(item => item.id === id);
      let item = legacy;
      if (!item && validId(id)) {
        const records = await sql`SELECT id, title, repo_path FROM dgc_newsletters WHERE id = ${id} LIMIT 1`;
        item = records[0];
      }
      if (!item || !safeNewsletterPath(item.repo_path)) return error('Newsletter not found.', 404);
      if (legacy) {
        const status = await sql`SELECT deleted FROM dgc_legacy_newsletter_changes WHERE legacy_id = ${id}`;
        if (status[0]?.deleted) return error('Newsletter already deleted.', 404);
      }
      if (method === 'POST') {
        const bytes = await readPdf(request);
        await githubReplacePdf(item.repo_path, bytes, item.title);
        return json({ ok: true, pending_deploy: true });
      }
      // GitHub operation first; if it fails, the DB continues to reflect the existing PDF.
      await githubDeletePdf(item.repo_path, item.title);
      if (legacy) {
        await sql`INSERT INTO dgc_legacy_newsletter_changes (legacy_id, deleted, updated_at)
                  VALUES (${id}, TRUE, NOW())
                  ON CONFLICT (legacy_id) DO UPDATE SET deleted = TRUE, updated_at = NOW()`;
      } else {
        await sql`DELETE FROM dgc_newsletters WHERE id = ${id}`;
      }
      return json({ ok: true, pending_deploy: true });
    }
  }

  return error('API route not found.', 404);
}

export default async function handler(request) {
  try {
    return await handle(request);
  } catch (e) {
    // Never expose DB connection strings or internal stack traces to browsers.
    console.error('DGC API error:', e);
    if (e?.status && e.status >= 400 && e.status < 600) return error(e.message, e.status);
    if (e?.code === '23505') return error('A record with this email or month already exists.', 409);
    if (e?.message?.startsWith('Password must') || e?.message === 'Request too large.' || e?.message === 'Expected JSON.' || e?.message === 'Invalid JSON.') {
      return error(e.message, 400);
    }
    return error('Server error. Please try again or contact the administrator.', 500);
  }
}
