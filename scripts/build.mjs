// Builds what Vercel serves: the docs (Astro Starlight, in docs-site/) into dist/docs,
// and the static landing page copied around them as it is.
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CHANGELOG_PATHS } from './changelog.mjs';
import { changelogPage, checkChangelog } from './changelog-page.mjs';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');

// Repo files that are not part of the site.
const skip = new Set([
  '.git', '.github', '.gitignore', '.vercel', '.env.local', '.DS_Store',
  'README.md', 'vercel.json', 'scripts', 'docs-site', 'dist', 'node_modules',
]);

// A changelog mistake fails the build before the slow docs build, not after.
checkChangelog();
rmSync(dist, { recursive: true, force: true });
execSync('npm run build', { cwd: join(root, 'docs-site'), stdio: 'inherit' });

for (const name of readdirSync(root)) {
  if (skip.has(name)) continue;
  cpSync(join(root, name), join(dist, name), { recursive: true });
}
// "What's new" / "Novidades", from scripts/changelog.mjs.
for (const locale of ['en', 'pt-br']) {
  const dir = join(dist, CHANGELOG_PATHS[locale]);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), changelogPage(root, locale));
}
// Every /assets/ URL in the pages gets ?v=<content hash>, so vercel.json can cache /assets/
// for a year: a changed file gets a new URL, an unchanged one is never asked for again.
const hashes = new Map();
const version = (path) => {
  if (!hashes.has(path)) {
    hashes.set(path, createHash('sha256').update(readFileSync(join(dist, path))).digest('hex').slice(0, 10));
  }
  return hashes.get(path);
};
const htmlFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : []);
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  const out = html.replace(/((?:https:\/\/flecha\.dev)?\/(assets\/[\w./-]+\.\w+))(?![\w./?-])/g,
    (url, _, path) => (existsSync(join(dist, path)) ? `${url}?v=${version(path)}` : url));
  if (out !== html) writeFileSync(file, out);
}
// The deployed commit, so scripts can tell when a push is live (see .github/workflows/indexnow.yml).
writeFileSync(join(dist, 'build.txt'), `${process.env.VERCEL_GIT_COMMIT_SHA ?? 'local'}\n`);
console.log('Site built into dist/');
