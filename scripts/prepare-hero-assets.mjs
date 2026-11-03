import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawDir = path.join(__dirname, '../public/images/raw');
const outDir = path.join(__dirname, '../public/images');

async function processImages() {
  const files = fs.readdirSync(rawDir);

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(rawDir, file);

      if (file.includes('editorial_photo_image')) {
        // Crop the editorial image to remove AI artifacts/placeholder text
        // Note: The specific extraction values depend on the actual image, these are standard portrait ratios
        const metadata = await sharp(inputPath).metadata();
        await sharp(inputPath)
          .extract({ left: 100, top: 100, width: metadata.width - 200, height: metadata.height - 200 })
          .resize(800, 1000, { fit: 'cover' })
          .webp({ quality: 85 })
          .toFile(path.join(outDir, 'editorial_dealer.webp'));
        console.log('Processed editorial image (cropped and optimized)');
      } else if (file.includes('mockup_design')) {
        // Mockups need to be trimmed of white background/artifacts and optimized
        await sharp(inputPath)
          .trim()
          .webp({ quality: 85, lossless: false })
          .toFile(path.join(outDir, 'hero_mockup.webp'));
        console.log('Processed hero mockup image (trimmed and optimized)');
      }
    }
  }
}

processImages().catch(console.error);
