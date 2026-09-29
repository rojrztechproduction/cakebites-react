import { JSDOM } from 'jsdom';
import fs from 'fs';

const BASE_URL = 'https://cakebites.pk/menu';
const products = [];
let page = 1;
const maxPages = 22; 

async function fetchPage(pageNum) {
  const url = pageNum === 1 ? BASE_URL : `${BASE_URL}/page/${pageNum}/`;
  console.log(`Fetching ${url}...`);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) {
      if (res.status === 404) return false;
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // WooLentor uses .woolentor-product-item
    const productElements = document.querySelectorAll('.woolentor-product-item');
    if (productElements.length === 0) return false;
    
    productElements.forEach(el => {
      const titleEl = el.querySelector('.woolentor-product-title');
      const name = titleEl ? titleEl.textContent.trim() : 'Unknown';
      if (name === 'Unknown') return; // skip false positives
      
      const imgEl = el.querySelector('img');
      let image = imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('src')) : null;
      if (image && image.includes('?')) image = image.split('?')[0]; 
      
      let currentPrice = null;
      let originalPrice = null;
      
      const priceHtml = el.querySelector('.price');
      if (priceHtml) {
        const ins = priceHtml.querySelector('ins');
        const del = priceHtml.querySelector('del');
        if (ins && del) {
          originalPrice = del.textContent.replace(/[^\d]/g, '');
          currentPrice = ins.textContent.replace(/[^\d]/g, '');
        } else {
          currentPrice = priceHtml.textContent.replace(/[^\d]/g, '');
        }
      }
      
      // We don't have easy category data inside the loop usually. But let's check classes.
      let category = 'Uncategorized';
      const classes = el.className || '';
      const catMatch = classes.match(/product_cat-([^\s]+)/);
      if (catMatch) {
        category = catMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
      
      // Deduplicate on name since Elementor might render same product multiple times in page grids
      if (!products.find(p => p.name === name)) {
        products.push({
          name,
          currentPrice: currentPrice ? parseInt(currentPrice, 10) : null,
          originalPrice: originalPrice ? parseInt(originalPrice, 10) : null,
          image,
          category
        });
      }
    });
    
    return true;
  } catch (err) {
    console.error(`Error on page ${pageNum}:`, err.message);
    return false;
  }
}

async function scrapeAll() {
  while (page <= maxPages) {
    const hasMore = await fetchPage(page);
    if (!hasMore) {
      console.log(`Stopped at page ${page} - no more products found.`);
      break;
    }
    page++;
  }
  
  console.log(`Finished scraping. Total products: ${products.length}`);
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
  console.log('Saved to products.json');
}

scrapeAll();
