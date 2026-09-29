import fs from 'fs';

const html = fs.readFileSync('menu_raw.html', 'utf8');
const links = [];
const regex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  const href = match[1];
  const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  links.push({ href, text });
}

const map = new Map();
for (const item of links) {
  if (!map.has(item.href)) {
    map.set(item.href, new Set());
  }
  if (item.text) {
    map.get(item.href).add(item.text);
  }
}

const result = [];
for (const [href, texts] of map.entries()) {
  result.push({ href, texts: [...texts] });
}

console.log(JSON.stringify(result, null, 2));
