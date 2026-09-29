import fs from 'fs';

const p1 = fs.readFileSync('C:/Users/DEV/.gemini/antigravity-ide/brain/951f5e65-cbe1-4310-97e9-358efa40b012/.system_generated/steps/341/content.md', 'utf8');
const p2 = fs.readFileSync('C:/Users/DEV/.gemini/antigravity-ide/brain/951f5e65-cbe1-4310-97e9-358efa40b012/.system_generated/steps/359/content.md', 'utf8');

function extractItems(content) {
  const regex = /<li[^>]*class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  const items = [];
  while ((m = regex.exec(content)) !== null) {
    const block = m[1];
    const urlMatch = block.match(/href="https:\/\/cakebites\.pk\/product\/([^"/]+)\//);
    const imgMatch = block.match(/data-src="(https:\/\/cakebites\.pk\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"]+)"/) ||
                     block.match(/src="(https:\/\/cakebites\.pk\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/[^"]+)"/);

    if (urlMatch && imgMatch) {
      const fullImg = imgMatch[1].replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, '$1');
      items.push({
        slug: urlMatch[1],
        image: fullImg
      });
    }
  }
  return items;
}

const allBentos = [...extractItems(p1), ...extractItems(p2)];
console.log('Total Bento Cakes extracted across both pages:', allBentos.length);

allBentos.forEach((it, i) => {
  console.log(`${i + 1}: ${it.slug} => ${it.image}`);
});

fs.writeFileSync('server/all_20_bentos.json', JSON.stringify(allBentos, null, 2));
