import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fetchPage(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`Failed to fetch ${url}, status:`, res.statusCode);
        return resolve(null);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', (e) => {
      console.log(`Error fetching ${url}:`, e.message);
      resolve(null);
    });
    req.on('timeout', () => {
      req.destroy();
      console.log(`Timeout fetching ${url}`);
      resolve(null);
    });
  });
}

async function scrapeAllCustomCakes() {
  console.log('Fetching live cakebites.pk customized-cakes pages...');
  const allProducts = [];
  const seenTitles = new Set();
  
  for (let page = 1; page <= 17; page++) {
    const url = page === 1 
      ? 'https://cakebites.pk/product-category/customized-cakes/'
      : `https://cakebites.pk/product-category/customized-cakes/page/${page}/`;
    
    console.log(`Fetching page ${page}...`);
    const html = await fetchPage(url);
    if (!html) {
      console.log(`Page ${page} returned no HTML. Stopping.`);
      break;
    }
    
    // Check if "No products were found"
    if (html.includes('woocommerce-info') && html.includes('No products were found')) {
      console.log(`No more products found on page ${page}.`);
      break;
    }
    
    const chunks = html.split(/<li\s+class="[^"]*product\s/i);
    console.log(`Page ${page} product chunks:`, chunks.length - 1);
    
    if (chunks.length <= 1) {
      console.log(`No product chunks on page ${page}.`);
      break;
    }
    
    for (let i = 1; i < chunks.length; i++) {
      const block = chunks[i];
      
      // Title
      const titleMatch = block.match(/<h[234][^>]*class="[^"]*(?:woocommerce-loop-product__title|product__title)[^"]*"[^>]*>([^<]+)<\/h[234]>/i) ||
                         block.match(/<a[^>]*class="[^"]*woocommerce-LoopProduct-link[^"]*"[^>]*>([^<]+)<\/a>/i) ||
                         block.match(/<h[234][^>]*>([^<]+)<\/h[234]>/i);
      const title = titleMatch ? titleMatch[1].trim().replace(/&amp;/g, '&').replace(/&#8211;/g, '-').replace(/&#8217;/g, "'") : '';
      
      // Image - check data-lazy-src, data-src, src, srcset
      let img = '';
      const imgMatch = block.match(/<img[^>]+(?:data-lazy-src|data-src|src)="([^"]+)"/i);
      if (imgMatch) {
        img = imgMatch[1];
      }
      
      // Category
      let cat = 'Customized Cakes';
      const catMatch = block.match(/class="[^"]*product-cat-([^"\s]+)/i);
      if (catMatch) {
        cat = catMatch[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      }
      
      // Price
      let price = 4500;
      const priceMatch = block.match(/woocommerce-Price-amount[^>]*>[\s\S]*?<bdi>[\s\S]*?(\d[\d,.]*)/i) ||
                         block.match(/class="price"[^>]*>[\s\S]*?(\d[\d,.]*)/i);
      if (priceMatch) {
        price = parseInt(priceMatch[1].replace(/,/g, ''), 10) || 4500;
      }
      
      if (title && !seenTitles.has(title.toLowerCase())) {
        seenTitles.add(title.toLowerCase());
        allProducts.push({
          id: `custom-cake-${allProducts.length + 1}`,
          title: title,
          cat: cat,
          price: price,
          img: img
        });
      }
    }
  }
  
  console.log(`\n========================================`);
  console.log(`TOTAL SCRAPED UNIQUE PRODUCTS: ${allProducts.length}`);
  console.log(`Products with images: ${allProducts.filter(p => p.img && p.img.length > 5).length}`);
  console.log(`========================================\n`);
  
  if (allProducts.length > 0) {
    fs.writeFileSync(path.resolve(__dirname, 'src/customCakesData.json'), JSON.stringify(allProducts, null, 2), 'utf8');
    console.log(`Saved ${allProducts.length} products to src/customCakesData.json!`);
  }
}

scrapeAllCustomCakes();
