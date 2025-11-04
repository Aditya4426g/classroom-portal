const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Classroom Portal...');

// Build client
console.log('📦 Building React client...');
execSync('cd client && npm install && npm run build', { stdio: 'inherit' });

// Copy server files
console.log('📁 Preparing server files...');
const distDir = './dist';
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Copy server files
execSync('xcopy server dist\\server /E /I /Y', { stdio: 'inherit' });

// Copy client build
execSync('xcopy client\\build dist\\client /E /I /Y', { stdio: 'inherit' });

console.log('✅ Build complete! Upload the "dist" folder to your hosting provider.');
console.log('📂 Files ready in: ./dist');