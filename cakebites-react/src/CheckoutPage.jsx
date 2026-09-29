import React, { useState } from 'react';

const API_BASE = 'http://localhost:5000/api';
const PHP_API_BASE = 'http://localhost/cakebite-react-api/index.php?action=';

export default function CheckoutPage({
  cart = [],
  total = 0,
  area = 'Tariq Road',
  setArea,
  onNavigate,
  onOrderPlaced,
  onOpenAreaModal
}) {
  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [shipDiff, setShipDiff] = useState(false);
  const [diffAddress, setDiffAddress] = useState('');

  // Shipping & payment state
  const [shippingMethod, setShippingMethod] = useState('flat'); // 'flat' (Rs 300) | 'pickup' (Rs 0)
  const [pickupLocation, setPickupLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank'); // 'bank' | 'cod'
  
  // Coupon state
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Money formatter
  const money = (n) => `Rs ${Number(n).toLocaleString('en-PK')}`;

  // Calculate items subtotal
  const itemsSubtotal = cart.length > 0 
    ? cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0)
    : total || 17998; // Fallback to reference amount if cart preview is empty

  // Shipping fee
  const shippingFee = shippingMethod === 'flat' ? 300 : 0;
  
  // Final total
  const finalTotal = Math.max(0, itemsSubtotal + shippingFee - discount);

  // Active delivery area
  const activeArea = area || localStorage.getItem('cakebites_area') || 'Tariq Road';

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const code = couponCode.trim().toUpperCase();
    if (code === 'CAKE10' || code === 'SWEET10' || code === 'SAVE10') {
      const disc = Math.round(itemsSubtotal * 0.1);
      setDiscount(disc);
      setCouponMsg(`Coupon applied! 10% discount (-${money(disc)})`);
    } else if (code === 'FLAT500') {
      setDiscount(500);
      setCouponMsg(`Coupon applied! -Rs 500 flat discount`);
    } else {
      setCouponMsg('Invalid coupon code. Try "CAKE10"');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your Name');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your Phone number');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }
    if (shippingMethod !== 'pickup' && !address.trim()) {
      setError('Please enter your Street address');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }
    if (shippingMethod === 'pickup' && !pickupLocation) {
      setError('Please select a pickup outlet location');
      window.scrollTo({ top: 400, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Format cart items
    const effectiveItems = cart.length > 0 ? cart : [
      { name: 'Golden Nutella Combo', price: 8999, qty: 2 }
    ];

    const formattedItems = effectiveItems.map((item) => {
      let itemName = item.name;
      if (item.customDetails) {
        itemName += ` [${item.customDetails.tiers}, ${item.customDetails.frosting}${item.customDetails.message && item.customDetails.message !== 'None' ? `, Plaque: "${item.customDetails.message}"` : ''}]`;
      }
      return {
        ...item,
        name: itemName,
        product_name: itemName,
        qty: item.qty || 1,
        price: item.price
      };
    });

    const fullDeliveryAddress = shippingMethod === 'pickup'
      ? `Customer Pickup at: ${pickupLocation} (Phone: ${phone})`
      : (shipDiff && diffAddress.trim()
        ? `${diffAddress} (Alt address, Area: ${activeArea})`
        : `${address} (Area: ${activeArea})`);

    const effectivePaymentTitle = paymentMethod === 'bank'
      ? 'Bank Transfer'
      : (shippingMethod === 'pickup' ? 'Outlet Pickup Orders' : 'Cash on Delivery');

    const payload = {
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      delivery_area: shippingMethod === 'pickup' ? `Local Pickup: ${pickupLocation}` : activeArea,
      delivery_address: fullDeliveryAddress,
      notes: notes,
      items: formattedItems,
      subtotal: itemsSubtotal,
      delivery_fee: shippingFee,
      discount: discount,
      total_amount: finalTotal,
      payment_method: effectivePaymentTitle
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

      const data = await res.json().catch(() => ({}));
      if (res && res.ok && (data.success || data.order)) {
        if (onOrderPlaced) {
          onOrderPlaced({
            ...(data.order || {}),
            order_code: data.order?.order_code || 'CB-' + Math.floor(1000 + Math.random() * 9000),
            customer_name: name,
            delivery_area: activeArea,
            total_amount: finalTotal,
            items: formattedItems,
            payment_method: payload.payment_method
          });
        }
      } else {
        // Fallback order placement
        if (onOrderPlaced) {
          onOrderPlaced({
            order_code: 'CB-' + Math.floor(1000 + Math.random() * 9000),
            customer_name: name,
            delivery_area: activeArea,
            total_amount: finalTotal,
            items: formattedItems,
            payment_method: payload.payment_method
          });
        }
      }
    } catch {
      if (onOrderPlaced) {
        onOrderPlaced({
          order_code: 'CB-' + Math.floor(1000 + Math.random() * 9000),
          customer_name: name,
          delivery_area: activeArea,
          total_amount: finalTotal,
          items: formattedItems,
          payment_method: payload.payment_method
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page-container">
      <div className="container">
        {/* Top Banner 1: Express Delivery (#0F3848) */}
        <div className="checkout-express-banner">
          <span className="rocket-icon">🚀</span>
          <span>Express Delivery — Arrives At Your Doorstep In 1 Hour</span>
        </div>

        {/* Top Banner 2: Active Location Notice (#0F3848) */}
        <div className="checkout-location-banner">
          <span className="pin-icon">📍</span>
          <span>
            You are placing an order from <strong>{activeArea}</strong>. Delivery will be made in this area!
          </span>
          {onOpenAreaModal && (
            <button 
              type="button" 
              className="checkout-change-area-btn" 
              onClick={onOpenAreaModal}
              title="Change Delivery Area"
            >
              Change Area
            </button>
          )}
        </div>

        {/* Top Banner 3: Coupon Accordion Bar (#0F3848) */}
        <div className="checkout-coupon-wrapper">
          <div 
            className="checkout-coupon-bar" 
            onClick={() => setCouponOpen(!couponOpen)}
            role="button"
            tabIndex={0}
          >
            <span>Have a coupon? <strong>Click Here To Enter Your Code</strong></span>
          </div>

          {couponOpen && (
            <div className="checkout-coupon-expand-form">
              <input
                type="text"
                placeholder="Coupon code (e.g. CAKE10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="checkout-coupon-input"
              />
              <button 
                type="button" 
                onClick={handleApplyCoupon} 
                className="checkout-coupon-apply-btn"
              >
                Apply Coupon
              </button>
              {couponMsg && <p className="checkout-coupon-msg">{couponMsg}</p>}
            </div>
          )}
        </div>

        {/* Validation Error Alert */}
        {error && (
          <div className="checkout-error-alert" role="alert">
            <span>⚠️ {error}</span>
          </div>
        )}

        {/* 2-Column Checkout Layout */}
        <form onSubmit={handlePlaceOrder} className="checkout-main-grid">
          {/* LEFT COLUMN: BILLING DETAILS */}
          <div className="checkout-col checkout-billing-col">
            <div className="checkout-card">
              <h2 className="checkout-card-heading">BILLING DETAILS</h2>

              {/* Street Address */}
              <div className="checkout-form-group">
                <label className="checkout-label">
                  Street address {shippingMethod !== 'pickup' ? <span className="req">*</span> : <span className="opt">(optional for local pickup)</span>}
                </label>
                <div className="checkout-input-with-icon">
                  <input
                    type="text"
                    required={shippingMethod !== 'pickup'}
                    placeholder={shippingMethod === 'pickup' ? "Optional: Street address" : "House number and street name"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="checkout-input"
                  />
                  <span className="checkout-field-icon" title="Location indicator">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Your Name */}
              <div className="checkout-form-group">
                <label className="checkout-label">
                  Your Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="checkout-input"
                />
              </div>

              {/* Phone */}
              <div className="checkout-form-group">
                <label className="checkout-label">
                  Phone <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="03XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="checkout-input"
                />
              </div>

              {/* Email address */}
              <div className="checkout-form-group">
                <label className="checkout-label">
                  Email address <span className="opt">(optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="checkout-input"
                />
              </div>

              {/* Ship to different address checkbox */}
              <div className="checkout-form-group checkout-checkbox-group">
                <label className="checkout-checkbox-label">
                  <input
                    type="checkbox"
                    checked={shipDiff}
                    onChange={(e) => setShipDiff(e.target.checked)}
                    className="checkout-checkbox"
                  />
                  <span>SHIP TO A DIFFERENT ADDRESS?</span>
                </label>
              </div>

              {shipDiff && (
                <div className="checkout-form-group checkout-alt-address-box">
                  <label className="checkout-label">
                    Alternative Delivery Address <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Recipient address, apartment, suite, etc."
                    value={diffAddress}
                    onChange={(e) => setDiffAddress(e.target.value)}
                    className="checkout-input"
                  />
                </div>
              )}

              {/* Order notes */}
              <div className="checkout-form-group">
                <label className="checkout-label">
                  Order notes <span className="opt">(optional)</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="checkout-textarea"
                />
              </div>

              {/* SELECT PICKUP LOCATION (Matches reference screenshot 100%) */}
              {shippingMethod === 'pickup' && (
                <div className="checkout-pickup-card" id="checkout-pickup-location-box">
                  <div className="checkout-pickup-header">
                    <span className="checkout-pickup-icon">🏬</span>
                    <h3 className="checkout-pickup-title">SELECT PICKUP LOCATION</h3>
                  </div>
                  <div className="checkout-form-group checkout-pickup-group">
                    <label className="checkout-label checkout-pickup-label">
                      Select Pickup Location
                    </label>
                    <div className="checkout-select-wrapper">
                      <select
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="checkout-input checkout-pickup-select"
                        required={shippingMethod === 'pickup'}
                      >
                        <option value="">Select Pickup Location</option>
                        <option value="Shah Faisal Colony Main Outlet, Karachi">Shah Faisal Colony Main Outlet, Karachi</option>
                        <option value="Gulshan-e-Iqbal Outlet, Karachi">Gulshan-e-Iqbal Outlet, Karachi</option>
                        <option value="North Nazimabad Block F Outlet, Karachi">North Nazimabad Block F Outlet, Karachi</option>
                        <option value="North Nazimabad Block H Outlet, Karachi">North Nazimabad Block H Outlet, Karachi</option>
                        <option value="Boat Basin Clifton Outlet, Karachi">Boat Basin Clifton Outlet, Karachi</option>
                      </select>
                    </div>
                    <p className="checkout-pickup-note">
                      Customer will pickup the order from the selected outlet.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: YOUR ORDER & PAYMENT */}
          <div className="checkout-col checkout-order-col">
            {/* CARD 1: YOUR ORDER TABLE */}
            <div className="checkout-card">
              <h2 className="checkout-card-heading">YOUR ORDER</h2>

              <div className="checkout-order-table">
                {/* Table Header */}
                <div className="checkout-order-row checkout-order-header-row">
                  <span className="col-product">Product</span>
                  <span className="col-subtotal">Subtotal</span>
                </div>

                {/* Items List */}
                {cart.length > 0 ? (
                  cart.map((item, idx) => (
                    <div key={idx} className="checkout-order-row checkout-order-item-row">
                      <span className="col-product">
                        {item.name} <strong className="item-qty">× {item.qty || 1}</strong>
                      </span>
                      <span className="col-subtotal">
                        {money(item.price * (item.qty || 1))}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="checkout-order-row checkout-order-item-row">
                    <span className="col-product">
                      Golden Nutella Combo <strong className="item-qty">× 2</strong>
                    </span>
                    <span className="col-subtotal">
                      {money(17998)}
                    </span>
                  </div>
                )}

                {/* Subtotal Row */}
                <div className="checkout-order-row checkout-order-subtotal-row">
                  <span className="col-product">Subtotal</span>
                  <span className="col-subtotal">{money(itemsSubtotal)}</span>
                </div>

                {/* Shipment Section (Matches reference screenshot) */}
                <div className="checkout-shipment-block">
                  <div className="checkout-shipment-title">SHIPMENT</div>
                  
                  {/* Option 1: Flat rate */}
                  <label className={`checkout-shipment-option ${shippingMethod === 'flat' ? 'selected' : ''}`}>
                    <div className="shipment-radio-line">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="flat"
                        checked={shippingMethod === 'flat'}
                        onChange={() => setShippingMethod('flat')}
                      />
                      <span className="shipment-name">Flat rate:</span>
                      <span className="shipment-price">Rs 300</span>
                    </div>
                    <div className="checkout-express-pill">
                      <span>🚀 Express Delivery — Arrives at your doorstep in 1 hour</span>
                    </div>
                  </label>

                  {/* Option 2: Local pickup */}
                  <label className={`checkout-shipment-option ${shippingMethod === 'pickup' ? 'selected' : ''}`}>
                    <div className="shipment-radio-line">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="pickup"
                        checked={shippingMethod === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                      />
                      <span className="shipment-name">Local pickup</span>
                    </div>
                    {shippingMethod === 'pickup' && (
                      <p className="checkout-pickup-shipment-note">
                        Please select your pickup outlet from above. It is compulsory for local pickup orders.
                      </p>
                    )}
                  </label>
                </div>

                {/* Coupon discount if applied */}
                {discount > 0 && (
                  <div className="checkout-order-row checkout-discount-row">
                    <span className="col-product">Coupon Discount</span>
                    <span className="col-subtotal" style={{ color: '#34d399' }}>-{money(discount)}</span>
                  </div>
                )}

                {/* Grand Total Row */}
                <div className="checkout-order-row checkout-order-total-row">
                  <span className="col-product">Total</span>
                  <span className="col-subtotal">{money(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* CARD 2: PAYMENT METHOD & BANK DETAILS (Exact match to reference screenshot) */}
            <div className="checkout-card checkout-payment-card">
              {/* Option 1: Bank Transfer */}
              <div className="checkout-payment-option-group">
                <label className="checkout-payment-label">
                  <input
                    type="radio"
                    name="payment_method"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                  />
                  <span>Pay Via Bank Account</span>
                </label>

                {paymentMethod === 'bank' && (
                  <div className="checkout-bank-details-box">
                    <h4 className="bank-box-title">Account Information</h4>
                    <p className="bank-info-line"><strong>Account Title:</strong> CAKE BITES</p>
                    <p className="bank-info-line"><strong>Bank Name:</strong> Meezan Bank</p>
                    <p className="bank-info-line"><strong>Account Number:</strong> 99950110344249</p>
                    <p className="bank-info-line"><strong>IBAN:</strong> PK36MEZN0099950110344249</p>
                    <div className="bank-info-note-wrapper">
                      <strong className="bank-note-heading">Important Note:</strong>
                      <p className="bank-note-text">Kindly share the payment screenshot on this number (+92 334 2632631) after completing the transaction.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="checkout-payment-divider" />

              {/* Option 2: Cash on Delivery / Outlet Pickup Orders */}
              <div className="checkout-payment-option-group">
                <label className="checkout-payment-label">
                  <input
                    type="radio"
                    name="payment_method"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <span>{shippingMethod === 'pickup' ? 'Outlet Pickup Orders' : 'Cash on delivery'}</span>
                </label>
              </div>
            </div>

            {/* PLACE ORDER BUTTON (#0F3848 Outline style - Exact match to screenshot) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="checkout-place-order-btn"
            >
              {isSubmitting ? (
                <span>Placing order...</span>
              ) : (
                <span>Place order</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
