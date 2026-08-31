/**
 * Upload a video to Cloudinary and print the delivery URL.
 *
 *   node scripts/upload-video.mjs <file> <public-id>
 *
 * Reads CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET
 * from .env.local. Signed upload over plain fetch, so there is no dependency
 * to add for something run by hand a few times a year.
 */
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { basename } from 'node:path';

const [file, publicId] = process.argv.slice(2);
if (!file || !publicId) {
  console.error('usage: node scripts/upload-video.mjs <file> <public-id>');
  process.exit(1);
}

const env = Object.fromEntries(
  (await readFile('.env.local', 'utf8'))
    .split('\n')
    .filter((l) => l.includes('=') && !l.trimStart().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
    }),
);

const cloud = env.CLOUDINARY_CLOUD_NAME;
const key = env.CLOUDINARY_API_KEY;
const secret = env.CLOUDINARY_API_SECRET;
if (!cloud || !key || !secret) {
  console.error('Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env.local');
  process.exit(1);
}

const folder = 'tsv-website';
const timestamp = Math.floor(Date.now() / 1000);

// Signature is sha1 over the signed params in alphabetical order, then the secret.
const signed = { folder, public_id: publicId, timestamp: String(timestamp) };
const toSign = Object.keys(signed).sort().map((k) => `${k}=${signed[k]}`).join('&');
const signature = createHash('sha1').update(toSign + secret).digest('hex');

const bytes = await readFile(file);
console.log(`uploading ${basename(file)} (${(bytes.length / 1e6).toFixed(1)} MB) as ${folder}/${publicId}…`);

const form = new FormData();
form.append('file', new Blob([bytes]), basename(file));
form.append('api_key', key);
form.append('timestamp', String(timestamp));
form.append('public_id', publicId);
form.append('folder', folder);
form.append('signature', signature);

const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/video/upload`, { method: 'POST', body: form });
const json = await res.json();
if (!res.ok) {
  console.error('upload failed:', json.error?.message ?? JSON.stringify(json));
  process.exit(1);
}

console.log('\nuploaded.');
console.log(`  duration: ${json.duration}s   ${json.width}x${json.height}   ${(json.bytes / 1e6).toFixed(1)} MB stored`);
console.log('\nPut this in app/page.tsx — w_720 and q_auto:good keep the phone-sized');
console.log('element from shipping a full-resolution master to every visitor:\n');
console.log(`  https://res.cloudinary.com/${cloud}/video/upload/q_auto:good,f_auto,w_720/v${json.version}/${json.public_id}.mp4`);
