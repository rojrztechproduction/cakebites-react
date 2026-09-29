import React, { useState } from 'react';

export default function ProductPage({ 
  product, 
  onNavigate, 
  onAdd, 
  relatedProducts = [], 
  ProductCardComponent, 
  onView3D 
}) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return null;

  const categoryName = product.category || "Cakes"; // Fallback if no category passed

  const handleAdd = () => {
    onAdd({ ...product, qty });
  };

  const money = (n) => `Rs ${Number(n).toLocaleString('en-PK')}`;

  return (
    <div className="product-page-wrapper">
      {/* Breadcrumb Header */}
      <div className="container">
        <div className="pp-breadcrumb">
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-category">{categoryName}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>
      </div>

      <div className="container product-page-content">
        <div className="pp-top-section">
          <div className="pp-image-col">
            <div className="pp-image-frame">
              {product.badge && <span className="pp-badge">{product.badge}</span>}
              <img 
                src={product.image || '/assets/products/german-fudge-cake.webp'} 
                alt={product.name} 
                className="pp-main-image" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/products/german-fudge-cake.webp';
                }}
              />
            </div>
          </div>
          
          <div className="pp-details-col">
            <h1 className="pp-title">{product.name}</h1>
            <p className="pp-short-desc">
              The {product.name} pairs our rich and indulgent cake with elegant presentation, creating a luxurious gift for every special occasion.
            </p>
            
            <div className="pp-price-row">
              {product.original_price && <span className="pp-old-price">{money(product.original_price)}</span>}
              <span className="pp-price">{money(product.price)}</span>
            </div>

            <div className="pp-actions-row">
              <div className="pp-qty-selector">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <input type="number" value={qty} readOnly />
                <button type="button" onClick={() => setQty(qty + 1)}>+</button>
              </div>
              
              <button className="pp-add-btn add-btn" onClick={handleAdd}>
                <span className="add-btn-inner">
                  <svg className="cart-bag-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.5 8.5h13a1.5 1.5 0 0 1 1.5 1.5v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a1.5 1.5 0 0 1 1.5-1.5z" />
                    <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
                  </svg>
                  Add to Cart
                </span>
              </button>
            </div>

            <a href={`https://wa.me/923342632631?text=Hi%20CakeBites%2C%20I%20would%20like%20to%20order%20${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer" className="pp-whatsapp-btn">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A14 14 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.2-4.4 1.1 1.2-4.2-.3-.5A11.5 11.5 0 1 1 16 27.5zm6.3-8.6c-.3-.2-2-.9-2.3-1s-.6-.2-.8.2-.9 1.1-1.1 1.3-.4.2-.7 0a9.2 9.2 0 0 1-2.7-1.7 10.2 10.2 0 0 1-1.9-2.3c-.2-.3 0-.5.1-.7l.5-.6.3-.5a.6.6 0 0 0 0-.6c0-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7a1.4 1.4 0 0 0-1 0 .5 5.5 0 0 0-1.7 4.1 9.5 9.5 0 0 0 2 5.1 21.8 21.8 0 0 0 8.4 7.4 28 28 0 0 0 2.8 1 6.7 6.7 0 0 0 3.1.2 5.1 5.1 0 0 0 3.3-2.3 4.2 4.2 0 0 0 .3-2.3c-.1-.2-.4-.3-.7-.5z"/>
              </svg>
              WhatsApp Now
            </a>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="pp-tabs-container">
          <div className="pp-tabs-header">
            <button className={`pp-tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>
              Description
            </button>
            <button className={`pp-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
              Reviews (0)
            </button>
          </div>
          
          <div className="pp-tab-content">
            {activeTab === 'description' && (
              <div className="pp-desc-content">
                <h3>{product.name.toUpperCase()}</h3>
                <p>
                  Experience the perfect combination of indulgence and floral elegance with our {product.name}. This premium set includes our signature cake, layered with rich frosting, paired perfectly for any occasion.
                  <br/><br/>
                  Whether you're celebrating a birthday, anniversary, engagement, graduation, or simply surprising someone special, this product delivers sweetness and style in one unforgettable package.
                </p>
                
                <h4>WHAT'S INCLUDED</h4>
                <ul>
                  <li>Premium {product.name}</li>
                  <li>Luxurious Packaging</li>
                  <li>Customizable Message Card</li>
                </ul>

                <h4>PERFECT FOR</h4>
                <ul>
                  <li>Birthdays</li>
                  <li>Anniversaries</li>
                  <li>Romantic Surprises</li>
                  <li>Congratulations</li>
                  <li>Family Celebrations</li>
                  <li>Eid & Festive Gifts</li>
                  <li>Thank You Gifts</li>
                </ul>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="pp-reviews-content">
                <p>There are no reviews yet. Be the first to review "{product.name}".</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products - Matching Home Page Cards */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="pp-related-section">
            <h3 className="pp-related-title">RELATED PRODUCTS</h3>
            <div className="pp-related-grid product-grid">
              {relatedProducts.slice(0, 4).map((rel, i) => {
                if (ProductCardComponent) {
                  return (
                    <ProductCardComponent
                      key={i}
                      item={rel}
                      section={{ category: categoryName, title: categoryName }}
                      index={i}
                      onAdd={onAdd}
                      onView3D={onView3D || ((item) => {
                        window.location.hash = `#product/${encodeURIComponent(item.name)}`;
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      })}
                    />
                  );
                }
                const rName = Array.isArray(rel) ? rel[0] : rel.name;
                const rPrice = Array.isArray(rel) ? rel[1] : rel.price;
                const rOld = Array.isArray(rel) ? rel[2] : rel.original_price;
                const rImg = Array.isArray(rel) ? rel[3] : (rel.image || rel.image_url);
                const rBadge = Array.isArray(rel) ? rel[4] : rel.badge;

                return (
                  <article 
                    key={i} 
                    className="product-card is-revealed" 
                    onClick={() => {
                      if (onView3D) {
                        onView3D({ name: rName, price: rPrice, image: rImg, badge: rBadge, category: categoryName });
                      } else {
                        window.location.hash = `#product/${encodeURIComponent(rName)}`;
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-art">
                      <img src={rImg} alt={rName} loading="lazy" className="product-img" />
                      {rBadge && (
                        <div className="product-art-badges">
                          <span className="badge-tag">{rBadge}</span>
                        </div>
                      )}
                      <div className="product-art-shimmer" aria-hidden="true" />
                    </div>
                    <div className="product-body">
                      <div className="product-meta-row">
                        <span className="product-category">{categoryName}</span>
                      </div>
                      <h3 title={rName}>{rName}</h3>
                      <div className="price-row">
                        <div className="price-values">
                          {rOld && <span className="old-price">{money(rOld)}</span>}
                          <span className="price">{money(rPrice)}</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="add-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAdd({ name: rName, price: rPrice, image: rImg });
                        }}
                      >
                        <span className="add-btn-inner">
                          <svg className="cart-bag-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5.5 8.5h13a1.5 1.5 0 0 1 1.5 1.5v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a1.5 1.5 0 0 1 1.5-1.5z" />
                            <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
                          </svg>
                          Add to Cart
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
