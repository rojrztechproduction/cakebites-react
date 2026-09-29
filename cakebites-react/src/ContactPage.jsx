import React, { useState } from 'react';

const BRANCH_CARDS = [
  {
    label: 'Gulshan-e-Iqbal',
    name: 'Cake Bites',
    address: 'Shop # 18, Block 4 Gulshan-e-Iqbal, Karachi, 75300, Pakistan',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cake+Bites+Shop+18+Block+4+Gulshan-e-Iqbal+Karachi'
  },
  {
    label: 'Shah Faisal Colony',
    name: 'Cake Bites',
    address: 'Street 2 2, Block 2 Shah Faisal Colony 2, Karachi, 75230, Pakistan',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cake+Bites+Shah+Faisal+Colony+Karachi'
  },
  {
    label: 'North Nazimabad Block F',
    name: 'Cake Bites',
    address: 'SB 15, Block F North Nazimabad Town, Karachi, 74600, Pakistan',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cake+Bites+North+Nazimabad+Block+F+Karachi'
  },
  {
    label: 'North Nazimabad Block H',
    name: 'Cake Bites',
    address: 'Block H, North Nazimabad Town, Karachi, Pakistan',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cake+Bites+North+Nazimabad+Block+H+Karachi'
  },
  {
    label: 'Boat Basin Clifton',
    name: 'Cake Bites',
    address: 'Shop No. 28, Hashoo Terrace, Block 5, Boat Basin, Clifton, Karachi, 75600, Pakistan',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cake+Bites+Boat+Basin+Clifton+Karachi'
  }
];

export default function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="subpage-wrapper cb-contact-view">
      <div className="cb-contact-inner">
        {/* Top 3 Info Cards (Phone, Address, Email) */}
        <section className="cb-info-cards-row">
          {/* Phone Card */}
          <a href="tel:+923342632631" className="cb-info-box" title="Call Us">
            <div className="cb-info-icon">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="#e5a83b">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.25 1.02l-2.22 2.09z" />
              </svg>
            </div>
            <h3 className="cb-info-title">Phone</h3>
            <p className="cb-info-val">+92 334 2632631</p>
          </a>

          {/* Address Card */}
          <div className="cb-info-box">
            <div className="cb-info-icon">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="#e5a83b">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <h3 className="cb-info-title">Address</h3>
            <p className="cb-info-val">Shop # 18, Block 4 Gulshan-e-Iqbal, Karachi, 75300, Pakistan</p>
          </div>

          {/* Email Card */}
          <a href="mailto:info@cakebites.pk" className="cb-info-box" title="Email Us">
            <div className="cb-info-icon">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="#e5a83b">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <h3 className="cb-info-title">Email</h3>
            <p className="cb-info-val">info@cakebites.pk</p>
          </a>
        </section>

        {/* Branch Store Cards Section */}
        <section className="cb-branches-section">
          <div className="cb-section-title-wrap">
            <span className="cb-kicker">FIND A CAKE BITES NEAR YOU</span>
            <h2 className="cb-main-heading">OUR OUTLETS</h2>
          </div>

          <div className="cb-branches-row">
            {BRANCH_CARDS.map((b, i) => (
              <a
                key={i}
                href={b.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="cb-branch-card"
                title={`Open ${b.label} on Google Maps`}
              >
                {/* Card Top: Pin Icon & Outlet Badge */}
                <div className="cb-branch-card-header">
                  <div className="cb-branch-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#dfa84a">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <span className="cb-branch-badge">OUTLET 0{i + 1}</span>
                </div>

                {/* Card Body: Area, Brand, Address */}
                <div className="cb-branch-details">
                  <span className="cb-branch-area">{b.label}</span>
                  <h4 className="cb-branch-heading">{b.name}</h4>
                  <p className="cb-branch-text">{b.address}</p>
                </div>

                {/* Card Footer: Interactive CTA */}
                <div className="cb-branch-footer">
                  <span className="cb-branch-map-btn">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>View on Map</span>
                    <svg className="cb-branch-arrow" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Reach Us Out For Feedback & Suggestions Form */}
        <section className="cb-form-section">
          <div className="cb-section-title-wrap">
            <span className="cb-kicker">REACH US OUT FOR</span>
            <h2 className="cb-main-heading">FEEDBACK &amp; SUGGESTIONS</h2>
          </div>

          <div className="cb-form-wrapper">
            {submitted ? (
              <div className="cb-success-message">
                <div style={{ fontSize: '36px', marginBottom: '8px' }}>🍰✨</div>
                <h3>Thank You for Your Feedback!</h3>
                <p>Your message has been received. Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cb-contact-form">
                <div className="cb-form-field">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="cb-form-field">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="cb-form-field">
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="cb-form-field">
                  <textarea 
                    rows="4" 
                    placeholder="Message" 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="cb-send-button">
                  Send
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Locate Us On Map Section */}
        <section className="cb-map-section">
          <div className="cb-section-title-wrap">
            <span className="cb-kicker">WE ARE YOUR NEIGHBORHOOD BAKERS!</span>
            <h2 className="cb-main-heading">LOCATE US ON MAP</h2>
          </div>

          <div className="cb-map-container">
            <iframe 
              title="CakeBites Karachi Branches"
              src="https://maps.google.com/maps?q=Cake%20Bites%20Gulshan%20Karachi&t=&z=12&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="380" 
              style={{ border: 0, display: 'block', borderRadius: '10px' }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
