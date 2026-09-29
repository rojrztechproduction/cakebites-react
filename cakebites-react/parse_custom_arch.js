import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Let's read scratch_custom_cakes_arch.html
const htmlPath = path.resolve(__dirname, '..', 'scratch_custom_cakes_arch.html');
if (!fs.existsSync(htmlPath)) {
  console.log('File not found:', htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Match products
const products = [];
const productBlocks = html.split(/<li\s+class="[^"]*product\s/i);

console.log('Total split chunks:', productBlocks.length);

for (let i = 1; i < productBlocks.length; i++) {
  const block = productBlocks[i];
  
  // Extract Title
  let title = '';
  const titleMatch = block.match(/<h[234][^>]*class="[^"]*(?:woocommerce-loop-product__title|product__title)[^"]*"[^>]*>([^<]+)<\/h[234]>/i) ||
                     block.match(/<a[^>]*class="[^"]*woocommerce-LoopProduct-link[^"]*"[^>]*>([^<]+)<\/a>/i) ||
                     block.match(/<h[234][^>]*>([^<]+)<\/h[234]>/i);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }
  
  // Extract Image
  let img = '';
  const imgMatches = [...block.matchAll(/<img[^>]+(?:data-src|data-lazy-src|src)="([^"]+)"/gi)];
  for (const im of imgMatches) {
    const src = im[1];
    if (src && !src.includes('placeholder') && !src.includes('logo') && (src.includes('wp-content/uploads') || src.includes('.png') || src.includes('.jpg') || src.includes('.webp') || src.includes('.jpeg'))) {
      img = src;
      break;
    }
  }
  
  // Extract Category
  let cat = 'Customized Cakes';
  const catMatch = block.match(/class="[^"]*product-cat-([^"\s]+)/i);
  if (catMatch) {
    cat = catMatch[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  
  // Extract Price
  let price = 4500;
  const priceMatch = block.match(/woocommerce-Price-amount[^>]*>[\s\S]*?<bdi>[\s\S]*?(\d[\d,.]*)/i) ||
                     block.match(/class="price"[^>]*>[\s\S]*?(\d[\d,.]*)/i);
  if (priceMatch) {
    price = parseInt(priceMatch[1].replace(/,/g, ''), 10) || 4500;
  }
  
  if (title) {
    products.push({
      id: `custom-cake-${i}`,
      title: title.replace(/&amp;/g, '&').replace(/&#8211;/g, '-').replace(/&#8217;/g, "'"),
      cat: cat,
      price: price,
      img: img
    });
  }
}

console.log('Parsed total products:', products.length);
console.log('First 3 products:', JSON.stringify(products.slice(0, 3), null, 2));

const withImg = products.filter(p => p.img && p.img.length > 5);
console.log('Products with valid images:', withImg.length);

// Also check scratch_cakes.html and scratch_shop.html
const shopHtmlPath = path.resolve(__dirname, '..', 'scratch_shop.html');
if (fs.existsSync(shopHtmlPath)) {
  console.log('scratch_shop.html exists, length:', fs.readFileSync(shopHtmlPath).length);
}
