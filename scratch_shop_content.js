import fs from 'fs';

const html = fs.readFileSync('scratch_shop.html', 'utf8');

const headings = [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)]
  .map(m => ({ tag: 'h' + m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
  .filter(h => h.text.length > 0 && !h.text.includes('{') && !h.text.includes('var('));

const productItems = [];
const prodRegex = /<li[^>]*class=["'][^"']*product[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi;
let pm;
while ((pm = prodRegex.exec(html)) !== null) {
  const prodHtml = pm[1];
  const title = prodHtml.match(/woocommerce-loop-product__title[^>]*>([\s\S]*?)<\/[^>]+>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
  const price = prodHtml.match(/class=["']price["'][^>]*>([\s\S]*?)<\/span>/i)?.[0]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const img = prodHtml.match(/<img[^>]*src=["']([^"']*)["']/i)?.[1];
  const link = prodHtml.match(/<a[^>]*href=["']([^"']*)["']/i)?.[1];
  if (title) {
    productItems.push({ title, price, img, link });
  }
}

// Check category boxes / category grids
const catBoxes = [];
const catRegex = /<div[^>]*class=["'][^"']*woolentor-category-grid[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
let cm;
while ((cm = catRegex.exec(html)) !== null) {
  catBoxes.push(cm[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

// Find sidebar filters (price, categories, attributes)
const filterWidgets = [...html.matchAll(/<div[^>]*class=["'][^"']*widget\s+([^"']*)["'][^>]*>([\s\S]*?)<\/div>/gi)].map(m => ({
  cls: m[1],
  title: m[2].match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/i)?.[1]?.replace(/<[^>]+>/g, '').trim()
}));

const summary = {
  headings,
  catBoxes,
  filterWidgets,
  totalProducts: productItems.length,
  productSample: productItems.slice(0, 15)
};

fs.writeFileSync('scratch_shop_summary.json', JSON.stringify(summary, null, 2), 'utf8');
console.log('Summary written. Products found:', productItems.length);
