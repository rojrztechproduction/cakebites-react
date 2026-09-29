import fs from 'fs';

async function fetchCategory() {
  const urls = [
    'https://cakebites.pk/product-category/cakes/',
    'https://cakebites.pk/shop/'
  ];
  for (const u of urls) {
    console.log('Fetching', u);
    try {
      const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      console.log('Status:', res.status, 'Final:', res.url, 'Length:', html.length);
      const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
      const bodyClass = html.match(/<body[^>]*class=["']([^"']*)["']/i)?.[1];
      console.log('Title:', title);
      console.log('Body class snippet:', bodyClass?.slice(0, 100));
      
      const isArchive = bodyClass?.includes('archive') || html.includes('archive-description') || html.includes('woocommerce-products-header');
      console.log('Is Archive?', isArchive);
      
      const prods = [...html.matchAll(/woocommerce-loop-product__title[^>]*>([\s\S]*?)<\/[^>]+>/gi)].map(m => m[1].trim());
      console.log('Products found:', prods.length, prods.slice(0, 5));
    } catch(e) {
      console.log('Error fetching', u, e.message);
    }
  }
}

fetchCategory();
