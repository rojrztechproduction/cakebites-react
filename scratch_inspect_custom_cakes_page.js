async function inspectCustomCakes() {
  const url = 'https://cakebites.pk/customized-cakes/';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  console.log('Status:', res.status, 'Final URL:', res.url);
  console.log('Length:', html.length);
  
  // Extract title and h1/h2
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const h1 = [...html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)].map(m => m[1].trim());
  const h2 = [...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)].map(m => m[1].trim());
  console.log('Title:', title);
  console.log('H1s:', h1);
  console.log('H2s:', h2.slice(0, 10));

  // Check if it's WooCommerce archive or custom Elementor page
  const hasProducts = html.includes('woocommerce') || html.includes('product');
  console.log('Has products/woocommerce:', hasProducts);
  
  // Check links on this page
  const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const cats = [];
  while ((m = regex.exec(html)) !== null) {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (href.includes('product-category') || href.includes('custom')) {
      cats.push({ href, text });
    }
  }
  console.log('Cats on customized-cakes page:', cats.slice(0, 20));
}
inspectCustomCakes();
