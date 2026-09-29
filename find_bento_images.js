import fs from 'fs';

const content = fs.readFileSync('C:/Users/DEV/.gemini/antigravity-ide/brain/951f5e65-cbe1-4310-97e9-358efa40b012/.system_generated/steps/341/content.md', 'utf8');

const imgRegex = /https:\/\/cakebites\.pk\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"'\s)]+\.(?:jpg|jpeg|png|webp)/gi;
const allImgs = [...new Set(content.match(imgRegex) || [])];

// Filter original full-size images (not -100x100, -300x300, -500x500)
const fullImgs = allImgs.filter(url => 
  !url.match(/-\d+x\d+\./) && 
  (url.includes('IMG-003') || url.includes('bento') || url.includes('Bento'))
);

console.log('Original Bento Cake full-size images found:', fullImgs.length);
fullImgs.forEach((url, i) => console.log(`${i + 1}: ${url}`));
