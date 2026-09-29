import fs from 'fs';

async function fetchUrl(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      redirect: 'follow'
    });
    const data = await res.text();
    return { status: res.status, url: res.url, data };
  } catch (e) {
    return { status: 500, error: e.message };
  }
}

async function run() {
  const home = await fetchUrl('https://cakebites.pk/');
  const html = home.data || '';
  
  // Extract all hrefs
  const matches = [...html.matchAll(/href=["']([^"'#]+)["']/g)].map(m => m[1]);
  const cakebitesLinks = [...new Set(matches.filter(l => l.includes('cakebites.pk')))];
  console.log('--- FOUND LINKS ON HOME ---');
  cakebitesLinks.sort().forEach(l => console.log(l));

  // Check common archive URLs
  const candidateUrls = [
    'https://cakebites.pk/archive/',
    'https://cakebites.pk/archived/',
    'https://cakebites.pk/archives/',
    'https://cakebites.pk/shop/',
    'https://cakebites.pk/menu/',
    'https://cakebites.pk/cakes/',
    'https://cakebites.pk/custom-cakes/',
    'https://cakebites.pk/all-products/',
    'https://cakebites.pk/product-category/cakes/',
    'https://cakebites.pk/product-category/bento-cakes/',
    'https://cakebites.pk/product-category/cupcakes/',
    'https://cakebites.pk/product-category/all/'
  ];

  console.log('\n--- TESTING CANDIDATE URLS ---');
  for (const url of candidateUrls) {
    const res = await fetchUrl(url);
    console.log(`${url} -> Status: ${res.status}, Final URL: ${res.url}, Length: ${res.data?.length || 0}`);
  }
}

run();
