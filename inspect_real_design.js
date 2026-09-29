import fs from 'fs';

const shop = fs.readFileSync('scratch_shop.html', 'utf8');

// Check Razzi CSS variables
const vars = [...shop.matchAll(/--rz-[a-zA-Z0-9_-]+:\s*[^;]+;/g)].map(m => m[0]);
console.log('Razzi variables (sample):', vars.slice(0, 30));

// Check header and banner
const pageHeader = shop.match(/class=["'][^"']*(page-header|archive-header|shop-header|banner)[^"']*["']/gi);
console.log('Header matches:', pageHeader?.slice(0, 10));

// Check category grid layout in scratch_shop.html
const catWrap = shop.match(/class=["'][^"']*ht-category-wrap[^"']*["'][\s\S]*?<\/div>\s*<\/div>/i);
if (catWrap) {
  console.log('--- Real Category Box Markup ---');
  console.log(catWrap[0].slice(0, 800));
}

// Check real cakebites.pk category grid in scratch_shop.html
const wlRow = shop.match(/class=["'][^"']*wl-row\s+product-slider[^"']*["'][\s\S]*?<\/div>\s*<\/div>/i);
if (wlRow) {
  console.log('--- Real Category Slider HTML ---');
  console.log(wlRow[0].slice(0, 1500));
}
