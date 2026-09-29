const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  try {
    const urls = [
      'https://cakebites.pk/cakes/',
      'https://cakebites.pk/product-category/cakes/'
    ];
    for (const u of urls) {
      console.log('Fetching', u);
      const html = await fetchUrl(u);
      console.log('Length:', html.length);
      fs.writeFileSync('scratch_cakes_page.html', html);
      break;
    }
  } catch(e) {
    console.error('Error:', e.message);
  }
})();
