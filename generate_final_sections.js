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
  ['Grand Assorted Party Box', 6400, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png', 'Luxury'],
  ['85 Flowers Handmade Ribbon Bouquet Stand', 6500, null, scraped['85 Flowers Handmade Satin Ribbon Bouqet With Stand'] || 'https://cakebites.pk/wp-content/uploads/2026/04/85-flowers.png', 'Bouquet'],
  ['26 Flowers Handmade Ribbon Bouquet Stand', 4500, null, scraped['26 Flowers Handmade Satin Ribbon Bouqet With Stand'] || 'https://cakebites.pk/wp-content/uploads/2026/04/26-flowers-with-stand.png', 'Bouquet'],
  ['26 Flowers Handmade Ribbon Bouquet', 3500, null, scraped['26 Flowers Handmade Satin Ribbon Bouqet'] || 'https://cakebites.pk/wp-content/uploads/2026/04/26-flowers.png', 'Bouquet']
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

// 4. Bento Cakes
const bentoProducts = [
  ['Bento Cake - Vintage Bloom', 2999, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1724107966-IMG-00309.png', 'Trending'],
  ['Bento Cake - Pastel Bow Ribbon', 2999, null, '/assets/products/bento-cake-2.png'],
  ['Bento Cake - Pink Rosette Pearl', 2999, null, '/assets/products/bento-cake-3.png'],
  ['Bento Cake - Buttercream Daisy', 2999, null, '/assets/products/bento-cake-4.png'],
  ['Bento Cake - Lavender Dream', 2999, null, '/assets/products/bento-cake-5.png'],
  ['Bento Cake - Romantic Red Heart', 2999, null, '/assets/products/bento-cake-6.png'],
  ['Bento Cake - Minimalist Chic', 2999, null, '/assets/products/bento-cake-7.png'],
  ['Bento Cake - Celebration Sparkle', 2999, null, '/assets/products/bento-cake-8.png'],
  ['Classic Bento Cake', 2800, null, 'https://cakebites.pk/wp-content/uploads/2025/12/1724107966-IMG-00309.png']
];

// 5. Cakes (including all signature + bestsellers)
const cakeProducts = [
  ['Double Fudge Cake', 1999, 2350, scraped['Double Fudge Cake'] || '/assets/products/double-fudge-cake.jpeg', 'Top Rated'],
  ['Lotus Three Milk Cake', 2099, 2500, scraped['Lotus Three Milk Cake'] || '/assets/products/lotus-three-milk-cake.jpeg', 'Trending'],
  ['Nutella Cake (Medium)', 2049, 2400, scraped['Nutella Cake (Medium)'] || '/assets/products/nutella-cake.jpeg', 'Popular'],
  ['Three Milk Mango Cake', 2199, 2600, scraped['Three Milk Mango Cake'] || '/assets/products/three-milk-mango-cake.jpg', 'Chef Pick'],
  ['Dream Lava Cake', 2349, 2800, scraped['Dream Lava Cake'] || '/assets/products/dream-lava-cake.webp', 'Hot Seller'],
  ['Ferrero Rocher Chocolate Cake', 3500, 4000, scraped['Ferrero Rocher Chocolate Cake'] || '/assets/products/ferrero-rocher-cake.png', 'Luxury'],
  ['German Fudge Cake (Medium)', 1799, null, '/assets/products/german-fudge-cake.webp'],
  ['Red Velvet Cake (Medium)', 2199, null, scraped['Red Velvet Cake (Medium)'] || '/assets/products/red-velvet-cake.jpeg'],
  ['Belgian Malt Cake (Medium)', 2099, null, scraped['Belgian Malt Cake (Medium)'] || '/assets/products/belgian-malt-cake.jpeg'],
  ['Chocolate Mousse Cake', 1699, null, scraped['Chocolate Mousse Cake'] || '/assets/products/chocolate-mousse-cake.jpeg'],
  ['Milky Malt Cake', 1799, 2150, scraped['Milky Malt Cake'] || '/assets/products/milky-malt-cake.jpeg', 'Special Price'],
  ['Coffee Cake', 1799, null, scraped['Coffee Cake'] || '/assets/products/coffee-cake.png'],
  ['Black Forest Cake', 1799, null, scraped['Black Forest Cake'] || '/assets/products/black-forest-cake.png'],
  ['Pineapple Cake', 1799, null, scraped['Pineapple Cake'] || '/assets/products/pineapple-cake.jpeg'],
  ['Three Milk Cake (Medium)', 1999, null, '/assets/products/three-milk-cake.webp'],
  ['Ferrerro Classic Cake (Medium)', 2299, null, '/assets/products/ferrero-classic-cake.jpg'],
  ['Chocolate Heaven Cake', 2199, null, scraped['Chocolate Heaven Cake'] || '/assets/products/chocolate-heaven-cake.png'],
  ['KitKat Chocolate Cake', 2299, null, scraped['KitKat Chocolate Cake'] || '/assets/products/kitkat-chocolate-cake.png'],
  ['Dairy Milk Cake', 2299, null, scraped['Dairy Milk Cake'] || '/assets/products/dairy-milk-cake.png'],
  ['Salted Caramel Cake', 2199, null, scraped['Salted Caramel Cake'] || '/assets/products/salted-caramel-cake.png'],
  ['Raffaello Cake', 2499, null, scraped['Raffaello Cake'] || '/assets/products/raffaello-cake.jpg'],
  ['Lotus Cheese Cake (Medium)', 2499, 2800, '/assets/products/lotus-cheesecake.png', 'Cheesecake'],
  ['New York Cheese Cake (Medium)', 2499, null, '/assets/products/new-york-cheesecake.webp'],
  ['Strawberry Cheese Cake (Medium)', 2599, null, scraped['Strawberry Cheese Cake (Medium)'] || '/assets/products/strawberry-cheesecake.jpeg'],
  ['Blueberry Cheese Cake (Medium)', 2599, null, '/assets/products/blueberry-cheesecake.png'],
  ['Chocolate Cakes (Medium)', 2200, null, scraped['Chocolate Cakes (Medium)'] || 'https://cakebites.pk/wp-content/uploads/2025/12/1722987676-180020pound20Min20pounds.png']
];

// 6. Cupcakes
const cupcakeProducts = [
  ['Ferrero Cup Cake', 249, null, scraped['Ferrero Cup Cake'] || '/assets/products/ferrero-cupcake.jpeg'],
  ['Belgian Chocolate Cup Cakes', 249, null, scraped['Belgian Chocolate Cup Cakes'] || '/assets/products/belgian-chocolate-cupcake.png'],
  ['M&M Cup Cake', 249, null, scraped['M&amp;M Cup Cake'] || '/assets/products/mm-cupcake.jpeg'],
  ['Swiss Dark Cup Cake', 249, null, scraped['Swiss Dark Cup Cake'] || '/assets/products/swiss-dark-cupcake.jpeg'],
  ['Milky Chocolate Cup Cake', 249, null, scraped['Milky Chocolate Cup Cake'] || '/assets/products/milky-chocolate-cupcake.jpeg'],
  ['Nutella Chocolate Cup Cake', 249, null, scraped['Nutella Chocolate Cup Cake'] || '/assets/products/nutella-chocolate-cupcake.jpg'],
  ['Red Velvet Cup Cake', 249, null, scraped['Red Velvet Cup Cake'] || '/assets/products/red-velvet-cupcake.jpg'],
  ['Salted Caramel Cup Cake', 249, null, scraped['Salted Caramel Cup Cake'] || '/assets/products/salted-caramel-cupcake.jpeg'],
  ['Oreo Twister Cup Cake', 249, null, scraped['Oreo Twister Cup Cake'] || '/assets/products/salted-caramel-cupcake.jpeg'],
  ['Lite Coffee Cup Cake', 249, null, scraped['Lite Coffee Cup Cake'] || '/assets/products/swiss-dark-cupcake.jpeg']
];

fs.writeFileSync('server/full_all_sections.json', JSON.stringify({
  cakes: cakeProducts,
  cupcakes: cupcakeProducts,
  brownies: brownieProducts,
  sundae: sundaeProducts,
  bento: bentoProducts,
  custom: customProducts
}, null, 2));

console.log('Successfully generated full sections:');
console.log('Cakes:', cakeProducts.length);
console.log('Cupcakes:', cupcakeProducts.length);
console.log('Brownies:', brownieProducts.length);
console.log('Sundae:', sundaeProducts.length);
console.log('Bento:', bentoProducts.length);
console.log('Custom:', customProducts.length);
console.log('Total Treats:', cakeProducts.length + cupcakeProducts.length + brownieProducts.length + sundaeProducts.length + bentoProducts.length + customProducts.length);
