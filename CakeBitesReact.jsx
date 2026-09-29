import React, { useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// API Endpoints: Node Express (5000) or Apache PHP API fallback
const API_BASE = 'http://localhost:5000/api';
const PHP_API_BASE = 'http://localhost/cakebite-react-api/index.php?action=';

const ASSET = {
  hero: '/assets/banners/hero-banner.png',
  divider: '/assets/banners/divider.png',
  combos: '/assets/banners/combos-banner.png',
  best: '/assets/banners/best-selling-banner.png',
  cakes: '/assets/banners/cakes-banner.png',
  cupcakes: '/assets/banners/cupcakes-banner.png',
  brownies: '/assets/banners/brownies-banner.png',
  sundae: '/assets/banners/sundae-banner.png',
  bento: '/assets/banners/bento-banner.png',
  custom: '/assets/banners/custom-banner.png',
  goldAccent: '/assets/banners/gold-accent.png',
  logo: '/assets/brand/cakebites-logo-bw.png',
  logoColor: '/assets/brand/cakebites-logo.png',
  logoBw: '/assets/brand/cakebites-logo-bw.png',
};

const REAL_PRODUCT_IMAGES = {
  // COMBOS
  'Mango Bliss Combo': '/assets/products/mango-bliss-combo.webp',
  'Golden Nutella Combo': '/assets/products/golden-nutella-combo.webp',
  'Milky Bloom Combo': '/assets/products/milky-bloom-combo.webp',

  // BEST SELLING & SIGNATURE CAKES
  'Double Fudge Cake': '/assets/products/double-fudge-cake.jpeg',
  'Lotus Three Milk Cake': '/assets/products/lotus-three-milk-cake.jpeg',
  'Nutella Cake (Medium)': '/assets/products/nutella-cake.jpeg',
  'Three Milk Mango Cake': '/assets/products/three-milk-mango-cake.jpg',
  'Three Milk Cake (Medium)': '/assets/products/three-milk-cake.webp',
  'Dream Lava Cake': '/assets/products/dream-lava-cake.webp',
  'Ferrero Rocher Chocolate Cake': '/assets/products/ferrero-rocher-cake.png',
  'Ferrerro Classic Cake (Medium)': '/assets/products/ferrero-classic-cake.jpg',

  // CAKES
  'German Fudge Cake (Medium)': '/assets/products/german-fudge-cake.webp',
  'Red Velvet Cake (Medium)': '/assets/products/red-velvet-cake.jpeg',
  'Belgian Malt Cake (Medium)': '/assets/products/belgian-malt-cake.jpeg',
  'Chocolate Mousse Cake': '/assets/products/chocolate-mousse-cake.jpeg',
  'Milky Malt Cake': '/assets/products/milky-malt-cake.jpeg',
  'Coffee Cake': '/assets/products/coffee-cake.png',
  'Black Forest Cake': '/assets/products/black-forest-cake.png',
  'Pineapple Cake': '/assets/products/pineapple-cake.jpeg',
  'Chocolate Heaven Cake': '/assets/products/chocolate-heaven-cake.png',
  'KitKat Chocolate Cake': '/assets/products/kitkat-chocolate-cake.png',
  'Dairy Milk Cake': '/assets/products/dairy-milk-cake.png',
  'Salted Caramel Cake': '/assets/products/salted-caramel-cake.png',
  'Raffaello Cake': '/assets/products/raffaello-cake.jpg',

  // CHEESECAKES
  'Lotus Cheese Cake (Medium)': '/assets/products/lotus-cheesecake.png',
  'New York Cheese Cake (Medium)': '/assets/products/new-york-cheesecake.webp',
  'Strawberry Cheese Cake (Medium)': '/assets/products/strawberry-cheesecake.jpeg',
  'Blueberry Cheese Cake (Medium)': '/assets/products/blueberry-cheesecake.png',

  // CUPCAKES
  'Ferrero Cup Cake': '/assets/products/ferrero-cupcake.jpeg',
  'Belgian Chocolate Cup Cakes': '/assets/products/belgian-chocolate-cupcake.png',
  'M&M Cup Cake': '/assets/products/mm-cupcake.jpeg',
  'Swiss Dark Cup Cake': '/assets/products/swiss-dark-cupcake.jpeg',
  'Milky Chocolate Cup Cake': '/assets/products/milky-chocolate-cupcake.jpeg',
  'Nutella Chocolate Cup Cake': '/assets/products/nutella-chocolate-cupcake.jpg',
  'Red Velvet Cup Cake': '/assets/products/red-velvet-cupcake.jpg',
  'Salted Caramel Cup Cake': '/assets/products/salted-caramel-cupcake.jpeg',

  // BROWNIES
  'Nutella Brownie': '/assets/products/nutella-brownie.webp',
  'Cadbury Brownie': '/assets/products/cadbury-brownie.png',
  'Mars Chocolate Brownie': '/assets/products/mars-chocolate-brownie.webp',
  'Belgian Malt Brownie': '/assets/products/belgian-malt-brownie.webp',

  // SUNDAES
  'Three Milk Sundae': '/assets/products/three-milk-sundae.webp',
  'Nutella Sundae': '/assets/products/nutella-sundae.webp',
  'Galaxy Sundae': '/assets/products/galaxy-sundae.jpg',
  'Red Velvet Sundae': '/assets/products/red-velvet-sundae.webp',

  // 20 AUTHENTIC BENTO CAKES FROM CAKEBITES.PK
  "Bento Cake - Red Berries & Sparkler": "https://cakebites.pk/wp-content/uploads/2025/12/1724107966-IMG-00309.png",
  "Bento Cake - Golden Love Script": "https://cakebites.pk/wp-content/uploads/2025/12/1724108028-IMG-00310.png",
  "Bento Cake - Sage Green Vintage": "https://cakebites.pk/wp-content/uploads/2025/12/1724108059-IMG-00311.png",
  "Bento Cake - Ivory Pearl Ruffle": "https://cakebites.pk/wp-content/uploads/2025/12/1724108092-IMG-00312.png",
  "Bento Cake - Cartoon Love Doodles": "https://cakebites.pk/wp-content/uploads/2025/12/1724108217-IMG-00313.png",
  "Bento Cake - Midnight Galaxy Constellation": "https://cakebites.pk/wp-content/uploads/2025/12/1724108300-IMG-00314.png",
  "Bento Cake - Mocha Woodgrain Minimalist": "https://cakebites.pk/wp-content/uploads/2025/12/1724108270-IMG-00315.png",
  "Bento Cake - Happy 100 Day Peach": "https://cakebites.pk/wp-content/uploads/2025/12/1724108355-IMG-00316.png",
  "Bento Cake - Blue Hearts Papa": "https://cakebites.pk/wp-content/uploads/2025/12/1724108457-IMG-00320.png",
  "Bento Cake - Pastel 3D Birthday Letters": "https://cakebites.pk/wp-content/uploads/2025/12/1724108440-IMG-00319.png",
  "Bento Cake - Colorful Jina’s Day": "https://cakebites.pk/wp-content/uploads/2025/12/1724108412-IMG-00318.png",
  "Bento Cake - Vintage Lambeth Garland": "https://cakebites.pk/wp-content/uploads/2025/12/1724108376-IMG-00317.png",
  "Bento Cake - Watercolor 18th Birthday": "https://cakebites.pk/wp-content/uploads/2025/12/1723933645-IMG-00304.png",
  "Bento Cake - Dripping Pearl Tiered": "https://cakebites.pk/wp-content/uploads/2025/12/1723933574-IMG-00303.png",
  "Bento Cake - Classic Navy Blue Border": "https://cakebites.pk/wp-content/uploads/2025/12/1723933508-IMG-00302.png",
  "Bento Cake - Blue Brush Stroke Palette": "https://cakebites.pk/wp-content/uploads/2025/12/1723933479-IMG-00301.png",
  "Bento Cake - Rich Chocolate Fluted": "https://cakebites.pk/wp-content/uploads/2025/12/1723934160-IMG-00305.png",
  "Bento Cake - Red Lipstick Kiss Prints": "https://cakebites.pk/wp-content/uploads/2025/12/1723934249-IMG-00308.png",
  "Bento Cake - Pink Satin Bows & Ruffles": "https://cakebites.pk/wp-content/uploads/2025/12/1723934221-IMG-00307.png",
  "Bento Cake - Scalloped Wave Border": "https://cakebites.pk/wp-content/uploads/2025/12/1723934192-IMG-00306.png",

  // CUSTOMIZED CUPCAKE & CAKE BOXES (8 Authentic Box Designs from cakebites.pk)
  'Custom Celebration Box (6 Pcs)': '/assets/products/custom-cupcake-box-1.png',
  'Floral Elegance Cupcake Box': '/assets/products/custom-cupcake-box-2.png',
  'Deluxe Birthday Ensemble Box': '/assets/products/custom-cupcake-box-3.png',
  'Princess Theme Cupcake Box': '/assets/products/custom-cupcake-box-4.png',
  'Artisanal Fondant Cupcake Box': '/assets/products/custom-cupcake-box-5.png',
  'Minimalist Gold Flake Cupcakes': '/assets/products/custom-cupcake-box-6.png',
  'Choco Bliss Custom Cupcakes': '/assets/products/custom-cupcake-box-7.png',
  'Grand Assorted Party Box': '/assets/products/custom-cupcake-box-8.png',

  // Legacy mappings for backwards compatibility
  'Vintage Aesthetic Bento Cake': '/assets/products/bento-cake-1.png',
  'Pastel Ribbon Bento Cake': '/assets/products/bento-cake-2.png',
  'Korean Floral Bento Cake': '/assets/products/bento-cake-3.png',
  'Minimalist Birthday Bento Cake': '/assets/products/bento-cake-7.png',
  'Custom Cup Cake Box (Medium)': '/assets/products/custom-cupcake-box-1.png',
  'Artisanal Cream Cakes (Medium)': '/assets/products/custom-cupcake-box-2.png',
  'Royal Chocolate Cakes (Medium)': '/assets/products/custom-cupcake-box-3.png',
  'Grand Doll Cake (Medium)': '/assets/products/custom-cupcake-box-4.png',
};

const defaultSections = [
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
      ["Double Fudge Cake", 1999, 2350, "https://cakebites.pk/wp-content/uploads/2025/12/1701430460-Double20cake.jpeg", "Top Rated"],
      ["Lotus Three Milk Cake", 2099, 2500, "https://cakebites.pk/wp-content/uploads/2025/12/1731001864-lotus.jpeg", "Trending"],
      ["Nutella Cake (Medium)", 2049, 2400, "https://cakebites.pk/wp-content/uploads/2025/12/1699886869-Nutella20cake.jpeg", "Popular"],
      ["Three Milk Mango Cake", 2199, 2600, "https://cakebites.pk/wp-content/uploads/2026/05/Three-Milk-Mango-Cake-by-Cakebites.pk_.jpg", "Chef Pick"],
      ["Dream Lava Cake", 2349, 2800, "https://cakebites.pk/wp-content/uploads/2025/12/1751545934-Dream-Lava-2_64_11zon.webp", "Hot Seller"],
      ["Ferrero Rocher Chocolate Cake", 3500, 4000, "https://cakebites.pk/wp-content/uploads/2025/12/1713426928-ferror20cske_11zon.png", "Luxury"],
      ["German Fudge Cake (Medium)", 1799, null, "/assets/products/german-fudge-cake.webp"],
      ["Red Velvet Cake (Medium)", 2199, null, "https://cakebites.pk/wp-content/uploads/2025/12/1751545285-Red-velvet-2_44_11zon.jpeg"],
      ["Belgian Malt Cake (Medium)", 2099, null, "https://cakebites.pk/wp-content/uploads/2025/12/1699887294-Belgian20cake.jpeg"],
      ["Chocolate Mousse Cake", 1699, null, "https://cakebites.pk/wp-content/uploads/2025/12/1699887245-Chocolate20cake.jpeg"],
      ["Milky Malt Cake", 1799, 2150, "https://cakebites.pk/wp-content/uploads/2025/12/1699886990-Milky20cake.jpeg", "Special Price"],
      ["Coffee Cake", 1799, null, "https://cakebites.pk/wp-content/uploads/2025/12/1751548137-Coffee204_48_11zon.png"],
      ["Black Forest Cake", 1799, null, "https://cakebites.pk/wp-content/uploads/2025/12/1751544975-Black20Forest.png"],
      ["Pineapple Cake", 1799, null, "https://cakebites.pk/wp-content/uploads/2025/12/1701430557-Pineapple20cake.jpeg"],
      ["Three Milk Cake (Medium)", 1999, null, "/assets/products/three-milk-cake.webp"],
      ["Ferrerro Classic Cake (Medium)", 2299, null, "/assets/products/ferrero-classic-cake.jpg"],
      ["Chocolate Heaven Cake", 2199, null, "https://cakebites.pk/wp-content/uploads/2025/12/1751548088-Chocolate20Heaven_87_11zon.png"],
      ["KitKat Chocolate Cake", 2299, null, "https://cakebites.pk/wp-content/uploads/2025/12/1751545966-Kitkat205_28_11zon.png"],
      ["Dairy Milk Cake", 2299, null, "https://cakebites.pk/wp-content/uploads/2025/12/1751545814-Dairy20Milk_55_11zon.png"],
      ["Salted Caramel Cake", 2199, null, "https://cakebites.pk/wp-content/uploads/2025/12/1751545388-Salted20Caramel_8_11zon.png"],
      ["Raffaello Cake", 2499, null, "https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0023_DSC08195-copy.jpg"],
      ["Lotus Cheese Cake (Medium)", 2499, 2800, "/assets/products/lotus-cheesecake.png", "Cheesecake"],
      ["New York Cheese Cake (Medium)", 2499, null, "/assets/products/new-york-cheesecake.webp"],
      ["Strawberry Cheese Cake (Medium)", 2599, null, "https://cakebites.pk/wp-content/uploads/2025/12/WhatsApp-Image-2026-03-18-at-2.34.13-AM.jpeg"],
      ["Blueberry Cheese Cake (Medium)", 2599, null, "/assets/products/blueberry-cheesecake.png"],
      ["Chocolate Cakes (Medium)", 2200, null, "https://cakebites.pk/wp-content/uploads/2025/12/1722987676-180020pound20Min20pounds.png"],
    ],
  },
  {
    id: 'cupcakes',
    title: 'Cupcakes',
    banner: ASSET.cupcakes,
    category: 'Cupcakes',
    products: [
      ["Ferrero Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/1700045065-Ferrero20cup20cake.jpeg"],
      ["Belgian Chocolate Cup Cakes", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/1713426823-Belgian20Cupcake.png"],
      ["M&M Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/1699887645-MNM20cupcake.jpeg"],
      ["Swiss Dark Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/1699886589-Swiss20cup20cake.jpeg"],
      ["Milky Chocolate Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/1699886958-Milky20cup20cake.jpeg"],
      ["Nutella Chocolate Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0010_DSC08035.jpg"],
      ["Red Velvet Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0014_DSC08119.jpg"],
      ["Salted Caramel Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/1699886618-Salted20cup20cake.jpeg"],
      ["Oreo Twister Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/1699886795-Oreo20cake.jpeg"],
      ["Lite Coffee Cup Cake", 249, null, "https://cakebites.pk/wp-content/uploads/2025/12/1713426793-Lite20Cupcake.png"],
    ],
  },
  {
    id: 'brownies',
    title: 'Brownies',
    banner: ASSET.brownies,
    category: 'Brownies',
    products: [
      ["Nutella Brownie", 199, null, "/assets/products/nutella-brownie.webp", "Bestseller"],
      ["Cadbury Brownie", 199, null, "/assets/products/cadbury-brownie.png", "Popular"],
      ["Mars Chocolate Brownie", 199, null, "/assets/products/mars-chocolate-brownie.webp", "Trending"],
      ["Belgian Malt Brownie", 199, null, "/assets/products/belgian-malt-brownie.webp", "Special"],
    ],
  },
  {
    id: 'sundae',
    title: 'Sundae',
    banner: ASSET.sundae,
    category: 'Sundae',
    products: [
      ["Three Milk Sundae", 399, null, "https://cakebites.pk/wp-content/uploads/2025/12/1700045505-Three20sundae.webp", "Popular"],
      ["Nutella Sundae", 399, null, "https://cakebites.pk/wp-content/uploads/2025/12/1700045238-Nutella20sundae.webp", "Trending"],
      ["Galaxy Sundae", 399, null, "https://cakebites.pk/wp-content/uploads/2025/12/Untitled-1_0001_DSC08299.jpg"],
      ["Red Velvet Sundae", 399, null, "https://cakebites.pk/wp-content/uploads/2025/12/1713426852-red20Sundae.webp"],
      ["Lotus Three Milk Sundae", 450, null, "https://cakebites.pk/wp-content/uploads/2026/06/img_0876-1.jpeg", "New"],
    ],
  },
    {
    id: 'bento',
    title: 'Bento Cake',
    banner: ASSET.bento,
    category: 'Bento Cake',
    products: [
      ["Bento Cake - Red Berries & Sparkler", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724107966-IMG-00309.png", "Bestseller"],
      ["Bento Cake - Golden Love Script", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108028-IMG-00310.png", "Popular"],
      ["Bento Cake - Sage Green Vintage", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108059-IMG-00311.png", "Trending"],
      ["Bento Cake - Ivory Pearl Ruffle", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108092-IMG-00312.png"],
      ["Bento Cake - Cartoon Love Doodles", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108217-IMG-00313.png", "Cute"],
      ["Bento Cake - Midnight Galaxy Constellation", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108300-IMG-00314.png", "Special"],
      ["Bento Cake - Mocha Woodgrain Minimalist", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108270-IMG-00315.png"],
      ["Bento Cake - Happy 100 Day Peach", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108355-IMG-00316.png"],
      ["Bento Cake - Blue Hearts Papa", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108457-IMG-00320.png"],
      ["Bento Cake - Pastel 3D Birthday Letters", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108440-IMG-00319.png", "Popular"],
      ["Bento Cake - Colorful Jina’s Day", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108412-IMG-00318.png"],
      ["Bento Cake - Vintage Lambeth Garland", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1724108376-IMG-00317.png", "Vintage"],
      ["Bento Cake - Watercolor 18th Birthday", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723933645-IMG-00304.png"],
      ["Bento Cake - Dripping Pearl Tiered", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723933574-IMG-00303.png", "Luxury"],
      ["Bento Cake - Classic Navy Blue Border", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723933508-IMG-00302.png"],
      ["Bento Cake - Blue Brush Stroke Palette", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723933479-IMG-00301.png"],
      ["Bento Cake - Rich Chocolate Fluted", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723934160-IMG-00305.png"],
      ["Bento Cake - Red Lipstick Kiss Prints", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723934249-IMG-00308.png", "Trending"],
      ["Bento Cake - Pink Satin Bows & Ruffles", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723934221-IMG-00307.png", "Popular"],
      ["Bento Cake - Scalloped Wave Border", 2999, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723934192-IMG-00306.png"],
    ],
  },
  {
    id: 'custom',
    title: 'Customized Cakes',
    banner: ASSET.custom,
    category: 'Customized Cakes',
    products: [
      ["Custom Celebration Box (6 Pcs)", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png", "Bestseller"],
      ["Rosy Blush Elegance Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2026/04/bouqet5.jpeg", "Popular"],
      ["Scarlet Butterfly Classic Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2026/04/bouqet6.jpeg", "Popular"],
      ["Royal Burgundy Bloom Cake", 5200, null, "https://cakebites.pk/wp-content/uploads/2026/04/bouqet7.jpeg", "Trending"],
      ["Vintage Storybook Bouquet Cake", 5200, null, "https://cakebites.pk/wp-content/uploads/2026/04/bouqet4.jpeg"],
      ["Midnight Onyx Roses Cake", 5500, null, "https://cakebites.pk/wp-content/uploads/2026/04/bouqet2.jpeg", "Luxury"],
      ["Crimson Prestige Cake", 4900, null, "https://cakebites.pk/wp-content/uploads/2026/04/bouqet3.jpeg"],
      ["Pink Petal Harmony Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2026/04/bouqet1.jpeg"],
      ["Pink Rose Perfection (Medium)", 4600, null, "https://cakebites.pk/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-30-at-1.05.30-PM-6.jpeg"],
      ["Mom’s Sweet Surprise Cake", 4500, null, "https://cakebites.pk/wp-content/uploads/2026/04/sentiments-deal-3.png", "Special"],
      ["Mother’s Day Magic Box", 4900, null, "https://cakebites.pk/wp-content/uploads/2026/04/sentiments-Deal-4.png"],
      ["Sweet Moments with Mom", 4500, null, "https://cakebites.pk/wp-content/uploads/2026/04/sentiments-deal-2.png"],
      ["Bloom & Bliss for Ammi", 4800, null, "https://cakebites.pk/wp-content/uploads/2026/04/sentiments-deal-1-1.png"],
      ["Colourful Music Cake (Medium)", 5200, null, "https://cakebites.pk/wp-content/uploads/2026/04/IMG_2311-copy.webp"],
      ["Ivory Floral Touch Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980514-21.png"],
      ["Cherry Blossom Mini Cake", 4500, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980456-20.png"],
      ["Golden Drizzle Bloom Cake", 5400, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980396-19.png"],
      ["Pink Velvet Note Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980339-18.png"],
      ["Vintage Ruffle Bloom Cake", 5200, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980288-17.png"],
      ["Rose Quartz Delight Cake", 5000, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980247-16.png"],
      ["Macaron Blush Cake", 5500, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980192-15.png", "Chef Pick"],
      ["Maas Love Special Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980146-14.png"],
      ["Blush Confetti Mini Cake", 4500, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980093-13.png"],
      ["Heartful Surprise Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745980042-12.png"],
      ["Daisy Pink Topper Cake", 4600, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978852-11.png"],
      ["Rosy Cream Dream Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978805-10.png"],
      ["Floral Glow Mini Cake", 4500, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978717-08.png"],
      ["Peachy Hearts Cake", 4500, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978649-07.png"],
      ["Golden Bloom Bite Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978564-06.png"],
      ["Sweet Bloom Hearts Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978514-05.png"],
      ["Love Dots Delight Cake", 4600, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978457-04.png"],
      ["Graceful Garden Cake", 5200, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978408-03.png"],
      ["Strawberry Bloom Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978315-02.png"],
      ["Petal Blush Cake", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1745978251-01.png"],
      ["Floral Elegance Cupcake Box", 4800, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723858416-IMG-00265-1.png"],
      ["Deluxe Birthday Ensemble Box", 5200, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png"],
      ["Princess Theme Cupcake Box", 5200, null, "https://cakebites.pk/wp-content/uploads/2025/12/1722989798-140020pound20Mi20320pounds.png"],
      ["Artisanal Fondant Cupcake Box", 5600, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723858416-IMG-00265-1.png"],
      ["Grand Assorted Party Box", 6400, null, "https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png", "Luxury"],
      ["85 Flowers Handmade Ribbon Bouquet Stand", 6500, null, "https://cakebites.pk/wp-content/uploads/2026/04/85-flowers.png", "Bouquet"],
      ["26 Flowers Handmade Ribbon Bouquet Stand", 4500, null, "https://cakebites.pk/wp-content/uploads/2026/04/26-flowers-with-stand.png", "Bouquet"],
      ["26 Flowers Handmade Ribbon Bouquet", 3500, null, "https://cakebites.pk/wp-content/uploads/2026/04/26-flowers.png", "Bouquet"],
    ],
  },
];

const money = (n) => `₨ ${Number(n).toLocaleString('en-PK')}`;

const CATEGORY_CARDS = [
  {
    id: 'combos',
    label: "Combo's",
    target: '#combos',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <rect x="13" y="24" width="38" height="26" rx="2" />
        <rect x="10" y="18" width="44" height="7" rx="1.5" />
        <line x1="32" y1="18" x2="32" y2="50" />
        <path d="M32 18c-3-5-9-7-10-2 0 4 6 2 10 2z" />
        <path d="M32 18c3-5 9-7 10-2 0 4-6 2-10 2z" />
      </svg>
    ),
  },
  {
    id: 'best',
    label: 'Best Selling',
    target: '#best',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <path d="M12 36 L36 12 h16 v16 L28 52 z" />
        <circle cx="44" cy="20" r="3.5" />
        <path d="M22 36 l5 5 11-12" />
      </svg>
    ),
  },
  {
    id: 'cakes',
    label: 'Cake',
    target: '#cakes',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <line x1="12" y1="51" x2="52" y2="51" />
        <path d="M16 32v17c0 1 1 2 2 2h28c1 0 2-1 2-2V32" />
        <path d="M16 32c0-3 7-5 16-5s16 2 16 5" />
        <path d="M16 36c4 3 8 0 11 3s8-3 11 0 7-3 10 0" />
        <circle cx="32" cy="20" r="4" />
        <path d="M34 17c2-4 6-5 9-4" />
        <path d="M38 14c2-2 5-2 6 0-1 2-3 3-6 0z" />
      </svg>
    ),
  },
  {
    id: 'cupcakes',
    label: 'Cupcake',
    target: '#cupcakes',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <circle cx="32" cy="13" r="3.5" />
        <path d="M32 9.5c0-3 2-4 5-5" />
        <path d="M18 29c-1-3 1-6 4-7 1-4 5-7 10-7s9 3 10 7c3 1 5 4 4 7-1 3-3 4-5 4H23c-3 0-5-1-5-4z" />
        <path d="M20 33h24l-3.5 19h-17z" />
        <line x1="26" y1="33" x2="27.5" y2="52" />
        <line x1="32" y1="33" x2="32" y2="52" />
        <line x1="38" y1="33" x2="36.5" y2="52" />
      </svg>
    ),
  },
  {
    id: 'brownies',
    label: 'Brownies',
    target: '#brownies',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <rect x="14" y="16" width="36" height="36" rx="6" />
        <path d="M14 27c3 2 6-2 9 1s6 2 9-1 6 2 9 1 6-2 9 0" />
        <line x1="22" y1="37" x2="26" y2="41" />
        <line x1="32" y1="35" x2="36" y2="39" />
        <line x1="23" y1="45" x2="28" y2="43" />
        <line x1="38" y1="44" x2="43" y2="41" />
      </svg>
    ),
  },
  {
    id: 'sundae',
    label: 'Sundae',
    target: '#sundae',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <path d="M22 7l5-1 4 19h-5z" />
        <line x1="24" y1="12" x2="28" y2="11" />
        <path d="M20 25c-2-2-2-5 1-7 2-2 5-2 7 0 1-3 5-5 9-4 3 1 5 4 5 7 3 1 5 4 4 7" />
        <path d="M16 25h32v7H16z" />
        <path d="M20 32h24l-3 18h-18z" />
        <line x1="21" y1="50" x2="43" y2="50" />
        <path d="M24 38c3 2 6-2 8 0s5 2 8 0" />
        <path d="M25 44c3 2 5-2 7 0s5 2 7 0" />
      </svg>
    ),
  },
  {
    id: 'bento',
    label: 'Bento',
    target: '#bento',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <circle cx="23" cy="18" r="3" />
        <circle cx="32" cy="15" r="3.5" />
        <circle cx="41" cy="18" r="3" />
        <path d="M23 15c0-3 2-4 5-5" />
        <path d="M32 11.5c1-3 3-5 6-6" />
        <path d="M41 15c1-3 3-4 5-4" />
        <path d="M15 26h34c2 0 4 2 4 4v16H11V30c0-2 2-4 4-4z" />
        <path d="M11 34c3 2 6-1 8 1s6-1 8 1 6-1 8 1 6-1 8 1" />
        <line x1="8" y1="46" x2="56" y2="46" />
        <path d="M14 46c2 4 6 6 10 6h16c4 0 8-2 10-6" />
      </svg>
    ),
  },
  {
    id: 'custom',
    label: 'Customized Cake',
    target: '#custom',
    displayLabel: (
      <>
        Customized<br />Cake
      </>
    ),
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <path d="M22 15h20c2 0 4 2 4 4v9H18v-9c0-2 2-4 4-4z" />
        <path d="M18 21c3 2 5-1 7 1s5-1 7 1 5-1 7 1 5-1 7 1" />
        <path d="M13 28h38c2.5 0 5 2.5 5 5v17H8V33c0-2.5 2.5-5 5-5z" />
        <path d="M8 35c3 2 6-1 8 1s6-1 8 1 6-1 8 1 6-1 8 1" />
        <line x1="5" y1="50" x2="59" y2="50" />
        <line x1="24" y1="10" x2="20" y2="6" />
        <line x1="32" y1="9" x2="32" y2="4" />
        <line x1="40" y1="10" x2="44" y2="6" />
      </svg>
    ),
  },
];

function CategoryNav({ activeSection, onSelectSection }) {
  return (
    <section className="cat-nav-section" aria-label="Product Categories">
      <div className="cat-ornament-divider">
        <img src={ASSET.divider} alt="" loading="lazy" />
      </div>

      <div className="cat-nav-outer container">
        <div className="cat-nav-box-frame">
          <div className="cat-nav-scroll-wrapper">
            {CATEGORY_CARDS.map((cat) => {
              const isActive = activeSection === cat.id;
              return (
                <a
                  key={cat.id}
                  href={cat.target}
                  className={`cat-card-item ${isActive ? 'active' : ''}`}
                  data-target={cat.id}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectSection(cat.id, cat.target);
                  }}
                  title={`Browse ${cat.label}`}
                >
                  <div className="cat-card-icon-wrap">
                    {cat.svg}
                  </div>
                  <span className="cat-card-label">{cat.displayLabel || cat.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AmbientGoldDust() {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.55 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulsePhase += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.65 + 0.35 * Math.sin(p.pulsePhase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(235, 190, 95, ${Math.max(0.08, currentOpacity)})`;
        ctx.shadowColor = '#d5a348';
        ctx.shadowBlur = 6;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-gold-canvas"
      aria-hidden="true"
    />
  );
}

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'pin') return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (name === 'phone') return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.15 12.8 19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.07 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92Z"/></svg>;
  if (name === 'bag') return <svg {...common}><path d="M6 7h12l1 14H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>;
  if (name === 'menu') return <svg {...common}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
  if (name === 'x') return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
  if (name === 'instagram') return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg>;
  if (name === 'facebook') return <svg {...common}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z"/></svg>;
  if (name === 'database') return <svg {...common}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>;
  if (name === 'check') return <svg {...common}><polyline points="20 6 9 17 4 12"/></svg>;
  if (name === 'refresh') return <svg {...common}><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>;
  return null;
}

function BrandMark({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={ASSET.logo} 
        alt="Cake Bites" 
        className={`hdr-brand-logo-img brand-logo-img ${compact ? 'brand-logo-img--compact' : ''}`}
        style={{
          height: compact ? '40px' : '56px',
          maxHeight: compact ? '40px' : '56px',
          width: 'auto',
          maxWidth: compact ? '125px' : '175px',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}

function ProductCard({ item, section = {}, index, onAdd }) {
  const name = Array.isArray(item) ? item[0] : item?.name || '';
  const price = Array.isArray(item) ? item[1] : item?.price || 0;
  const old = Array.isArray(item) ? item[2] : item?.original_price || null;
  const imageFromDb = Array.isArray(item) ? item[3] : item?.image_url;
  const badge = Array.isArray(item) ? item[4] : item?.badge;

  const [added, setAdded] = useState(false);

  const imageSrc = imageFromDb || REAL_PRODUCT_IMAGES[name] || section?.banner || '/assets/banners/bento-banner.png';
  const discount = old ? Math.round((1 - price / old) * 100) : null;
  const categoryLabel = section?.category || section?.title || (name.toLowerCase().includes('bento') ? 'Bento Cake' : 'Cake Bites');

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd({ name, price, image: imageSrc });
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article className="product-card is-revealed">
      <div className="product-art">
        <img 
          src={imageSrc} 
          alt={name} 
          loading="lazy" 
          className="product-img" 
          onError={(e) => { 
            if (!e.currentTarget.dataset.fallback) {
              e.currentTarget.dataset.fallback = 'true';
              e.currentTarget.src = section?.banner || '/assets/banners/bento-banner.png';
            }
          }} 
        />
        {/* Luxury diagonal light gleam beam */}
        <div className="product-art-shimmer" aria-hidden="true" />

        {badge && <span className="badge-tag">{badge}</span>}
        {discount && <span className="sale-badge">-{discount}%</span>}
      </div>
      <div className="product-body">
        <div className="product-category">{categoryLabel}</div>
        <h3>{name}</h3>
        <div className="price-row">
          {old && <span className="old-price">{money(old)}</span>}
          <span className="price">{money(price)}</span>
        </div>
        <button 
          type="button"
          className={`add-btn ${added ? 'added' : ''}`} 
          onClick={handleAdd}
        >
          {added ? (
            <span className="add-btn-feedback">✓ Added!</span>
          ) : (
            <span>{name.includes('Medium') ? 'Select options' : 'Add to cart'}</span>
          )}
        </button>
      </div>
    </article>
  );
}

function Section({ section, onAdd }) {
  return (
    <section id={section.id} className="shop-section">
      <div className="divider"><img src={ASSET.divider} alt="" /></div>
      <div className="section-banner"><img src={section.banner} alt={`${section.title} banner`} /></div>
      <div className="section-head">
        <span>Discover</span><h2>{section.title}</h2><span className="gold-line" />
      </div>
      <div className="product-grid">
        {section.products.map((p, i) => (
          <ProductCard 
            key={`${section.id}-${i}-${Array.isArray(p) ? p[0] : p.name}`} 
            item={p} 
            section={section} 
            index={i} 
            onAdd={onAdd} 
          />
        ))}
      </div>
    </section>
  );
}

function CartDrawer({ open, onClose, cart, setCart, onCheckout }) {
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const remove = (idx) => setCart((c) => c.filter((_, i) => i !== idx));
  return (
    <>
      <div className={`scrim ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-head"><h3>Your Cart ({cart.reduce((s, i) => s + i.qty, 0)})</h3><button className="icon-btn" onClick={onClose}><Icon name="x" /></button></div>
        <div className="drawer-body">
          {!cart.length ? (
            <div className="empty-cart"><Icon name="bag" size={36}/><p>No products in the cart.</p></div>
          ) : (
            cart.map((item, i) => (
              <div className="cart-line" key={`${item.name}-${i}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt="" 
                      style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4, background: '#f5f5f5' }} 
                    />
                  )}
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.qty} × {money(item.price)}</small>
                  </div>
                </div>
                <button onClick={() => remove(i)}>×</button>
              </div>
            ))
          )}
        </div>
        {!!cart.length && (
          <div className="drawer-footer">
            <div><span>Subtotal</span><strong>{money(total)}</strong></div>
            <button className="gold-btn" onClick={onCheckout}>Proceed to Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
}

function AreaModal({ open, onClose, area, setArea, areasList }) {
  const [value, setValue] = useState(area || '');
  if (!open) return null;
  return (
    <div className="modal-wrap">
      <div className="modal-card area-modal-card">
        <button className="modal-close" onClick={onClose} title="Close"><Icon name="x" /></button>
        <div className="mini-mark"><BrandMark compact /></div>
        <h2>Select Your Delivery Area</h2>
        <p>Please select your Karachi area to calculate exact delivery timing & options.</p>
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          <option value="">Select Area</option>
          {areasList.map((a) => (
            <option key={typeof a === 'string' ? a : a.name} value={typeof a === 'string' ? a : a.name}>
              {typeof a === 'string' ? a : a.name}
            </option>
          ))}
        </select>
        <button className="gold-btn area-confirm-btn" onClick={() => { if (value) setArea(value); onClose(); }}>Confirm Area</button>
      </div>
    </div>
  );
}

// Modern Checkout Modal (Saves to MySQL)
function CheckoutModal({ open, onClose, cart, area, total, onOrderPlaced }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const deliveryFee = 200;
  const grandTotal = total + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Please provide Name, Phone number, and Delivery Address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const payload = {
      customer_name: name,
      customer_phone: phone,
      delivery_area: area || 'Clifton',
      delivery_address: address,
      notes: notes,
      items: cart,
      subtotal: total,
      delivery_fee: deliveryFee,
      total_amount: grandTotal
    };

    try {
      // First try Express port 5000, then fallback to PHP API
      let res;
      try {
        res = await fetch(`${API_BASE}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch {
        res = await fetch(`${PHP_API_BASE}orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (res.ok && (data.success || data.order)) {
        onOrderPlaced(data.order || { order_code: 'CB-' + Math.floor(1000 + Math.random() * 9000), total_amount: grandTotal });
      } else {
        setError(data.error || 'Failed to place order in database');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-wrap">
      <div className="modal-card checkout-modal">
        <button className="modal-close" onClick={onClose}><Icon name="x" /></button>
        <div className="mini-mark"><BrandMark compact /></div>
        <h2>Complete Your Order</h2>
        <div className="subtitle">Your order will be instantly saved to MySQL database <b>cakebite react</b></div>

        <div className="db-notice">
          <Icon name="database" size={16} />
          <span>Connected to MySQL Database: <b>cakebite react</b> (Table: orders & order_items)</span>
        </div>

        {error && <div style={{ color: '#e74c3c', fontSize: 13, marginBottom: 10 }}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ali Ahmed" />
            </div>
            <div className="form-group">
              <label>Phone / WhatsApp *</label>
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0334-1234567" />
            </div>
          </div>

          <div className="form-group">
            <label>Delivery Area: <b>{area || 'Clifton'}</b></label>
            <input value={area || 'Clifton'} readOnly style={{ background: '#f5f7f8' }} />
          </div>

          <div className="form-group">
            <label>Complete Delivery Address *</label>
            <textarea required rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House/Flat #, Street, Block / Landmark..." />
          </div>

          <div className="form-group">
            <label>Cake Custom Writing / Notes</label>
            <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Write 'Happy Birthday Sarah' on the cake" />
          </div>

          <div className="order-summary-box">
            <div className="row"><span>Items ({cart.reduce((s, i) => s + i.qty, 0)})</span><span>{money(total)}</span></div>
            <div className="row"><span>Delivery Fee ({area || 'Karachi'})</span><span>{money(deliveryFee)}</span></div>
            <div className="row total"><span>Total Payable (Cash on Delivery)</span><span>{money(grandTotal)}</span></div>
          </div>

          <button type="submit" className="gold-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving to Database...' : 'Confirm & Place Order (Save to MySQL)'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Order Success Modal
function OrderSuccessModal({ order, onClose, onOpenDbManager }) {
  if (!order) return null;
  return (
    <div className="modal-wrap">
      <div className="modal-card success-modal">
        <div className="success-icon"><Icon name="check" size={36} /></div>
        <h2>Order Confirmed!</h2>
        <div className="order-pill-code">Order #{order.order_code || 'CB-1002'}</div>
        <p>Shukriya! Aapka order successfully place ho gaya hai.</p>

        <div className="db-badge-confirmed">
          💾 <b>Saved to MySQL Database:</b><br />
          Database: <code>cakebite react</code><br />
          Tables: <code>orders</code> & <code>order_items</code><br />
          Status: <code>Pending confirmation</code>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button className="gold-btn" style={{ background: '#132832', color: '#fff' }} onClick={onOpenDbManager}>
            ⚡ View in DB Manager
          </button>
          <button className="gold-btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

// Database Manager Drawer (Live Orders, Table Stats & Product Manager)
function DbManagerModal({ open, onClose, dbStatus, refreshDb, onAddProduct }) {
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // New product form
  const [newProdName, setNewProdName] = useState('');
  const [newProdCatId, setNewProdCatId] = useState(3); // Cakes
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOldPrice, setNewProdOldPrice] = useState('');
  const [newProdBadge, setNewProdBadge] = useState('');
  const [addMsg, setAddMsg] = useState('');

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      let res;
      try {
        res = await fetch(`${API_BASE}/orders`);
      } catch {
        res = await fetch(`${PHP_API_BASE}orders`);
      }
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (open) loadOrders();
  }, [open]);

  if (!open) return null;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    setAddMsg('Saving to database...');
    try {
      const payload = {
        category_id: Number(newProdCatId),
        name: newProdName,
        price: Number(newProdPrice),
        original_price: newProdOldPrice ? Number(newProdOldPrice) : null,
        badge: newProdBadge || null
      };
      let res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setAddMsg('✓ Cake added to MySQL database `cakebite react`!');
        setNewProdName('');
        setNewProdPrice('');
        setNewProdOldPrice('');
        setNewProdBadge('');
        refreshDb();
        setTimeout(() => setAddMsg(''), 4000);
      } else {
        setAddMsg('Error: ' + data.error);
      }
    } catch (err) {
      setAddMsg('Error: ' + err.message);
    }
  };

  return (
    <div className="modal-wrap">
      <div className="modal-card db-manager-modal">
        <button className="modal-close" onClick={onClose}><Icon name="x" /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: dbStatus.connected ? '#2ecc71' : '#e74c3c' }} />
          <h2 style={{ margin: 0, fontSize: 24 }}>MySQL: cakebite react Manager</h2>
        </div>

        <div className="db-tabs">
          <button className={`db-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
            📋 Live Orders ({orders.length})
          </button>
          <button className={`db-tab ${tab === 'add' ? 'active' : ''}`} onClick={() => setTab('add')}>
            ➕ Add Cake to DB
          </button>
          <button className={`db-tab ${tab === 'status' ? 'active' : ''}`} onClick={() => setTab('status')}>
            ⚙️ Connection & Tables
          </button>
        </div>

        {tab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: '#5b6e76' }}>Recent customer orders stored in MySQL table: <code>orders</code></span>
              <button onClick={loadOrders} style={{ border: '1px solid #c9d5d8', background: '#fff', padding: '5px 10px', borderRadius: 4, display: 'inline-flex', gap: 5, alignItems: 'center', fontSize: 12 }}>
                <Icon name="refresh" size={14} /> Refresh
              </button>
            </div>
            <div className="orders-table-wrap">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Area</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {!orders.length ? (
                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: 25, color: '#888' }}>{loadingOrders ? 'Loading orders from MySQL...' : 'No orders in database yet.'}</td></tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id}>
                        <td><b>{o.order_code}</b></td>
                        <td>{o.customer_name}</td>
                        <td>{o.customer_phone}</td>
                        <td>{o.delivery_area}</td>
                        <td>
                          {o.items?.map((it, idx) => (
                            <span key={idx} style={{ display: 'block', fontSize: 11 }}>{it.quantity}x {it.product_name}</span>
                          ))}
                        </td>
                        <td><b>{money(o.total_amount)}</b></td>
                        <td><span className={`status-tag ${o.status}`}>{o.status}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'add' && (
          <form onSubmit={handleAddProduct} style={{ background: '#f8fafb', padding: 18, borderRadius: 6, border: '1px solid #e1e7e9' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 18 }}>Insert New Product into MySQL</h3>
            <p style={{ margin: '0 0 16px', fontSize: 12, color: '#657980' }}>Adding an item will immediately insert a row into the <code>products</code> table in <code>cakebite react</code> database and reflect live on the website.</p>

            {addMsg && <div style={{ padding: 8, background: '#eafaf1', border: '1px solid #2ecc71', color: '#145a32', borderRadius: 4, marginBottom: 12, fontSize: 12 }}>{addMsg}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Cake / Product Name *</label>
                <input required value={newProdName} onChange={(e) => setNewProdName(e.target.value)} placeholder="e.g. Pistachio Milk Cake" />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select value={newProdCatId} onChange={(e) => setNewProdCatId(e.target.value)}>
                  <option value={1}>Combo's</option>
                  <option value={2}>Best Selling</option>
                  <option value={3}>Cakes</option>
                  <option value={4}>Cupcakes</option>
                  <option value={5}>Brownies</option>
                  <option value={6}>Sundae</option>
                  <option value={7}>Bento Cake</option>
                  <option value={8}>Customized Cakes</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (PKR) *</label>
                <input type="number" required value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} placeholder="1999" />
              </div>
              <div className="form-group">
                <label>Original / Old Price (optional)</label>
                <input type="number" value={newProdOldPrice} onChange={(e) => setNewProdOldPrice(e.target.value)} placeholder="2400" />
              </div>
            </div>

            <div className="form-group">
              <label>Badge Tag (optional)</label>
              <input value={newProdBadge} onChange={(e) => setNewProdBadge(e.target.value)} placeholder="e.g. New Arrival, Chef Special" />
            </div>

            <button type="submit" className="gold-btn" style={{ marginTop: 8 }}>
              Insert Cake into Database (cakebite react)
            </button>
          </form>
        )}

        {tab === 'status' && (
          <div>
            <div className="db-conn-box">
              <div className="db-conn-item">
                <strong>Database Name</strong>
                <span>cakebite react</span>
              </div>
              <div className="db-conn-item">
                <strong>Host & Port</strong>
                <span>localhost:3306 (XAMPP MySQL)</span>
              </div>
              <div className="db-conn-item">
                <strong>Connection Status</strong>
                <span style={{ color: dbStatus.connected ? '#27ae60' : '#e74c3c' }}>
                  {dbStatus.connected ? '🟢 Connected & Operational' : '🔴 Connecting...'}
                </span>
              </div>
              <div className="db-conn-item">
                <strong>Database User</strong>
                <span>root (password: empty)</span>
              </div>
              <div className="db-conn-item">
                <strong>Categories Table</strong>
                <span>{dbStatus.counts?.categories || 8} Categories</span>
              </div>
              <div className="db-conn-item">
                <strong>Products Table</strong>
                <span>{dbStatus.counts?.products || 41} Active Cakes</span>
              </div>
              <div className="db-conn-item">
                <strong>Delivery Areas Table</strong>
                <span>{dbStatus.counts?.areas || 13} Karachi Areas</span>
              </div>
              <div className="db-conn-item">
                <strong>Orders Table</strong>
                <span>{orders.length || dbStatus.counts?.orders || 1} Orders Stored</span>
              </div>
            </div>

            <div style={{ marginTop: 18, textAlign: 'center' }}>
              <button className="gold-btn" onClick={refreshDb} style={{ maxWidth: 280, margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Icon name="refresh" size={16} /> Refresh DB Connection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [sectionsData, setSectionsData] = useState(defaultSections);
  const [areasList, setAreasList] = useState([
    'Gulshan-e-Iqbal', 'North Nazimabad', 'Shah Faisal', 'Clifton', 'DHA (Phases 1-8)', 'Boat Basin'
  ]);
  const [dbStatus, setDbStatus] = useState({ connected: false, loading: true, counts: {} });

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [area, setArea] = useState('Clifton');
  const [menuOpen, setMenuOpen] = useState(false);

  // Checkout and DB Manager modals
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [dbModalOpen, setDbModalOpen] = useState(false);

  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  // Fetch sections and check health
  const refreshDb = async () => {
    setDbStatus((prev) => ({ ...prev, loading: true }));
    try {
      // 1. Health check
      let healthRes;
      try {
        healthRes = await fetch(`${API_BASE}/health`);
      } catch {
        healthRes = await fetch(`${PHP_API_BASE}health`);
      }
      const health = await healthRes.json();
      if (health.status === 'connected') {
        setDbStatus({ connected: true, loading: false, counts: health.counts });
      }

      // 2. Fetch sections from MySQL
      let secRes;
      try {
        secRes = await fetch(`${API_BASE}/sections`);
      } catch {
        secRes = await fetch(`${PHP_API_BASE}sections`);
      }
      const sections = await secRes.json();
      if (Array.isArray(sections) && sections.length > 0) {
        setSectionsData(sections);
      }

      // 3. Fetch delivery areas from MySQL
      let areaRes;
      try {
        areaRes = await fetch(`${API_BASE}/areas`);
      } catch {
        areaRes = await fetch(`${PHP_API_BASE}areas`);
      }
      const areas = await areaRes.json();
      if (Array.isArray(areas) && areas.length > 0) {
        setAreasList(areas);
      }
    } catch (err) {
      console.warn('Backend API connecting...', err.message);
      setDbStatus({ connected: false, loading: false, counts: {} });
    }
  };

  useEffect(() => {
    refreshDb();
  }, []);

  const add = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.name === product.name);
      if (idx >= 0) return prev.map((x, i) => i === idx ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const nav = [
    ['Combo’s', '#combos'], ['Best Selling', '#best'], ['Cake', '#cakes'], ['Cupcake', '#cupcakes'], ['Brownies', '#brownies'], ['Sundae', '#sundae'], ['Bento', '#bento'], ['Customized Cake', '#custom']
  ];

  const [activeSection, setActiveSection] = useState('combos');

  const handleSelectCategory = (id, target) => {
    setActiveSection(id);
    const el = document.querySelector(target);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app-shell">
      <AmbientGoldDust />
      <div className="topbar">
        <div className="container topbar-inner">
          <button className="top-link" onClick={() => setAreaOpen(true)}><Icon name="pin" />{area || 'Select Area'}</button>
          <a className="top-link" href="tel:+923342632631"><Icon name="phone" />+92 334 2632631</a>

          {/* Database Connection Pill */}
          <button className="db-pill" onClick={() => setDbModalOpen(true)} title="Click to view MySQL Database & Live Orders">
            <span className={`db-status-dot ${dbStatus.connected ? 'online' : 'offline'}`} />
            <span>MySQL: <b>cakebite react</b></span>
            {dbStatus.connected && <span className="db-badge-count">{dbStatus.counts?.products || 41} Items</span>}
          </button>

          <div className="top-spacer" />
          <span className="follow">Follow Us</span>
          <a className="social" href="https://www.facebook.com/" aria-label="Facebook"><Icon name="facebook" /></a>
          <a className="social" href="https://www.instagram.com/" aria-label="Instagram"><Icon name="instagram" /></a>
          <button className="cart-button" onClick={() => setCartOpen(true)}><Icon name="bag" /><span>{money(total)}</span><b>{count}</b><span>Cart</span></button>
        </div>
      </div>

      <header className="main-header">
        <div className="container header-row">
          <button className="hamburger" onClick={() => setMenuOpen((v) => !v)}><Icon name={menuOpen ? 'x' : 'menu'} size={24}/></button>
          <a href="#top" className="logo-link" aria-label="Cake Bites home"><BrandMark /></a>
          <nav className="desktop-nav">
            {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            <button 
              onClick={() => setDbModalOpen(true)}
              style={{ background: 'rgba(213,163,72,0.15)', border: '1px solid var(--gold)', color: 'var(--gold2)', padding: '6px 14px', borderRadius: 4, fontWeight: 700, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              ⚡ Orders & DB
            </button>
          </nav>
          <button className="mobile-cart" onClick={() => setCartOpen(true)}><Icon name="bag" /><span>{count}</span></button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu">
            {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <button onClick={() => { setMenuOpen(false); setDbModalOpen(true); }} style={{ margin: '10px 0', padding: '10px', background: 'var(--gold)', border: 0, fontWeight: 700, color: '#000' }}>
              ⚡ Open MySQL Database Manager
            </button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <img src={ASSET.hero} alt="Cake Bites hero" />
          <div className="hero-overlay"><div className="hero-copy"><span className="eyebrow">Serving sweet moments in Karachi</span><h1>Premium cakes, baked for memorable moments.</h1><a href="#best" className="hero-cta">Explore Best Sellers</a></div></div>
        </section>

        {/* Category Navigation Strip */}
        <CategoryNav 
          activeSection={activeSection} 
          onSelectSection={handleSelectCategory} 
        />

        {sectionsData.map((section) => <Section key={section.id} section={section} onAdd={add} />)}
      </main>

      <footer>
        <div className="footer-grid container">
          <div><BrandMark /><p>At CakeBites.pk, we create delicious baked treats that bring sweetness, joy, and warmth to every occasion. From rich chocolate cakes and creamy cheesecakes to freshly baked desserts, every item is made with care and premium-quality ingredients.</p></div>
          <div><h3>FIND US</h3><a href="tel:+923342632631">+92 334 2632631</a><span>Shop #18, Block 4, Gulshan-e-Iqbal, Karachi</span><span>North Nazimabad • Shah Faisal • Clifton</span></div>
          <div><h3>FOLLOW US</h3><div className="footer-socials"><a href="#"><Icon name="facebook" /></a><a href="#"><Icon name="instagram" /></a></div><a href="mailto:info@cakebites.pk">info@cakebites.pk</a></div>
        </div>
        <div className="copyright">all rights reserved cakebites and powered by <a href="https://rojrztech.com">rojrztech</a> • Connected to MySQL: cakebite react</div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart} 
        setCart={setCart} 
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      {/* Delivery Area Modal */}
      <AreaModal open={areaOpen} onClose={() => setAreaOpen(false)} area={area} setArea={setArea} areasList={areasList} />

      {/* Checkout Modal (Saves to MySQL) */}
      <CheckoutModal 
        open={checkoutOpen} 
        onClose={() => setCheckoutOpen(false)} 
        cart={cart} 
        area={area} 
        total={total} 
        onOrderPlaced={(newOrder) => {
          setCart([]);
          setCheckoutOpen(false);
          setOrderSuccess(newOrder);
          refreshDb();
        }} 
      />

      {/* Order Confirmed Modal */}
      <OrderSuccessModal 
        order={orderSuccess} 
        onClose={() => setOrderSuccess(null)} 
        onOpenDbManager={() => { setOrderSuccess(null); setDbModalOpen(true); }}
      />

      {/* Database & Orders Manager */}
      <DbManagerModal 
        open={dbModalOpen} 
        onClose={() => setDbModalOpen(false)} 
        dbStatus={dbStatus} 
        refreshDb={refreshDb}
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
