CREATE TABLE IF NOT EXISTS dgc_gallery_images (
  asset_id TEXT PRIMARY KEY,
  public_id TEXT NOT NULL UNIQUE,
  album TEXT NOT NULL CHECK(album IN ('plants','events')),
  secure_url TEXT NOT NULL,
  original_filename TEXT,
  format TEXT,
  bytes BIGINT,
  uploaded_at TIMESTAMPTZ,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  hidden BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS dgc_gallery_album_idx ON dgc_gallery_images(album, uploaded_at DESC);
