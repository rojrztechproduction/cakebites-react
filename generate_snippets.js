import fs from 'fs';

const scraped = JSON.parse(fs.readFileSync('server/scraped_products.json', 'utf8'));

// 1. Customized Cakes
const customProducts = [
  ['Custom Celebration Box (6 Pcs)', 4800, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png', 'Bestseller'],
  ['Rosy Blush Elegance Cake', 4800, null, scraped['Rosy Blush Elegancecnjvmkbl;\x27l]'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet5.jpeg', 'Popular'],
  ['Scarlet Butterfly Classic Cake', 4800, null, scraped['Scarlet Butterfly Classic'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet6.jpeg', 'Popular'],
  ['Royal Burgundy Bloom Cake', 5200, null, scraped['Royal Burgundy Bloom'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet7.jpeg', 'Trending'],
  ['Vintage Storybook Bouquet Cake', 5200, null, scraped['Vintage Storybook Bouquet'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet4.jpeg'],
  ['Midnight Onyx Roses Cake', 5500, null, scraped['Midnight Onyx Roses'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet2.jpeg', 'Luxury'],
  ['Crimson Prestige Cake', 4900, null, scraped['Crimson Prestige'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet3.jpeg'],
  ['Pink Petal Harmony Cake', 4800, null, scraped['Pink Petal Harmony'] || 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet1.jpeg'],
  ['Pink Rose Perfection (Medium)', 4600, null, scraped['Pink Rose Perfection (Medium)'] || 'https://cakebites.pk/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-30-at-1.05.30-PM-6.jpeg'],
  ['Mom’s Sweet Surprise Cake', 4500, null, scraped['Mom’s Sweet Surprise'] || 'https://cakebites.pk/wp-content/uploads/2026/04/sentiments-deal-3.png', 'Special'],
  ['Mother’s Day Magic Box', 4900, null, scraped['Mother’s Day Magic Box'] || 'https://cakebites.pk/wp-content/uploads/2026/04/sentiments-Deal-4.png'],
  ['Sweet Moments with Mom', 4500, null, scraped['Sweet Moments with Mom'] || 'https://cakebites.pk/wp-content/uploads/2026/04/sentiments-deal-2.png'],
  ['Bloom & Bliss for Ammi', 4800, null, scraped['Bloom &amp; Bliss for Ammi'] || 'https://cakebites.pk/wp-content/uploads/2026/04/sentiments-deal-1-1.png'],
  ['Colourful Music Cake (Medium)', 5200, null, scraped['Colourful Music Cake (Medium)'] || 'https://cakebites.pk/wp-content/uploads/2026/04/IMG_2311-copy.webp'],
  ['Ivory Floral Touch Cake', 4800, null, scraped['Ivory Floral Touch'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980514-21.png'],
  ['Cherry Blossom Mini Cake', 4500, null, scraped['Cherry Blossom Mini'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980456-20.png'],
  ['Golden Drizzle Bloom Cake', 5400, null, scraped['Golden Drizzle Bloom'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980396-19.png'],
  ['Pink Velvet Note Cake', 4800, null, scraped['Pink Velvet Note'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980339-18.png'],
  ['Vintage Ruffle Bloom Cake', 5200, null, scraped['Vintage Ruffle Bloom'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980288-17.png'],
  ['Rose Quartz Delight Cake', 5000, null, scraped['Rose Quartz Delight'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980247-16.png'],
  ['Macaron Blush Cake', 5500, null, scraped['Macaron Blush Cake'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980192-15.png', 'Chef Pick'],
  ['Maas Love Special Cake', 4800, null, scraped['Maas Love Special'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980146-14.png'],
  ['Blush Confetti Mini Cake', 4500, null, scraped['Blush Confetti Mini'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980093-13.png'],
  ['Heartful Surprise Cake', 4800, null, scraped['Heartful Surprise'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745980042-12.png'],
  ['Daisy Pink Topper Cake', 4600, null, scraped['Daisy Pink Topper'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978852-11.png'],
  ['Rosy Cream Dream Cake', 4800, null, scraped['Rosy Cream Dream'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978805-10.png'],
  ['Floral Glow Mini Cake', 4500, null, scraped['Floral Glow Mini'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978717-08.png'],
  ['Peachy Hearts Cake', 4500, null, scraped['Peachy Hearts'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978649-07.png'],
  ['Golden Bloom Bite Cake', 4800, null, scraped['Golden Bloom Bite'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978564-06.png'],
  ['Sweet Bloom Hearts Cake', 4800, null, scraped['Sweet Bloom Hearts'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978514-05.png'],
  ['Love Dots Delight Cake', 4600, null, scraped['Love Dots Delight'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978457-04.png'],
  ['Graceful Garden Cake', 5200, null, scraped['Graceful Garden'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978408-03.png'],
  ['Strawberry Bloom Cake', 4800, null, scraped['Strawberry Bloom'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978315-02.png'],
  ['Petal Blush Cake', 4800, null, scraped['Petal Blush Cake'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1745978251-01.png'],
  ['Floral Elegance Cupcake Box', 4800, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723858416-IMG-00265-1.png'],
  ['Deluxe Birthday Ensemble Box', 5200, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png'],
  ['Princess Theme Cupcake Box', 5200, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1722989798-140020pound20Mi20320pounds.png'],
  ['Artisanal Fondant Cupcake Box', 5600, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723858416-IMG-00265-1.png'],
  ['Grand Assorted Party Box', 6400, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png', 'Luxury']
];

// 2. Brownies
const brownieProducts = [
  ['Nutella Brownie', 199, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1730999508-Capture20NUT.webp', 'Bestseller'],
  ['Cadbury Brownie', 199, null, 'https://cakebites.pk/wp-content/uploads/2025/12/cadbury.png', 'Popular'],
  ['Mars Chocolate Brownie', 199, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1700045197-Mars20Brownie.webp'],
  ['Belgian Malt Brownie', 199, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1700045100-Belgian20Brownie.webp'],
  ['Milky Chocolate Brownie', 220, null, scraped['Milky Chocolate Brownie'] || 'https://cakebites.pk/wp-content/uploads/2026/06/img_0876.jpeg'],
  ['Lite Coffee Brownie', 220, null, scraped['Lite Coffee Brownie'] || 'https://cakebites.pk/wp-content/uploads/2025/12/cropped-1696856021-logo.jpeg'],
  ['Oreo Twister Brownie', 220, null, scraped['Oreo Twister Brownie'] || 'https://cakebites.pk/wp-content/uploads/2025/12/cropped-1696856021-logo.jpeg'],
  ['Black Forest Brownie', 220, null, scraped['Black Forest Brownie'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1696856021-logo.jpeg']
];

// 3. Sundaes
const sundaeProducts = [
  ['Three Milk Sundae', 399, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1700045505-Three20sundae.webp', 'Popular'],
  ['Nutella Sundae', 399, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1700045238-Nutella20sundae.webp', 'Trending'],
  ['Galaxy Sundae', 399, null, 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0001_DSC08299.jpg'],
  ['Red Velvet Sundae', 399, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1713426852-red20Sundae.webp'],
  ['Lotus Three Milk Sundae', 450, null, scraped['Lotus Three Milk Sundae'] || 'https://cakebites.pk/wp-content/uploads/2026/06/img_0876-1.jpeg', 'New']
];

console.log('Custom cakes:', customProducts.length);
console.log('Brownies:', brownieProducts.length);
console.log('Sundaes:', sundaeProducts.length);
