// Script to copy poster images from artifact directory to project images directory
const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\anshu\\.gemini\\antigravity\\brain\\b391491e-578a-42f3-bedf-2f126ffaae3d';
const destDir = 'c:\\Users\\anshu\\Documents\\VS Code\\FullStack\\MovieTickBooking\\images';

// Also check the Home & Movies agent's directory
const agentDir = 'C:\\Users\\anshu\\.gemini\\antigravity\\brain\\a6cb9a88-7958-4e82-82b5-6d64b7e625dd';

// Ensure dest dir exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Map of generated poster files to destination names
const posterMap = {
  'poster_1_1785841227592.jpg': 'poster-1.jpg',
  'poster_2_1785841243627.jpg': 'poster-2.jpg',
  'poster_3_1785841311203.jpg': 'poster-3.jpg',
  'poster_4_1785841283813.jpg': 'poster-4.jpg'
};

let copied = 0;

// Copy from main agent artifacts
for (const [src, dest] of Object.entries(posterMap)) {
  const srcPath = path.join(srcDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${src} -> ${dest}`);
    copied++;
  }
}

// Also scan the Home & Movies agent directory for any poster images
try {
  const agentFiles = fs.readdirSync(agentDir);
  for (const file of agentFiles) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      // Try to extract poster number
      const match = file.match(/poster[_-]?(\d+)/i);
      if (match) {
        const num = match[1];
        const destPath = path.join(destDir, `poster-${num}.jpg`);
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(path.join(agentDir, file), destPath);
          console.log(`Copied from agent: ${file} -> poster-${num}.jpg`);
          copied++;
        }
      }
    }
  }
} catch (e) {
  console.log(`Agent dir scan: ${e.message}`);
}

console.log(`\nTotal posters copied: ${copied}`);

// List what's in the images directory now
const files = fs.readdirSync(destDir);
console.log(`\nFiles in images directory:`);
files.forEach(f => console.log(`  ${f}`));
