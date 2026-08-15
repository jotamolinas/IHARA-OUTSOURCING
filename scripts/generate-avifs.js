import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This script scans a specified directory for images (.webp, .jpg, .png)
// and generates .avif equivalents to improve load times further.

const inputDir = process.argv[2] || path.join(__dirname, '../public');

if (!fs.existsSync(inputDir)) {
  console.log(`Directory not found: ${inputDir}. Please place images there or specify a directory.`);
  process.exit(0); // Exit gracefully if default directory doesn't exist yet
}

const findImages = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findImages(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      // Match image files but avoid recursive avif conversion if already avif
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
};

const images = findImages(inputDir);

async function processImages() {
  console.log(`Found ${images.length} images. Starting AVIF generation...`);
  
  for (const imagePath of images) {
    const ext = path.extname(imagePath);
    // Determine target AVIF path
    let targetPath;
    if (ext === '.webp' && imagePath.includes('.jpg.webp')) {
      // Handle cases like image.jpg.webp => image.jpg.avif
      targetPath = imagePath.replace(/\.webp$/, '.avif');
    } else if (ext === '.webp') {
      targetPath = imagePath.replace(/\.webp$/, '.avif');
    } else {
      targetPath = imagePath.replace(new RegExp(`${ext}$`), '.avif');
    }

    if (fs.existsSync(targetPath)) {
      console.log(`Skipping - already exists: ${path.basename(targetPath)}`);
      continue;
    }

    try {
      await sharp(imagePath)
        .avif({ quality: 65, effort: 4 }) // Good balance of quality/compression
        .toFile(targetPath);
      console.log(`✅ Converted: ${path.basename(imagePath)} -> ${path.basename(targetPath)}`);
    } catch (err) {
      console.error(`❌ Error converting ${path.basename(imagePath)}:`, err.message);
    }
  }

  console.log('AVIF generation complete!');
}

processImages();
