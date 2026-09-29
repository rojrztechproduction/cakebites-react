import pool from './server/db.js';
import fs from 'fs';

async function sync() {
  console.log('Starting MySQL database sync for `cakebite react`...');

  // 1. Fetch categories mapping
  const [categories] = await pool.query('SELECT * FROM categories');
  const catMap = {};
  categories.forEach(c => {
    catMap[c.slug] = c.id;
  });
  console.log('Category map:', catMap);

  // 2. Load products
  const sectionsData = JSON.parse(fs.readFileSync('server/full_all_sections.json', 'utf8'));
  const bentos = JSON.parse(fs.readFileSync('server/bento_20_products.json', 'utf8'));

  // Replace bentos with the 20 authentic ones
  sectionsData.bento = bentos;

  // Add combos and best
  sectionsData.combos = [
    ['Mango Bliss Combo', 6499, 8000, 'https://cakebites.pk/wp-content/uploads/2026/06/52f483d9-e0f2-4ff0-94bf-5605834a7af7.webp', 'Hot Deal'],
    ['Golden Nutella Combo', 8999, 9999, 'https://cakebites.pk/wp-content/uploads/2026/06/772ef285-63ca-4c30-af19-cb06ae70a7df.webp', 'Bestseller'],
    ['Milky Bloom Combo', 7999, 9999, 'https://cakebites.pk/wp-content/uploads/2026/06/5f50f861-dff1-4c0c-a4f9-d1cc4a000848.webp', 'Special Offer']
  ];

  sectionsData.best = [
    ['Double Fudge Cake', 1999, 2350, 'https://cakebites.pk/wp-content/uploads/2025/12/1701430460-Double20cake.jpeg', 'Top Rated'],
    ['Lotus Three Milk Cake', 2099, 2500, 'https://cakebites.pk/wp-content/uploads/2025/12/1731001864-lotus.jpeg', 'Trending'],
    ['Nutella Cake (Medium)', 2049, 2400, 'https://cakebites.pk/wp-content/uploads/2025/12/1699886869-Nutella20cake.jpeg', 'Popular'],
    ['Three Milk Mango Cake', 2199, 2600, 'https://cakebites.pk/wp-content/uploads/2026/05/Three-Milk-Mango-Cake-by-Cakebites.pk_.jpg', 'Chef Pick'],
    ['Dream Lava Cake', 2349, 2800, 'https://cakebites.pk/wp-content/uploads/2025/12/1751545934-Dream-Lava-2_64_11zon.webp', 'Hot Seller'],
    ['Ferrero Rocher Chocolate Cake', 3500, 4000, 'https://cakebites.pk/wp-content/uploads/2025/12/1713426928-ferror20cske_11zon.png', 'Luxury'],
    ['Lotus Cheese Cake (Medium)', 2499, 2800, 'https://cakebites.pk/wp-content/uploads/2025/12/1731001864-lotus.jpeg', 'Cheesecake']
  ];

  // 3. Clear old products or update them cleanly
  await pool.query('DELETE FROM products');
  console.log('Cleared existing products table.');

  // 4. Insert all products
  let totalInserted = 0;

  for (const [slug, items] of Object.entries(sectionsData)) {
    const catId = catMap[slug];
    if (!catId) {
      console.warn(`Category slug "${slug}" not found in DB!`);
      continue;
    }

    let sortOrder = 1;
    for (const item of items) {
      const [name, price, oldPrice, img, badge] = item;
      await pool.query(
        `INSERT INTO products (category_id, name, price, original_price, image_url, badge, is_active, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
        [catId, name, price, oldPrice || null, img || null, badge || null, sortOrder++]
      );
      totalInserted++;
    }
    console.log(`Inserted ${items.length} products into category "${slug}" (id: ${catId})`);
  }

  console.log(`\nSUCCESS! Total ${totalInserted} authentic products synced into MySQL database!`);

  // Verify counts
  const [newCounts] = await pool.query(`
    SELECT c.name, c.slug, count(p.id) as cnt 
    FROM categories c 
    LEFT JOIN products p ON c.id = p.category_id 
    GROUP BY c.id, c.name, c.slug 
    ORDER BY c.sort_order ASC
  `);
  console.table(newCounts);

  process.exit(0);
}

sync().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
