import fs from 'fs';

const scraped = JSON.parse(fs.readFileSync('server/scraped_products.json', 'utf8'));

// Filter by categories based on names
const customizedCakes = [
  ['Rosy Blush Elegance', 4800, null, scraped['Rosy Blush Elegancecnjvmkbl;\x27l]'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet5.jpeg', 'Bestseller'],
  ['Scarlet Butterfly Classic', 4800, null, scraped['Scarlet Butterfly Classic'], 'Popular'],
  ['Royal Burgundy Bloom', 5200, null, scraped['Royal Burgundy Bloom'], 'Trending'],
  ['Vintage Storybook Bouquet', 5200, null, scraped['Vintage Storybook Bouquet']],
  ['Midnight Onyx Roses', 5500, null, scraped['Midnight Onyx Roses'], 'Luxury'],
  ['Crimson Prestige', 4900, null, scraped['Crimson Prestige']],
  ['Pink Petal Harmony', 4800, null, scraped['Pink Petal Harmony']],
  ['Pink Rose Perfection (Medium)', 4600, null, scraped['Pink Rose Perfection (Medium)']],
  ['Mom’s Sweet Surprise', 4500, null, scraped['Mom’s Sweet Surprise'], 'Special'],
  ['Mother’s Day Magic Box', 4900, null, scraped['Mother’s Day Magic Box']],
  ['Sweet Moments with Mom', 4500, null, scraped['Sweet Moments with Mom']],
  ['Bloom & Bliss for Ammi', 4800, null, scraped['Bloom &amp; Bliss for Ammi']],
  ['Colourful Music Cake (Medium)', 5200, null, scraped['Colourful Music Cake (Medium)']],
  ['Ivory Floral Touch', 4800, null, scraped['Ivory Floral Touch']],
  ['Golden Drizzle Bloom', 5400, null, scraped['Golden Drizzle Bloom']],
  ['Pink Velvet Note', 4800, null, scraped['Pink Velvet Note']],
  ['Vintage Ruffle Bloom', 5200, null, scraped['Vintage Ruffle Bloom']],
  ['Rose Quartz Delight', 5000, null, scraped['Rose Quartz Delight']],
  ['Macaron Blush Cake', 5500, null, scraped['Macaron Blush Cake'], 'Chef Pick'],
  ['Daisy Pink Topper', 4600, null, scraped['Daisy Pink Topper']],
  ['Rosy Cream Dream', 4800, null, scraped['Rosy Cream Dream']],
  ['Floral Glow Mini', 4500, null, scraped['Floral Glow Mini']],
  ['Peachy Hearts', 4500, null, scraped['Peachy Hearts']],
  ['Golden Bloom Bite', 4600, null, scraped['Golden Bloom Bite']],
  ['Sweet Bloom Hearts', 4800, null, scraped['Sweet Bloom Hearts']],
  ['Love Dots Delight', 4800, null, scraped['Love Dots Delight']],
  ['Graceful Garden', 5200, null, scraped['Graceful Garden']],
  ['Strawberry Bloom', 4800, null, scraped['Strawberry Bloom']],
  ['Petal Blush Cake', 4800, null, scraped['Petal Blush Cake']],
  ['Artisanal Cream Cakes (Medium)', 7500, null, '/assets/products/custom-cupcake-box-2.png'],
  ['Royal Chocolate Cakes (Medium)', 7500, null, '/assets/products/custom-cupcake-box-3.png'],
  ['Grand Doll Cake (Medium)', 10500, null, '/assets/products/custom-cupcake-box-4.png', 'Signature'],
  ['Custom Celebration Box (6 Pcs)', 4800, null, '/assets/products/custom-cupcake-box-1.png'],
  ['Floral Elegance Cupcake Box', 4800, null, '/assets/products/custom-cupcake-box-2.png'],
  ['Deluxe Birthday Ensemble Box', 5200, null, '/assets/products/custom-cupcake-box-3.png'],
  ['Princess Theme Cupcake Box', 5200, null, '/assets/products/custom-cupcake-box-4.png'],
  ['Artisanal Fondant Cupcake Box', 5600, null, '/assets/products/custom-cupcake-box-5.png'],
  ['Minimalist Gold Flake Cupcakes', 4800, null, '/assets/products/custom-cupcake-box-6.png'],
  ['Choco Bliss Custom Cupcakes', 4800, null, '/assets/products/custom-cupcake-box-7.png'],
  ['Grand Assorted Party Box', 6400, null, '/assets/products/custom-cupcake-box-8.png', 'Party Box']
];

console.log('Customized cakes count:', customizedCakes.length);
fs.writeFileSync('scratch_custom_cakes.json', JSON.stringify(customizedCakes, null, 2));
