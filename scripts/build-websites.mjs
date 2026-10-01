/**
 * Builds every standalone sub-site listed in websites/manifest.json and
 * copies its build output into the main site's dist/websites/<slug>/ folder.
 *
 * These are independent CRA/Vite apps (own package.json, own node_modules)
 * that live under playable/interactive project links (e.g. the Text
 * Adventure on-rails demo). They deploy as static assets nested under the
 * main site's own S3/CloudFront bucket — no server-side routing needed as
 * long as each sub-site uses HashRouter internally.
 */
import { execSync } from 'node:child_process';
import { existsSync, cpSync, rmSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const WEBSITES_DIR = path.join(ROOT_DIR, 'websites');
const DIST_WEBSITES_DIR = path.join(ROOT_DIR, 'dist', 'websites');

const manifestPath = path.join(WEBSITES_DIR, 'manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

if (manifest.length === 0) {
  console.log('No sub-sites listed in websites/manifest.json, skipping.');
  process.exit(0);
}

mkdirSync(DIST_WEBSITES_DIR, { recursive: true });

for (const { folder, slug } of manifest) {
  const siteDir = path.join(WEBSITES_DIR, folder);
  const destSlug = slug ?? folder;
  const destDir = path.join(DIST_WEBSITES_DIR, destSlug);

  console.log(`\n[websites] Building ${folder} -> /websites/${destSlug}/`);

  if (!existsSync(path.join(siteDir, 'node_modules'))) {
    console.log(`[websites] Installing dependencies for ${folder}...`);
    execSync('npm install', { cwd: siteDir, stdio: 'inherit' });
  }

  execSync('npm run build', { cwd: siteDir, stdio: 'inherit' });

  // CRA outputs to build/, Vite outputs to dist/ - support both.
  const craBuild = path.join(siteDir, 'build');
  const viteBuild = path.join(siteDir, 'dist');
  const sourceBuild = existsSync(craBuild) ? craBuild : viteBuild;

  if (!existsSync(sourceBuild)) {
    throw new Error(
      `[websites] No build output found for ${folder} (checked build/ and dist/)`,
    );
  }

  rmSync(destDir, { recursive: true, force: true });
  cpSync(sourceBuild, destDir, { recursive: true });
  console.log(`[websites] Copied ${folder} build to ${destDir}`);
}

console.log('\n[websites] All sub-sites built.');
