import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');
const svgBuffer = readFileSync(resolve(publicDir, 'favicon.svg'));

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

for (const { name, size } of sizes) {
  await sharp(svgBuffer, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(resolve(publicDir, name));
  console.log(`Generated ${name}`);
}

console.log('All favicons generated!');
