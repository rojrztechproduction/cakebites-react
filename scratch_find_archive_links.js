async function test() {
  const res = await fetch('https://cakebites.pk/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  
  const regex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const links = [];
  while ((m = regex.exec(html)) !== null) {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (href.includes('product-category') || href.includes('custom') || href.includes('shop') || href.includes('archive') || href.includes('menu')) {
      links.push({ href, text });
    }
  }
  console.log('Total found:', links.length);
  const unique = [];
  const seen = new Set();
  for (const l of links) {
    const key = l.href + '|||' + l.text;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(l);
    }
  }
  console.log(JSON.stringify(unique, null, 2));
}
test();
