import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkJson(filename) {
  const p = path.resolve(__dirname, '..', filename);
  if (fs.existsSync(p)) {
    try {
      const d = JSON.parse(fs.readFileSync(p, 'utf8'));
      console.log(filename, 'count:', Array.isArray(d) ? d.length : Object.keys(d).length);
      return d;
    } catch (e) {
      console.log(filename, 'error:', e.message);
    }
  } else {
    console.log(filename, 'does not exist');
  }
  return null;
}

checkJson('scratch_shop_summary.json');
checkJson('scratch_custom_cakes.json');
checkJson('scratch_custom_cats.json');

const currCustom = checkJson('cakebites-react/src/customCakesData.json') || JSON.parse(fs.readFileSync(path.resolve(__dirname, 'src/customCakesData.json'), 'utf8'));
console.log('src/customCakesData.json count:', currCustom.length);

// Let's check how many in customCakesData.json have images
let noImgCount = 0;
let brokenImgCount = 0;
for (const item of currCustom) {
  if (!item.img || !item.img.startsWith('http')) {
    noImgCount++;
  }
}
console.log('customCakesData.json items without http img:', noImgCount);

// Let's inspect scratch_cakes.html
const cakesHtmlP = path.resolve(__dirname, '..', 'scratch_cakes.html');
if (fs.existsSync(cakesHtmlP)) {
  const content = fs.readFileSync(cakesHtmlP, 'utf8');
  console.log('scratch_cakes.html size:', content.length);
}
