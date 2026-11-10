import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'node:fs';
import { syncGallery } from '../server/gallery.mjs';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not configured.');
const sql=neon(process.env.DATABASE_URL);
for (const statement of readFileSync(new URL('../database/gallery.sql', import.meta.url),'utf8').split(';').map(x=>x.trim()).filter(Boolean)) await sql.query(statement,[]);
console.log('Found/synced images:',await syncGallery(sql));
console.log('Existing titles and descriptions were preserved. No photo was re-uploaded or deleted.');
