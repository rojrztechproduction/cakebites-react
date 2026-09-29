import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = fs.readFileSync(path.resolve(__dirname, '..', 'scratch_custom_cakes_arch.html'), 'utf8');

// Match each woolentor product card or product item
const cardRegex = /<div[^>]*class="[^"]*woolentor-(?:product-card|grid-card)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;

// Alternatively split by data-product-id
const chunks = html.split(/data-product-id="(\d+)"/i);
console.log('Total data-product-id chunks:', chunks.length);

const products = [];
const seenIds = new Set();
const seenLinks = new Set();

for (let i = 1; i < chunks.length; i += 2) {
  const prodId = chunks[i];
  const block = chunks[i + 1] || '';
  
  if (seenIds.has(prodId)) continue;
  seenIds.add(prodId);
  
  // Link & Title from <a>
  let link = '';
  let title = '';
  const linkMatch = block.match(/<a\s+href="(https:\/\/cakebites\.pk\/product\/[^"]+)"[^>]*title="([^"]*)"/i) ||
                    block.match(/<a\s+href="(https:\/\/cakebites\.pk\/product\/[^"]+)"/i);
  if (linkMatch) {
    link = linkMatch[1];
    title = linkMatch[2] || '';
  }
  
  if (!title) {
    const titleMatch = block.match(/<h[234][^>]*class="[^"]*(?:title|woolentor-product-title)[^"]*"[^>]*>([\s\S]*?)<\/h[234]>/i) ||
                       block.match(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/i);
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
    }
  }
  
  // If title still has garbage at end (like "cnjvmkbl;'l]") clean it up:
  if (title) {
    title = title
      .replace(/&amp;/g, '&')
      .replace(/&#8211;/g, '-')
      .replace(/&#8217;/g, "'")
      .replace(/&#039;/g, "'")
      .replace(/cnjvmkbl;[\s\S]*$/, '')
      .replace(/lkj[\s\S]*$/, '')
      .trim();
  }
  
  // If no title, derive from slug
  if (!title && link) {
    const slug = link.replace('https://cakebites.pk/product/', '').replace(/\/$/, '');
    title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  
  // Extract REAL Image (data-src, data-lazy-src, data-srcset, or high-res wp-content/uploads image)
  let img = '';
  const dataSrcMatch = block.match(/data-src="(https:\/\/cakebites\.pk\/wp-content\/uploads\/[^"]+)"/i) ||
                       block.match(/data-lazy-src="(https:\/\/cakebites\.pk\/wp-content\/uploads\/[^"]+)"/i) ||
                       block.match(/src="(https:\/\/cakebites\.pk\/wp-content\/uploads\/[^"]+)"/i);
  if (dataSrcMatch) {
    img = dataSrcMatch[1];
  } else {
    // Check data-srcset
    const srcsetMatch = block.match(/data-srcset="([^"]+)"/i);
    if (srcsetMatch) {
      const urls = srcsetMatch[1].split(',').map(s => s.trim().split(' ')[0]);
      if (urls.length > 0) img = urls[urls.length - 1]; // pick highest resolution
    }
  }
  
  // Extract Price
  let price = 4500;
  const priceMatches = [...block.matchAll(/woocommerce-Price-amount[^>]*>[\s\S]*?<bdi>[\s\S]*?(\d[\d,.]*)/gi)];
  if (priceMatches.length > 0) {
    const rawPrice = priceMatches[priceMatches.length - 1][1].replace(/,/g, '');
    price = parseInt(rawPrice, 10) || 4500;
  }
  
  // Extract Category
  let cat = 'Customized Cakes';
  const catMatch = block.match(/class="[^"]*product-cat-([^"\s]+)/i);
  if (catMatch) {
    cat = catMatch[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  
  if (title && (link || img)) {
    // Clean img url: remove query strings if any
    if (img) {
      img = img.split('?')[0];
    }
    
    products.push({
      id: `custom-cake-${prodId}`,
      productId: prodId,
      title: title,
      cat: cat,
      price: price,
      img: img || 'https://cakebites.pk/wp-content/uploads/2025/12/1723790295-Minimum10.png',
      link: link
    });
  }
}

console.log(`\n==============================================`);
console.log(`TOTAL PARSED CUSTOM CAKES: ${products.length}`);
console.log(`Products with real image: ${products.filter(p => p.img && p.img.includes('wp-content/uploads')).length}`);
console.log(`Sample product 1:`, products[0]);
console.log(`Sample product 50:`, products[50]);
console.log(`==============================================\n`);

// Save to customCakesData.json
fs.writeFileSync(
  path.resolve(__dirname, 'src/customCakesData.json'),
  JSON.stringify(products, null, 2),
  'utf8'
);
console.log(`Successfully saved all ${products.length} products to src/customCakesData.json!`);
