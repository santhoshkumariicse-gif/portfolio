const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, 'index.source.html');
const targetPath = path.join(rootDir, 'index.html');

if (fs.existsSync(sourcePath)) {
  fs.copyFileSync(sourcePath, targetPath);
  console.log('[setup-build] Prepared index.html from index.source.html for Vite compilation.');
} else {
  console.error('[setup-build] index.source.html not found!');
  process.exit(1);
}
