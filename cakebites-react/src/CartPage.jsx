import React, { useState } from 'react';

export default function CartPage({
  cart = [],
  setCart,
  onNavigate,
  area = 'Tariq Road',
  setArea,
  onOpenAreaModal
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [shippingMethod, setShippingMethod] = useState('flat'); // 'flat' | 'pickup'

  const money = (n) => `Rs ${Number(n || 0).toLocaleString('en-PK')}`;

  // Quantities
  const updateQty = (index, delta) => {
    setCart((prev) => {
      const next = [...prev];
      const item = next[index];
      if (!item) return prev;
      const newQty = (item.qty || 1) + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index] = { ...item, qty: newQty };
      return next;
    });
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  // Subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const shippingFee = shippingMethod === 'flat' ? 300 : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (code === 'CAKE10' || code === 'SWEET10' || code === 'SAVE10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setCouponMsg(`Coupon applied! 10% discount (-${money(disc)})`);
    } else if (code === 'FLAT500') {
      setDiscount(500);
      setCouponMsg('Coupon applied! -Rs 500 flat discount');
    } else {
      setCouponMsg('Invalid coupon code. Try "CAKE10"');
    }
  };

  const activeArea = area || localStorage.getItem('cakebites_area') || 'Tariq Road';

  return (
    <div className="cart-page-wrapper">
      <div className="container cart-page-container">
        {/* Breadcrumb Navigation */}
        <nav className="cart-breadcrumb" aria-label="Breadcrumb">
          <button 
            type="button" 
            onClick={() => onNavigate('home')} 
            className="cart-bc-link"
          >
            Home
          </button>
          <span className="cart-bc-sep">/</span>
          <span className="cart-bc-current">Cart</span>
        </nav>

        {/* Page Title with Gold Accents */}
        <div className="cart-page-header">
          <h1 className="cart-page-title">SHOPPING CART</h1>
          <div className="cart-title-gold-line" />
        </div>

        {cart.length === 0 ? (
          /* Empty Cart View */
          <div className="cart-empty-box">
            <div className="cart-empty-icon-wrap">
              <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#d5a348" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h2 className="cart-empty-title">Your cart is currently empty.</h2>
            <p className="cart-empty-text">
              Before proceeding to checkout you must add some products to your shopping cart.
              You will find a lot of fresh artisanal cakes and desserts on our shop page.
            </p>
            <button 
              type="button" 
              className="gold-btn cart-return-shop-btn"
              onClick={() => onNavigate('menu', 'All')}
            >
              Return to Shop
            </button>
          </div>
        ) : (
          /* Cart Active Content: 2-Column Grid */
          <div className="cart-layout-grid">
            {/* LEFT COLUMN: Items Table & Actions */}
            <div className="cart-items-column">
              <div className="cart-table-card">
                {/* Desktop Table Header */}
                <div className="cart-table-head">
                  <span className="col-remove" />
                  <span className="col-thumb" />
                  <span className="col-name">Product</span>
                  <span className="col-price">Price</span>
                  <span className="col-qty">Quantity</span>
                  <span className="col-subtotal">Subtotal</span>
                </div>

                {/* Items List */}
                <div className="cart-table-body">
                  {cart.map((item, idx) => {
                    const itemSubtotal = item.price * (item.qty || 1);
                    return (
                      <div key={`${item.name}-${idx}`} className="cart-table-row">
                        {/* Remove button */}
                        <div className="col-remove">
                          <button
                            type="button"
                            className="cart-remove-btn"
                            onClick={() => removeItem(idx)}
                            title="Remove this item"
                            aria-label="Remove item"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Thumbnail */}
                        <div className="col-thumb">
                          <img
                            src={item.image || '/assets/banners/bento-banner.png'}
                            alt={item.name}
                            className="cart-item-img"
                          />
                        </div>

                        {/* Name & custom details */}
                        <div className="col-name">
                          <span className="cart-item-name">{item.name}</span>
                          {item.customDetails && (
                            <div className="cart-item-custom-info">
                              <span>🍰 {item.customDetails.tiers} • {item.customDetails.frosting}</span>
                              {item.customDetails.toppings && item.customDetails.toppings !== 'None' && (
                                <span>✨ {item.customDetails.toppings}</span>
                              )}
                              {item.customDetails.message && item.customDetails.message !== 'None' && (
                                <span>💌 "{item.customDetails.message}"</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Unit Price */}
                        <div className="col-price">
                          <span className="mobile-col-label">Price:</span>
                          <span className="cart-item-price">{money(item.price)}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-qty">
                          <span className="mobile-col-label">Quantity:</span>
                          <div className="cart-qty-ctrl">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQty(idx, -1)}
                              title="Decrease quantity"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="qty-val">{item.qty || 1}</span>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => updateQty(idx, 1)}
                              title="Increase quantity"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-subtotal">
                          <span className="mobile-col-label">Subtotal:</span>
                          <span className="cart-item-subtotal">{money(itemSubtotal)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Table Bottom: Coupon Form & Cart Actions */}
                <div className="cart-table-footer">
                  <form onSubmit={handleApplyCoupon} className="cart-coupon-form">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="cart-coupon-input"
                    />
                    <button type="submit" className="cart-coupon-btn">
                      Apply Coupon
                    </button>
                  </form>

                  <div className="cart-action-btns">
                    <button
                      type="button"
                      className="cart-secondary-btn"
                      onClick={() => onNavigate('menu', 'All')}
                    >
                      ← Continue Shopping
                    </button>
                    <button
                      type="button"
                      className="cart-clear-btn"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                {couponMsg && (
                  <div className={`cart-coupon-msg ${discount > 0 ? 'success' : 'error'}`}>
                    {couponMsg}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Cart Totals & Checkout CTA */}
            <div className="cart-totals-column">
              <div className="cart-totals-card">
                <h2 className="cart-totals-heading">CART TOTALS</h2>

                <div className="cart-totals-row">
                  <span className="totals-label">Subtotal</span>
                  <span className="totals-value">{money(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="cart-totals-row discount-row">
                    <span className="totals-label">Discount</span>
                    <span className="totals-value discount-val">−{money(discount)}</span>
                  </div>
                )}

                {/* Shipping & Delivery Area */}
                <div className="cart-shipping-block">
                  <span className="totals-label">Shipping & Delivery</span>
                  
                  <div className="cart-shipping-options">
                    <label className={`cart-ship-radio ${shippingMethod === 'flat' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="cartShipping"
                        checked={shippingMethod === 'flat'}
                        onChange={() => setShippingMethod('flat')}
                      />
                      <span>Flat rate: <strong>Rs 300</strong></span>
                    </label>

                    <label className={`cart-ship-radio ${shippingMethod === 'pickup' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="cartShipping"
                        checked={shippingMethod === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                      />
                      <span>Free pickup: <strong>Rs 0</strong></span>
                    </label>
                  </div>

                  <div className="cart-delivery-loc">
                    <span>Shipping to <strong>{activeArea}</strong></span>
                    {onOpenAreaModal && (
                      <button
                        type="button"
                        className="cart-change-area-link"
                        onClick={onOpenAreaModal}
                      >
                        Change Area
                      </button>
                    )}
                  </div>
                </div>

                {/* Grand Total */}
                <div className="cart-totals-row grand-total-row">
                  <span className="totals-label">Total</span>
                  <span className="totals-value grand-total-value">{money(grandTotal)}</span>
                </div>

                {/* Checkout CTA Button */}
                <button
                  type="button"
                  className="gold-btn cart-checkout-cta"
                  onClick={() => onNavigate('checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
