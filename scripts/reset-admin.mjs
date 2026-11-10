import 'dotenv/config';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { neon } from '@neondatabase/serverless';
import { hashPassword } from '../server/auth.mjs';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing.');
}

const sql = neon(process.env.DATABASE_URL);
const rl = readline.createInterface({ input: stdin, output: stdout });

const email = (await rl.question('Admin email: '))
  .trim().toLowerCase();

rl.close();

const users = await sql`
  SELECT id, email, role
  FROM dgc_users
  WHERE email = ${email} AND role = 'admin'
  LIMIT 1
`;

if (users.length === 0) {
  console.error('Admin account not found.');
  process.exit(1);
}

function askHidden(label) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY) {
      reject(new Error('Interactive terminal required.'));
      return;
    }

    stdout.write(label);
    let value = '';
    const previousRaw = stdin.isRaw || false;

    stdin.setRawMode(true);
    stdin.resume();

    const onData = (data) => {
      for (const char of data.toString()) {
        if (char === '\r' || char === '\n') {
          stdin.removeListener('data', onData);
          stdin.setRawMode(previousRaw);
          stdout.write('\n');
          resolve(value);
          return;
        }

        if (char === '\u0003') {
          stdin.removeListener('data', onData);
          stdin.setRawMode(previousRaw);
          reject(new Error('Cancelled.'));
          return;
        }

        if (char === '\u007f') {
          value = value.slice(0, -1);
        } else {
          value += char;
        }
      }
    };

    stdin.on('data', onData);
  });
}

const password = await askHidden('New password (12+ chars): ');
const confirm = await askHidden('Confirm password: ');

if (password !== confirm) {
  throw new Error('Passwords do not match.');
}

const passwordHash = await hashPassword(password);

await sql`
  UPDATE dgc_users
  SET password_hash = ${passwordHash},
      updated_at = NOW()
  WHERE id = ${users[0].id}
    AND role = 'admin'
`;

await sql`
  DELETE FROM dgc_sessions
  WHERE user_id = ${users[0].id}
`;

await sql`
  DELETE FROM dgc_login_attempts
  WHERE email = ${email}
`;

console.log('Admin password reset successfully!');
console.log('Existing login sessions have been revoked.');
