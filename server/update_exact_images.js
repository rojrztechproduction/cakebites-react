import pool from './db.js';

const productsUpdate = [
  // CUPCAKES (The exact ones from the user's screenshot!)
  { name: 'Ferrero Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045065-Ferrero20cup20cake.jpeg' },
  { name: 'Belgian Chocolate Cup Cakes', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426823-Belgian20Cupcake.png' },
  { name: 'M&M Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699887645-MNM20cupcake.jpeg' },
  { name: 'Swiss Dark Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886589-Swiss20cup20cake.jpeg' },
  { name: 'Milky Chocolate Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886958-Milky20cup20cake.jpeg' },
  { name: 'Nutella Chocolate Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0010_DSC08035.jpg' },
  { name: 'Red Velvet Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0014_DSC08119.jpg' },
  { name: 'Salted Caramel Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886618-Salted20cup20cake.jpeg' },

  // BROWNIES
  { name: 'Nutella Brownie', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1730999508-Capture20NUT.webp' },
  { name: 'Cadbury Brownie', image: 'https://cakebites.pk/wp-content/uploads/2025/12/cadbury.png' },
  { name: 'Mars Chocolate Brownie', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045197-Mars20Brownie.webp' },
  { name: 'Belgian Malt Brownie', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045100-Belgian20Brownie.webp' },

  // SUNDAES
  { name: 'Three Milk Sundae', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045505-Three20sundae.webp' },
  { name: 'Nutella Sundae', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045238-Nutella20sundae.webp' },
  { name: 'Galaxy Sundae', image: 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0001_DSC08299.jpg' },
  { name: 'Red Velvet Sundae', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426852-red20Sundae.webp' },

  // BEST SELLING & CAKES
  { name: 'Double Fudge Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1701430460-Double20cake.jpeg' },
  { name: 'Lotus Three Milk Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1731001864-lotus.jpeg' },
  { name: 'Nutella Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886869-Nutella20cake.jpeg' },
  { name: 'Three Milk Mango Cake', image: 'https://cakebites.pk/wp-content/uploads/2026/05/Three-Milk-Mango-Cake-by-Cakebites.pk_.jpg' },
  { name: 'Dream Lava Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545934-Dream-Lava-2_64_11zon.webp' },
  { name: 'Ferrero Rocher Chocolate Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426928-ferror20cske_11zon.png' },
  { name: 'German Fudge Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751546396-Chocolate-Fudge-Cake_82_11zon.webp' },
  { name: 'Red Velvet Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545285-Red-velvet-2_44_11zon.jpeg' },
  { name: 'Belgian Malt Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699887294-Belgian20cake.jpeg' },
  { name: 'Chocolate Mousse Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699887245-Chocolate20cake.jpeg' },
  { name: 'Milky Malt Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886990-Milky20cake.jpeg' },
  { name: 'Coffee Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751548137-Coffee204_48_11zon.png' },
  { name: 'Black Forest Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751544975-Black20Forest.png' },
  { name: 'Pineapple Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1701430557-Pineapple20cake.jpeg' },

  // COMBOS
  { name: 'Mango Bliss Combo', image: 'https://cakebites.pk/wp-content/uploads/2026/06/52f483d9-e0f2-4ff0-94bf-5605834a7af7.webp' },
  { name: 'Golden Nutella Combo', image: 'https://cakebites.pk/wp-content/uploads/2026/06/772ef285-63ca-4c30-af19-cb06ae70a7df.webp' },
  { name: 'Milky Bloom Combo', image: 'https://cakebites.pk/wp-content/uploads/2026/06/5f50f861-dff1-4c0c-a4f9-d1cc4a000848.webp' },

  // BENTO CAKES
  { name: 'Vintage Aesthetic Bento Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1745980514-21.png' },
  { name: 'Pastel Ribbon Bento Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1745980456-20.png' },
  { name: 'Korean Floral Bento Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1745980288-17.png' },
  { name: 'Minimalist Birthday Bento Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1745980192-15.png' },

  // CUSTOMIZED CAKES
  { name: 'Custom Cup Cake Box (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045065-Ferrero20cup20cake.jpeg' },
  { name: 'Artisanal Cream Cakes (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-30-at-1.05.30-PM-6.jpeg' },
  { name: 'Royal Chocolate Cakes (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1722987676-180020pound20Min20pounds.png' },
  { name: 'Grand Doll Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2026/04/bouqet5.jpeg' },
];

async function updateAll() {
  console.log('🔄 Updating database products with exact WooCommerce URLs from cakebites.pk...');
  let count = 0;
  for (const item of productsUpdate) {
    const [res] = await pool.query('UPDATE products SET image_url = ? WHERE name = ?', [item.image, item.name]);
    if (res.affectedRows > 0) {
      count += res.affectedRows;
      console.log(`✓ ${item.name} -> ${item.image}`);
    }
  }
  console.log(`🎉 Finished! ${count} products updated in MySQL cakebite react database.`);
  process.exit(0);
}

updateAll().catch(e => { console.error(e); process.exit(1); });
