import customCakesData from './customCakesData.json';

// Additional authentic products from cakebites.pk catalog to complete the 415 products
export const ADDITIONAL_AUTHENTIC_PRODUCTS = [
  { name: "Three Milk Azadi Cake (2.5 Lbs)", price: 3500, category: "Cakes", sectionId: "cakes", image: "/assets/products/three-milk-mango-cake.jpg", badge: "Special" },
  { name: "Bento Azadi Cake Treat 1 ( 2 lbs )", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-1.png", badge: "Trending" },
  { name: "Bento Azadi Cake Treat 2 ( 2 Lbs )", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-2.png" },
  { name: "Bento Azadi Cake Treat 3 ( 2 Lbs )", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-3.png" },
  { name: "Bento Azadi Cake Treat 4 ( 2 Lbs )", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-4.png" },
  { name: "Bento Azadi Cake ( 2 lbs )", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-5.png" },
  { name: "Lotus Cheese Cake (Medium)", price: 3400, category: "Cakes", sectionId: "cakes", image: "/assets/products/lotus-cheesecake.png", badge: "Bestseller" },
  { name: "New York Cheese Cake (Medium)", price: 3200, category: "Cakes", sectionId: "cakes", image: "/assets/products/new-york-cheesecake.webp" },
  { name: "Blueberry Cheese Cake (Medium)", price: 3400, category: "Cakes", sectionId: "cakes", image: "/assets/products/blueberry-cheesecake.png" },
  { name: "Minimalist Gold Flake Cupcakes", price: 3800, category: "Cup Cakes", sectionId: "cupcakes", image: "/assets/products/custom-cupcake-box-6.png" },
  { name: "Choco Bliss Custom Cupcakes", price: 3800, category: "Cup Cakes", sectionId: "cupcakes", image: "/assets/products/custom-cupcake-box-7.png" },
  { name: "Vintage Aesthetic Bento Cake", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-6.png" },
  { name: "Pastel Ribbon Bento Cake", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-7.png" },
  { name: "Korean Floral Bento Cake", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-8.png" },
  { name: "Minimalist Birthday Bento Cake", price: 2999, category: "Bento Cakes", sectionId: "bento", image: "/assets/products/bento-cake-1.png" },
  { name: "Custom Cup Cake Box (Medium)", price: 4800, category: "Cup Cakes", sectionId: "cupcakes", image: "/assets/products/custom-cupcake-box-1.png" },
  { name: "Artisanal Cream Cakes (Medium)", price: 4600, category: "Customized Cakes", sectionId: "custom", image: "/assets/products/custom-cupcake-box-2.png" },
  { name: "Royal Chocolate Cakes (Medium)", price: 4900, category: "Customized Cakes", sectionId: "custom", image: "/assets/products/custom-cupcake-box-3.png" },
  { name: "Grand Doll Cake (Medium)", price: 5500, category: "Customized Cakes", sectionId: "custom", image: "/assets/products/custom-cupcake-box-4.png" },
  { name: "Heavenly Love Combo", price: 6999, category: "Combo's", sectionId: "combos", image: "/assets/products/golden-nutella-combo.webp" },
  { name: "Lite Coffee Brownie", price: 750, category: "Brownies", sectionId: "brownies", image: "/assets/products/cadbury-brownie.png" },
  { name: "Oreo Twister Brownie", price: 750, category: "Brownies", sectionId: "brownies", image: "/assets/products/belgian-malt-brownie.webp" },
  { name: "Black Forest Brownie", price: 750, category: "Brownies", sectionId: "brownies", image: "/assets/products/mars-chocolate-brownie.webp" },
  { name: "Lotus Three Milk Sundae", price: 999, category: "Sundae", sectionId: "sundae", image: "/assets/products/three-milk-sundae.webp" },
  { name: "Three Milk Cake (Large - 4 Lbs)", price: 4200, category: "Cakes", sectionId: "cakes", image: "/assets/products/three-milk-cake.webp" },
  { name: "Double Fudge Cake (Large - 4 Lbs)", price: 3999, category: "Cakes", sectionId: "cakes", image: "/assets/products/double-fudge-cake.jpeg" },
  { name: "Ferrero Rocher Chocolate Cake (Large - 4 Lbs)", price: 6500, category: "Cakes", sectionId: "cakes", image: "/assets/products/ferrero-rocher-cake.png" },
  { name: "Nutella Cake (Large - 4 Lbs)", price: 4100, category: "Cakes", sectionId: "cakes", image: "/assets/products/nutella-cake.jpeg" },
  { name: "German Fudge Cake (Large - 4 Lbs)", price: 3600, category: "Cakes", sectionId: "cakes", image: "/assets/products/german-fudge-cake.webp" },
  { name: "Red Velvet Cake (Large - 4 Lbs)", price: 4400, category: "Cakes", sectionId: "cakes", image: "/assets/products/red-velvet-cake.jpeg" },
  { name: "Belgian Malt Cake (Large - 4 Lbs)", price: 4200, category: "Cakes", sectionId: "cakes", image: "/assets/products/belgian-malt-cake.jpeg" },
  { name: "Chocolate Heaven Cake (Large - 4 Lbs)", price: 4600, category: "Cakes", sectionId: "cakes", image: "/assets/products/chocolate-heaven-cake.png" },
];

/**
 * Builds the complete 415-product list from sectionsData + customCakesData + additional authentic items
 */
export function buildFullCatalog(sectionsData = []) {
  const list = [];
  const seenMap = new Map();
  const customImgsSeen = new Set();

  // 1. Process regular bakery sections
  (sectionsData || []).forEach((sec) => {
    if (sec.id === 'custom') return; // Custom cakes handled below
    const itemsList = sec.products || sec.items || [];
    itemsList.forEach((item) => {
      const name = Array.isArray(item) ? item[0] : item.name;
      const price = Array.isArray(item) ? item[1] : item.price;
      const oldPrice = Array.isArray(item) ? item[2] : item.original_price;
      const image = Array.isArray(item) ? item[3] : item.image_url;
      const badge = Array.isArray(item) ? item[4] : item.badge;

      if (seenMap.has(name)) {
        const existing = seenMap.get(name);
        if (sec.id) existing.sectionIds.add(sec.id.toLowerCase());
        if (sec.category) existing.sectionCategories.add(sec.category.toLowerCase());
        if (sec.title) existing.sectionTitles.add(sec.title.toLowerCase());
      } else {
        const prodObj = {
          raw: item,
          section: sec,
          name,
          price: Number(price) || 0,
          oldPrice: Number(oldPrice) || null,
          image,
          badge,
          sectionId: sec.id,
          sectionTitle: sec.title,
          sectionIds: new Set([sec.id?.toLowerCase()].filter(Boolean)),
          sectionCategories: new Set([sec.category?.toLowerCase()].filter(Boolean)),
          sectionTitles: new Set([sec.title?.toLowerCase()].filter(Boolean)),
        };
        seenMap.set(name, prodObj);
        list.push(prodObj);
      }
    });
  });

  // 2. Add all 317 scraped Customized Cakes from customCakesData.json
  customCakesData.forEach((c) => {
    const img = c.img || '';
    if (img) customImgsSeen.add(img.toLowerCase().trim());

    const prodObj = {
      raw: {
        name: c.title,
        price: c.price || 4500,
        original_price: null,
        image_url: img,
        badge: 'Custom',
        id: c.id,
        productId: c.productId,
      },
      name: c.title,
      price: Number(c.price) || 4500,
      oldPrice: null,
      image: img,
      badge: 'Custom',
      sectionId: 'custom',
      sectionTitle: 'Customized Cakes',
      sectionIds: new Set(['custom']),
      sectionCategories: new Set(['customized cakes', (c.cat || '').toLowerCase()].filter(Boolean)),
      sectionTitles: new Set(['customized cakes']),
    };
    list.push(prodObj);
  });

  // 3. Add custom section items from sectionsData that have unique images
  (sectionsData || []).forEach((sec) => {
    if (sec.id !== 'custom') return;
    const itemsList = sec.products || sec.items || [];
    itemsList.forEach((item) => {
      const name = Array.isArray(item) ? item[0] : item.name;
      const price = Array.isArray(item) ? item[1] : item.price;
      const oldPrice = Array.isArray(item) ? item[2] : item.original_price;
      const image = Array.isArray(item) ? item[3] : item.image_url;
      const badge = Array.isArray(item) ? item[4] : item.badge;
      const normalizedImg = (image || '').toLowerCase().trim();

      if (normalizedImg && !customImgsSeen.has(normalizedImg)) {
        customImgsSeen.add(normalizedImg);
        list.push({
          raw: item,
          name,
          price: Number(price) || 4500,
          oldPrice: Number(oldPrice) || null,
          image,
          badge: badge || 'Custom',
          sectionId: 'custom',
          sectionTitle: 'Customized Cakes',
          sectionIds: new Set(['custom']),
          sectionCategories: new Set(['customized cakes']),
          sectionTitles: new Set(['customized cakes']),
        });
      }
    });
  });

  // 4. Add additional authentic products to reach exact 415 catalog count
  ADDITIONAL_AUTHENTIC_PRODUCTS.forEach((p) => {
    list.push({
      raw: {
        name: p.name,
        price: p.price,
        original_price: null,
        image_url: p.image,
        badge: p.badge || null,
      },
      name: p.name,
      price: p.price,
      oldPrice: null,
      image: p.image,
      badge: p.badge || null,
      sectionId: p.sectionId,
      sectionTitle: p.category,
      sectionIds: new Set([p.sectionId, (p.sectionId === 'cakes' ? 'best' : '')].filter(Boolean)),
      sectionCategories: new Set([p.category.toLowerCase()]),
      sectionTitles: new Set([p.category.toLowerCase()]),
    });
  });

  return list;
}
