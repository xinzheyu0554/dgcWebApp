-- DGC: run using npm run db:setup. Existing tables/data are preserved.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS dgc_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dgc_sessions (
  token_hash TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES dgc_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_dgc_sessions_user ON dgc_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_dgc_sessions_expires ON dgc_sessions(expires_at);

CREATE TABLE IF NOT EXISTS dgc_login_attempts (
  email TEXT PRIMARY KEY,
  failures INT NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dgc_newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INT NOT NULL CHECK (year BETWEEN 2020 AND 2100),
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  title TEXT NOT NULL,
  filename TEXT NOT NULL,
  repo_path TEXT NOT NULL UNIQUE,
  uploaded_by UUID REFERENCES dgc_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(year, month)
);


-- Track changes to legacy PDFs without renaming old files or changing public URLs.
CREATE TABLE IF NOT EXISTS dgc_legacy_newsletter_changes (
  legacy_id TEXT PRIMARY KEY,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
