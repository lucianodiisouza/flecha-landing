// Builds what Vercel serves: the docs (Astro Starlight, in docs-site/) into dist/docs,
// and the static landing page copied around them as it is.
import { execSync } from 'node:child_process';
import { cpSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');

// Repo files that are not part of the site.
const skip = new Set([
  '.git', '.github', '.gitignore', '.vercel', '.env.local', '.DS_Store',
  'README.md', 'vercel.json', 'scripts', 'docs-site', 'dist', 'node_modules',
]);

rmSync(dist, { recursive: true, force: true });
execSync('npm run build', { cwd: join(root, 'docs-site'), stdio: 'inherit' });

for (const name of readdirSync(root)) {
  if (skip.has(name)) continue;
  cpSync(join(root, name), join(dist, name), { recursive: true });
}
// The deployed commit, so scripts can tell when a push is live (see .github/workflows/indexnow.yml).
writeFileSync(join(dist, 'build.txt'), `${process.env.VERCEL_GIT_COMMIT_SHA ?? 'local'}\n`);
console.log('Site built into dist/');
