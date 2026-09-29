import fs from 'fs';

const data = JSON.parse(fs.readFileSync('server/full_all_sections.json', 'utf8'));

// Format items as code
function formatItems(items, indent = '      ') {
  return items.map(item => {
    const [name, price, oldPrice, img, badge] = item;
    const nameStr = JSON.stringify(name);
    const oldStr = oldPrice === null ? 'null' : oldPrice;
    const imgStr = JSON.stringify(img);
    const badgeStr = badge ? `, ${JSON.stringify(badge)}` : '';
    return `${indent}[${nameStr}, ${price}, ${oldStr}, ${imgStr}${badgeStr}],`;
  }).join('\n');
}

const customCode = formatItems(data.custom);
const cakesCode = formatItems(data.cakes);
const cupcakesCode = formatItems(data.cupcakes);
const browniesCode = formatItems(data.brownies);
const sundaeCode = formatItems(data.sundae);
const bentoCode = formatItems(data.bento);

const newSectionsContent = `const defaultSections = [
  {
    id: 'combos',
    title: "Combo's",
    banner: ASSET.combos,
    category: "Combo's",
    products: [
      ['Mango Bliss Combo', 6499, 8000, REAL_PRODUCT_IMAGES['Mango Bliss Combo'], 'Hot Deal'],
      ['Golden Nutella Combo', 8999, 9999, REAL_PRODUCT_IMAGES['Golden Nutella Combo'], 'Bestseller'],
      ['Milky Bloom Combo', 7999, 9999, REAL_PRODUCT_IMAGES['Milky Bloom Combo'], 'Special Offer'],
    ],
  },
  {
    id: 'best',
    title: 'Best Selling',
    banner: ASSET.best,
    category: 'Best Selling',
    products: [
      ['Double Fudge Cake', 1999, 2350, REAL_PRODUCT_IMAGES['Double Fudge Cake'], 'Top Rated'],
      ['Lotus Three Milk Cake', 2099, 2500, REAL_PRODUCT_IMAGES['Lotus Three Milk Cake'], 'Trending'],
      ['Nutella Cake (Medium)', 2049, 2400, REAL_PRODUCT_IMAGES['Nutella Cake (Medium)'], 'Popular'],
      ['Three Milk Mango Cake', 2199, 2600, REAL_PRODUCT_IMAGES['Three Milk Mango Cake'], 'Chef Pick'],
      ['Dream Lava Cake', 2349, 2800, REAL_PRODUCT_IMAGES['Dream Lava Cake'], 'Hot Seller'],
      ['Ferrero Rocher Chocolate Cake', 3500, 4000, REAL_PRODUCT_IMAGES['Ferrero Rocher Chocolate Cake'], 'Luxury'],
      ['Lotus Cheese Cake (Medium)', 2499, 2800, REAL_PRODUCT_IMAGES['Lotus Cheese Cake (Medium)'], 'Cheesecake'],
    ],
  },
  {
    id: 'cakes',
    title: 'Cakes',
    banner: ASSET.cakes,
    category: 'Cakes',
    products: [
${cakesCode}
    ],
  },
  {
    id: 'cupcakes',
    title: 'Cupcakes',
    banner: ASSET.cupcakes,
    category: 'Cupcakes',
    products: [
${cupcakesCode}
    ],
  },
  {
    id: 'brownies',
    title: 'Brownies',
    banner: ASSET.brownies,
    category: 'Brownies',
    products: [
${browniesCode}
    ],
  },
  {
    id: 'sundae',
    title: 'Sundae',
    banner: ASSET.sundae,
    category: 'Sundae',
    products: [
${sundaeCode}
    ],
  },
  {
    id: 'bento',
    title: 'Bento Cake',
    banner: ASSET.bento,
    category: 'Bento Cake',
    products: [
${bentoCode}
    ],
  },
  {
    id: 'custom',
    title: 'Customized Cakes',
    banner: ASSET.custom,
    category: 'Customized Cakes',
    products: [
${customCode}
    ],
  },
];`;

fs.writeFileSync('server/new_default_sections.js', newSectionsContent);
console.log('Successfully wrote server/new_default_sections.js. Length:', newSectionsContent.length);
