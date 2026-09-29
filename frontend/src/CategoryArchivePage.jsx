import React, { useState, useMemo, useEffect, useRef } from 'react';
import CustomCakesArchiveView from './CustomCakesArchiveView';
import { buildFullCatalog } from './catalogData';
import './archive.css';

const money = (n) => `₨ ${Number(n || 0).toLocaleString('en-PK')}`;

export const ARCHIVE_CATEGORIES = [
  {
    id: 'all',
    name: 'All Products',
    slug: 'all-products',
    emoji: '🛍️',
    img: '/assets/products/german-fudge-cake.webp',
    banner: '/assets/banners/cakebites-background.png',
    tag: 'Full Artisanal Catalog',
    desc: 'Browse our entire artisanal bakery catalog — signature chocolate fudge cakes, Korean bento cakes, artisanal cupcakes, fudgy brownies, and decadent sundaes.',
  },
  {
    id: 'cakes',
    name: 'Cakes',
    slug: 'cakes',
    emoji: '🎂',
    img: '/assets/products/german-fudge-cake.webp',
    banner: '/assets/banners/cakes-banner.png',
    tag: 'Fresh Baked Daily',
    desc: 'From rich Belgian chocolate fudge to signature Lotus three-milk and decadent red velvet — every cake is baked fresh to order using finest ingredients.',
  },
  {
    id: 'bento',
    name: 'Bento Cakes',
    slug: 'bento-cakes',
    emoji: '🎀',
    img: '/assets/products/bento-cake-1.png',
    banner: '/assets/banners/bento-banner.png',
    tag: 'Trending Korean Style',
    desc: 'Adorable 4-inch Korean-style personal lunchbox cakes — beautifully piped with vintage Lambeth swirls, pastel ribbons & heartfelt custom messages.',
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    slug: 'cupcakes',
    emoji: '🧁',
    img: '/assets/products/ferrero-cupcake.jpeg',
    banner: '/assets/banners/cupcakes-banner.png',
    tag: 'Party Favorite',
    desc: 'Bite-sized treats packed with silky buttercream, premium Belgian chocolate ganache, Nutella centers, and gorgeous artisanal toppings.',
  },
  {
    id: 'brownies',
    name: 'Brownies',
    slug: 'brownies',
    emoji: '🍫',
    img: '/assets/products/nutella-brownie.webp',
    banner: '/assets/banners/brownies-banner.png',
    tag: 'Fudgy Bestsellers',
    desc: 'Dense, ultra-fudgy chocolate brownies loaded with Cadbury chunks, Nutella swirls, Belgian malt, and roasted nuts.',
  },
  {
    id: 'sundae',
    name: 'Sundaes',
    slug: 'sundaes',
    emoji: '🍨',
    img: '/assets/products/three-milk-sundae.webp',
    banner: '/assets/banners/sundae-banner.png',
    tag: 'Cool & Creamy',
    desc: 'Silky smooth sundaes and dessert tubs layered with moist cake crumbs, Belgian chocolate mousse, caramel drizzles, and fresh cream.',
  },
  {
    id: 'combos',
    name: "Combo's",
    slug: 'combos',
    emoji: '🎁',
    img: '/assets/products/golden-nutella-combo.webp',
    banner: '/assets/banners/combos-banner.png',
    tag: 'Best Value Bundles',
    desc: 'Our most loved bundled deals — combining premium cakes, cupcakes, and party surprises at special value package prices.',
  },
  {
    id: 'best',
    name: 'Best Selling',
    slug: 'best-selling',
    emoji: '⭐',
    img: '/assets/products/double-fudge-cake.jpeg',
    banner: '/assets/banners/best-selling-banner.png',
    tag: 'Customer Favorites',
    desc: 'The creations our customers order repeatedly — top rated, chef-picked, and Karachi’s most celebrated chocolate cakes.',
  },
  {
    id: 'custom',
    name: 'Customized Cakes',
    slug: 'customized-cakes',
    emoji: '🎨',
    img: '/assets/products/custom-cupcake-box-1.png',
    banner: '/assets/banners/custom-banner.png',
    tag: '100% Handcrafted',
    desc: 'Bespoke celebration masterpieces tailored to your wedding, anniversary, baby shower, doll, cartoon theme, and corporate milestones.',
  },
];

// Horizontal Category Navigation Quick Links (Matching Image 2)
export const ARCHIVE_NAV_LINKS = [
  { id: 'cakes', name: 'Cakes' },
  { id: 'cupcakes', name: 'Cup Cakes' },
  { id: 'brownies', name: 'Brownies' },
  { id: 'sundae', name: 'Sundae' },
  { id: 'bento', name: 'Bento Cakes' },
  { id: 'custom', name: 'Customized Cakes' },
];

// 19 Authentic Custom Cake Categories from cakebites.pk
export const CUSTOM_OCCASION_CATEGORIES = [
  {
    id: 'animated-cakes',
    name: 'Animated Cakes',
    emoji: '🎬',
    desc: 'Fun, handcrafted cartoon & 3D character fondant cakes for kids & movie lovers.',
    tag: 'Kids Favorite',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723471168-Animated20Cakeb.png',
  },
  {
    id: 'anniversary-cake',
    name: 'Anniversary Cake',
    emoji: '💍',
    desc: 'Romantic, elegant floral and tiered creations to celebrate cherished love milestones.',
    tag: 'Romantic',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723544908-Minimum20Poundslkj.png',
  },
  {
    id: 'azadi-treat',
    name: 'Azadi Treat',
    emoji: '🇵🇰',
    desc: 'Patriotic green & white themed celebration cakes for Independence Day & national events.',
    tag: 'Celebration',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1754568200-WhatsApp202025-08-07203.png',
  },
  {
    id: 'baby-cakes',
    name: 'Baby cakes',
    emoji: '👶',
    desc: 'Adorable pastel baby shower, welcome-home baby & 1st birthday theme cakes.',
    tag: 'Baby Shower',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723071493-140020pound20Min207pounds.png',
  },
  {
    id: 'big-cakes',
    name: 'Big Cakes',
    emoji: '🎂',
    desc: 'Grand 5 to 20+ pound multi-tiered showstopper cakes for mega events & grand parties.',
    tag: 'Multi-Tier',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723531036-Big20Cakes.png',
  },
  {
    id: 'boss-baby-cakes',
    name: 'Boss Baby Cakes',
    emoji: '🍼',
    desc: 'Charming briefcase, suit & sunglasses Boss Baby themed birthday specialty cakes.',
    tag: 'Kids Theme',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723535786-Boss20Cake.png',
  },
  {
    id: 'cream-chocolate',
    name: 'Cream & Chocolate',
    emoji: '🍫',
    desc: 'Decadent chocolate ganache, fudge drips, truffles & premium Belgian chocolate layers.',
    tag: 'Bestseller',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1722983613-140020per2020320pounds.png',
  },
  {
    id: 'cream-cakes',
    name: 'Cream Cakes',
    emoji: '🍰',
    desc: 'Silky whipped fresh dairy cream, seasonal fruits, vanilla sponge & light airy textures.',
    tag: 'Fresh Cream',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1722989798-140020pound20Mi20320pounds.png',
  },
  {
    id: 'cupcakes',
    name: 'CupCakes',
    emoji: '🧁',
    desc: 'Custom decorated artisanal cupcake boxes, floral swirls & personalized party assortments.',
    tag: 'Party Favors',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723819198-Cup20Cake4_11zon.png',
  },
  {
    id: 'dholki-cakes',
    name: 'Dholki Cakes',
    emoji: '🪘',
    desc: 'Vibrant desi wedding dholak, mehndi, mayun & yellow-marigold traditional designs.',
    tag: 'Wedding Events',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723547088-Dholki20Cakes.png',
  },
  {
    id: 'doll',
    name: 'Doll',
    emoji: '👗',
    desc: 'Enchanting Barbie & princess gown sculpted cakes with flowing edible buttercream dress.',
    tag: 'Princess Theme',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723815728-Doll20Cake2.png',
  },
  {
    id: 'engagement-cakes',
    name: 'Engagement Cakes',
    emoji: '✨',
    desc: 'Sophisticated ring boxes, floral cascades, gold leaf & elegant romantic ring designs.',
    tag: 'Engagement',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723704520-Engagement20Cake.png',
  },
  {
    id: 'friends-cake',
    name: 'Friends Cake',
    emoji: '👯',
    desc: 'Whimsical friendship tribute cakes, Central Perk themes & memorable bonding designs.',
    tag: 'Friendship',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723168110-140020pound20Min20pou20nds.png',
  },
  {
    id: 'mom-dad',
    name: 'Mom Dad',
    emoji: '👨‍👩‍👧',
    desc: 'Heartwarming tributes for parents’ birthdays, Mother’s Day, Father’s Day & milestones.',
    tag: 'Family Special',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723072691-140020pound20Mi20420pounds.png',
  },
  {
    id: 'nikah-cakes',
    name: 'Nikah Cakes',
    emoji: '📜',
    desc: 'Regal Islamic calligraphy, Qubool Hai emblems, emerald green, white & gold luxury.',
    tag: 'Nikah Ceremony',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723702069-Nikah20Cake1.png',
  },
  {
    id: 'office-cakes',
    name: 'Office Cakes',
    emoji: '💼',
    desc: 'Corporate promotions, company anniversaries, farewells & branded logo office cakes.',
    tag: 'Corporate',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723169535-150020poun2020320pounds.png',
  },
  {
    id: 'unicorn',
    name: 'Unicorn',
    emoji: '🦄',
    desc: 'Magical golden horn, rainbow pastel mane swirls & cute sparkling unicorn faces.',
    tag: 'Fantasy',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723773475-150020pound20Min20320pounds.png',
  },
  {
    id: 'walima-cakes',
    name: 'Walima Cakes',
    emoji: '👑',
    desc: 'Opulent multi-tiered grand reception cakes with royal gold filigree and fresh roses.',
    tag: 'Grand Reception',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723729429-Walima20Cake3.png',
  },
  {
    id: 'wedding-cakes',
    name: 'Wedding Cakes',
    emoji: '👰',
    desc: 'Timeless luxury wedding masterpieces, customized to match bridal themes & stage decor.',
    tag: 'Bridal Masterpiece',
    img: 'https://cakebites.pk/wp-content/uploads/2025/12/1723790295-Minimum10.png',
  },
];

const FLAVORS = [
  'Chocolate',
  'Nutella',
  'Lotus',
  'Malt',
  'Red Velvet',
  'Vanilla',
  'Coffee',
  'Mango',
  'Caramel',
  'Cheese',
];

function normalizeProduct(item, defaultCategory = 'Cakes', defaultBanner = '') {
  if (!item) return null;
  const name = Array.isArray(item) ? item[0] : item.name || '';
  const price = Number(Array.isArray(item) ? item[1] : item.price || 0);
  const original_price = Array.isArray(item)
    ? (item[2] ? Number(item[2]) : null)
    : (item.original_price ? Number(item.original_price) : null);
  const image = Array.isArray(item)
    ? item[3]
    : (item.image_url || item.image || defaultBanner || '/assets/banners/cakes-banner.png');
  const badge = Array.isArray(item)
    ? item[4]
    : (item.badge || (original_price && original_price > price ? 'Sale!' : null));
  const category = (Array.isArray(item) ? defaultCategory : (item.category || defaultCategory)) || 'Cakes';
  return { name, price, original_price, image, badge, category };
}

// Helper for smart product image fallback
const getProductFallback = (name = '', category = '') => {
  const n = ((name || '') + ' ' + (category || '')).toLowerCase();
  if (n.includes('bento')) return '/assets/products/bento-cake-1.png';
  if (n.includes('cupcake') || n.includes('cup cake')) return '/assets/products/belgian-chocolate-cupcake.png';
  if (n.includes('brownie')) return '/assets/products/nutella-brownie.webp';
  if (n.includes('sundae')) return '/assets/products/three-milk-sundae.webp';
  if (n.includes('cheesecake') || n.includes('cheese cake')) return '/assets/products/lotus-cheesecake.png';
  if (n.includes('box') || n.includes('custom') || n.includes('flower') || n.includes('bouquet')) return '/assets/products/custom-cupcake-box-1.png';
  return '/assets/products/german-fudge-cake.webp';
};

// ==========================================
// Home-Style Luxury Product Card Component
// ==========================================
function WooProductCard({ product, onAdd, onViewProduct }) {
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const { name, price, original_price, image, badge, category } = product;
  const fallbackImg = getProductFallback(name, category);
  const imageSrc = imgErr ? fallbackImg : (image || fallbackImg);

  const handleCardClick = () => {
    if (onViewProduct) {
      onViewProduct({
        name,
        price,
        original_price,
        image_url: imageSrc,
        image: imageSrc,
        images: [imageSrc],
        badge,
        category,
        desc: `Fresh artisanal baked creation from Cake Bites Karachi. Made to order using finest ingredients.`
      });
    }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAdd) onAdd({ name, price, image: imageSrc });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className="product-card is-revealed"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-art">
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          className="product-img"
          onError={() => setImgErr(true)}
        />
        {/* Luxury diagonal light gleam beam */}
        <div className="product-art-shimmer" aria-hidden="true" />

        {/* Badges */}
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
          <span className="product-category">{category || 'Cake Bites'}</span>
        </div>

        <h3 title={name}>{name}</h3>

        <div className="price-row">
          <div className="price-values">
            {original_price && original_price > price && (
              <span className="old-price">{money(original_price)}</span>
            )}
            <span className="price">{money(price)}</span>
          </div>
        </div>

        <button
          type="button"
          className={`add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
          title={`Add ${name} to cart`}
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
}

// ==========================================
// MAIN ARCHIVE PAGE COMPONENT
// ==========================================
export default function CategoryArchivePage({
  categoryId = 'cakes',
  sectionsData = [],
  defaultSections = [],
  onNavigate,
  onAdd,
  onViewProduct,
  onOpenStudio
}) {
  const [activeCatId, setActiveCatId] = useState(categoryId || 'cakes');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortOption, setSortOption] = useState('menu_order');
  const [gridColumns, setGridColumns] = useState(4); // 4, 3, 2, or 1 (list)
  const [priceMax, setPriceMax] = useState(10000);
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [saleOnly, setSaleOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);
  const [customViewMode, setCustomViewMode] = useState('products'); // 'products' or 'occasions'
  const [loadingMore, setLoadingMore] = useState(false);
  const carouselRef = useRef(null);

  // Sync categoryId if prop changes
  useEffect(() => {
    if (categoryId) {
      setActiveCatId(categoryId);
      setVisibleCount(16);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [categoryId]);

  // Aggregate all sections
  const allSections = useMemo(() => {
    return (sectionsData && sectionsData.length > 0) ? sectionsData : defaultSections;
  }, [sectionsData, defaultSections]);

  // Active Category Meta
  const activeMeta = useMemo(() => {
    return ARCHIVE_CATEGORIES.find((c) => c.id === activeCatId) || ARCHIVE_CATEGORIES.find((c) => c.id === 'cakes');
  }, [activeCatId]);

  // Extract all products with normalization (Full 415 products catalog)
  const allProductsList = useMemo(() => {
    const fullCatalog = buildFullCatalog(allSections);
    return fullCatalog.map((p) => ({
      name: p.name,
      title: p.name,
      price: p.price,
      original_price: p.oldPrice || null,
      image: p.image || '/assets/banners/cakes-banner.png',
      badge: p.badge || null,
      category: p.sectionTitle || 'Bakery Treats',
      secId: p.sectionId || 'cakes',
      banner: p.section?.banner || '/assets/banners/cakes-banner.png'
    }));
  }, [allSections]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: allProductsList.length };
    ARCHIVE_CATEGORIES.forEach((cat) => {
      if (cat.id === 'all') return;
      if (cat.id === 'cakes') {
        counts[cat.id] = allProductsList.filter(p => p.secId === 'cakes' || p.category.toLowerCase().includes('cake')).length;
      } else if (cat.id === 'bento') {
        counts[cat.id] = allProductsList.filter(p => p.secId === 'bento' || p.name.toLowerCase().includes('bento')).length;
      } else if (cat.id === 'cupcakes') {
        counts[cat.id] = allProductsList.filter(p => p.secId === 'cupcakes' || p.name.toLowerCase().includes('cup cake') || p.name.toLowerCase().includes('cupcake')).length;
      } else if (cat.id === 'brownies') {
        counts[cat.id] = allProductsList.filter(p => p.secId === 'brownies' || p.name.toLowerCase().includes('brownie')).length;
      } else if (cat.id === 'sundae') {
        counts[cat.id] = allProductsList.filter(p => p.secId === 'sundae' || p.name.toLowerCase().includes('sundae')).length;
      } else if (cat.id === 'combos') {
        counts[cat.id] = allProductsList.filter(p => p.secId === 'combos' || p.name.toLowerCase().includes('combo')).length;
      } else if (cat.id === 'best') {
        counts[cat.id] = allProductsList.filter(p => p.secId === 'best' || p.badge?.includes('Top') || p.badge?.includes('Best')).length;
      } else if (cat.id === 'custom') {
        counts[cat.id] = 317;
      }
    });
    return counts;
  }, [allProductsList]);

  // Filtered products for active category and criteria
  const filteredProducts = useMemo(() => {
    return allProductsList.filter((p) => {
      // 1. Category Matching
      if (activeCatId !== 'all') {
        if (activeCatId === 'cakes') {
          if (p.secId !== 'cakes' && !p.category.toLowerCase().includes('cake')) return false;
        } else if (activeCatId === 'bento') {
          if (p.secId !== 'bento' && !p.name.toLowerCase().includes('bento')) return false;
        } else if (activeCatId === 'cupcakes') {
          if (p.secId !== 'cupcakes' && !p.name.toLowerCase().includes('cup cake') && !p.name.toLowerCase().includes('cupcake')) return false;
        } else if (activeCatId === 'brownies') {
          if (p.secId !== 'brownies' && !p.name.toLowerCase().includes('brownie')) return false;
        } else if (activeCatId === 'sundae') {
          if (p.secId !== 'sundae' && !p.name.toLowerCase().includes('sundae')) return false;
        } else if (activeCatId === 'combos') {
          if (p.secId !== 'combos' && !p.name.toLowerCase().includes('combo')) return false;
        } else if (activeCatId === 'best') {
          if (p.secId !== 'best' && !p.badge?.includes('Top') && !p.badge?.includes('Best')) return false;
        } else if (activeCatId === 'custom') {
          if (p.secId !== 'custom' && !p.name.toLowerCase().includes('custom')) return false;
        }
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesCat) return false;
      }

      // 3. Price Filter
      if (p.price > priceMax) return false;

      // 4. Sale Only Filter
      if (saleOnly && !p.original_price && !p.badge?.toLowerCase().includes('sale')) return false;

      // 5. Flavor Filter
      if (selectedFlavors.length > 0) {
        const matchesFlavor = selectedFlavors.some(f => p.name.toLowerCase().includes(f.toLowerCase()));
        if (!matchesFlavor) return false;
      }

      return true;
    });
  }, [allProductsList, activeCatId, searchQuery, priceMax, saleOnly, selectedFlavors]);

  // Sorted Products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case 'popularity':
        return list.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
      case 'rating':
        return list.sort((a, b) => b.price - a.price);
      case 'date':
        return list.reverse();
      case 'price':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [filteredProducts, sortOption]);

  // Paginated slice
  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount);
  }, [sortedProducts, visibleCount]);

  const hasMore = visibleCount < sortedProducts.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setLoadingMore(false);
    }, 450);
  };

  const handleCategorySwitch = (catId) => {
    setActiveCatId(catId);
    setVisibleCount(16);
    if (onNavigate) {
      onNavigate('category-archive', catId);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setPriceMax(10000);
    setSelectedFlavors([]);
    setSaleOnly(false);
    setSortOption('menu_order');
  };

  const activeFiltersCount = (searchQuery ? 1 : 0) + (priceMax < 10000 ? 1 : 0) + selectedFlavors.length + (saleOnly ? 1 : 0);

  const handleWhatsAppGeneralInquiry = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Cake Bites! 🎂\n\nI am browsing the *${activeMeta.name}* archive on your website.\n\nPlease share recommendations, today's freshly available cakes, and delivery details for Karachi. Thank you!`
    );
    window.open(`https://wa.me/923342632631?text=${text}`, '_blank');
  };

  return (
    <div className="rz-archive-page">
      {/* 1. TOP ANNOUNCEMENT NOTICE STRIP */}
      <div className="rz-archive-announcement-strip">
        <div className="rz-announcement-content">
          <span className="rz-announcement-icon">✨</span>
          <span className="rz-announcement-text">
            <strong>FREE DELIVERY IN KARACHI</strong> ON ORDERS ABOVE ₨ 2,500 • 100% ARTISANAL FRESH BAKE GUARANTEE
          </span>
          <a
            href="https://wa.me/923342632631"
            target="_blank"
            rel="noreferrer"
            className="rz-announcement-link"
          >
            Order via WhatsApp 💬
          </a>
        </div>
      </div>

      {/* 2. BREADCRUMBS BAR */}
      <div className="rz-archive-breadcrumb-bar">
        <div className="rz-archive-container rz-breadcrumb-inner">
          <nav className="woocommerce-breadcrumb site-breadcrumb" aria-label="Breadcrumb">
            <button
              type="button"
              className="rz-bread-link"
              onClick={() => onNavigate && onNavigate('home')}
            >
              Home
            </button>
            <span className="razzi-svg-icon delimiter">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
            <button
              type="button"
              className="rz-bread-link"
              onClick={() => handleCategorySwitch('all')}
            >
              Products
            </button>
            {activeCatId !== 'all' && (
              <>
                <span className="razzi-svg-icon delimiter">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
                <span className="rz-bread-current">{activeMeta.name}</span>
              </>
            )}
          </nav>

          <button
            type="button"
            className="rz-back-home-btn"
            onClick={() => onNavigate && onNavigate('home')}
            title="Return to Home"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* 2.5 CATEGORY QUICK LINKS BAR (Matching User Image 2) */}
      <div className="rz-archive-cat-links-bar-wrap">
        <div className="rz-archive-container">
          <nav className="rz-archive-cat-links-bar" aria-label="Quick Category Switch">
            {ARCHIVE_NAV_LINKS.map((link) => {
              const isActive = (activeCatId === link.id) || (link.id === 'cakes' && activeCatId === 'all');
              return (
                <button
                  key={link.id}
                  type="button"
                  className={`rz-archive-cat-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategorySwitch(link.id)}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 3. FULL CATEGORY HERO BANNER IMAGE */}
      <section className="rz-category-full-banner-section">
        <div className="rz-archive-container">
          <div className="rz-full-banner-card">
            <img
              src={activeMeta.banner || '/assets/banners/cakes-banner.png'}
              alt={`${activeMeta.name} Banner`}
              className="rz-full-banner-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/banners/cakes-banner.png';
              }}
            />
          </div>
        </div>
      </section>

      {/* 5. MAIN CONTENT AREA: CUSTOMIZED CAKES OR STANDARD CATALOG */}
      {activeCatId === 'custom' ? (
        <CustomCakesArchiveView
          onNavigate={onNavigate}
          onAdd={onAdd}
          onViewProduct={onViewProduct}
        />
      ) : (
        <>
          <main className="rz-archive-main">
            <div className="rz-archive-container">

          {/* CATALOG TOOLBAR (Matching Razzi `catalog-toolbar layout-v3`) */}
          <div className="catalog-toolbar layout-v3" id="catalog-products-section">
            <div className="catalog-toolbar-left">
              <div className="rz-toolbar-search-box">
                <span className="rz-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder={`Search in ${activeMeta.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rz-toolbar-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="rz-search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <p className="woocommerce-result-count">
                Showing <strong>1–{Math.min(visibleCount, sortedProducts.length)}</strong> of <strong>{sortedProducts.length}</strong> creations
              </p>

              {/* Active Filter Chips */}
              {activeFiltersCount > 0 && (
                <div className="rz-active-filter-chips">
                  {searchQuery && (
                    <span className="rz-chip" onClick={() => setSearchQuery('')}>
                      "{searchQuery}" <span className="rz-chip-x">✕</span>
                    </span>
                  )}
                  {priceMax < 10000 && (
                    <span className="rz-chip" onClick={() => setPriceMax(10000)}>
                      Under {money(priceMax)} <span className="rz-chip-x">✕</span>
                    </span>
                  )}
                  {saleOnly && (
                    <span className="rz-chip" onClick={() => setSaleOnly(false)}>
                      Sale Only <span className="rz-chip-x">✕</span>
                    </span>
                  )}
                  {selectedFlavors.map(flavor => (
                    <span key={flavor} className="rz-chip" onClick={() => setSelectedFlavors(prev => prev.filter(f => f !== flavor))}>
                      {flavor} <span className="rz-chip-x">✕</span>
                    </span>
                  ))}
                  <button type="button" className="rz-chip-clear-all" onClick={handleResetFilters}>
                    Clear All
                  </button>
                </div>
              )}
            </div>

            <div className="catalog-toolbar-right">
              {/* Filter Button */}
              <button
                type="button"
                className={`toggle-filters catalog-toolbar-item__control ${filterDrawerOpen ? 'active' : ''}`}
                onClick={() => setFilterDrawerOpen(prev => !prev)}
                aria-label="Toggle filters"
              >
                <span className="razzi-svg-icon svg-normal">
                  <svg aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M16 4H7.78186V5.45457H16V4Z" fill="currentColor"/>
                    <path d="M2.4 4H0V5.45457H2.4V4Z" fill="currentColor"/>
                    <path d="M16 10.5454H13.6V12H16V10.5454Z" fill="currentColor"/>
                    <path d="M8.2182 10.5454H0V12H8.2182V10.5454Z" fill="currentColor"/>
                    <path d="M5.09084 1.81812C3.49085 1.81812 2.18176 3.12721 2.18176 4.72723C2.18176 6.32722 3.49085 7.63631 5.09084 7.63631C6.69083 7.63631 7.99993 6.32722 7.99993 4.72723C7.99996 3.12721 6.69087 1.81812 5.09084 1.81812ZM5.09084 6.32722C4.21812 6.32722 3.49085 5.59996 3.49085 4.72723C3.49085 3.8545 4.21812 3.12724 5.09084 3.12724C5.96357 3.12724 6.69083 3.8545 6.69083 4.72723C6.69087 5.59996 5.96357 6.32722 5.09084 6.32722Z" fill="currentColor"/>
                    <path d="M10.9091 8.36365C9.30908 8.36365 8 9.67274 8 11.2727C8 12.8727 9.30908 14.1818 10.9091 14.1818C12.5091 14.1818 13.8182 12.8727 13.8182 11.2727C13.8182 9.67274 12.5091 8.36365 10.9091 8.36365ZM10.9091 12.8727C10.0364 12.8727 9.30908 12.1455 9.30908 11.2727C9.30908 10.4 10.0364 9.67274 10.9091 9.67274C11.7818 9.67274 12.5091 10.4 12.5091 11.2727C12.5091 12.1455 11.7818 12.8727 10.9091 12.8727Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="toggle-filters-text">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="rz-filter-active-count">{activeFiltersCount}</span>
                )}
              </button>

              {/* WooCommerce Ordering Dropdown */}
              <form className="woocommerce-ordering" onSubmit={(e) => e.preventDefault()}>
                <select
                  name="orderby"
                  className="orderby"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  aria-label="Shop order"
                >
                  <option value="menu_order">Default sorting</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="date">Sort by latest</option>
                  <option value="price">Sort by price: low to high</option>
                  <option value="price-desc">Sort by price: high to low</option>
                  <option value="name">Sort by name: A to Z</option>
                </select>
              </form>

              {/* Grid Column Layout Switcher */}
              <div className="rz-grid-switcher" aria-label="Layout view options">
                <button
                  type="button"
                  className={`rz-grid-switch-btn ${gridColumns === 4 ? 'active' : ''}`}
                  onClick={() => setGridColumns(4)}
                  title="4 Columns Grid"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="4" height="20" rx="1"/>
                    <rect x="8" y="2" width="4" height="20" rx="1"/>
                    <rect x="14" y="2" width="4" height="20" rx="1"/>
                    <rect x="20" y="2" width="4" height="20" rx="1"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className={`rz-grid-switch-btn ${gridColumns === 3 ? 'active' : ''}`}
                  onClick={() => setGridColumns(3)}
                  title="3 Columns Grid"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="5.5" height="20" rx="1"/>
                    <rect x="9.25" y="2" width="5.5" height="20" rx="1"/>
                    <rect x="16.5" y="2" width="5.5" height="20" rx="1"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className={`rz-grid-switch-btn ${gridColumns === 2 ? 'active' : ''}`}
                  onClick={() => setGridColumns(2)}
                  title="2 Columns Grid"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="9" height="20" rx="1"/>
                    <rect x="13" y="2" width="9" height="20" rx="1"/>
                  </svg>
                </button>
              </div>

              {/* WhatsApp Quick Assistance */}
              <button
                type="button"
                className="rz-toolbar-whatsapp-btn"
                onClick={handleWhatsAppGeneralInquiry}
                title="Inquire with Baker on WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp Order</span>
              </button>
            </div>
          </div>

          {/* VIEW: 19 CUSTOM OCCASIONS (When activeCatId === 'custom' && customViewMode === 'occasions') */}
          {activeCatId === 'custom' && customViewMode === 'occasions' ? (
            <div className="rz-custom-occasions-grid">
              {CUSTOM_OCCASION_CATEGORIES.map((occ) => {
                const waUrl = `https://wa.me/923342632631?text=${encodeURIComponent(
                  `Assalam-o-Alaikum Cake Bites! 🎂\n\nI want to order a customized *${occ.name}* (${occ.tag}).\n\nPlease share design catalog, minimum weight, flavors, and pricing.`
                )}`;
                return (
                  <div key={occ.id} className="rz-custom-occasion-card" onClick={() => window.open(waUrl, '_blank')}>
                    <div className="rz-occasion-thumb">
                      <img 
                        src={occ.img} 
                        alt={occ.name} 
                        loading="lazy" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/products/custom-cupcake-box-1.png';
                        }}
                      />
                      <span className="rz-occasion-badge">{occ.tag}</span>
                    </div>
                    <div className="rz-occasion-body">
                      <div className="rz-occasion-title-row">
                        <span className="rz-occasion-emoji">{occ.emoji}</span>
                        <h3 className="rz-occasion-name">{occ.name}</h3>
                      </div>
                      <p className="rz-occasion-desc">{occ.desc}</p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rz-occasion-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Inquire on WhatsApp 💬
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* STANDARD PRODUCTS LOOP (Elementor / WooCommerce products loop) */
            <>
              {displayedProducts.length === 0 ? (
                <div className="rz-archive-empty">
                  <div className="rz-empty-icon">{activeMeta.emoji}</div>
                  <h3 className="rz-empty-title">No creations found</h3>
                  <p className="rz-empty-text">
                    We couldn't find any items matching your active search or filters. Try adjusting your price range or clearing selected filters.
                  </p>
                  <button
                    type="button"
                    className="rz-empty-reset-btn"
                    onClick={handleResetFilters}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className={`custom-cakes-grid cols-${gridColumns}`}>
                  {displayedProducts.map((p, idx) => (
                    <WooProductCard
                      key={`${p.name}-${idx}`}
                      product={p}
                      onAdd={onAdd}
                      onViewProduct={onViewProduct}
                    />
                  ))}
                </div>
              )}

              {/* PAGINATION & LOAD MORE (`woolentor-pagination` on cakebites.pk) */}
              {displayedProducts.length > 0 && (
                <div className="woolentor-pagination woolentor-pagination-load_more rz-pagination-wrap">
                  <div className="rz-pagination-status">
                    Showing <strong>{displayedProducts.length}</strong> of <strong>{sortedProducts.length}</strong> cakes
                  </div>

                  {hasMore && (
                    <button
                      type="button"
                      className={`woolentor-load-more-btn rz-load-more-btn ${loadingMore ? 'loading' : ''}`}
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                    >
                      {loadingMore ? (
                        <>
                          <span className="rz-spinner" />
                          <span>Loading Creations...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Products</span>
                          <span className="rz-arrow-down">↓</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </main>

      {/* 7. INTERACTIVE SLIDE-OVER FILTER DRAWER (`catalog-filters`) */}
      {filterDrawerOpen && (
        <div className="rz-filter-drawer-backdrop" onClick={() => setFilterDrawerOpen(false)} role="dialog" aria-modal="true">
          <aside className="rz-filter-drawer-panel" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="rz-filter-drawer-header">
              <div className="rz-filter-header-left">
                <span className="rz-filter-icon">⚙</span>
                <h3 className="rz-filter-drawer-title">Filter Products</h3>
                {activeFiltersCount > 0 && (
                  <span className="rz-filter-badge-pill">{activeFiltersCount} active</span>
                )}
              </div>
              <div className="rz-filter-header-right">
                {activeFiltersCount > 0 && (
                  <button type="button" className="rz-filter-reset-text-btn" onClick={handleResetFilters}>
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  className="rz-filter-close-btn"
                  onClick={() => setFilterDrawerOpen(false)}
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Drawer Body Scroll */}
            <div className="rz-filter-drawer-body">
              {/* Search Box */}
              <div className="rz-filter-section">
                <h4 className="rz-filter-heading">Search in Collection</h4>
                <div className="rz-filter-search-box">
                  <input
                    type="text"
                    placeholder="Search cakes, flavors, combos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button type="button" className="rz-search-clear" onClick={() => setSearchQuery('')}>✕</button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="rz-filter-section">
                <h4 className="rz-filter-heading">Product Categories</h4>
                <div className="rz-filter-category-list">
                  {ARCHIVE_CATEGORIES.map((cat) => (
                    <label key={cat.id} className="rz-filter-radio-label">
                      <input
                        type="radio"
                        name="archive-cat"
                        checked={activeCatId === cat.id}
                        onChange={() => {
                          handleCategorySwitch(cat.id);
                        }}
                      />
                      <span className="rz-radio-custom" />
                      <span className="rz-radio-name">{cat.emoji} {cat.name}</span>
                      <span className="rz-radio-count">({categoryCounts[cat.id] || 0})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="rz-filter-section">
                <div className="rz-filter-heading-row">
                  <h4 className="rz-filter-heading">Max Price Filter</h4>
                  <span className="rz-filter-price-display">{money(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="rz-price-slider"
                />
                <div className="rz-price-presets">
                  <button type="button" className={`rz-price-chip ${priceMax === 2000 ? 'active' : ''}`} onClick={() => setPriceMax(2000)}>
                    Under 2k
                  </button>
                  <button type="button" className={`rz-price-chip ${priceMax === 3500 ? 'active' : ''}`} onClick={() => setPriceMax(3500)}>
                    Under 3.5k
                  </button>
                  <button type="button" className={`rz-price-chip ${priceMax === 5000 ? 'active' : ''}`} onClick={() => setPriceMax(5000)}>
                    Under 5k
                  </button>
                  <button type="button" className={`rz-price-chip ${priceMax === 10000 ? 'active' : ''}`} onClick={() => setPriceMax(10000)}>
                    All Prices
                  </button>
                </div>
              </div>

              {/* Flavor Tags */}
              <div className="rz-filter-section">
                <h4 className="rz-filter-heading">Signature Flavors</h4>
                <div className="rz-flavor-pills-wrap">
                  {FLAVORS.map((flavor) => {
                    const active = selectedFlavors.includes(flavor);
                    return (
                      <button
                        key={flavor}
                        type="button"
                        className={`rz-flavor-pill ${active ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedFlavors(prev =>
                            active ? prev.filter(f => f !== flavor) : [...prev, flavor]
                          );
                        }}
                      >
                        {flavor}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Offers / Sale Only */}
              <div className="rz-filter-section">
                <label className="rz-toggle-label">
                  <input
                    type="checkbox"
                    checked={saleOnly}
                    onChange={(e) => setSaleOnly(e.target.checked)}
                  />
                  <span className="rz-toggle-slider" />
                  <span className="rz-toggle-text">Show Discounted & Deals Only</span>
                </label>
              </div>

            </div>

            {/* Sticky Drawer Footer */}
            <div className="rz-filter-drawer-footer">
              <button
                type="button"
                className="rz-filter-apply-btn"
                onClick={() => setFilterDrawerOpen(false)}
              >
                Apply Filters ({sortedProducts.length} Items)
              </button>
            </div>
          </aside>
        </div>
      )}
        </>
      )}



      {/* 9. FLOATING WHATSAPP ASSISTANT BUTTON */}
      <a
        href="https://wa.me/923342632631"
        target="_blank"
        rel="noreferrer"
        className="rz-archive-floating-wa"
        title="Chat with Cake Bites on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </div>
  );
}
