import React, { useState, useEffect, useMemo } from 'react';
import { buildFullCatalog } from './catalogData';

export default function MenuPage({ 
  sectionsData, 
  onAdd, 
  onView3D, 
  onOpenStudio, 
  onNavigate, 
  ProductCardComponent,
  activeCategory = 'All'
}) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Reset pagination when category, search query, or sort changes
  useEffect(() => {
    setVisibleCount(20);
  }, [selectedCategory, searchQuery, sortBy]);

  // Sync with prop when drawer opens a specific category
  useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
      setVisibleCount(20);
    }
  }, [activeCategory]);

  // Complete catalog across all regular bakery treats + 317 customized cakes (415 products total)
  const allProducts = useMemo(() => {
    return buildFullCatalog(sectionsData);
  }, [sectionsData]);

  // Authentic Categories list matching cakebites.pk reference design
  const categoryFilters = [
    { label: 'All Treats', value: 'All' },
    { label: 'Cakes', value: 'cakes' },
    { label: 'Cup Cakes', value: 'cupcakes' },
    { label: 'Brownies', value: 'brownies' },
    { label: 'Sundae', value: 'sundae' },
    { label: 'Bento Cakes', value: 'bento' },
    { label: 'Customized Cakes', value: 'custom' },
    { label: "Combo's", value: 'combos' },
    { label: 'Best Selling', value: 'best' },
  ];

  // Category Title Map for dynamic page headers
  const categoryTitleMap = {
    all: 'Bakery Menu',
    cakes: 'Cakes',
    cake: 'Cakes',
    cupcakes: 'Cup Cakes',
    cupcake: 'Cup Cakes',
    brownies: 'Brownies',
    sundae: 'Sundae Collection',
    bento: 'Bento Cakes',
    custom: 'Customized Cakes',
    combos: "Combo's & Deals",
    best: 'Best Selling Delicacies',
  };

  const currentCategoryTitle = categoryTitleMap[(selectedCategory || 'All').toLowerCase()] || selectedCategory;

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((prod) => {
        // Category filter
        if (selectedCategory !== 'All') {
          const target = selectedCategory.toLowerCase();
          const matchesSecId = prod.sectionIds.has(target);
          const matchesSecCat = prod.sectionCategories.has(target);
          const matchesSecTitle = prod.sectionTitles.has(target);

          // Category aliases & semantic mappings
          let matchesAlias = false;
          if (target === 'cakes' || target === 'cake') {
            matchesAlias = prod.sectionIds.has('cakes') || prod.sectionIds.has('best');
          } else if (target === 'cupcakes' || target === 'cupcake') {
            matchesAlias = prod.sectionIds.has('cupcakes') || prod.name.toLowerCase().includes('cup cake') || prod.name.toLowerCase().includes('cupcake');
          } else if (target === 'brownies' || target === 'brownie') {
            matchesAlias = prod.sectionIds.has('brownies') || prod.name.toLowerCase().includes('brownie');
          } else if (target === 'sundae') {
            matchesAlias = prod.sectionIds.has('sundae') || prod.name.toLowerCase().includes('sundae');
          } else if (target === 'bento') {
            matchesAlias = prod.sectionIds.has('bento') || prod.name.toLowerCase().includes('bento');
          } else if (target === 'custom') {
            matchesAlias = prod.sectionIds.has('custom') || prod.name.toLowerCase().includes('custom');
          } else if (target === 'combos' || target === 'combo') {
            matchesAlias = prod.sectionIds.has('combos') || prod.name.toLowerCase().includes('combo');
          } else if (target === 'best') {
            matchesAlias = prod.sectionIds.has('best') || (prod.badge && (prod.badge.toLowerCase().includes('top') || prod.badge.toLowerCase().includes('best') || prod.badge.toLowerCase().includes('trending') || prod.badge.toLowerCase().includes('popular') || prod.badge.toLowerCase().includes('hot')));
          }

          if (!matchesSecId && !matchesSecCat && !matchesSecTitle && !matchesAlias) {
            return false;
          }
        }

        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = prod.name.toLowerCase().includes(q);
          const matchSec = (prod.sectionTitle || '').toLowerCase().includes(q);
          if (!matchName && !matchSec) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // default order
      });
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  // Sliced products for 20-at-a-time pagination (Load More)
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  return (
    <div className="subpage-wrapper menu-page-wrapper">
      {/* Header Banner */}
      <div className="subpage-header">
        <div className="container text-center">
          <div className="subpage-breadcrumb">
            <button type="button" onClick={() => onNavigate('home')} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-sep">/</span>
            {selectedCategory !== 'All' ? (
              <>
                <button 
                  type="button" 
                  onClick={() => {
                    setSelectedCategory('All');
                    window.location.hash = 'menu';
                  }} 
                  className="breadcrumb-link"
                >
                  Menu
                </button>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">{currentCategoryTitle}</span>
              </>
            ) : (
              <span className="breadcrumb-current">Menu</span>
            )}
          </div>
          <h1 className="subpage-title">{currentCategoryTitle}</h1>
          <p className="subpage-subtitle">
            {selectedCategory === 'All' 
              ? 'Handcrafted cakes, cupcakes, brownies, sundaes & customized cakes' 
              : `Explore our premium freshly-baked ${currentCategoryTitle} in Karachi`}
          </p>
        </div>
      </div>

      <div className="container subpage-content">
        {/* Category Pills Filter Bar matching reference design */}
        <div className="menu-filter-bar">
          <div className="category-chips-scroll">
            {categoryFilters.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`menu-chip-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  window.location.hash = cat.value && cat.value !== 'All' ? `menu/${encodeURIComponent(cat.value)}` : 'menu';
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search, Count, Sort & View Switcher Toolbar */}
        <div className="menu-toolbar">
          <div className="menu-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="menu-search-input"
              placeholder="Search cakes, sundaes, lotus, brownies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="menu-toolbar-right">
            <span className="menu-count-text">
              Showing <b>{filteredProducts.length > 0 ? `1-${Math.min(visibleCount, filteredProducts.length)}` : '0'}</b> of <b>{filteredProducts.length}</b> products
            </span>

            <div className="menu-sort-box">
              <select
                id="menu-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="menu-sort-select"
                aria-label="Sort products"
              >
                <option value="default">Default sorting</option>
                <option value="price-asc">Sort by price: low to high</option>
                <option value="price-desc">Sort by price: high to low</option>
                <option value="name-asc">Sort by name: A to Z</option>
              </select>
            </div>

            {/* Grid vs List View Switcher matching cakebites.pk toolbar */}
            <div className="menu-view-switcher" role="group" aria-label="Layout view switcher">
              <button
                type="button"
                className={`menu-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
                aria-label="Grid view"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
                  <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
                  <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
                  <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
                </svg>
              </button>
              <button
                type="button"
                className={`menu-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List view"
                aria-label="List view"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="4" width="18" height="3" rx="1.5" />
                  <rect x="3" y="10.5" width="18" height="3" rx="1.5" />
                  <rect x="3" y="17" width="18" height="3" rx="1.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid or List View (Showing 20 items per load) */}
        {displayedProducts.length > 0 ? (
          <div className={viewMode === 'list' ? 'menu-products-list' : 'product-grid menu-products-grid'}>
            {displayedProducts.map((p, idx) => (
              <ProductCardComponent
                key={`${p.name}-${idx}`}
                item={p.raw}
                section={p.section || { id: p.sectionId, title: p.sectionTitle, category: p.sectionTitle || 'Bento Cake' }}
                index={idx}
                onAdd={onAdd}
                onView3D={onView3D}
              />
            ))}
          </div>
        ) : (
          <div className="menu-empty-results">
            <div className="empty-icon">🎂🔍</div>
            <h3>No matching treats found</h3>
            <p>We couldn't find anything matching "{searchQuery}". Try searching for chocolate, lotus, fudge, or brownie.</p>
            <button
              type="button"
              className="btn-gold-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Button: Loads next 20 products */}
        {filteredProducts.length > visibleCount && (
          <div className="menu-load-more-wrap">
            <button
              type="button"
              className="menu-load-more-btn"
              disabled={isLoadingMore}
              onClick={() => {
                setIsLoadingMore(true);
                setTimeout(() => {
                  setVisibleCount((prev) => prev + 20);
                  setIsLoadingMore(false);
                }, 200);
              }}
            >
              {isLoadingMore ? (
                <>
                  <span className="load-more-spinner" />
                  <span>Loading products...</span>
                </>
              ) : (
                <span>Load More Products</span>
              )}
            </button>
            <div className="menu-load-more-progress">
              <div 
                className="menu-load-more-bar" 
                style={{ width: `${Math.min(100, (visibleCount / filteredProducts.length) * 100)}%` }} 
              />
            </div>
            <span className="menu-load-more-count">
              Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} products
            </span>
          </div>
        )}

        {/* All Products Loaded Message */}
        {filteredProducts.length > 20 && visibleCount >= filteredProducts.length && (
          <div className="menu-all-loaded-box">
            <div className="all-loaded-line" />
            <span className="all-loaded-text">✨ You have viewed all {filteredProducts.length} products ✨</span>
            <div className="all-loaded-line" />
          </div>
        )}
      </div>
    </div>
  );
}
