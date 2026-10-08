import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('[postbuild] Running postbuild tasks...');

const notFoundNested = path.join(distDir, '404', 'index.html');
const notFoundHtml = path.join(distDir, '404.html');
const indexHtml = path.join(distDir, 'index.html');

if (fs.existsSync(notFoundNested)) {
  fs.copyFileSync(notFoundNested, notFoundHtml);
  console.log('[postbuild] Copied dist/404/index.html -> dist/404.html');
} else if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, notFoundHtml);
  console.log('[postbuild] Copied dist/index.html -> dist/404.html (fallback)');
} else {
  console.warn('[postbuild] Warning: neither dist/404/index.html nor dist/index.html found');
}

// Ensure CNAME and .nojekyll exist in dist
const publicCname = path.join(rootDir, 'public', 'CNAME');
const distCname = path.join(distDir, 'CNAME');
if (fs.existsSync(publicCname) && !fs.existsSync(distCname)) {
  fs.copyFileSync(publicCname, distCname);
  console.log('[postbuild] Copied public/CNAME -> dist/CNAME');
}

const publicNojekyll = path.join(rootDir, 'public', '.nojekyll');
const distNojekyll = path.join(distDir, '.nojekyll');
if (fs.existsSync(publicNojekyll) && !fs.existsSync(distNojekyll)) {
  fs.copyFileSync(publicNojekyll, distNojekyll);
  console.log('[postbuild] Copied public/.nojekyll -> dist/.nojekyll');
}

console.log('[postbuild] Postbuild completed successfully.');
