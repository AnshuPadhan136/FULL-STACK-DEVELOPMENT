const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\anshu\\.gemini\\antigravity\\brain\\344af1c1-3fda-45c3-ae2d-82d4eb2e6537';
const destDir = path.join(__dirname, 'images');

// Create images directory
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const copies = [
    ['hero_cafe_1784865716942.jpg', 'hero.jpg'],
    ['special_latte_1784865727588.jpg', 'latte.jpg'],
    ['special_croissant_1784865738144.jpg', 'croissant.jpg'],
    ['special_matcha_1784865757459.jpg', 'matcha.jpg'],
    ['special_avocado_toast_1784865767869.jpg', 'avocado-toast.jpg'],
    ['special_tiramisu_1784865778172.jpg', 'tiramisu.jpg'],
    ['special_cold_brew_1784865787216.jpg', 'cold-brew.jpg'],
    ['about_barista_1784865810109.jpg', 'about.jpg'],
    ['gallery_interior_1784865821379.jpg', 'gallery-interior.jpg'],
    ['gallery_beans_1784865830821.jpg', 'gallery-beans.jpg'],
    ['gallery_pastries_1784865848750.jpg', 'gallery-pastries.jpg'],
    ['gallery_outdoor_1784865858281.jpg', 'gallery-outdoor.jpg'],
    ['gallery_pour_over_1784865868286.jpg', 'gallery-pourover.jpg'],
];

let count = 0;
for (const [src, dest] of copies) {
    const srcPath = path.join(srcDir, src);
    const destPath = path.join(destDir, dest);
    try {
        fs.copyFileSync(srcPath, destPath);
        count++;
        console.log(`✓ ${dest}`);
    } catch (e) {
        console.error(`✗ ${dest}: ${e.message}`);
    }
}
console.log(`\nCopied ${count}/${copies.length} images.`);
