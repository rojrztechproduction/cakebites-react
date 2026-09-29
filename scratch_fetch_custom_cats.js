import fs from 'fs';

async function run() {
  // Fetch the customized-cakes archive
  const res = await fetch('https://cakebites.pk/product-category/customized-cakes/', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  fs.writeFileSync('scratch_custom_cakes_arch.html', html, 'utf8');
  console.log('Fetched, length:', html.length);

  // Find all ht-category-wrap items
  const cats = [];
  const cardRegex = /<div class="ht-category-wrap">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  let m;
  while ((m = cardRegex.exec(html)) !== null) {
    const block = m[1];
    const imgMatch = block.match(/data-src=["']([^"']+)["']/i) || block.match(/<img[^>]+src=["']([^"']+)["']/i);
    const linkMatch = block.match(/<a[^>]+href=["']([^"']+)["']/i);
    const nameMatch = block.match(/<h3[^>]*><a[^>]*>([^<]+)<\/a><\/h3>/i);
    if (nameMatch) {
      cats.push({
        name: nameMatch[1].trim(),
        link: linkMatch ? linkMatch[1] : null,
        img: imgMatch ? imgMatch[1] : null
      });
    }
  }
  fs.writeFileSync('scratch_custom_cats.json', JSON.stringify(cats, null, 2), 'utf8');
  console.log('Categories found:', cats.length);
  console.log(cats);
}

run();
