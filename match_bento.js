import fs from 'fs';

const content = fs.readFileSync('C:/Users/DEV/.gemini/antigravity-ide/brain/951f5e65-cbe1-4310-97e9-358efa40b012/.system_generated/steps/341/content.md', 'utf8');

// Match woolentor or product items
const regex = /<li[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
let m;
const items = [];
while ((m = regex.exec(content)) !== null) {
  const block = m[1];
  const urlMatch = block.match(/href="https:\/\/cakebites\.pk\/product\/([^"/]+)\//);
  const imgMatch = block.match(/data-src="(https:\/\/cakebites\.pk\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"]+)"/) ||
                   block.match(/src="(https:\/\/cakebites\.pk\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"]+)"/);
  const priceMatch = block.match(/([0-9,]+)<\/span>/);

  if (urlMatch && imgMatch) {
    // clean image from size suffix
    const fullImg = imgMatch[1].replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, '$1');
    items.push({
      slug: urlMatch[1],
      image: fullImg,
      rawImg: imgMatch[1]
    });
  }
}

console.log('Total product blocks matched:', items.length);
items.forEach((it, i) => console.log(`${i + 1}: slug="${it.slug}" => img="${it.image}"`));
