import fs from 'fs';

const html = fs.readFileSync('temp_menu.html', 'utf8');

const regex = /<h3 class='woolentor-product-title'><a[^>]*title='([^']+)'[^>]*>([\s\S]*?)<\/a><\/h3>[\s\S]*?<div class="woolentor-product-price">[\s\S]*?([0-9,]+)<\/span>/gi;
let m;
const products = [];
const seen = new Set();

while ((m = regex.exec(html)) !== null) {
  const title = m[1].trim();
  const price = parseInt(m[3].replace(/,/g, ''), 10);
  if (!seen.has(title)) {
    seen.add(title);
    products.push({ title, price });
  }
}

console.log('Total extracted products from temp_menu.html:', products.length);
console.log(JSON.stringify(products, null, 2));
