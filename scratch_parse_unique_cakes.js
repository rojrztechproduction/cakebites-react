import fs from 'fs';

const html = fs.readFileSync('scratch_custom_cakes_arch.html', 'utf8');

const regex = /<div class="woolentor-product-content">[\s\S]*?<div class="woolentor-product-categories">[\s\S]*?<a[^>]*class="woolentor-product-category"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<h3 class=['"]woolentor-product-title['"]><a href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a><\/h3>[\s\S]*?<div class="woolentor-product-price">([\s\S]*?)<\/div>/gi;

const seen = new Set();
const uniqueProducts = [];

let m;
while ((m = regex.exec(html)) !== null) {
  const cat = m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
  const link = m[2].trim();
  let title = m[3].replace(/<[^>]+>/g, '').trim();
  // clean corrupted title if any
  title = title.replace(/cnjvmkbl;'l\]/g, '').trim();
  const priceRaw = m[4].replace(/<[^>]+>/g, '').replace(/&#8360;/g, '').replace(/₨/g, '').replace(/,/g, '').trim();
  const price = parseInt(priceRaw, 10) || 4500;
  
  const startIdx = Math.max(0, m.index - 1200);
  const beforeBlock = html.substring(startIdx, m.index);
  const imgMatch = beforeBlock.match(/data-src=['"]([^'"]+)['"]/i) || beforeBlock.match(/src=['"]([^'"]+)['"]/i);
  const img = imgMatch ? imgMatch[1] : '';

  const key = `${title}__${link}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueProducts.push({
      title,
      cat,
      price,
      img,
      link
    });
  }
}

console.log('Unique products count:', uniqueProducts.length);
fs.writeFileSync('cakebites-react/src/customCakesData.json', JSON.stringify(uniqueProducts, null, 2));
console.log('Saved to cakebites-react/src/customCakesData.json');
