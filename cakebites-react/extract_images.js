import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html1 = fs.readFileSync(path.resolve(__dirname, '..', 'scratch_custom_cakes_arch.html'), 'utf8');
console.log('scratch_custom_cakes_arch.html length:', html1.length);

// Search for product images or product titles
const imgUrls = [...html1.matchAll(/https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp)/gi)].map(m => m[0]);
console.log('Total image URLs in scratch_custom_cakes_arch.html:', imgUrls.length);

const uniqueUploadImgs = [...new Set(imgUrls.filter(u => u.includes('wp-content/uploads')))];
console.log('Unique wp-content/uploads images:', uniqueUploadImgs.length);
console.log('Sample 10 upload images:', uniqueUploadImgs.slice(0, 10));

// Also check scratch_shop.html
const html2 = fs.readFileSync(path.resolve(__dirname, '..', 'scratch_shop.html'), 'utf8');
const shopImgs = [...new Set([...html2.matchAll(/https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp)/gi)].map(m => m[0]).filter(u => u.includes('wp-content/uploads')))];
console.log('Unique wp-content/uploads in scratch_shop.html:', shopImgs.length);
