import fs from 'fs';

const scraped = JSON.parse(fs.readFileSync('server/scraped_products.json', 'utf8'));

// Build complete authentic products list
console.log('Building authentic product datasets...');

// 1. Customized Cakes from cakebites.pk
const customCakes = [
  ['Custom Celebration Box (6 Pcs)', 4800, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png', 'Bestseller'],
  ['Rosy Blush Elegance Cake', 4800, null, scraped['Rosy Blush Elegancecnjvmkbl;\x27l]'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet5.jpeg', 'Popular'],
  ['Scarlet Butterfly Classic Cake', 4800, null, scraped['Scarlet Butterfly Classic'], 'Popular'],
  ['Royal Burgundy Bloom Cake', 5200, null, scraped['Royal Burgundy Bloom'], 'Trending'],
  ['Vintage Storybook Bouquet Cake', 5200, null, scraped['Vintage Storybook Bouquet']],
  ['Midnight Onyx Roses Cake', 5500, null, scraped['Midnight Onyx Roses'], 'Luxury'],
  ['Crimson Prestige Cake', 4900, null, scraped['Crimson Prestige']],
  ['Pink Petal Harmony Cake', 4800, null, scraped['Pink Petal Harmony']],
  ['Pink Rose Perfection (Medium)', 4600, null, scraped['Pink Rose Perfection (Medium)']],
  ['Mom’s Sweet Surprise Cake', 4500, null, scraped['Mom’s Sweet Surprise'], 'Special'],
  ['Mother’s Day Magic Box', 4900, null, scraped['Mother’s Day Magic Box']],
  ['Sweet Moments with Mom', 4500, null, scraped['Sweet Moments with Mom']],
  ['Bloom & Bliss for Ammi', 4800, null, scraped['Bloom &amp; Bliss for Ammi']],
  ['Colourful Music Cake (Medium)', 5200, null, scraped['Colourful Music Cake (Medium)']],
  ['Ivory Floral Touch Cake', 4800, null, scraped['Ivory Floral Touch']],
  ['Cherry Blossom Mini Cake', 4500, null, scraped['Cherry Blossom Mini']],
  ['Golden Drizzle Bloom Cake', 5400, null, scraped['Golden Drizzle Bloom']],
  ['Pink Velvet Note Cake', 4800, null, scraped['Pink Velvet Note']],
  ['Vintage Ruffle Bloom Cake', 5200, null, scraped['Vintage Ruffle Bloom']],
  ['Rose Quartz Delight Cake', 5000, null, scraped['Rose Quartz Delight']],
  ['Macaron Blush Cake', 5500, null, scraped['Macaron Blush Cake'], 'Chef Pick'],
  ['Maas Love Special Cake', 4800, null, scraped['Maas Love Special']],
  ['Blush Confetti Mini Cake', 4500, null, scraped['Blush Confetti Mini']],
  ['Heartful Surprise Cake', 4800, null, scraped['Heartful Surprise']],
  ['Daisy Pink Topper Cake', 4600, null, scraped['Daisy Pink Topper']],
  ['Rosy Cream Dream Cake', 4800, null, scraped['Rosy Cream Dream']],
  ['Floral Glow Mini Cake', 4500, null, scraped['Floral Glow Mini']],
  ['Peachy Hearts Cake', 4500, null, scraped['Peachy Hearts']],
  ['Golden Bloom Bite Cake', 4800, null, scraped['Golden Bloom Bite']],
  ['Sweet Bloom Hearts Cake', 4800, null, scraped['Sweet Bloom Hearts']],
  ['Love Dots Delight Cake', 4600, null, scraped['Love Dots Delight']],
  ['Graceful Garden Cake', 5200, null, scraped['Graceful Garden']],
  ['Strawberry Bloom Cake', 4800, null, scraped['Strawberry Bloom']],
  ['Petal Blush Cake', 4800, null, scraped['Petal Blush Cake']],
  ['Floral Elegance Cupcake Box', 4800, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723858416-IMG-00265-1.png'],
  ['Deluxe Birthday Ensemble Box', 5200, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png'],
  ['Princess Theme Cupcake Box', 5200, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1722989798-140020pound20Mi20320pounds.png'],
  ['Artisanal Fondant Cupcake Box', 5600, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723858416-IMG-00265-1.png'],
  ['Grand Assorted Party Box', 6400, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png', 'Luxury']
];

console.log('Total Customized Cakes created:', customCakes.length);
fs.writeFileSync('server/full_custom_cakes.json', JSON.stringify(customCakes, null, 2));
