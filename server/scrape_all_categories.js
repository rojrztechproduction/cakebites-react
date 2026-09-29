import https from 'https';
import fs from 'fs';

const categories = [
  'combos',
  'cakes',
  'cup-cakes',
  'brownies',
  'sundae',
  'bento-cake',
  'customized-cakes'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const allProducts = {};
  for (const cat of categories) {
    try {
      const url = `https://cakebites.pk/product-category/${cat}/`;
      console.log(`Fetching ${url}...`);
      const html = await fetchUrl(url);
      
      const regex = /<a href="(https:\/\/cakebites\.pk\/product\/[^"]+)"[^>]*title="([^"]+)"[\s\S]*?<img[^>]+data-src="([^"]+)"/g;
      let m;
      let count = 0;
      while ((m = regex.exec(html)) !== null) {
        const title = m[2].trim();
        const img = m[3].trim();
        allProducts[title] = img;
        count++;
      }
      console.log(`  -> Found ${count} products in ${cat}`);
    } catch (e) {
      console.error(`Error in ${cat}:`, e.message);
    }
  }

  fs.writeFileSync('server/scraped_products.json', JSON.stringify(allProducts, null, 2));
  console.log('Finished! Total unique products:', Object.keys(allProducts).length);
}

run();
