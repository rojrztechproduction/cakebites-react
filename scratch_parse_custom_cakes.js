import fs from 'fs';

const html = fs.readFileSync('scratch_custom_cakes_arch.html', 'utf8');

// Parse products
const products = [];
const regex = /<div class="woolentor-product-content">[\s\S]*?<div class="woolentor-product-categories">[\s\S]*?<a[^>]*class="woolentor-product-category"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<h3 class=['"]woolentor-product-title['"]><a href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a><\/h3>[\s\S]*?<div class="woolentor-product-price">([\s\S]*?)<\/div>/gi;

let m;
while ((m = regex.exec(html)) !== null) {
  const cat = m[1].replace(/<[^>]+>/g, '').trim();
  const link = m[2].trim();
  const title = m[3].replace(/<[^>]+>/g, '').trim();
  const priceRaw = m[4].replace(/<[^>]+>/g, '').replace(/&#8360;/g, '').replace(/₨/g, '').replace(/,/g, '').trim();
  const price = parseInt(priceRaw, 10) || 4500;
  
  // also find image right before this content
  const startIdx = Math.max(0, m.index - 1200);
  const beforeBlock = html.substring(startIdx, m.index);
  const imgMatch = beforeBlock.match(/data-src=['"]([^'"]+)['"]/i) || beforeBlock.match(/src=['"]([^'"]+)['"]/i);
  const img = imgMatch ? imgMatch[1] : '';

  products.push({
    title,
    cat,
    price,
    img,
    link
  });
}

console.log('Total custom products parsed:', products.length);
if (products.length > 0) {
  console.log('First 5 products:');
  console.log(JSON.stringify(products.slice(0, 5), null, 2));

  // Count by category
  const cats = {};
  products.forEach(p => {
    cats[p.cat] = (cats[p.cat] || 0) + 1;
  });
  console.log('Category distribution:');
  console.log(cats);
}
