import fs from 'fs';

const content = fs.readFileSync('C:/Users/DEV/.gemini/antigravity-ide/brain/951f5e65-cbe1-4310-97e9-358efa40b012/.system_generated/steps/341/content.md', 'utf8');

console.log('File read, length:', content.length);

// Look for image links and products
// Regex for products in woolentor or woocommerce
const productLinks = [];
const imgRegex = /https:\/\/cakebites\.pk\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi;
const allImgs = [...new Set(content.match(imgRegex) || [])];

console.log('Total images found in page:', allImgs.length);
const bentoImgs = allImgs.filter(img => !img.includes('logo') && !img.includes('payment') && !img.includes('banner') && !img.includes('icon'));
console.log('Product images:', bentoImgs.length);
console.log(bentoImgs);
