import 'dotenv/config';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { neon } from '@neondatabase/serverless';
import { hashPassword } from '../server/auth.mjs';

if (!process.env.DATABASE_URL) {
  console.error('Missing DATABASE_URL in .env; run npm run db:setup after configuring it.');
  process.exit(1);
}
const rl = readline.createInterface({ input: stdin, output: stdout });
const email = (await rl.question('Admin email: ')).trim().toLowerCase();
const name = (await rl.question('Admin full name: ')).trim();
rl.close();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name || name.length > 100) {
  console.error('Invalid email or name.');
  process.exit(1);
}

function secretPrompt(label) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY) return reject(new Error('Run this command in an interactive Terminal.'));
    stdout.write(label);
    let value = '';
    const wasRaw = stdin.isRaw || false;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === '\r' || char === '\n') {
          stdin.removeListener('data', onData);
          stdin.setRawMode(wasRaw);
          stdout.write('\n');
          return resolve(value);
        }
        if (char === '\u0003') {
          stdin.removeListener('data', onData);
          stdin.setRawMode(wasRaw);
          return reject(new Error('Cancelled.'));
        }
        if (char === '\u007f' || char === '\b') value = value.slice(0, -1);
        else if (char >= ' ' && value.length < 128) value += char;
      }
    };
    stdin.on('data', onData);
  });
}

const password = await secretPrompt('Admin password (12+ chars, hidden): ');
const confirm = await secretPrompt('Confirm password (hidden): ');
if (password !== confirm) throw new Error('Passwords do not match.');
const passwordHash = await hashPassword(password);
const sql = neon(process.env.DATABASE_URL);
const existing = await sql`SELECT id FROM dgc_users WHERE email = ${email} LIMIT 1`;
if (existing.length) {
  console.error('This email already exists. Refusing to override credentials or promote an account.');
  process.exit(1);
}
await sql`INSERT INTO dgc_users(email, full_name, password_hash, role)
          VALUES (${email}, ${name}, ${passwordHash}, 'admin')`;
console.log('Admin created. You can now sign in at /login.');
