import React, { useState, useMemo, useRef, useEffect } from 'react';
import customCakesData from './customCakesData.json';
import './archive.css';

export const CUSTOM_CATEGORIES = [
  'Animated Cakes',
  'Anniversary Cakes',
  'Azadi Treat Cakes',
  'Baby Birthday Cakes',
  'BigCakes',
  'Birthday Cakes',
  'Boss Baby Cakes',
  'Cup Cakes',
  'Cream & Chocolate',
  'Dholki Cakes',
  'Doll',
  'Engagement Cakes',
  'Free From Cakes',
  'Friends Cake',
  'Mom Dad',
  'Mother Day Cakes',
  'Nikah Cakes',
  'Office Cakes',
  'Pre Orders',
  'Unicorn',
  'Walima Cakes',
  'Wedding Cakes'
];

export const categoryMatches = (product, catName) => {
  if (!catName || catName === 'All') return true;
  const pCat = (product.cat || '').toLowerCase();
  const pTitle = (product.title || '').toLowerCase();
  const target = catName.toLowerCase().trim();

  if (target === 'animated cakes') return pCat.includes('animated') || pTitle.includes('animated');
  if (target === 'anniversary cakes') return pCat.includes('anniversary') || pTitle.includes('anniversary');
  if (target === 'azadi treat cakes') return pCat.includes('azadi') || pTitle.includes('azadi');
  if (target === 'baby birthday cakes') return pCat.includes('baby') || pTitle.includes('baby') || pCat.includes('boss baby');
  if (target === 'bigcakes') return pCat.includes('big cake') || pTitle.includes('big cake');
  if (target === 'birthday cakes') return pCat.includes('birthday') || pTitle.includes('birthday') || pCat.includes('baby') || pCat.includes('animated');
  if (target === 'boss baby cakes') return pCat.includes('boss baby') || pTitle.includes('boss baby');
  if (target === 'cup cakes') return pCat.includes('cup') || pTitle.includes('cup');
  if (target === 'cream & chocolate') return pCat.includes('cream & chocolate') || pCat.includes('cream &amp; chocolate') || pTitle.includes('chocolate');
  if (target === 'dholki cakes') return pCat.includes('dholki') || pTitle.includes('dholki');
  if (target === 'doll') return pCat.includes('doll') || pTitle.includes('doll') || pTitle.includes('princess');
  if (target === 'engagement cakes') return pCat.includes('engagement') || pTitle.includes('engagement');
  if (target === 'free from cakes') return pCat.includes('free from') || pTitle.includes('free') || pCat.includes('customized cakes');
  if (target === 'friends cake') return pCat.includes('friends') || pTitle.includes('friends');
  if (target === 'mom dad') return pCat.includes('mom dad') || pCat.includes('mom') || pTitle.includes('mom') || pTitle.includes('dad') || pTitle.includes('ammi');
  if (target === 'mother day cakes') return pCat.includes('mother') || pTitle.includes('mother') || pTitle.includes('ammi');
  if (target === 'nikah cakes') return pCat.includes('nikah') || pTitle.includes('nikah');
  if (target === 'office cakes') return pCat.includes('office') || pTitle.includes('office') || pTitle.includes('corporate');
  if (target === 'pre orders') return pCat.includes('pre order') || pCat.includes('customized cakes');
  if (target === 'unicorn') return pCat.includes('unicorn') || pTitle.includes('unicorn');
  if (target === 'walima cakes') return pCat.includes('walima') || pTitle.includes('walima');
  if (target === 'wedding cakes') return pCat.includes('wedding') || pTitle.includes('wedding');

  return pCat.includes(target) || pTitle.includes(target);
};

function CustomCakeCard({ product, selectedCategory, onAdd, onViewProduct }) {
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const formattedPrice = Number(product.price || 4500).toLocaleString('en-PK');
  const catLabel = product.cat || selectedCategory || 'Customized Cakes';

  // Consistent local fallback box image if external image fails
  const boxIndex = (Math.abs((product.productId || product.id || product.title || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % 8) + 1;
  const localFallback = `/assets/products/custom-cupcake-box-${boxIndex}.png`;
  const imageSrc = imgErr ? localFallback : (product.img || localFallback);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAdd) {
      onAdd({
        name: product.title,
        price: product.price || 4500,
        image: imageSrc
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  const handleCardClick = () => {
    if (onViewProduct) {
      onViewProduct({
        name: product.title,
        title: product.title,
        price: product.price || 4500,
        original_price: null,
        category: catLabel,
        image: imageSrc,
        images: [imageSrc],
        badge: 'Custom Order',
        desc: `Artisanal bespoke handcrafted celebration cake from Cake Bites Karachi. Minimum order 2-3 days advance notice. Available in Belgian Chocolate Fudge, Lotus, Red Velvet and Fresh Cream.`
      });
    } else {
      const text = encodeURIComponent(
        `Assalam-o-Alaikum Cake Bites! 🎂\n\nI want to order this Customized Cake:\n*${product.title}*\nCategory: ${catLabel}\nPrice: Rs ${formattedPrice}\nImage: ${imageSrc}\n\nPlease share flavor options, pound sizes, and delivery availability for Karachi.`
      );
      window.open(`https://wa.me/923342632631?text=${text}`, '_blank');
    }
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
          alt={product.title}
          loading="lazy"
          className="product-img"
          onError={() => setImgErr(true)}
        />
        {/* Luxury diagonal light gleam beam */}
        <div className="product-art-shimmer" aria-hidden="true" />
      </div>

      <div className="product-body">
        <div className="product-meta-row">
          <span className="product-category">{catLabel}</span>
        </div>

        <h3 title={product.title}>{product.title}</h3>

        <div className="price-row">
          <div className="price-values">
            <span className="price">Rs {formattedPrice}</span>
          </div>
        </div>

        <button
          type="button"
          className={`add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
          title={`Add ${product.title} to cart`}
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

export default function CustomCakesArchiveView({
  onNavigate,
  onAdd,
  onViewProduct
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('menu_order');
  const [gridCols, setGridCols] = useState(3); // 3 or 2
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    return customCakesData.filter((p) => categoryMatches(p, selectedCategory));
  }, [selectedCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case 'popularity':
        return list.reverse();
      case 'rating':
        return list.sort((a, b) => b.price - a.price);
      case 'date':
        return list;
      case 'price':
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [filteredProducts, sortOption]);

  const displayedProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleCount);
  }, [sortedProducts, visibleCount]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setDropdownOpen(false);
    setVisibleCount(20);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setLoadingMore(false);
    }, 350);
  };

  const handleSelectOptions = (product) => {
    if (onViewProduct) {
      onViewProduct({
        name: product.title,
        title: product.title,
        price: product.price,
        original_price: null,
        category: product.cat || 'Customized Cakes',
        image: product.img,
        images: [product.img],
        badge: 'Custom Order',
        desc: `Artisanal bespoke handcrafted celebration cake from Cake Bites Karachi. Minimum order 2-3 days advance notice. Available in Belgian Chocolate Fudge, Lotus, Red Velvet and Fresh Cream.`
      });
    } else {
      const text = encodeURIComponent(
        `Assalam-o-Alaikum Cake Bites! 🎂\n\nI want to order this Customized Cake:\n*${product.title}*\nCategory: ${product.cat}\nPrice: Rs ${Number(product.price).toLocaleString('en-PK')}\nImage: ${product.img}\n\nPlease share flavor options, pound sizes, and delivery availability for Karachi.`
      );
      window.open(`https://wa.me/923342632631?text=${text}`, '_blank');
    }
  };

  return (
    <div className="custom-archive-page-root" style={{ background: '#0D3A4B' }}>
      {/* Centered Top Title & Dropdown Trigger matching Screenshot */}
      <div className="custom-archive-dropdown-header">
        <div className="custom-dropdown-container" ref={dropdownRef}>
          <button
            type="button"
            className="custom-dropdown-trigger"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            title="Click to browse all Customized Cake archive categories"
          >
            <span>Customized Cakes</span>
            <span className={`custom-dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▾</span>
          </button>

          {/* Floating Vertical Dropdown Menu with all 22 categories (Exact screenshot match!) */}
          {dropdownOpen && (
            <div className="custom-dropdown-menu" role="menu">
              {/* Option to view all */}
              <button
                type="button"
                className={`custom-dropdown-item ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => handleSelectCategory('All')}
                onMouseEnter={() => setHoveredCategory('All')}
              >
                All Customized Cakes ({customCakesData.length})
              </button>

              {/* All 22 Categories in exact alphabetical order */}
              {CUSTOM_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                const isHovered = hoveredCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`custom-dropdown-item ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectCategory(cat)}
                    onMouseEnter={() => setHoveredCategory(cat)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    title={`Browse ${cat} Archive`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="rz-archive-container">
        {/* Floating Dark Teal Catalog Toolbar matching Screenshot */}
        <div className="custom-archive-toolbar">
          <div className="custom-results-info">
            Showing 1–{Math.min(visibleCount, sortedProducts.length)} of {sortedProducts.length} products
            {selectedCategory !== 'All' && (
              <span style={{ color: '#d5a348', marginLeft: 8, fontSize: 13 }}>
                • Filtered: <strong>{selectedCategory}</strong>
                <button
                  type="button"
                  onClick={() => handleSelectCategory('All')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff8a8a',
                    cursor: 'pointer',
                    marginLeft: 6,
                    fontWeight: 700,
                    fontSize: 12
                  }}
                  title="Clear filter"
                >
                  ✕ Clear
                </button>
              </span>
            )}
          </div>

          <div className="custom-toolbar-controls">
            {/* Sorting Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="custom-sort-select"
              aria-label="Sort custom cakes"
            >
              <option value="menu_order">Default sorting</option>
              <option value="popularity">Sort by popularity</option>
              <option value="rating">Sort by average rating</option>
              <option value="date">Sort by latest</option>
              <option value="price-asc">Sort by price: low to high</option>
              <option value="price-desc">Sort by price: high to low</option>
            </select>

            {/* Grid Layout Switcher matching Screenshot */}
            <div className="custom-view-toggles">
              <button
                type="button"
                className={`custom-view-btn ${gridCols === 3 ? 'active' : ''}`}
                onClick={() => setGridCols(3)}
                title="3 Columns Grid"
                aria-label="3 Columns View"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h4v4H3V3zm7 0h4v4h-4V3zm7 0h4v4h-4V3zM3 10h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4zM3 17h4v4H3v-4zm7 0h4v4h-4v-4zm7 0h4v4h-4v-4z" />
                </svg>
              </button>
              <button
                type="button"
                className={`custom-view-btn ${gridCols === 2 ? 'active' : ''}`}
                onClick={() => setGridCols(2)}
                title="2 Columns Grid"
                aria-label="2 Columns View"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 4h8v7H3V4zm10 0h8v7h-8V4zM3 13h8v7H3v-7zm10 0h8v7h-8v-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid matching Screenshot */}
        {displayedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(255,255,255,0.7)' }}>
            <p style={{ fontSize: 36, margin: 0 }}>🎂</p>
            <p style={{ fontSize: 18, marginTop: 12 }}>No cakes found in {selectedCategory}</p>
            <button
              type="button"
              onClick={() => handleSelectCategory('All')}
              style={{
                marginTop: 12,
                padding: '8px 22px',
                background: '#cca044',
                color: '#072532',
                border: 'none',
                borderRadius: 6,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className={`custom-cakes-grid cols-${gridCols}`}>
            {displayedProducts.map((p, idx) => (
              <CustomCakeCard
                key={`${p.title}-${idx}`}
                product={p}
                selectedCategory={selectedCategory}
                onAdd={onAdd}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < sortedProducts.length && (
          <div style={{ textAlign: 'center', margin: '30px 0 60px' }}>
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              style={{
                background: '#cca044',
                color: '#072532',
                border: 'none',
                padding: '12px 32px',
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 700,
                cursor: loadingMore ? 'wait' : 'pointer',
                boxShadow: '0 4px 15px rgba(204, 160, 68, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              {loadingMore ? 'Loading More Cakes...' : `Load More Cakes (${sortedProducts.length - visibleCount} remaining)`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
