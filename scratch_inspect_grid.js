import fs from 'fs';

const html = fs.readFileSync('scratch_shop.html', 'utf8');

// Find all elements with woolentor-category-grid or wl-category
const cardMatches = [...html.matchAll(/<div[^>]*class=["'][^"']*(?:woolentor-category-grid|category-grid-item|product-category)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
console.log('Category cards count:', cardMatches.length);

const items = [];
const catItemRegex = /<li[^>]*class=["'][^"']*product-category[^"']*["'][^>]*>([\s\S]*?)<\/li>/gi;
let m;
while ((m = catItemRegex.exec(html)) !== null) {
  const cHtml = m[1];
  const title = cHtml.match(/<h2[^>]*woocommerce-loop-category__title[^>]*>([\s\S]*?)<\/h2>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
  const img = cHtml.match(/<img[^>]*src=["']([^"']*)["']/i)?.[1];
  const link = cHtml.match(/<a[^>]*href=["']([^"']*)["']/i)?.[1];
  const count = cHtml.match(/<mark[^>]*class=["']count["'][^>]*>([\s\S]*?)<\/mark>/i)?.[1]?.trim();
  items.push({ title, count, img, link });
}

console.log('WooCommerce Category Items:', items.length);
console.log(items.slice(0, 10));

// Also let's check custom cakes page: https://cakebites.pk/customized-cakes/
