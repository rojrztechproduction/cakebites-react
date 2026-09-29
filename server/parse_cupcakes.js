import fs from 'fs';

const content = fs.readFileSync('C:/Users/DEV/.gemini/antigravity-ide/brain/4b224263-d6fc-4961-907c-8edd2449bfdf/.system_generated/steps/233/content.md', 'utf8');

const regex = /<a href="(https:\/\/cakebites\.pk\/product\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
let match;
const products = [];
while ((match = regex.exec(content)) !== null) {
  const url = match[1];
  const inner = match[2];
  const imgMatch = inner.match(/data-src="([^"]+)"/);
  if (imgMatch) {
    products.push({ url, img: imgMatch[1] });
  }
}

console.log('Total found:', products.length);
console.log(JSON.stringify(products, null, 2));
