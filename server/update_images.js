import pool from './db.js';

const imageMap = [
  // COMBOS
  { name: 'Mango Bliss Combo', image: 'https://cakebites.pk/wp-content/uploads/2026/06/52f483d9-e0f2-4ff0-94bf-5605834a7af7.webp' },
  { name: 'Golden Nutella Combo', image: 'https://cakebites.pk/wp-content/uploads/2026/06/772ef285-63ca-4c30-af19-cb06ae70a7df.webp' },
  { name: 'Milky Bloom Combo', image: 'https://cakebites.pk/wp-content/uploads/2026/06/5f50f861-dff1-4c0c-a4f9-d1cc4a000848.webp' },

  // BEST SELLING
  { name: 'Double Fudge Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1701430460-Double20cake.jpeg' },
  { name: 'Lotus Three Milk Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1731001864-lotus.jpeg' },
  { name: 'Nutella Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886869-Nutella20cake.jpeg' },
  { name: 'Three Milk Mango Cake', image: 'https://cakebites.pk/wp-content/uploads/2026/05/Three-Milk-Mango-Cake-by-Cakebites.pk_.jpg' },
  { name: 'Dream Lava Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545934-Dream-Lava-2_64_11zon.webp' },
  { name: 'Ferrero Rocher Chocolate Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426928-ferror20cske_11zon.png' },

  // CAKES
  { name: 'German Fudge Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751546396-Chocolate-Fudge-Cake_82_11zon.webp' },
  { name: 'Red Velvet Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545285-Red-velvet-2_44_11zon.jpeg' },
  { name: 'Belgian Malt Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699887294-Belgian20cake.jpeg' },
  { name: 'Chocolate Mousse Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699887245-Chocolate20cake.jpeg' },
  { name: 'Milky Malt Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1699886990-Milky20cake.jpeg' },
  { name: 'Coffee Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751548137-Coffee204_48_11zon.png' },
  { name: 'Black Forest Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751544975-Black20Forest.png' },
  { name: 'Pineapple Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1701430557-Pineapple20cake.jpeg' },

  // CUPCAKES
  { name: 'Ferrero Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045065-Ferrero20cup20cake.jpeg' },
  { name: 'Belgian Chocolate Cup Cakes', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426823-Belgian20Cupcake.png' },
  { name: 'M&M Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426868-M20M_33_11zon.png' },
  { name: 'Swiss Dark Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045011-Swiss20Dark20cup20cake.jpeg' },
  { name: 'Milky Chocolate Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700044955-Milky20chocolate20cup20cake.jpeg' },
  { name: 'Nutella Chocolate Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700044898-Nutella20cup20cake.jpeg' },
  { name: 'Red Velvet Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700044816-Red20velvet20cup20cake.jpeg' },
  { name: 'Salted Caramel Cup Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545388-Salted20Caramel_8_11zon.png' },

  // BROWNIES
  { name: 'Nutella Brownie', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045236-Nutella20brownie.jpeg' },
  { name: 'Cadbury Brownie', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045289-Cadbury20brownie.jpeg' },
  { name: 'Mars Chocolate Brownie', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045182-Mars20brownie.jpeg' },
  { name: 'Belgian Malt Brownie', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045124-Belgian20brownie.jpeg' },

  // SUNDAES
  { name: 'Three Milk Sundae', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545638-Three-Milk-Sundae-1_10_11zon.webp' },
  { name: 'Nutella Sundae', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545511-Nutella-Sundae-1_97_11zon.webp' },
  { name: 'Galaxy Sundae', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545458-Galaxy-Sundae-1_85_11zon.webp' },
  { name: 'Red Velvet Sundae', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1751545339-Red-Velvet-Sundae-1_45_11zon.webp' },

  // BENTO CAKES
  { name: 'Vintage Aesthetic Bento Cake', image: 'https://cakebites.pk/wp-content/uploads/2026/02/Untitled-1_0028_DSC08154.jpg' },
  { name: 'Pastel Ribbon Bento Cake', image: 'https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0023_DSC08195-copy.jpg' },
  { name: 'Korean Floral Bento Cake', image: 'https://cakebites.pk/wp-content/uploads/2026/05/Bento-cake-banner-for-cakbites.png' },
  { name: 'Minimalist Birthday Bento Cake', image: 'https://cakebites.pk/wp-content/uploads/2026/02/Untitled-1_0028_DSC08154.jpg' },

  // CUSTOMIZED CAKES
  { name: 'Custom Cup Cake Box (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1700045065-Ferrero20cup20cake.jpeg' },
  { name: 'Artisanal Cream Cakes (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2026/05/customized-cake-in-cakebites-banner.png' },
  { name: 'Royal Chocolate Cakes (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2025/12/1713426928-ferror20cske_11zon.png' },
  { name: 'Grand Doll Cake (Medium)', image: 'https://cakebites.pk/wp-content/uploads/2026/05/customized-cake-in-cakebites-banner.png' },
];

async function updateImages() {
  console.log('🔄 Updating cakebite react database products with real images from cakebites.pk...');
  let updatedCount = 0;
  for (const item of imageMap) {
    const [result] = await pool.query(
      'UPDATE products SET image_url = ? WHERE name = ?',
      [item.image, item.name]
    );
    if (result.affectedRows > 0) {
      updatedCount += result.affectedRows;
      console.log(`✓ Updated: ${item.name}`);
    }
  }
  console.log(`🎉 Done! ${updatedCount} products updated with high-res real cakebites.pk images.`);
  process.exit(0);
}

updateImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
