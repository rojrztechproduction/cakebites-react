import React from 'react';

const HIGHLIGHT_PRODUCTS = [
  {
    name: 'Lotus Three Milk Cake',
    price: 2199,
    image: '/assets/products/lotus-three-milk-cake.jpeg',
    badge: 'Signature',
    desc: 'Spongy vanilla sponge soaked in three milks, topped with authentic Biscoff Lotus spread.'
  },
  {
    name: 'Double Fudge Cake',
    price: 1899,
    image: '/assets/products/double-fudge-cake.jpeg',
    badge: 'Best Seller',
    desc: 'Deep Belgian dark chocolate fudge layers with silky ganache glaze.'
  },
  {
    name: 'Nutella Cake (Medium)',
    price: 1999,
    image: '/assets/products/nutella-cake.jpeg',
    badge: 'Trending',
    desc: 'Generous layers of premium Italian Nutella hazelnut cream on moist cocoa sponge.'
  },
  {
    name: 'Ferrero Rocher Chocolate Cake',
    price: 2399,
    image: '/assets/products/ferrero-rocher-cake.png',
    badge: 'Luxury',
    desc: 'Crushed roasted hazelnuts, Rocher praline cream, and chocolate wafer crisp.'
  }
];

export default function AboutPage({ onNavigate, onOpenStudio, onAdd, onView3D }) {
  const [addedProduct, setAddedProduct] = React.useState(null);

  const handleAdd = (prod) => {
    onAdd({ name: prod.name, price: prod.price, image: prod.image, badge: prod.badge });
    setAddedProduct(prod.name);
    setTimeout(() => setAddedProduct(null), 1400);
  };

  return (
    <div className="subpage-wrapper about-page">
      {/* Breadcrumb Header */}
      <div className="subpage-header">
        <div className="container">
          <div className="subpage-breadcrumb">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            >
              Home
            </a>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">About</span>
          </div>
          <h1 className="subpage-title">About → Cake Bites</h1>
          <p className="subpage-subtitle">A little cream for a bigger smile</p>
        </div>
      </div>

      <div className="container subpage-content">
        {/* Quote Hero Card */}
        <section className="about-hero-card">
          <div className="about-hero-quote-mark">“</div>
          <div className="about-hero-inner">
            <p className="about-quote-text">
              Like a dream that feels too magical to be real, every creation by <strong>CakeBites</strong> carries a charm that delights with each bite, sweeping you into a world of indulgence where every dessert wish comes true.
            </p>
            <div className="about-quote-author">— CakeBites Confectionery Artisans</div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story-section">
          <div className="about-story-grid">
            <div className="about-story-text">
              <span className="section-kicker">OUR KARACHI HERITAGE</span>
              <h2 className="about-heading">Crafting Moments of Joy Through Desserts</h2>
              <p>
                Founded in Karachi, Pakistan, the philosophy of <strong>CakeBites</strong> has always been simple yet profound: to craft moments of joy through desserts, blending flavor with feeling in perfect harmony.
              </p>
              <p>
                From rich, triple-chocolate fudge cakes to delicate cupcakes, brownies, sundaes, and artisanal bento cakes, CakeBites has earned a cherished place in the hearts of Karachi’s dessert lovers, becoming more than just a bakery — it’s a destination where celebrations find their sweetest expression.
              </p>
              <p>
                Whether it is an intimate birthday celebration, an anniversary surprise at midnight, or an everyday craving for something truly sweet, we bake every single delicacy fresh to order using time-honored artisanal European pastry methods.
              </p>
              <div className="about-hero-actions">
                <button 
                  type="button" 
                  className="btn-gold-primary" 
                  onClick={() => onNavigate('menu')}
                >
                  🍰 Explore Bakery Menu
                </button>
              </div>
            </div>

            <div className="about-story-media">
              <div className="about-image-frame">
                <img 
                  src="/assets/banners/best-selling-banner.png" 
                  alt="CakeBites Best Selling Creations" 
                  className="about-feature-img"
                />
                <div className="about-badge-float">
                  <span className="badge-icon">⭐</span>
                  <div>
                    <strong>Freshly Baked in Karachi</strong>
                    <small>Daily Delivery: 11 AM – 1 AM</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillar Value Cards */}
        <section className="about-badges-section">
          <div className="about-badge-card">
            <div className="badge-card-icon">🧈</div>
            <div className="badge-card-tag">AUTHENTIC RECIPES</div>
            <h3>100% REAL BUTTER & CREAM</h3>
            <p>
              We source strictly premium Belgian chocolates, pure Dutch cocoa, real dairy cream, and Madagascar vanilla beans. No shortcuts, ever.
            </p>
          </div>

          <div className="about-badge-card highlight-card">
            <div className="badge-card-icon">🏆</div>
            <div className="badge-card-tag">KARACHI’S FAVORITE</div>
            <h3>BEST DESSERT IN TOWN</h3>
            <p>
              Thousands of 5-star celebrations served across Cantt, Clifton, DHA, Gulshan, and Nazimabad. Every bite is an unforgettable experience.
            </p>
          </div>

          <div className="about-badge-card">
            <div className="badge-card-icon">🚀</div>
            <div className="badge-card-tag">FRESH & PROMPT</div>
            <h3>DAILY KARACHI DELIVERY</h3>
            <p>
              Carefully packaged in premium insulated bakery boxes and delivered fresh to your doorstep across all Karachi neighborhoods from 11 AM to 1 AM daily.
            </p>
          </div>
        </section>

        {/* Signature Highlights Grid */}
        <section className="about-showcase-section">
          <div className="text-center" style={{ marginBottom: 32 }}>
            <span className="section-kicker">HANDCRAFTED DELICACIES</span>
            <h2 className="about-heading">Taste Our Masterpieces</h2>
            <p className="about-subtext">A glimpse into the artisan creations that made CakeBites famous.</p>
          </div>

          <div className="about-products-grid">
            {HIGHLIGHT_PRODUCTS.map((prod) => {
              const isAdded = addedProduct === prod.name;
              return (
                <div 
                  key={prod.name} 
                  className="about-product-card is-revealed"
                  onClick={() => onView3D && onView3D({
                    name: prod.name,
                    price: prod.price,
                    image: prod.image,
                    badge: prod.badge,
                    category: 'Masterpiece Cake',
                    customDetails: prod.desc
                  })}
                  style={{ cursor: onView3D ? 'pointer' : 'default' }}
                >
                  <div className="about-prod-img-wrap">
                    <img src={prod.image} alt={prod.name} loading="lazy" />
                    <span className="about-prod-badge">{prod.badge}</span>
                    {/* Luxury diagonal light gleam beam on hover */}
                    <div className="product-art-shimmer" aria-hidden="true" />
                  </div>
                  <div className="about-prod-info">
                    <h4>{prod.name}</h4>
                    <p>{prod.desc}</p>
                    <div className="about-prod-footer">
                      <span className="about-prod-price">Rs {prod.price.toLocaleString()}</span>
                      <button 
                        type="button" 
                        className={`about-prod-btn ${isAdded ? 'added' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(prod);
                        }}
                        title={`Add ${prod.name} to cart`}
                      >
                        {isAdded ? (
                          <>
                            <span className="add-btn-inner">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Added!
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
                            <svg className="cart-bag-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5.5 8.5h13a1.5 1.5 0 0 1 1.5 1.5v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a1.5 1.5 0 0 1 1.5-1.5z" />
                              <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
                            </svg>
                            Add to Cart
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Banner Callout */}
        <section className="about-cta-banner">
          <div className="about-cta-content">
            <h2>Ready to Sweeten Your Celebration?</h2>
            <p>Order online for express delivery anywhere in Karachi, or get in touch for customized tiered event cakes.</p>
            <div className="about-cta-btns">
              <button 
                type="button" 
                className="btn-gold-primary" 
                onClick={() => onNavigate('menu')}
              >
                Browse All Cakes
              </button>
              <button 
                type="button" 
                className="btn-gold-outline" 
                onClick={() => onNavigate('contact')}
              >
                Contact Neighborhood Bakery
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
