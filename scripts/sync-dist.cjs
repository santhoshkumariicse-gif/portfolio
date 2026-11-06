const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('[sync-dist] dist directory not found! Run vite build first.');
  process.exit(1);
}

// 1. Copy dist/index.html to root index.html
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(rootDir, 'index.html'));

// 2. Copy dist/assets to root assets
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, rootAssets, { recursive: true, force: true });
}

// 3. Copy other public assets from dist to root if needed
const filesToSync = ['404.html', 'manifest.json', 'robots.txt', 'sitemap.xml', 'sw.js'];
for (const file of filesToSync) {
  const src = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(rootDir, file));
  }
}

// 4. Ensure .nojekyll exists in root and public
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');
fs.writeFileSync(path.join(rootDir, 'public', '.nojekyll'), '');

console.log('[sync-dist] Successfully synchronized production build artifacts to root for direct GitHub Pages branch deployment.');
