import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import HeroCake3D from './HeroCake3D';
import CakeStudio3D from './CakeStudio3D';
import CakeViewer3DModal from './CakeViewer3DModal';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import MenuPage from './MenuPage';
import ProductPage from './ProductPage';
import CheckoutPage from './CheckoutPage';
import CartPage from './CartPage';
import CustomCakesArchivePage from './CustomCakesArchivePage';
import CategoryArchivePage from './CategoryArchivePage';
import logoWhiteImg from './assets/cakebites-logo-white.png';
import logoColorImg from './assets/cakebites-logo.png';
import logoBwImg from './assets/cakebites-logo-bw.png';

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
  logo: logoBwImg || '/assets/brand/cakebites-logo-bw.png',
  logoColor: logoColorImg || '/assets/brand/cakebites-logo.png',
  logoBw: logoBwImg || '/assets/brand/cakebites-logo-bw.png',
  logoWhite: logoWhiteImg || '/assets/brand/cakebites-logo-white.png',
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
  'Oreo Twister Cup Cake': '/assets/products/salted-caramel-cupcake.jpeg',
  'Lite Coffee Cup Cake': '/assets/products/swiss-dark-cupcake.jpeg',

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
  "Bento Cake - Red Berries & Sparkler": "/assets/products/bento-cake-1.png",
  "Bento Cake - Golden Love Script": "/assets/products/bento-cake-2.png",
  "Bento Cake - Sage Green Vintage": "/assets/products/bento-cake-3.png",
  "Bento Cake - Ivory Pearl Ruffle": "/assets/products/bento-cake-4.png",
  "Bento Cake - Cartoon Love Doodles": "/assets/products/bento-cake-5.png",
  "Bento Cake - Midnight Galaxy Constellation": "/assets/products/bento-cake-6.png",
  "Bento Cake - Mocha Woodgrain Minimalist": "/assets/products/bento-cake-7.png",
  "Bento Cake - Happy 100 Day Peach": "/assets/products/bento-cake-8.png",
  "Bento Cake - Blue Hearts Papa": "/assets/products/bento-cake-1.png",
  "Bento Cake - Pastel 3D Birthday Letters": "/assets/products/bento-cake-2.png",
  "Bento Cake - Colorful Jina’s Day": "/assets/products/bento-cake-3.png",
  "Bento Cake - Vintage Lambeth Garland": "/assets/products/bento-cake-4.png",
  "Bento Cake - Watercolor 18th Birthday": "/assets/products/bento-cake-5.png",
  "Bento Cake - Dripping Pearl Tiered": "/assets/products/bento-cake-6.png",
  "Bento Cake - Classic Navy Blue Border": "/assets/products/bento-cake-7.png",
  "Bento Cake - Blue Brush Stroke Palette": "/assets/products/bento-cake-8.png",
  "Bento Cake - Rich Chocolate Fluted": "/assets/products/bento-cake-1.png",
  "Bento Cake - Red Lipstick Kiss Prints": "/assets/products/bento-cake-2.png",
  "Bento Cake - Pink Satin Bows & Ruffles": "/assets/products/bento-cake-3.png",
  "Bento Cake - Scalloped Wave Border": "/assets/products/bento-cake-4.png",

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
      ["Double Fudge Cake", 1999, 2350, "/assets/products/double-fudge-cake.jpeg", "Top Rated"],
      ["Lotus Three Milk Cake", 2099, 2500, "/assets/products/lotus-three-milk-cake.jpeg", "Trending"],
      ["Nutella Cake (Medium)", 2049, 2400, "/assets/products/nutella-cake.jpeg", "Popular"],
      ["Three Milk Mango Cake", 2199, 2600, "/assets/products/three-milk-mango-cake.jpg", "Chef Pick"],
      ["Dream Lava Cake", 2349, 2800, "/assets/products/dream-lava-cake.webp", "Hot Seller"],
      ["Ferrero Rocher Chocolate Cake", 3500, 4000, "/assets/products/ferrero-rocher-cake.png", "Luxury"],
      ["German Fudge Cake (Medium)", 1799, null, "/assets/products/german-fudge-cake.webp"],
      ["Red Velvet Cake (Medium)", 2199, null, "/assets/products/red-velvet-cake.jpeg"],
      ["Belgian Malt Cake (Medium)", 2099, null, "/assets/products/belgian-malt-cake.jpeg"],
      ["Chocolate Mousse Cake", 1699, null, "/assets/products/chocolate-mousse-cake.jpeg"],
      ["Milky Malt Cake", 1799, 2150, "/assets/products/milky-malt-cake.jpeg", "Special Price"],
      ["Coffee Cake", 1799, null, "/assets/products/coffee-cake.png"],
      ["Black Forest Cake", 1799, null, "/assets/products/black-forest-cake.png"],
      ["Pineapple Cake", 1799, null, "/assets/products/pineapple-cake.jpeg"],
      ["Three Milk Cake (Medium)", 1999, null, "/assets/products/three-milk-cake.webp"],
      ["Ferrerro Classic Cake (Medium)", 2299, null, "/assets/products/ferrero-classic-cake.jpg"],
      ["Chocolate Heaven Cake", 2199, null, "/assets/products/chocolate-heaven-cake.png"],
      ["KitKat Chocolate Cake", 2299, null, "/assets/products/kitkat-chocolate-cake.png"],
      ["Dairy Milk Cake", 2299, null, "/assets/products/dairy-milk-cake.png"],
      ["Salted Caramel Cake", 2199, null, "/assets/products/salted-caramel-cake.png"],
      ["Raffaello Cake", 2499, null, "/assets/products/raffaello-cake.jpg"],
      ["Lotus Cheese Cake (Medium)", 2499, 2800, "/assets/products/lotus-cheesecake.png", "Cheesecake"],
      ["New York Cheese Cake (Medium)", 2499, null, "/assets/products/new-york-cheesecake.webp"],
      ["Strawberry Cheese Cake (Medium)", 2599, null, "/assets/products/strawberry-cheesecake.jpeg"],
      ["Blueberry Cheese Cake (Medium)", 2599, null, "/assets/products/blueberry-cheesecake.png"],
      ["Chocolate Cakes (Medium)", 2200, null, "/assets/products/chocolate-mousse-cake.jpeg"],
    ],
  },
  {
    id: 'cupcakes',
    title: 'Cupcakes',
    banner: ASSET.cupcakes,
    category: 'Cupcakes',
    products: [
      ["Ferrero Cup Cake", 249, null, "/assets/products/ferrero-cupcake.jpeg"],
      ["Belgian Chocolate Cup Cakes", 249, null, "/assets/products/belgian-chocolate-cupcake.png"],
      ["M&M Cup Cake", 249, null, "/assets/products/mm-cupcake.jpeg"],
      ["Swiss Dark Cup Cake", 249, null, "/assets/products/swiss-dark-cupcake.jpeg"],
      ["Milky Chocolate Cup Cake", 249, null, "/assets/products/milky-chocolate-cupcake.jpeg"],
      ["Nutella Chocolate Cup Cake", 249, null, "/assets/products/nutella-chocolate-cupcake.jpg"],
      ["Red Velvet Cup Cake", 249, null, "/assets/products/red-velvet-cupcake.jpg"],
      ["Salted Caramel Cup Cake", 249, null, "/assets/products/salted-caramel-cupcake.jpeg"],
      ["Oreo Twister Cup Cake", 249, null, "/assets/products/salted-caramel-cupcake.jpeg"],
      ["Lite Coffee Cup Cake", 249, null, "/assets/products/swiss-dark-cupcake.jpeg"],
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
      ["Three Milk Sundae", 399, null, "/assets/products/three-milk-sundae.webp", "Popular"],
      ["Nutella Sundae", 399, null, "/assets/products/nutella-sundae.webp", "Trending"],
      ["Galaxy Sundae", 399, null, "/assets/products/galaxy-sundae.jpg"],
      ["Red Velvet Sundae", 399, null, "/assets/products/red-velvet-sundae.webp"],
      ["Lotus Three Milk Sundae", 450, null, "/assets/products/three-milk-sundae.webp", "New"],
    ],
  },
    {
    id: 'bento',
    title: 'Bento Cake',
    banner: ASSET.bento,
    category: 'Bento Cake',
    products: [
      ["Bento Cake - Red Berries & Sparkler", 2999, null, "/assets/products/bento-cake-1.png", "Bestseller"],
      ["Bento Cake - Golden Love Script", 2999, null, "/assets/products/bento-cake-2.png", "Popular"],
      ["Bento Cake - Sage Green Vintage", 2999, null, "/assets/products/bento-cake-3.png", "Trending"],
      ["Bento Cake - Ivory Pearl Ruffle", 2999, null, "/assets/products/bento-cake-4.png"],
      ["Bento Cake - Cartoon Love Doodles", 2999, null, "/assets/products/bento-cake-5.png", "Cute"],
      ["Bento Cake - Midnight Galaxy Constellation", 2999, null, "/assets/products/bento-cake-6.png", "Special"],
      ["Bento Cake - Mocha Woodgrain Minimalist", 2999, null, "/assets/products/bento-cake-7.png"],
      ["Bento Cake - Happy 100 Day Peach", 2999, null, "/assets/products/bento-cake-8.png"],
      ["Bento Cake - Blue Hearts Papa", 2999, null, "/assets/products/bento-cake-1.png"],
      ["Bento Cake - Pastel 3D Birthday Letters", 2999, null, "/assets/products/bento-cake-2.png", "Popular"],
      ["Bento Cake - Colorful Jina’s Day", 2999, null, "/assets/products/bento-cake-3.png"],
      ["Bento Cake - Vintage Lambeth Garland", 2999, null, "/assets/products/bento-cake-4.png", "Vintage"],
      ["Bento Cake - Watercolor 18th Birthday", 2999, null, "/assets/products/bento-cake-5.png"],
      ["Bento Cake - Dripping Pearl Tiered", 2999, null, "/assets/products/bento-cake-6.png", "Luxury"],
      ["Bento Cake - Classic Navy Blue Border", 2999, null, "/assets/products/bento-cake-7.png"],
      ["Bento Cake - Blue Brush Stroke Palette", 2999, null, "/assets/products/bento-cake-8.png"],
      ["Bento Cake - Rich Chocolate Fluted", 2999, null, "/assets/products/bento-cake-1.png"],
      ["Bento Cake - Red Lipstick Kiss Prints", 2999, null, "/assets/products/bento-cake-2.png", "Trending"],
      ["Bento Cake - Pink Satin Bows & Ruffles", 2999, null, "/assets/products/bento-cake-3.png", "Popular"],
      ["Bento Cake - Scalloped Wave Border", 2999, null, "/assets/products/bento-cake-4.png"],
    ],
  },
  {
    id: 'custom',
    title: 'Customized Cakes',
    banner: ASSET.custom,
    category: 'Customized Cakes',
    products: [
      ["Custom Celebration Box (6 Pcs)", 4800, null, "/assets/products/custom-cupcake-box-1.png", "Bestseller"],
      ["Rosy Blush Elegance Cake", 4800, null, "/assets/products/custom-cupcake-box-2.png", "Popular"],
      ["Scarlet Butterfly Classic Cake", 4800, null, "/assets/products/custom-cupcake-box-3.png", "Popular"],
      ["Royal Burgundy Bloom Cake", 5200, null, "/assets/products/custom-cupcake-box-4.png", "Trending"],
      ["Vintage Storybook Bouquet Cake", 5200, null, "/assets/products/custom-cupcake-box-5.png"],
      ["Midnight Onyx Roses Cake", 5500, null, "/assets/products/custom-cupcake-box-6.png", "Luxury"],
      ["Crimson Prestige Cake", 4900, null, "/assets/products/custom-cupcake-box-7.png"],
      ["Pink Petal Harmony Cake", 4800, null, "/assets/products/custom-cupcake-box-8.png"],
      ["Pink Rose Perfection (Medium)", 4600, null, "/assets/products/custom-cupcake-box-1.png"],
      ["Mom’s Sweet Surprise Cake", 4500, null, "/assets/products/custom-cupcake-box-2.png", "Special"],
      ["Mother’s Day Magic Box", 4900, null, "/assets/products/custom-cupcake-box-3.png"],
      ["Sweet Moments with Mom", 4500, null, "/assets/products/custom-cupcake-box-4.png"],
      ["Bloom & Bliss for Ammi", 4800, null, "/assets/products/custom-cupcake-box-5.png"],
      ["Colourful Music Cake (Medium)", 5200, null, "/assets/products/custom-cupcake-box-6.png"],
      ["Ivory Floral Touch Cake", 4800, null, "/assets/products/custom-cupcake-box-7.png"],
      ["Cherry Blossom Mini Cake", 4500, null, "/assets/products/custom-cupcake-box-8.png"],
      ["Golden Drizzle Bloom Cake", 5400, null, "/assets/products/custom-cupcake-box-1.png"],
      ["Pink Velvet Note Cake", 4800, null, "/assets/products/custom-cupcake-box-2.png"],
      ["Vintage Ruffle Bloom Cake", 5200, null, "/assets/products/custom-cupcake-box-3.png"],
      ["Rose Quartz Delight Cake", 5000, null, "/assets/products/custom-cupcake-box-4.png"],
      ["Macaron Blush Cake", 5500, null, "/assets/products/custom-cupcake-box-5.png", "Chef Pick"],
      ["Maas Love Special Cake", 4800, null, "/assets/products/custom-cupcake-box-6.png"],
      ["Blush Confetti Mini Cake", 4500, null, "/assets/products/custom-cupcake-box-7.png"],
      ["Heartful Surprise Cake", 4800, null, "/assets/products/custom-cupcake-box-8.png"],
      ["Daisy Pink Topper Cake", 4600, null, "/assets/products/custom-cupcake-box-1.png"],
      ["Rosy Cream Dream Cake", 4800, null, "/assets/products/custom-cupcake-box-2.png"],
      ["Floral Glow Mini Cake", 4500, null, "/assets/products/custom-cupcake-box-3.png"],
      ["Peachy Hearts Cake", 4500, null, "/assets/products/custom-cupcake-box-4.png"],
      ["Golden Bloom Bite Cake", 4800, null, "/assets/products/custom-cupcake-box-5.png"],
      ["Sweet Bloom Hearts Cake", 4800, null, "/assets/products/custom-cupcake-box-6.png"],
      ["Love Dots Delight Cake", 4600, null, "/assets/products/custom-cupcake-box-7.png"],
      ["Graceful Garden Cake", 5200, null, "/assets/products/custom-cupcake-box-8.png"],
      ["Strawberry Bloom Cake", 4800, null, "/assets/products/custom-cupcake-box-1.png"],
      ["Petal Blush Cake", 4800, null, "/assets/products/custom-cupcake-box-2.png"],
      ["Floral Elegance Cupcake Box", 4800, null, "/assets/products/custom-cupcake-box-3.png"],
      ["Deluxe Birthday Ensemble Box", 5200, null, "/assets/products/custom-cupcake-box-4.png"],
      ["Princess Theme Cupcake Box", 5200, null, "/assets/products/custom-cupcake-box-5.png"],
      ["Artisanal Fondant Cupcake Box", 5600, null, "/assets/products/custom-cupcake-box-6.png"],
      ["Grand Assorted Party Box", 6400, null, "/assets/products/custom-cupcake-box-7.png", "Luxury"],
      ["85 Flowers Handmade Ribbon Bouquet Stand", 6500, null, "/assets/products/custom-cupcake-box-8.png", "Bouquet"],
      ["26 Flowers Handmade Ribbon Bouquet Stand", 4500, null, "/assets/products/custom-cupcake-box-1.png", "Bouquet"],
      ["26 Flowers Handmade Ribbon Bouquet", 3500, null, "/assets/products/custom-cupcake-box-2.png", "Bouquet"],
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
        <rect x="15" y="24" width="34" height="25" rx="3" />
        <rect x="12" y="17" width="40" height="7" rx="2" />
        <line x1="32" y1="17" x2="32" y2="49" />
        <path d="M32 17 C26 9 17 9 20 16 C22 19 29 17 32 17 Z" />
        <path d="M32 17 C38 9 47 9 44 16 C42 19 35 17 32 17 Z" />
        <circle cx="32" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'best',
    label: 'Best Selling',
    target: '#best',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <path d="M19 39 L38 20 L49 23 L51 34 L32 53 Z" />
        <circle cx="43" cy="27" r="2.8" />
        <line x1="27" y1="37" x2="35" y2="45" />
      </svg>
    ),
  },
  {
    id: 'cakes',
    label: 'Cake',
    target: '#cakes',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <path d="M13 50 h38" />
        <path d="M25 50 v3 h14 v-3" />
        <path d="M17 32 v14 c0 2 2 4 4 4 h22 c2 0 4 -2 4 -4 V32" />
        <path d="M17 36 c3 2 6 0 9 2 s6 -2 9 0 s6 -2 9 0" />
        <circle cx="28" cy="24" r="3.2" />
        <circle cx="36" cy="22" r="3.2" />
        <path d="M29 21 c1 -4 4 -6 7 -4" />
      </svg>
    ),
  },
  {
    id: 'cupcakes',
    label: 'Cupcake',
    target: '#cupcakes',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <path d="M20 33 l3.5 19 h17 l3.5 -19 Z" />
        <line x1="26" y1="33" x2="28" y2="52" />
        <line x1="32" y1="33" x2="32" y2="52" />
        <line x1="38" y1="33" x2="36" y2="52" />
        <path d="M18 33 c-2 -4 2 -8 6 -8 c1 -4 6 -7 10 -7 c5 0 8 3 9 7 c4 0 7 4 5 8 Z" />
        <circle cx="34" cy="14" r="3" />
        <path d="M34 11 c2 -4 6 -5 9 -4" />
      </svg>
    ),
  },
  {
    id: 'brownies',
    label: 'Brownies',
    target: '#brownies',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <rect x="15" y="17" width="34" height="34" rx="5" />
        <path d="M15 28 c3 2 6 -2 9 1 s6 2 9 -1 s6 2 9 0" />
        <line x1="23" y1="37" x2="27" y2="41" />
        <line x1="32" y1="35" x2="36" y2="39" />
        <line x1="24" y1="45" x2="28" y2="43" />
        <line x1="37" y1="44" x2="42" y2="42" />
      </svg>
    ),
  },
  {
    id: 'sundae',
    label: 'Sundae',
    target: '#sundae',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <path d="M19 25 h26 l-3.5 24 h-19 Z" />
        <line x1="20.5" y1="32" x2="43.5" y2="32" />
        <line x1="22" y1="39" x2="42" y2="39" />
        <line x1="20" y1="49" x2="44" y2="49" />
        <path d="M20 25 c-2 -3 1 -6 5 -6 c2 -4 7 -5 10 -3 c4 -2 9 1 9 5 c3 1 4 4 2 4 Z" />
        <line x1="23" y1="9" x2="29" y2="24" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    id: 'bento',
    label: 'Bento',
    target: '#bento',
    svg: (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="cat-card-svg">
        <ellipse cx="32" cy="46" rx="22" ry="6" />
        <path d="M17 32 v11 c0 2 6 5 15 5 s15 -3 15 -5 V32" />
        <ellipse cx="32" cy="32" rx="15" ry="5" />
        <circle cx="28" cy="24" r="2.8" />
        <circle cx="36" cy="23" r="2.8" />
        <path d="M28 21 c1 -4 4 -6 7 -4" />
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
        <line x1="12" y1="51" x2="52" y2="51" />
        <rect x="16" y="36" width="32" height="15" rx="3" />
        <rect x="22" y="24" width="20" height="12" rx="2" />
        <path d="M16 41 c3 1.5 5 -1.5 8 1 s5 -1 8 1 s5 -1 8 1" />
        <path d="M22 28 c2.5 1 4 -1 6.5 1 s4 -1 6.5 1" />
        <line x1="32" y1="16" x2="32" y2="21" />
        <path d="M25 18 l-2 -3 M39 18 l2 -3 M32 13 l0 -3" />
      </svg>
    ),
  },
];

const POPUP_CATEGORIES = [
  { id: 'cakes', label: 'Cake', target: '#cakes' },
  { id: 'cupcakes', label: 'Cupcake', target: '#cupcakes' },
  { id: 'brownies', label: 'Brownies', target: '#brownies' },
  { id: 'sundae', label: 'Sundae', target: '#sundae' },
  { id: 'bento', label: 'Bento Cake', target: '#bento' },
  { id: 'custom', label: 'Customized Cake', target: '#custom' },
  { id: 'combos', label: "Combo's", target: '#combos' },
  { id: 'best', label: 'Best Selling Product', target: '#best' },
];

function CategoryNav({ activeSection, onSelectSection, onOpenStudio, onOpenMenu }) {
  const sectionRef = useRef(null);
  const [isPoppedUp, setIsPoppedUp] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Immediate auto pop-up on page render
    const t = setTimeout(() => setIsPoppedUp(true), 60);

    // Also trigger on IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPoppedUp(true);
          }
        });
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Floating sticky bar when scrolled past in-page Category Section
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setIsSticky(rect.bottom < 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(t);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* SECTION 2: In-Page Auto Pop-Up Category Nav Bar (Exact Match to Screenshot) */}
      <section 
        ref={sectionRef} 
        className={`cat-nav-section ${isPoppedUp ? 'is-popped-up' : ''}`} 
        aria-label="Product Categories"
      >
        <div className="cat-ornament-divider">
          <img src={ASSET.divider} alt="" loading="lazy" />
        </div>

        <div className="cat-nav-outer">
          <div className="cat-nav-box-frame">
            {/* Category Bar Hamburger Button (Matches User Reference Image 3) */}
            {onOpenMenu && (
              <button
                type="button"
                className="cat-nav-menu-btn"
                onClick={onOpenMenu}
                aria-label="Open Navigation Menu"
                title="Open Navigation Menu"
              >
                <span className="cat-nav-menu-bar" />
                <span className="cat-nav-menu-bar" />
                <span className="cat-nav-menu-bar" />
              </button>
            )}

            <div className="cat-nav-scroll-wrapper">
              {CATEGORY_CARDS.map((cat, idx) => {
                const isActive = activeSection === cat.id;
                return (
                  <a
                    key={cat.id}
                    href={cat.target}
                    style={{ '--card-index': idx }}
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

      {/* Floating Sticky Category Bar — Auto pops down when scrolling cakes */}
      <aside 
        className={`sticky-cat-nav-bar ${isSticky ? 'is-visible' : ''}`} 
        aria-label="Quick Category Navigation"
        aria-hidden={!isSticky}
      >
        <div className="sticky-cat-nav-inner">
          {/* Sticky Category Bar Hamburger Button */}
          {onOpenMenu && (
            <button
              type="button"
              className="sticky-cat-menu-btn"
              onClick={onOpenMenu}
              aria-label="Open Navigation Menu"
              title="Open Navigation Menu"
            >
              <span className="sticky-cat-menu-bar" />
              <span className="sticky-cat-menu-bar" />
              <span className="sticky-cat-menu-bar" />
            </button>
          )}

          <div className="sticky-cat-nav-scroll">
            {CATEGORY_CARDS.map((cat) => {
              const isActive = activeSection === cat.id;
              return (
                <a
                  key={cat.id}
                  href={cat.target}
                  className={`sticky-cat-card-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectSection(cat.id, cat.target);
                  }}
                  title={`Browse ${cat.label}`}
                >
                  <div className="sticky-cat-icon">
                    {cat.svg}
                  </div>
                  <span className="sticky-cat-label">{cat.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </>
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

    // Pre-render soft glowing gold sprite to offscreen canvas (avoids CPU shadowBlur every frame!)
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 32;
    spriteCanvas.height = 32;
    const sctx = spriteCanvas.getContext('2d');
    const grad = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 240, 180, 1)');
    grad.addColorStop(0.35, 'rgba(235, 190, 95, 0.7)');
    grad.addColorStop(0.7, 'rgba(213, 163, 72, 0.2)');
    grad.addColorStop(1, 'rgba(213, 163, 72, 0)');
    sctx.fillStyle = grad;
    sctx.beginPath();
    sctx.arc(16, 16, 16, 0, Math.PI * 2);
    sctx.fill();

    // 22 smooth twinkling particles
    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 1.0,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let isVisible = true;
    const handleVisibility = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animId);
      } else {
        if (!isVisible) {
          isVisible = true;
          animId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulsePhase += p.pulseSpeed;

        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const currentOpacity = p.opacity * (0.65 + 0.35 * Math.sin(p.pulsePhase));
        const diam = p.size * 6;
        ctx.globalAlpha = Math.max(0.08, currentOpacity);
        ctx.drawImage(spriteCanvas, p.x - diam / 2, p.y - diam / 2, diam, diam);
      }
      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
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

function ScrollProgressBar() {
  const barRef = useRef(null);
  const glowRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const sectionIds = ['combos', 'best', 'cakes', 'cupcakes', 'brownies', 'sundae', 'bento', 'custom'];

    const updateBar = () => {
      ticking = false;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0;

      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${progress}%`;
      }

      if (rootRef.current) {
        rootRef.current.setAttribute('aria-valuenow', Math.round(progress));
        if (progress > 0) {
          rootRef.current.classList.add('scroll-progress-visible');
        } else {
          rootRef.current.classList.remove('scroll-progress-visible');
        }

        let close = false;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top >= -60 && rect.top <= 120) {
              close = true;
              break;
            }
          }
        }
        if (close) {
          rootRef.current.classList.add('scroll-progress-hide');
        } else {
          rootRef.current.classList.remove('scroll-progress-hide');
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateBar);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateBar();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={rootRef}
      className="scroll-progress-bar"
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div ref={barRef} className="scroll-progress-fill" style={{ width: '0%' }} />
      <div ref={glowRef} className="scroll-progress-glow" style={{ left: '0%' }} />
    </div>
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

function BrandMark({ compact = false, color = false }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={color ? ASSET.logoColor : ASSET.logo} 
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

const getCardFallback = (name = '', section = {}) => {
  const n = (name + ' ' + (section?.title || '') + ' ' + (section?.category || '')).toLowerCase();
  if (n.includes('bento')) return '/assets/products/bento-cake-1.png';
  if (n.includes('cupcake') || n.includes('cup cake')) return '/assets/products/belgian-chocolate-cupcake.png';
  if (n.includes('brownie')) return '/assets/products/nutella-brownie.webp';
  if (n.includes('sundae')) return '/assets/products/three-milk-sundae.webp';
  if (n.includes('box') || n.includes('custom') || n.includes('flower') || n.includes('bouquet')) return '/assets/products/custom-cupcake-box-1.png';
  if (n.includes('cheesecake') || n.includes('cheese cake')) return '/assets/products/lotus-cheesecake.png';
  return '/assets/products/german-fudge-cake.webp';
};

const ProductCard = React.memo(function ProductCard({ item, section = {}, index, onAdd, onView3D }) {
  const name = Array.isArray(item) ? item[0] : item?.name || '';
  const price = Array.isArray(item) ? item[1] : item?.price || 0;
  const old = Array.isArray(item) ? item[2] : item?.original_price || null;
  const imageFromDb = Array.isArray(item) ? item[3] : item?.image_url;
  const badge = Array.isArray(item) ? item[4] : item?.badge;

  const [added, setAdded] = useState(false);
  const fallback = getCardFallback(name, section);
  const imageSrc = imageFromDb || REAL_PRODUCT_IMAGES[name] || fallback;
  const categoryLabel = section?.category || section?.title || (name.toLowerCase().includes('bento') ? 'Bento Cake' : 'Cake Bites');

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd({ name, price, image: imageSrc });
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article 
      className="product-card is-revealed" 
      onClick={() => onView3D && onView3D({ 
        name, 
        price, 
        original_price: old,
        image: imageSrc, 
        badge,
        category: categoryLabel,
        customDetails: item?.customDetails 
      })} 
      style={{ cursor: 'pointer' }}
    >
      <div className="product-art">
        <img 
          src={imageSrc} 
          alt={name} 
          loading="lazy" 
          className="product-img" 
          onError={(e) => { 
            if (!e.currentTarget.dataset.fallback) {
              e.currentTarget.dataset.fallback = 'true';
              e.currentTarget.src = fallback;
            }
          }} 
        />
        {/* Luxury diagonal light gleam beam */}
        <div className="product-art-shimmer" aria-hidden="true" />
        {badge && (
          <div className="product-art-badges">
            <span className={`badge-tag ${badge.toLowerCase().includes('sale') ? 'sale-badge' : ''}`}>
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="product-body">
        <div className="product-meta-row">
          <span className="product-category">{categoryLabel}</span>
        </div>

        <h3 title={name}>{name}</h3>

        <div className="price-row">
          <div className="price-values">
            {old && <span className="old-price">{money(old)}</span>}
            <span className="price">{money(price)}</span>
          </div>
        </div>

        <button 
          type="button"
          className={`add-btn ${added ? 'added' : ''}`} 
          onClick={handleAdd}
          title={name.includes('Medium') ? 'Choose cake options' : 'Add to shopping cart'}
        >
          {added ? (
            <>
              <span className="add-btn-feedback">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added to Cart!
              </span>
              <div className="cart-burst-container" aria-hidden="true">
                <span className="burst-star s1">✨</span>
                <span className="burst-star s2">⭐</span>
                <span className="burst-star s3">✨</span>
                <span className="burst-star s4">💛</span>
                <span className="burst-star s5">✨</span>
              </div>
            </>
          ) : (
            <span className="add-btn-inner">
              <svg className="cart-bag-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.5 8.5h13a1.5 1.5 0 0 1 1.5 1.5v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a1.5 1.5 0 0 1 1.5-1.5z" />
                <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
              </svg>
              Add to Cart
            </span>
          )}
        </button>
      </div>
    </article>
  );
});

const ProductSlider = React.memo(React.forwardRef(({ products, section, onAdd, onView3D }, ref) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.85;
    if (direction === 'next') {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  React.useImperativeHandle(ref, () => ({
    scrollNext: () => handleScroll('next'),
    scrollPrev: () => handleScroll('prev')
  }));

  // Autoplay / Auto-slide effect (with hover pause & smooth infinite loop)
  useEffect(() => {
    if (isPaused || products.length <= 4) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      
      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const step = el.clientWidth * 0.85;
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, products.length]);

  return (
    <div 
      className="product-slider-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 2500)}
    >
      {/* Slider Track */}
      <div className="product-slider-track" ref={scrollRef}>
        {products.map((p, i) => (
          <div className="product-slider-item" key={`${section.id}-${i}-${Array.isArray(p) ? p[0] : p.name}`}>
            <ProductCard 
              item={p} 
              section={section} 
              index={i} 
              onAdd={onAdd} 
              onView3D={onView3D}
            />
          </div>
        ))}
      </div>

      {/* Bottom Controls Row: Progress Bar */}
      {products.length > 4 && (
        <div className="slider-bottom-controls">
          <div className="slider-progress-wrap" title={`Progress: ${Math.round(scrollProgress)}%`}>
            <div className="slider-progress-bar" style={{ width: `${Math.max(16, scrollProgress)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}));

const Section = React.memo(function Section({ section, onAdd, onView3D, onOpenStudio, onNavigate }) {
  const sliderRef = useRef(null);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollPrev();
    }
  };

  const hasMultiplePages = section.products && section.products.length > 4;

  return (
    <section id={section.id} className="shop-section">
      <div className="divider"><img src={ASSET.divider} alt="" /></div>
      <div 
        className="section-banner" 
        onClick={() => onNavigate && onNavigate('category-archive', section.id)}
        style={{ cursor: onNavigate ? 'pointer' : 'default' }}
        title={`Click to view all ${section.title} in Archive`}
      >
        <img src={section.banner} alt={`${section.title} banner`} />
      </div>

      <div className="section-head">
        <div className="section-head-title-group">
          <span>Discover</span>
          <h2>{section.title}</h2>
        </div>
        <span className="gold-line" />
        <div className="section-head-controls">
          {onNavigate && (
            <button 
              type="button" 
              className="sec-view-all-btn"
              onClick={() => onNavigate('category-archive', section.id)}
              title={`Explore All ${section.title} in Archive`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '50px',
                background: 'rgba(213, 163, 72, 0.15)',
                border: '1px solid rgba(213, 163, 72, 0.35)',
                color: '#f0cf7a',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginRight: '6px'
              }}
            >
              <span>View All</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
          {hasMultiplePages && (
            <>
              <button 
                type="button" 
                className="sec-arrow-btn" 
                onClick={handlePrev} 
                title="Previous Cakes" 
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button 
                type="button" 
                className="sec-arrow-btn sec-arrow-btn--next" 
                onClick={handleNext} 
                title="Next Cakes" 
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      <ProductSlider 
        ref={sliderRef}
        products={section.products} 
        section={section} 
        onAdd={onAdd} 
        onView3D={onView3D} 
      />

      {section.id === 'custom' && onNavigate && (
        <div style={{ textAlign: 'center', margin: '30px 0 10px' }}>
          <button
            type="button"
            onClick={() => onNavigate('custom-archive')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '13px 28px',
              background: 'linear-gradient(135deg, rgba(213,163,72,0.2) 0%, rgba(213,163,72,0.1) 100%)',
              border: '1.5px solid #d5a348',
              borderRadius: '50px',
              color: '#f0cf7a',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <span>🎨 Explore All 19 Custom Cake Categories & Styles</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
});

function CartDrawer({ open, onClose, cart, setCart, onCheckout, onViewCart }) {
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
                      style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 6, background: '#093344' }} 
                    />
                  )}
                  <div>
                    <strong>{item.name}</strong>
                    {item.customDetails && (
                      <div style={{ fontSize: 11.5, color: '#9cb3bc', margin: '3px 0 4px', lineHeight: 1.35 }}>
                        <div>🍰 {item.customDetails.tiers} • {item.customDetails.frosting}</div>
                        {item.customDetails.toppings && item.customDetails.toppings !== 'None' && <div>✨ {item.customDetails.toppings}</div>}
                        {item.customDetails.message && item.customDetails.message !== 'None' && <div>💌 "{item.customDetails.message}"</div>}
                      </div>
                    )}
                    <small>{item.qty} × {money(item.price)}</small>
                  </div>
                </div>
                <button onClick={() => remove(i)} title="Remove item" aria-label="Remove item">×</button>
              </div>
            ))
          )}
        </div>
        {!!cart.length && (
          <div className="drawer-footer">
            <div className="drawer-subtotal-row">
              <span>Subtotal</span>
              <strong>{money(total)}</strong>
            </div>
            <div className="drawer-btn-grid">
              <button 
                type="button" 
                className="drawer-btn-view-cart" 
                onClick={onViewCart}
                title="View full shopping cart"
              >
                View Cart
              </button>
              <button 
                type="button" 
                className="gold-btn drawer-btn-checkout" 
                onClick={onCheckout}
                title="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

const KARACHI_AREAS_COORDS = [
  {
    name: 'Shah Faisal Colony',
    lat: 24.8824,
    lng: 67.1483,
    keywords: [
      'shah faisal', 'shah faisal colony', 'shahfaisal', 'faisal colony', 'faisal',
      'drigh road', 'drigh colony', 'airport', 'star gate', 'natha khan', 'morio',
      'shamsi', 'al-falah', 'green town', 'golden town', 'wireless gate', 'sadat colony',
      'faisal cantt', 'shah faisal town', '75230', '75200'
    ]
  },
  {
    name: 'Clifton',
    lat: 24.8138,
    lng: 67.0300,
    keywords: ['clifton', 'bath island', 'sea view', 'bilawal', 'block 1', 'block 2', 'block 3', 'block 4', 'block 5', 'block 6', 'block 7', 'block 8', 'block 9', 'teen talwar', 'do talwar']
  },
  {
    name: 'DHA (Phases 1-8)',
    lat: 24.8000,
    lng: 67.0500,
    keywords: ['dha', 'defence', 'phase 1', 'phase 2', 'phase 3', 'phase 4', 'phase 5', 'phase 6', 'phase 7', 'phase 8', 'gizri', 'khayaban']
  },
  {
    name: 'Gulshan-e-Iqbal',
    lat: 24.9200,
    lng: 67.0900,
    keywords: ['gulshan', 'iqbal', 'nipa', 'hassan square', 'civic centre', 'expocentre', 'disco bakery', 'rashid minhas']
  },
  {
    name: 'Gulistan-e-Johar',
    lat: 24.9150,
    lng: 67.1350,
    keywords: ['johar', 'gulistan-e-johar', 'kamran chowrangi', 'perfume chowk', 'darul sehat']
  },
  {
    name: 'Karachi Cantt',
    lat: 24.8500,
    lng: 67.0300,
    keywords: ['cantt', 'cantonment', 'saddar', 'civil lines', 'lucky star', 'frere hall', 'burns road', 'ii chundrigar']
  },
  {
    name: 'North Nazimabad',
    lat: 24.9350,
    lng: 67.0350,
    keywords: ['north nazimabad', 'nazimabad', 'hyderi', 'sakhi hassan', 'five star', 'kda', 'shadman']
  },
  {
    name: 'Boat Basin',
    lat: 24.8250,
    lng: 67.0250,
    keywords: ['boat basin', 'schon circle', 'zamzama']
  },
  {
    name: 'PECHS / Tariq Road',
    lat: 24.8700,
    lng: 67.0600,
    keywords: ['pechs', 'tariq road', 'bahadurabad', 'khalid bin waleed']
  },
  {
    name: 'Malir',
    lat: 24.8900,
    lng: 67.1950,
    keywords: ['malir', 'model colony', 'malir cantt', 'safoora', 'kala board']
  },
  {
    name: 'Bahria Town Karachi',
    lat: 25.0200,
    lng: 67.3300,
    keywords: ['bahria', 'bahria town']
  },
  {
    name: 'Korangi',
    lat: 24.8280,
    lng: 67.1260,
    keywords: ['korangi', 'darussalam', 'bilal colony', 'zaman town', 'korangi industrial', 'crossing']
  },
  {
    name: 'Landhi',
    lat: 24.8450,
    lng: 67.1950,
    keywords: ['landhi', 'dawood chowrangi', 'quaidabad', 'muzaffarabad', 'sherpao', 'bab-e-urdu']
  },
  {
    name: 'Federal B Area',
    lat: 24.9300,
    lng: 67.0650,
    keywords: ['federal b', 'fb area', 'f.b area', 'ancholi', 'water pump', 'dastagir', 'samnabad', 'yaseenabad']
  },
  {
    name: 'North Karachi',
    lat: 24.9900,
    lng: 67.0600,
    keywords: ['north karachi', 'new karachi', 'power house', 'up mor', 'surjani', 'nagan chowrangi']
  },
  {
    name: 'Saddar',
    lat: 24.8560,
    lng: 67.0180,
    keywords: ['saddar', 'empress market', 'preedy', 'electronics market', 'burns road', 'lines area']
  }
];

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function AreaModal({ open, onClose, area, setArea, areasList }) {
  const [value, setValue] = useState(area || 'Shah Faisal Colony');
  const [locStatus, setLocStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    setValue(area || localStorage.getItem('cakebites_area') || 'Shah Faisal Colony');
    setLocStatus('idle');
    setFeedbackMsg('');
  }, [open, area]);

  if (!open) return null;

  const handleUseCurrentLocation = () => {
    setLocStatus('loading');
    setFeedbackMsg('Detecting your GPS location...');

    const processCoords = async (userLat, userLng) => {
      let detected = '';

      // 1. First priority: BigDataCloud Client Reverse Geocode API (Fastest and highly accurate for Pakistan localities)
      try {
        const bdcRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${userLat}&longitude=${userLng}&localityLanguage=en`
        );
        if (bdcRes.ok) {
          const bdc = await bdcRes.json();
          const text = `${bdc.locality || ''} ${bdc.city || ''} ${bdc.principalSubdivision || ''} ${JSON.stringify(bdc.localityInfo || {})}`.toLowerCase();
          for (const item of KARACHI_AREAS_COORDS) {
            if (item.keywords.some((k) => text.includes(k))) {
              detected = item.name;
              break;
            }
          }
        }
      } catch (e) {
        console.warn('BigDataCloud lookup note:', e);
      }

      // 2. Second priority: OpenStreetMap Nominatim
      if (!detected) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 2600);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}&zoom=15`,
            { signal: controller.signal }
          );
          clearTimeout(timer);
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const text = `${addr.neighbourhood || ''} ${addr.suburb || ''} ${addr.city_district || ''} ${data.display_name || ''}`.toLowerCase();
            for (const item of KARACHI_AREAS_COORDS) {
              if (item.keywords.some((k) => text.includes(k))) {
                detected = item.name;
                break;
              }
            }
          }
        } catch (e) {
          console.warn('Nominatim lookup note:', e);
        }
      }

      // 3. Fallback: Distance calculation to nearest Karachi Area
      if (!detected) {
        let minDistance = Infinity;
        let closest = KARACHI_AREAS_COORDS[0].name;
        for (const item of KARACHI_AREAS_COORDS) {
          const dist = getDistanceKm(userLat, userLng, item.lat, item.lng);
          if (dist < minDistance) {
            minDistance = dist;
            closest = item.name;
          }
        }
        detected = closest;
      }

      // 4. Find matching area in areasList
      const matched = areasList.find((a) => {
        const name = typeof a === 'string' ? a : a.name;
        return (
          name.toLowerCase() === detected.toLowerCase() ||
          name.toLowerCase().includes(detected.toLowerCase()) ||
          detected.toLowerCase().includes(name.toLowerCase())
        );
      });

      const finalArea = matched ? (typeof matched === 'string' ? matched : matched.name) : detected;

      setValue(finalArea);
      setArea(finalArea);
      try {
        localStorage.setItem('cakebites_area', finalArea);
      } catch {}

      setLocStatus('success');
      setFeedbackMsg(`📍 Auto-detected: ${finalArea}`);
      setTimeout(() => {
        onClose();
      }, 1200);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          processCoords(pos.coords.latitude, pos.coords.longitude);
        },
        async (err) => {
          console.warn('GPS error, trying IP location fallback...', err);
          try {
            const ipRes = await fetch('https://ipapi.co/json/');
            if (ipRes.ok) {
              const ipData = await ipRes.json();
              if (ipData.latitude && ipData.longitude) {
                processCoords(ipData.latitude, ipData.longitude);
                return;
              }
            }
          } catch {}

          setLocStatus('error');
          setFeedbackMsg(
            err.code === 1
              ? 'Location permission denied. Please select from the dropdown.'
              : 'Could not detect location. Please select from the dropdown.'
          );
        },
        { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 }
      );
    } else {
      setLocStatus('error');
      setFeedbackMsg('Geolocation is not supported by your browser.');
    }
  };

  const handleConfirm = () => {
    const chosen = value || 'Shah Faisal Colony';
    setArea(chosen);
    try {
      localStorage.setItem('cakebites_area', chosen);
    } catch {}
    onClose();
  };

  return (
    <div className="modal-wrap">
      <div className="modal-card area-modal-card">
        <button className="modal-close" onClick={onClose} title="Close"><Icon name="x" /></button>
        <div className="mini-mark"><BrandMark compact /></div>
        <h2>Select Your Delivery Area</h2>
        <p>Please select your Karachi area to calculate exact delivery timing & options.</p>

        {/* Auto Location: Use Current Location (Matches User Reference Image) */}
        <div className="auto-loc-container">
          <span className="auto-loc-label">Please select your location</span>
          <button 
            type="button" 
            className={`use-current-loc-btn ${locStatus === 'loading' ? 'is-loading' : ''} ${locStatus === 'success' ? 'is-success' : ''}`}
            onClick={handleUseCurrentLocation}
            title="Auto detect location via GPS"
          >
            <span className="use-current-loc-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="7" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <circle cx="12" cy="12" r="2.2" fill="currentColor" />
              </svg>
            </span>
            <span>
              {locStatus === 'loading' ? 'Detecting Location...' : locStatus === 'success' ? 'Location Detected!' : 'Use Current Location'}
            </span>
          </button>

          {feedbackMsg && (
            <div className={`loc-feedback-badge ${locStatus}`}>
              {feedbackMsg}
            </div>
          )}
        </div>

        <div className="area-modal-or-divider">
          <span>OR SELECT MANUALLY</span>
        </div>

        <select value={value} onChange={(e) => setValue(e.target.value)}>
          <option value="">Select Area</option>
          {areasList.map((a) => (
            <option key={typeof a === 'string' ? a : a.name} value={typeof a === 'string' ? a : a.name}>
              {typeof a === 'string' ? a : a.name}
            </option>
          ))}
        </select>

        <button className="gold-btn area-confirm-btn" onClick={handleConfirm}>
          Confirm Area
        </button>
      </div>
    </div>
  );
}

// Modern Checkout Modal (Saves to MySQL & carries forward exact chosen area)
function CheckoutModal({ open, onClose, cart, area, setArea, areasList = [], total, onOrderPlaced }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedArea, setSelectedArea] = useState(() => area || localStorage.getItem('cakebites_area') || 'Shah Faisal Colony');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = area || localStorage.getItem('cakebites_area') || 'Shah Faisal Colony';
    setSelectedArea(saved);
  }, [open, area]);

  if (!open) return null;

  const deliveryFee = 200;
  const grandTotal = total + deliveryFee;

  const handleAreaChange = (e) => {
    const newArea = e.target.value;
    setSelectedArea(newArea);
    if (setArea) setArea(newArea);
    try {
      localStorage.setItem('cakebites_area', newArea);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Please provide Name, Phone number, and Delivery Address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const finalDeliveryArea = selectedArea || area || localStorage.getItem('cakebites_area') || 'Shah Faisal Colony';

    const formattedItems = cart.map((item) => {
      let itemName = item.name;
      if (item.customDetails) {
        itemName += ` [${item.customDetails.tiers}, ${item.customDetails.frosting}${item.customDetails.message && item.customDetails.message !== 'None' ? `, Plaque: "${item.customDetails.message}"` : ''}]`;
      }
      return {
        ...item,
        name: itemName,
        product_name: itemName
      };
    });

    const payload = {
      customer_name: name,
      customer_phone: phone,
      delivery_area: finalDeliveryArea,
      delivery_address: `${address} (${finalDeliveryArea})`,
      notes: notes,
      items: formattedItems,
      subtotal: total,
      delivery_fee: deliveryFee,
      total_amount: grandTotal
    };

    try {
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
        onOrderPlaced({
          ...(data.order || {}),
          order_code: data.order?.order_code || 'CB-' + Math.floor(1000 + Math.random() * 9000),
          delivery_area: finalDeliveryArea,
          total_amount: grandTotal
        });
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

          <div className="form-group checkout-area-box">
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span>Delivery Area *</span>
              <span style={{ fontSize: 12, color: 'var(--gold2)', fontWeight: 700 }}>📍 {selectedArea}</span>
            </label>
            <select 
              value={selectedArea} 
              onChange={handleAreaChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1.5px solid #dfa84a',
                borderRadius: '8px',
                background: '#ffffff',
                color: '#071e27',
                fontSize: '14px',
                fontWeight: '700',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {areasList.map((a) => {
                const aName = typeof a === 'string' ? a : a.name;
                return <option key={aName} value={aName}>{aName}</option>;
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Complete Delivery Address *</label>
            <textarea required rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House/Flat #, Street, Block / Landmark, Shah Faisal Colony..." />
          </div>

          <div className="form-group">
            <label>Cake Custom Writing / Notes</label>
            <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Write 'Happy Birthday' on the cake" />
          </div>

          <div className="order-summary-box">
            <div className="row"><span>Items ({cart.reduce((s, i) => s + i.qty, 0)})</span><span>{money(total)}</span></div>
            <div className="row"><span>Delivery to <b>{selectedArea}</b></span><span>{money(deliveryFee)}</span></div>
            <div className="row total"><span>Total Payable (Cash on Delivery)</span><span>{money(grandTotal)}</span></div>
          </div>

          <button type="submit" className="gold-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving to Database...' : `Confirm & Place Order for ${selectedArea} (Save to MySQL)`}
          </button>
        </form>
      </div>
    </div>
  );
}

// Decent Luxury Thank You / Order Confirmation Modal (#083042)
function OrderSuccessModal({ order, onClose, onNavigate }) {
  if (!order) return null;
  const deliveryArea = order.delivery_area || localStorage.getItem('cakebites_area') || 'Tariq Road';
  const orderCode = order.order_code || 'CB-' + Math.floor(1000 + Math.random() * 9000);
  const totalAmount = order.total_amount || 9299;
  const customerName = order.customer_name || 'Valued Customer';
  const paymentMethod = order.payment_method || 'Pay Via Bank Account';

  const money = (n) => `Rs ${Number(n).toLocaleString('en-PK')}`;

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum Cake Bites! I have placed an order #${orderCode}.\nCustomer: ${customerName}\nTotal: ${money(totalAmount)}\nArea: ${deliveryArea}\nPayment: ${paymentMethod}`
  );

  return (
    <div className="modal-wrap thank-you-modal-wrap" onClick={onClose}>
      <div 
        className="modal-card thank-you-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button type="button" className="thank-you-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Golden Celebration Checkmark Badge */}
        <div className="thank-you-emblem">
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="thank-you-title">Thank You for Your Order!</h2>
        <p className="thank-you-subtitle">
          Shukriya <strong>{customerName}</strong>! Your order has been placed successfully and our bakers are preparing it fresh.
        </p>

        {/* Order Reference Pill */}
        <div className="thank-you-order-pill">
          <span>ORDER #{orderCode}</span>
        </div>

        {/* Decent Order Summary Card */}
        <div className="thank-you-details-card">
          <div className="thank-you-row">
            <span className="ty-label">📍 Delivery Destination:</span>
            <span className="ty-value">{deliveryArea}</span>
          </div>
          <div className="thank-you-row">
            <span className="ty-label">🚀 Estimated Delivery:</span>
            <span className="ty-value ty-express">Arrives In 1 Hour (Express)</span>
          </div>
          <div className="thank-you-row">
            <span className="ty-label">💳 Payment Method:</span>
            <span className="ty-value">{paymentMethod}</span>
          </div>
          <div className="thank-you-row ty-total-row">
            <span className="ty-label">Total Amount:</span>
            <span className="ty-value ty-total-price">{money(totalAmount)}</span>
          </div>
        </div>

        {/* WhatsApp Assistance Banner */}
        <a 
          href={`https://wa.me/923342632631?text=${whatsappMessage}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="thank-you-whatsapp-box"
        >
          <div className="whatsapp-icon-circle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.184 1.564 5.938l-1.662 6.074 6.222-1.632c1.701.929 3.647 1.458 5.719 1.458 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div className="whatsapp-box-text">
            <span>Share payment receipt or track delivery:</span>
            <strong>WhatsApp: +92 334 2632631</strong>
          </div>
        </a>

        {/* Action Buttons */}
        <div className="thank-you-actions-row">
          <button 
            type="button" 
            className="thank-you-home-btn" 
            onClick={() => { onClose(); if (onNavigate) onNavigate('home'); }}
          >
            Back to Home
          </button>
          <button 
            type="button" 
            className="thank-you-continue-btn" 
            onClick={() => { onClose(); if (onNavigate) onNavigate('menu'); }}
          >
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
  const [currentPage, setCurrentPage] = useState('home');
  const [activeProduct, setActiveProduct] = useState(null);
  const activeProductRef = useRef(null);
  useEffect(() => {
    activeProductRef.current = activeProduct;
  }, [activeProduct]);
  const [menuActiveCategory, setMenuActiveCategory] = useState('All');
  const [categoryArchiveId, setCategoryArchiveId] = useState(null);
  const [sectionsData, setSectionsData] = useState(defaultSections);

  const [areasList, setAreasList] = useState([
    'Shah Faisal Colony',
    'DHA (Phases 1-8)',
    'Clifton',
    'Gulshan-e-Iqbal',
    'Gulistan-e-Johar',
    'North Nazimabad',
    'Karachi Cantt',
    'PECHS / Tariq Road',
    'Malir',
    'Korangi',
    'Landhi',
    'Federal B Area',
    'North Karachi',
    'Boat Basin',
    'Bahria Town Karachi'
  ]);
  const [dbStatus, setDbStatus] = useState({ connected: false, loading: true, counts: {} });

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBumping, setCartBumping] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [areaOpen, setAreaOpen] = useState(false);
  const [area, setArea] = useState(() => {
    try {
      return localStorage.getItem('cakebites_area') || 'Shah Faisal Colony';
    } catch {
      return 'Shah Faisal Colony';
    }
  });
  const [menuOpen, setMenuOpen] = useState(() => {
    return typeof window !== 'undefined' && (window.location.search.includes('menu=open') || window.location.hash === '#menu-drawer');
  });
  const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);

  // 3D Studio and 3D Preview
  const [studioOpen, setStudioOpen] = useState(false);
  const [previewCake3D, setPreviewCake3D] = useState(null);

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
        const names = areas.map((a) => (typeof a === 'string' ? a : a.name));
        if (!names.some((n) => n.toLowerCase().includes('shah faisal'))) {
          setAreasList(['Shah Faisal Colony', ...areas]);
        } else {
          setAreasList(areas);
        }
      }
    } catch (err) {
      console.warn('Backend API connecting...', err.message);
      setDbStatus({ connected: false, loading: false, counts: {} });
    }
  };

  useEffect(() => {
    refreshDb();
  }, []);

  // Scroll reveal animation observer for products, section banners, headers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    const elements = document.querySelectorAll('.product-card, .section-banner, .section-head, .shop-section');
    elements.forEach((el) => {
      el.classList.add('is-revealed');
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [sectionsData, currentPage, menuActiveCategory]);

  const add = useCallback((product) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => 
        x.name === product.name && 
        JSON.stringify(x.customDetails || null) === JSON.stringify(product.customDetails || null)
      );
      if (idx >= 0) return prev.map((x, i) => i === idx ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartBumping(true);
    setTimeout(() => setCartBumping(false), 700);
    setToastMsg(`Added "${product.name}" to cart! 🍰`);
    setTimeout(() => setToastMsg(''), 2500);
    setCartOpen(true);
  }, []);

  const nav = [
    ['Combo’s', '#combos'], ['Best Selling', '#best'], ['Cake', '#cakes'], ['Cupcake', '#cupcakes'], ['Brownies', '#brownies'], ['Sundae', '#sundae'], ['Bento', '#bento'], ['Customized Cake', '#custom']
  ];

  const [activeSection, setActiveSection] = useState('best');
  const [showBackTop, setShowBackTop] = useState(false);
  const activeSectionRef = useRef('best');
  const showBackTopRef = useRef(false);

  // Helper to find a product across sections by name (supports direct URLs and initial loads)
  const findProductByName = useCallback((rawName) => {
    if (!rawName) return null;
    const targetName = rawName.trim().toLowerCase();
    const sourceData = sectionsData && sectionsData.length > 0 ? sectionsData : defaultSections;
    for (const sec of sourceData) {
      if (!sec.products) continue;
      for (const p of sec.products) {
        const pName = Array.isArray(p) ? p[0] : p.name;
        if (pName && pName.trim().toLowerCase() === targetName) {
          return Array.isArray(p)
            ? {
                name: p[0],
                price: p[1],
                original_price: p[2],
                image: p[3] || REAL_PRODUCT_IMAGES[p[0]] || sec.banner,
                badge: p[4],
                category: sec.category || sec.title
              }
            : {
                ...p,
                image: p.image || p.image_url || REAL_PRODUCT_IMAGES[p.name] || sec.banner,
                category: p.category || sec.category || sec.title
              };
        }
      }
    }
    return null;
  }, [sectionsData]);

  // Sync page with URL hash (supports browser forward/back & direct URLs)
  useEffect(() => {
    const handleHash = () => {
      const fullHash = window.location.hash || '';
      const lowerHash = fullHash.toLowerCase();

      if (lowerHash === '#about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash === '#contact') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash === '#cart') {
        setCurrentPage('cart');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash === '#checkout') {
        setCurrentPage('checkout');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash === '#shop' || lowerHash === '#archive' || lowerHash === '#all-products' || lowerHash === '#products') {
        setCategoryArchiveId('all');
        setCurrentPage('category-archive');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash === '#custom-archive' || lowerHash === '#custom-cakes') {
        setCategoryArchiveId('custom');
        setCurrentPage('category-archive');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash.startsWith('#category-archive/')) {
        const catId = decodeURIComponent(fullHash.slice('#category-archive/'.length));
        setCategoryArchiveId(catId || 'cakes');
        setCurrentPage('category-archive');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash.startsWith('#product-category/')) {
        const catSlug = decodeURIComponent(fullHash.slice('#product-category/'.length)).replace(/\/$/, '').toLowerCase();
        let matchedCat = 'cakes';
        if (catSlug.includes('bento')) matchedCat = 'bento';
        else if (catSlug.includes('cupcake')) matchedCat = 'cupcakes';
        else if (catSlug.includes('brownie')) matchedCat = 'brownies';
        else if (catSlug.includes('sundae')) matchedCat = 'sundae';
        else if (catSlug.includes('combo')) matchedCat = 'combos';
        else if (catSlug.includes('custom')) matchedCat = 'custom';
        else if (catSlug.includes('best')) matchedCat = 'best';
        else if (catSlug === 'all') matchedCat = 'all';
        setCategoryArchiveId(matchedCat);
        setCurrentPage('category-archive');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash.startsWith('#menu')) {
        setCurrentPage('menu');
        const cat = fullHash.includes('/') ? decodeURIComponent(fullHash.split('/')[1]) : 'All';
        setMenuActiveCategory(cat || 'All');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (lowerHash.startsWith('#product/')) {
        const prodName = decodeURIComponent(fullHash.slice(9)).trim();

        // If currently active product matches, keep it
        if (activeProductRef.current && activeProductRef.current.name.trim().toLowerCase() === prodName.toLowerCase()) {
          setCurrentPage('product');
          return;
        }

        // Search product across sections
        const found = findProductByName(prodName);
        if (found) {
          activeProductRef.current = found;
          setActiveProduct(found);
          setCurrentPage('product');
        } else if (activeProductRef.current) {
          setCurrentPage('product');
        } else {
          setCurrentPage('home');
        }
      } else if (lowerHash === '#home' || lowerHash === '#top' || !lowerHash) {
        setCurrentPage('home');
      } else {
        // Section anchors e.g. #cakes, #combos, #best
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.querySelector(fullHash);
          if (el) {
            const headerOffset = 90;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [findProductByName]);

  const navigateTo = useCallback((page, targetOrCategory, productObj = null) => {
    setMenuOpen(false);
    if (page === 'menu') {
      const cat = targetOrCategory || 'All';
      setMenuActiveCategory(cat);
      setCurrentPage('menu');
      window.location.hash = cat && cat !== 'All' ? `menu/${encodeURIComponent(cat)}` : 'menu';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'product' && productObj) {
      activeProductRef.current = productObj;
      setActiveProduct(productObj);
      setCurrentPage('product');
      const targetHash = `product/${encodeURIComponent(productObj.name)}`;
      if (window.location.hash !== `#${targetHash}`) {
        window.location.hash = targetHash;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'about') {
      setCurrentPage('about');
      window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'contact') {
      setCurrentPage('contact');
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'cart') {
      setCurrentPage('cart');
      window.location.hash = 'cart';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'checkout') {
      setCurrentPage('checkout');
      window.location.hash = 'checkout';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'shop' || page === 'archive') {
      setCategoryArchiveId('all');
      setCurrentPage('category-archive');
      window.location.hash = 'shop';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'custom-archive') {
      setCategoryArchiveId('custom');
      setCurrentPage('category-archive');
      window.location.hash = 'category-archive/custom';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'category-archive') {
      const catId = targetOrCategory || 'cakes';
      setCategoryArchiveId(catId);
      setCurrentPage('category-archive');
      window.location.hash = `category-archive/${encodeURIComponent(catId)}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetOrCategory && targetOrCategory.startsWith('#')) {
      setCurrentPage('home');
      window.location.hash = targetOrCategory;
      setTimeout(() => {
        const el = document.querySelector(targetOrCategory);
        if (el) {
          const headerOffset = 90;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentPage('home');
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleViewProduct = useCallback((prod) => {
    navigateTo('product', null, prod);
  }, [navigateTo]);

  // RAF-throttled scroll listener: only updates state when values actually change!
  useEffect(() => {
    let ticking = false;
    const sectionIds = ['combos', 'best', 'cakes', 'cupcakes', 'brownies', 'sundae', 'bento', 'custom'];

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const scrollY = window.scrollY;

        // Back to top (toggle once when crossing threshold)
        const shouldShow = scrollY > 400;
        if (shouldShow !== showBackTopRef.current) {
          showBackTopRef.current = shouldShow;
          setShowBackTop(shouldShow);
        }

        // Active section (only update when crossed into another section)
        const scrollPos = scrollY + 280;
        let matched = '';
        for (let i = 0; i < sectionIds.length; i++) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              matched = id;
              break;
            }
          }
        }
        if (matched && matched !== activeSectionRef.current) {
          activeSectionRef.current = matched;
          setActiveSection(matched);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const handleNavClick = (e, href, label) => {
    if (label.includes('Customized')) {
      e.preventDefault();
      setStudioOpen(true);
      return;
    }
  };

  // On category-archive page, hide the entire header and menus
  const isCatArchivePage = currentPage === 'category-archive';

  return (
    <div className={`app-shell ${menuOpen ? 'menu-drawer-open' : ''} ${categoryPopupOpen ? 'cat-popup-open' : ''}`}>
      {/* Background Magical Ambient Gold Dust Particles */}
      <AmbientGoldDust />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Back to Top Button */}
      <button
        type="button"
        className={`back-to-top-btn${showBackTop ? ' back-to-top-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
      >
        <span className="btt-arrow">↑</span>
        <span className="btt-label">Top</span>
      </button>

      {/* Unified Luxury Header Matching Reference */}
      <header className="unified-header">
        <div className="container unified-header-inner">
          {/* LEFT GROUP: Location & Phone with gold border */}
          <div className="hdr-left-group">
            <button 
              type="button"
              className="hdr-gold-btn hdr-location-btn" 
              onClick={() => setAreaOpen(true)} 
              title={`Delivery Area: ${area || 'Shah Faisal Colony'}`}
              aria-label={`Delivery Area: ${area || 'Shah Faisal Colony'}`}
            >
              <span className="hdr-pin-icon" aria-hidden="true">📍</span>
              <span className="hdr-location-text">{area || 'Shah Faisal Colony'}</span>
            </button>
            <a className="hdr-gold-btn hdr-phone-btn" href="tel:+923342632631" title="Call Customer Care (+92 334 2632631)">
              <span>+92 334 2632631</span>
            </a>
          </div>

          {/* CENTER GROUP: Cake Bites Logo */}
          <div className="hdr-center-group">
            <a 
              href="#home" 
              className="hdr-center-logo" 
              aria-label="Cake Bites home"
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
            >
              <BrandMark />
            </a>
          </div>

          {/* RIGHT GROUP: Follow Us Capsule, Basket with Badge, Hamburger Menu */}
          <div className="hdr-right-group">
            <div className="hdr-follow-box">
              <span>Follow Us</span>
              <div className="hdr-social-links">
                <a className="hdr-social-icon" href="https://www.facebook.com/cakebites.pk/" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a className="hdr-social-icon" href="https://www.instagram.com/cakebites.pk/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Shopping Basket Button with Badge */}
            <button 
              className={`hdr-basket-btn ${cartBumping ? 'cart-bumping' : ''}`} 
              onClick={() => setCartOpen(true)}
              title="View Cart"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d5a348" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="hdr-basket-badge">{count}</span>
            </button>

            {/* Hamburger Menu Button */}
            <button 
              className="hdr-menu-btn" 
              onClick={() => setMenuOpen((v) => !v)}
              title="Open Navigation Menu"
              aria-label="Toggle navigation menu"
            >
              <span className="hdr-menu-bar" />
              <span className="hdr-menu-bar" />
              <span className="hdr-menu-bar" />
            </button>
          </div>
        </div>
      </header>

      {/* 1. Main Navigation Menu Drawer (Exact Match to User Reference Screenshot) */}
      {menuOpen && (
        <div 
          className="main-menu-backdrop" 
          onClick={() => setMenuOpen(false)} 
          aria-modal="true" 
          role="dialog"
        >
          <div 
            className="main-menu-panel" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button: Top-Right outside the gold border */}
            <button 
              type="button" 
              className="main-menu-close-btn"
              onClick={() => setMenuOpen(false)} 
              aria-label="Close menu"
              title="Close"
            >
              ✕
            </button>

            {/* Inner Golden Border Frame */}
            <div className="main-menu-frame">
              {/* Logo (White & Gold version for #072532 dark background) */}
              <div className="main-menu-brand">
                <img 
                  src={ASSET.logoWhite || "/assets/brand/cakebites-logo-white.png"} 
                  alt="CakeBites - A little cream for a bigger smile" 
                  className="main-menu-logo"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/brand/cakebites-logo-white.png';
                  }}
                />
              </div>

              {/* Navigation Links — Single Vertical List */}
              <nav className="main-menu-nav">
                <a 
                  href="#home"
                  className={`main-menu-link ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('home'); }}
                >
                  Home
                </a>

                <a 
                  href="#menu"
                  className={`main-menu-link ${currentPage === 'menu' && (!menuActiveCategory || menuActiveCategory === 'All') ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('menu', 'All'); }}
                >
                  Menu
                </a>

                <a 
                  href="#about"
                  className={`main-menu-link ${currentPage === 'about' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('about'); }}
                >
                  About
                </a>

                <a 
                  href="#contact"
                  className={`main-menu-link ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('contact'); }}
                >
                  Contact
                </a>

                <a
                  href="#category-archive/cakes"
                  className={`main-menu-link ${currentPage === 'category-archive' && categoryArchiveId === 'cakes' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('category-archive', 'cakes'); }}
                >
                  Cakes
                </a>

                <a
                  href="#category-archive/cupcakes"
                  className={`main-menu-link ${currentPage === 'category-archive' && categoryArchiveId === 'cupcakes' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('category-archive', 'cupcakes'); }}
                >
                  Cup Cakes
                </a>

                <a
                  href="#category-archive/brownies"
                  className={`main-menu-link ${currentPage === 'category-archive' && categoryArchiveId === 'brownies' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('category-archive', 'brownies'); }}
                >
                  Brownies
                </a>

                <a
                  href="#category-archive/sundae"
                  className={`main-menu-link ${currentPage === 'category-archive' && categoryArchiveId === 'sundae' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('category-archive', 'sundae'); }}
                >
                  Sundae
                </a>

                <a
                  href="#category-archive/bento"
                  className={`main-menu-link ${currentPage === 'category-archive' && categoryArchiveId === 'bento' ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('category-archive', 'bento'); }}
                >
                  Bento Cakes
                </a>

                <a
                  href="#custom-archive"
                  className={`main-menu-link menu-link-multiline ${currentPage === 'custom-archive' || (currentPage === 'category-archive' && categoryArchiveId === 'custom') ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigateTo('custom-archive'); }}
                >
                  Customized<br />Cakes
                </a>
              </nav>

              {/* Phone Pill Button */}
              <a href="tel:+923342632631" className="main-menu-phone-btn" title="Call Customer Care">
                +92 334 2632631
              </a>

              {/* Follow Us Pill Button */}
              <div className="main-menu-follow-box">
                <span className="main-menu-follow-text">Follow Us</span>
                <div className="main-menu-social-icons">
                  <a href="https://www.facebook.com/cakebites.pk/" target="_blank" rel="noreferrer" className="main-menu-social-btn" aria-label="Facebook">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/cakebites.pk/" target="_blank" rel="noreferrer" className="main-menu-social-btn" aria-label="Instagram">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Floating WhatsApp Icon anchored to bottom right of gold frame */}
              <a
                href="https://wa.me/923342632631"
                target="_blank"
                rel="noreferrer"
                className="main-menu-whatsapp-fab"
                title="Chat with us on WhatsApp"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Category Pop-up Menu (#072734 bottom sheet popup opened by Category Bar Hamburger) */}
      {categoryPopupOpen && (
        <div 
          className="side-drawer-backdrop" 
          onClick={() => setCategoryPopupOpen(false)} 
          aria-modal="true" 
          role="dialog"
        >
          <div 
            className="side-popup-panel" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: MENU title & Close button */}
            <div className="side-popup-header">
              <span className="side-popup-title">MENU</span>
              <button 
                type="button" 
                className="side-popup-close-btn"
                onClick={() => setCategoryPopupOpen(false)} 
                aria-label="Close menu"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Category Items List (8 items) */}
            <div className="side-popup-list">
              {POPUP_CATEGORIES.map((cat) => {
                const card = CATEGORY_CARDS.find((c) => c.id === cat.id);
                const isActive = currentPage === 'category-archive' && categoryArchiveId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`side-popup-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setCategoryPopupOpen(false);
                      navigateTo('category-archive', cat.id);
                    }}
                  >
                    <div className="side-popup-icon-circle">
                      {card?.svg}
                    </div>
                    <span className="side-popup-item-label">{cat.label}</span>
                  </button>
                );
              })}
            </div>



            {/* Floating WhatsApp Button in bottom right corner */}
            <a
              href="https://wa.me/923342632631"
              target="_blank"
              rel="noreferrer"
              className="side-popup-whatsapp-fab"
              title="Chat with us on WhatsApp"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        </div>
      )}

      <main id="top">
        {/* VIEW 1: ABOUT PAGE */}
        {currentPage === 'about' && (
          <AboutPage 
            onNavigate={navigateTo} 
            onOpenStudio={() => setStudioOpen(true)} 
            onAdd={add} 
            onView3D={handleViewProduct}
          />
        )}

        {/* VIEW 2: CONTACT PAGE */}
        {currentPage === 'contact' && (
          <ContactPage 
            onNavigate={navigateTo} 
          />
        )}

        {/* VIEW 8: CUSTOMIZED CAKES ARCHIVE PAGE */}
        {currentPage === 'custom-archive' && (
          <CustomCakesArchivePage
            sectionsData={sectionsData}
            defaultSections={defaultSections}
            onNavigate={navigateTo}
            onAdd={add}
            onViewProduct={handleViewProduct}
            onOpenStudio={() => setStudioOpen(true)}
          />
        )}

        {/* VIEW 9: CATEGORY-SPECIFIC & ALL ARCHIVE PAGE (Authentic cakebites.pk Match) */}
        {currentPage === 'category-archive' && (
          <CategoryArchivePage
            categoryId={categoryArchiveId || 'cakes'}
            sectionsData={sectionsData}
            defaultSections={defaultSections}
            onNavigate={navigateTo}
            onAdd={add}
            onViewProduct={handleViewProduct}
            onOpenStudio={() => setStudioOpen(true)}
          />
        )}

        {/* VIEW 3: FULL BAKERY MENU CATALOG PAGE */}
        {currentPage === 'menu' && (
          <MenuPage 
            sectionsData={sectionsData} 
            onAdd={add} 
            onView3D={handleViewProduct}
            onOpenStudio={() => setStudioOpen(true)} 
            onNavigate={navigateTo} 
            ProductCardComponent={ProductCard} 
            activeCategory={menuActiveCategory}
          />
        )}

        {/* VIEW 5: PRODUCT PAGE */}
        {currentPage === 'product' && activeProduct && (
          <ProductPage 
            product={activeProduct}
            onNavigate={navigateTo}
            onAdd={add}
            ProductCardComponent={ProductCard}
            onView3D={handleViewProduct}
            relatedProducts={(() => {
              const currentSec = sectionsData.find(s => s.products.some(p => (Array.isArray(p) ? p[0] : p.name) === activeProduct.name));
              let prods = currentSec ? currentSec.products : [];
              if (!prods || prods.length < 4) {
                const allProds = sectionsData.flatMap(s => s.products);
                prods = [...(prods || []), ...allProds];
              }
              return prods
                .filter(p => (Array.isArray(p) ? p[0] : p.name) !== activeProduct.name)
                .slice(0, 4);
            })()}
          />
        )}

        {/* VIEW 6: CHECKOUT PAGE (#0F3848 THEME - EXACT REFERENCE MATCH) */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            cart={cart}
            total={total}
            area={area}
            setArea={setArea}
            onNavigate={navigateTo}
            onOpenAreaModal={() => setAreaOpen(true)}
            onOrderPlaced={(newOrder) => {
              setCart([]);
              setOrderSuccess(newOrder);
              refreshDb();
              navigateTo('home');
            }}
          />
        )}

        {/* VIEW 7: SHOPPING CART PAGE */}
        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            setCart={setCart}
            onNavigate={navigateTo}
            area={area}
            setArea={setArea}
            onOpenAreaModal={() => setAreaOpen(true)}
          />
        )}

        {/* VIEW 4: HOME LANDING PAGE */}
        {currentPage === 'home' && (
          <>
            {/* Hero Banner */}
            <section className="hero hero-wrapper-rel">
              <a href="#combos" style={{ display: 'block', textDecoration: 'none' }} title="Scroll down to browse cakes">
                <img src={ASSET.hero} alt="Cake Bites hero" />
              </a>
              <div className="hero-overlay">
                <div className="hero-copy">
                  <span className="eyebrow">Serving sweet moments in Karachi</span>
                  <h1>Premium cakes, baked for memorable moments.</h1>
                  <a href="#best" className="hero-cta">Explore Best Sellers</a>
                </div>
              </div>
            </section>

            {/* Category Navigation — Premium Icon Cards */}
            <CategoryNav
              activeSection={activeSection}
              onSelectSection={handleSelectCategory}
              onOpenStudio={() => setStudioOpen(true)}
              onOpenMenu={() => setCategoryPopupOpen(true)}
            />

            {/* Categories / Sections */}
            {sectionsData.map((section) => (
              <Section 
                key={section.id} 
                section={section} 
                onAdd={add} 
                onView3D={handleViewProduct}
                onOpenStudio={() => setStudioOpen(true)}
                onNavigate={navigateTo}
              />
            ))}
          </>
        )}
      </main>

      <footer className="cb-luxury-footer">
        {/* Top Gold Luxury Accent Bar */}
        <div className="footer-top-accent">
          <img src={ASSET.goldAccent} alt="" className="footer-gold-accent-img" />
        </div>

        <div className="footer-main-container">
          {/* Centered Logo */}
          <div className="footer-brand-wrap">
            <img 
              src={ASSET.logoBw} 
              alt="CakeBites" 
              className="footer-logo-img" 
            />
          </div>

          {/* Centered Brand Story */}
          <p className="footer-story-text">
            At CakeBites.pk, we create delicious baked treats that bring sweetness, joy, and warmth to every occasion. From rich chocolate cakes and creamy cheesecakes to freshly baked desserts and savory delights, every item is made with love, care, and premium-quality ingredients. Each bite reflects our passion for taste, freshness, and memorable moments.
          </p>

          {/* FIND US & FOLLOW US Section */}
          <div className="footer-links-row">
            {/* FIND US */}
            <div className="footer-action-col">
              <h3 className="footer-col-title">FIND US</h3>
              <a 
                href="https://share.google/0MKrAl7E4XkERtR3D" 
                target="_blank" 
                rel="noreferrer" 
                className="footer-pin-btn"
                title="Find Us"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="#dfa84a">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </a>
            </div>

            {/* FOLLOW US */}
            <div className="footer-action-col">
              <h3 className="footer-col-title">FOLLOW US</h3>
              <div className="footer-social-boxes">
                <a 
                  href="https://www.facebook.com/CakeBitesCustomizedCakes" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="footer-social-square-btn"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#ffffff">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/cakebites.pk" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="footer-social-square-btn"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="footer-copyright-bar">
            <span>All Rights Reserved Cakebites And Powered By </span>
            <a href="https://rojrztech.com/" target="_blank" rel="noreferrer" className="footer-brand-credit">Rojrztech</a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart} 
        setCart={setCart} 
        onCheckout={() => { setCartOpen(false); navigateTo('checkout'); }}
        onViewCart={() => { setCartOpen(false); navigateTo('cart'); }}
      />

      {/* Delivery Area Modal */}
      <AreaModal open={areaOpen} onClose={() => setAreaOpen(false)} area={area} setArea={setArea} areasList={areasList} />

      {/* Checkout Modal (Saves to MySQL) */}
      <CheckoutModal 
        open={checkoutOpen} 
        onClose={() => setCheckoutOpen(false)} 
        cart={cart} 
        area={area} 
        setArea={setArea}
        areasList={areasList}
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
        onNavigate={navigateTo}
      />

      {/* Database & Orders Manager */}
      <DbManagerModal 
        open={dbModalOpen} 
        onClose={() => setDbModalOpen(false)} 
        dbStatus={dbStatus} 
        refreshDb={refreshDb}
      />

      {/* 3D Cake Customizer Studio Modal */}
      <CakeStudio3D 
        open={studioOpen} 
        onClose={() => setStudioOpen(false)} 
        onAddToCart={add} 
      />

      {/* 3D 360 Product Quick View Modal */}
      <CakeViewer3DModal 
        product={previewCake3D} 
        open={!!previewCake3D} 
        onClose={() => setPreviewCake3D(null)} 
        onAddToCart={add} 
      />

      {/* Floating Add to Cart Toast Notification */}
      {toastMsg && (
        <div className="toast-notice">
          <span className="toast-check">✓</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      {!menuOpen && !categoryPopupOpen && (
        <a
          href="https://wa.me/923342632631?text=Hi%20CakeBites%2C%20I%20would%20like%20to%20place%20an%20order!"
          target="_blank"
          rel="noreferrer"
          className="whatsapp-floating-btn"
          title="Chat on WhatsApp (+92 334 2632631)"
          aria-label="Chat on WhatsApp"
        >
          <span className="whatsapp-floating-pulse" />
          <svg viewBox="0 0 24 24" width="30" height="30" fill="#ffffff">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
