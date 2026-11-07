const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const parentDir = path.resolve(rootDir, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('[sync-dist] dist directory not found! Run vite build first.');
  process.exit(1);
}

// 1. Keep portfolio-main/index.html as the source entry for Vite dev server
const sourceIndex = path.join(rootDir, 'index.source.html');
const devIndex = path.join(rootDir, 'index.html');
if (fs.existsSync(sourceIndex)) {
  fs.copyFileSync(sourceIndex, devIndex);
}

// 2. Sync production build artifacts to parent root (D:\portfolio) for direct static or GitHub Pages deployment
const parentIndex = path.join(parentDir, 'index.html');
fs.copyFileSync(path.join(distDir, 'index.html'), parentIndex);

const distAssets = path.join(distDir, 'assets');
const parentAssets = path.join(parentDir, 'assets');
if (fs.existsSync(parentAssets)) {
  fs.rmSync(parentAssets, { recursive: true, force: true });
}
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, parentAssets, { recursive: true, force: true });
}

// 3. Sync dist images to parent images
const distImages = path.join(distDir, 'images');
const parentImages = path.join(parentDir, 'images');
if (fs.existsSync(distImages)) {
  fs.cpSync(distImages, parentImages, { recursive: true, force: true });
}

// 4. Ensure .nojekyll exists in parent root, rootDir, and public
fs.writeFileSync(path.join(parentDir, '.nojekyll'), '');
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');
fs.writeFileSync(path.join(rootDir, 'public', '.nojekyll'), '');

console.log('[sync-dist] Successfully synchronized production build artifacts to root for direct GitHub Pages and static preview deployment.');
