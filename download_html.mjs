import fs from 'fs';

async function downloadHTML() {
  const res = await fetch('https://cakebites.pk/menu/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  fs.writeFileSync('menu_raw.html', html);
  console.log('Saved to menu_raw.html');
}

downloadHTML();
