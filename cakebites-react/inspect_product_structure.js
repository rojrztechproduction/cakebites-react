import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = fs.readFileSync(path.resolve(__dirname, '..', 'scratch_custom_cakes_arch.html'), 'utf8');

// Find all product links or product items
// Usually in WooCommerce or Elementor or Razzi: <div class="product-inner"> or <div class="product"> or <div class="item">
const productInnerMatches = [...html.matchAll(/class="[^"]*(?:product-inner|product-card|product-item|woocommerce-loop-product__title)[^"]*"/gi)];
console.log('Matches for product class:', productInnerMatches.length);

// Let's search for all product titles
const titles = [...html.matchAll(/<h[234][^>]*class="[^"]*(?:woocommerce-loop-product__title|product__title)[^"]*"[^>]*>([\s\S]*?)<\/h[234]>/gi)].map(m => m[1].trim());
console.log('Total h2/h3 product titles:', titles.length);

// Let's search for all links to /product/
const productLinks = [...html.matchAll(/href="(https:\/\/cakebites\.pk\/product\/[^"]+)"/gi)].map(m => m[1]);
console.log('Total product links:', productLinks.length);
console.log('Unique product links:', new Set(productLinks).size);

// Let's inspect a chunk around a product link
if (productLinks.length > 0) {
  const sampleLink = productLinks[0];
  const idx = html.indexOf(sampleLink);
  console.log('Sample chunk around product link:\n', html.substring(Math.max(0, idx - 200), Math.min(html.length, idx + 600)));
}
