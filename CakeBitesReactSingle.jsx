import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const ASSET = {
  hero: 'https://cakebites.pk/wp-content/uploads/2026/05/Cake-Bites-Banner-1.png',
  divider: 'https://cakebites.pk/wp-content/uploads/2026/06/OujlJi-1-768x65.png',
  combos: 'https://cakebites.pk/wp-content/uploads/2026/06/5f831c29-370c-4062-8ddb-7c8c29d40e18.png',
  best: 'https://cakebites.pk/wp-content/uploads/2026/07/37911e05-62ce-4781-b7bc-0f9efda0b824.png',
  cakes: 'https://cakebites.pk/wp-content/uploads/2026/05/Cake-bites-catogery-banner-1.png',
  cupcakes: 'https://cakebites.pk/wp-content/uploads/2026/05/Cupcake-banner-1.png',
  brownies: 'https://cakebites.pk/wp-content/uploads/2026/05/Baronies-cake-1.png',
  sundae: 'https://cakebites.pk/wp-content/uploads/2026/05/sundae-cup-in-cake-bites.png',
  bento: 'https://cakebites.pk/wp-content/uploads/2026/05/Bento-cake-banner-for-cakbites.png',
  custom: 'https://cakebites.pk/wp-content/uploads/2026/05/customized-cake-in-cakebites-banner.png',
};

const sections = [
  {
    id: 'combos',
    title: "Combo's",
    banner: ASSET.combos,
    category: "Combo's",
    products: [
      ['Mango Bliss Combo', 6499, 8000],
      ['Golden Nutella Combo', 8999, 9999],
      ['Milky Bloom Combo', 7999, 9999],
    ],
  },
  {
    id: 'best',
    title: 'Best Selling',
    banner: ASSET.best,
    category: 'cakes',
    products: [
      ['Double Fudge Cake', 1999],
      ['Lotus Three Milk Cake', 2099],
      ['Nutella Cake (Medium)', 2049],
      ['Three Milk Mango Cake', 2199],
      ['Dream Lava Cake', 2349],
      ['Ferrero Rocher Chocolate Cake', 3500],
    ],
  },
  {
    id: 'cakes',
    title: 'Cakes',
    banner: ASSET.cakes,
    category: 'cakes',
    products: [
      ['German Fudge Cake (Medium)', 1799],
      ['Red Velvet Cake (Medium)', 2199],
      ['Belgian Malt Cake (Medium)', 2099],
      ['Chocolate Mousse Cake', 1699],
      ['Milky Malt Cake', 1799, 2150],
      ['Coffee Cake', 1799],
      ['Black Forest Cake', 1799],
      ['Pineapple Cake', 1799],
    ],
  },
  {
    id: 'cupcakes',
    title: 'Cupcakes',
    banner: ASSET.cupcakes,
    category: 'Cup Cakes',
    products: [
      ['Ferrero Cup Cake', 249],
      ['Belgian Chocolate Cup Cakes', 249],
      ['M&M Cup Cake', 249],
      ['Swiss Dark Cup Cake', 249],
      ['Milky Chocolate Cup Cake', 249],
      ['Nutella Chocolate Cup Cake', 249],
      ['Red Velvet Cup Cake', 249],
      ['Salted Caramel Cup Cake', 249],
    ],
  },
  {
    id: 'brownies',
    title: 'Brownies',
    banner: ASSET.brownies,
    category: 'Brownies',
    products: [
      ['Nutella Brownie', 199],
      ['Cadbury Brownie', 199],
      ['Mars Chocolate Brownie', 199],
      ['Belgian Malt Brownie', 199],
    ],
  },
  {
    id: 'sundae',
    title: 'Sundae',
    banner: ASSET.sundae,
    category: 'Sundae',
    products: [
      ['Three Milk Sundae', 399],
      ['Nutella Sundae', 399],
      ['Galaxy Sundae', 399],
      ['Red Velvet Sundae', 399],
    ],
  },
  {
    id: 'bento',
    title: 'Bento Cake',
    banner: ASSET.bento,
    category: 'Bento Cake',
    products: [
      ['Bento Cake', 2999], ['Bento Cake', 2999], ['Bento Cake', 2999], ['Bento Cake', 2999],
    ],
  },
  {
    id: 'custom',
    title: 'Customized Cakes',
    banner: ASSET.custom,
    category: 'CupCakes',
    products: [
      ['Cup Cake (Medium)', 4800], ['Cream Cakes (Medium)', 7500], ['Chocolate Cakes (Medium)', 7500], ['Doll Cake (Medium)', 10500],
    ],
  },
];

const money = (n) => `₨ ${Number(n).toLocaleString('en-PK')}`;
const cropPositions = ['8% 50%', '32% 50%', '68% 50%', '92% 50%', '18% 55%', '78% 55%', '48% 60%', '60% 40%'];

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (name === 'pin') return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (name === 'phone') return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.15 12.8 19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.07 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.92Z"/></svg>;
  if (name === 'bag') return <svg {...common}><path d="M6 7h12l1 14H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>;
  if (name === 'menu') return <svg {...common}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
  if (name === 'x') return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
  if (name === 'instagram') return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg>;
  if (name === 'facebook') return <svg {...common}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z"/></svg>;
  return null;
}

function BrandMark({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`}>
      <div className="brand-badge"><span className="brand-small">Cake</span><strong>Bites</strong><span className="brand-dot">●</span></div>
      {!compact && <div className="brand-tag">A little cream for a bigger smile</div>}
    </div>
  );
}

function ProductCard({ item, section, index, onAdd }) {
  const [name, price, old] = item;
  const discount = old ? Math.round((1 - price / old) * 100) : null;
  return (
    <article className="product-card">
      <div className="product-art" style={{ backgroundImage: `url(${section.banner})`, backgroundPosition: cropPositions[index % cropPositions.length] }}>
        {discount && <span className="sale-badge">-{discount}%</span>}
      </div>
      <div className="product-body">
        <div className="product-category">{section.category}</div>
        <h3>{name}</h3>
        <div className="price-row">
          {old && <span className="old-price">{money(old)}</span>}
          <span className="price">{money(price)}</span>
        </div>
        <button className="add-btn" onClick={() => onAdd({ name, price })}>{name.includes('Medium') ? 'Select options' : 'Add to cart'}</button>
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
        {section.products.map((p, i) => <ProductCard key={`${section.id}-${i}`} item={p} section={section} index={i} onAdd={onAdd} />)}
      </div>
    </section>
  );
}

function CartDrawer({ open, onClose, cart, setCart }) {
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const remove = (idx) => setCart((c) => c.filter((_, i) => i !== idx));
  return (
    <>
      <div className={`scrim ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-head"><h3>Your Cart ({cart.reduce((s, i) => s + i.qty, 0)})</h3><button className="icon-btn" onClick={onClose}><Icon name="x" /></button></div>
        <div className="drawer-body">
          {!cart.length ? <div className="empty-cart"><Icon name="bag" size={36}/><p>No products in the cart.</p></div> : cart.map((item, i) => (
            <div className="cart-line" key={`${item.name}-${i}`}><div><strong>{item.name}</strong><small>{item.qty} × {money(item.price)}</small></div><button onClick={() => remove(i)}>×</button></div>
          ))}
        </div>
        {!!cart.length && <div className="drawer-footer"><div><span>Total</span><strong>{money(total)}</strong></div><button className="gold-btn">Checkout</button></div>}
      </aside>
    </>
  );
}

function AreaModal({ open, onClose, area, setArea }) {
  const [value, setValue] = useState(area || '');
  if (!open) return null;
  return (
    <div className="modal-wrap">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}><Icon name="x" /></button>
        <div className="mini-mark"><BrandMark compact /></div>
        <h2>Select Your Delivery Area</h2>
        <p>Please select your area to see accurate delivery options.</p>
        <select value={value} onChange={(e) => setValue(e.target.value)}>
          <option value="">Select</option>
          <option>Gulshan-e-Iqbal</option><option>North Nazimabad</option><option>Shah Faisal</option><option>Clifton</option><option>DHA</option><option>Boat Basin</option>
        </select>
        <button className="gold-btn" onClick={() => { if (value) setArea(value); onClose(); }}>Confirm & Continue</button>
      </div>
    </div>
  );
}

const INLINE_CSS = '@import url(\'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&family=Great+Vibes&display=swap\');\n\n:root{\n  --ink:#07151c;--navy:#071d27;--navy2:#0a2934;--gold:#d5a348;--gold2:#f0cf7a;--cream:#fffaf1;--muted:#aab7bc;--white:#fff;--line:rgba(213,163,72,.28);\n}\n*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#061820;color:#fff;font-family:\'DM Sans\',sans-serif}.container{width:min(1180px,calc(100% - 40px));margin:auto}button,a{font:inherit}a{color:inherit;text-decoration:none}button{cursor:pointer}\n.topbar{background:#031117;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px}.topbar-inner{height:42px;display:flex;align-items:center;gap:18px}.top-link,.cart-button{border:0;background:transparent;color:#dce5e8;display:inline-flex;gap:8px;align-items:center;padding:0}.top-link:hover,.cart-button:hover{color:var(--gold2)}.top-spacer{flex:1}.follow{color:#7f949b}.social{color:#b4c0c4;display:flex}.cart-button{border-left:1px solid rgba(255,255,255,.1);padding-left:18px}.cart-button b{width:20px;height:20px;border-radius:50%;background:var(--gold);color:#07151c;display:grid;place-items:center;font-size:11px}\n.main-header{position:sticky;top:0;z-index:50;background:rgba(5,23,31,.96);backdrop-filter:blur(14px);border-bottom:1px solid rgba(213,163,72,.12)}.header-row{min-height:86px;display:flex;align-items:center;gap:28px}.logo-link{flex:0 0 auto}.brand{display:flex;flex-direction:column;align-items:center;min-width:132px}.brand-badge{width:112px;height:58px;border:1px solid var(--gold);border-radius:50%;background:#fff;color:#0b1114;display:flex;align-items:center;justify-content:center;gap:2px;position:relative;box-shadow:inset 0 0 0 3px #fff,0 0 0 1px rgba(213,163,72,.2)}.brand-badge strong{font-family:\'Great Vibes\',cursive;font-size:31px;font-weight:400;line-height:1}.brand-small{font-size:9px;font-weight:700;margin-top:-12px}.brand-dot{color:#9c1f24;font-size:6px;position:absolute;bottom:8px;right:20px}.brand-tag{font-family:\'Cormorant Garamond\',serif;font-size:9px;color:#c8d1d4;margin-top:4px;letter-spacing:.4px}.brand--compact .brand-badge{width:92px;height:50px}.brand--compact .brand-badge strong{font-size:26px}.desktop-nav{display:flex;align-items:center;justify-content:flex-end;gap:22px;flex:1}.desktop-nav a{font-size:14px;font-weight:600;color:#eef3f4;position:relative;padding:32px 0}.desktop-nav a:after{content:"";position:absolute;left:0;right:100%;bottom:22px;height:1px;background:var(--gold);transition:.25s}.desktop-nav a:hover{color:var(--gold2)}.desktop-nav a:hover:after{right:0}.hamburger,.mobile-cart{display:none;background:none;border:0;color:#fff}.mobile-cart{position:relative}.mobile-cart span{position:absolute;right:-7px;top:-8px;background:var(--gold);color:#061820;border-radius:50%;font-size:10px;width:18px;height:18px;display:grid;place-items:center}.mobile-menu{display:none}\n.hero{position:relative;background:#07151c;overflow:hidden}.hero>img{width:100%;height:auto;display:block;min-height:460px;object-fit:cover}.hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,16,23,.4),transparent 55%)}.hero-overlay{position:absolute;inset:0;z-index:2;display:flex;align-items:flex-end;pointer-events:none}.hero-copy{display:none;max-width:520px;margin:0 0 7vw 7vw}.eyebrow{text-transform:uppercase;letter-spacing:2.8px;font-size:12px;color:var(--gold2)}.hero h1{font-family:\'Cormorant Garamond\',serif;font-size:54px;line-height:.96;margin:12px 0 25px}.hero-cta{display:inline-flex;background:var(--gold);color:#07151c;padding:14px 23px;font-weight:700;border-radius:2px;pointer-events:auto}\n.quick-nav{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin-top:22px;margin-bottom:4px}.quick-nav a{border:1px solid rgba(213,163,72,.28);padding:9px 15px;color:#d8e0e2;font-size:12px;border-radius:50px;background:rgba(255,255,255,.02)}.quick-nav a:hover{background:var(--gold);color:#07151c}\n.shop-section{padding:20px 0 42px}.divider{height:66px;display:grid;place-items:center;opacity:.9}.divider img{width:min(768px,74%);height:auto}.section-banner{width:min(1120px,calc(100% - 40px));margin:0 auto 24px;overflow:hidden;border-radius:3px;border:1px solid rgba(213,163,72,.22);box-shadow:0 20px 50px rgba(0,0,0,.25)}.section-banner img{display:block;width:100%;height:auto}.section-head{width:min(1180px,calc(100% - 40px));margin:20px auto 18px;display:flex;align-items:end;gap:14px}.section-head>span:first-child{text-transform:uppercase;color:var(--gold);font-size:10px;letter-spacing:2.5px;margin-bottom:9px}.section-head h2{font-family:\'Cormorant Garamond\',serif;font-size:37px;margin:0;color:#fff}.gold-line{height:1px;background:linear-gradient(90deg,var(--gold),transparent);flex:1;margin-bottom:11px;opacity:.6}.product-grid{width:min(1180px,calc(100% - 40px));margin:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.product-card{background:#fff;color:#101b20;border-radius:3px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,.17);transition:.25s;min-width:0}.product-card:hover{transform:translateY(-4px);box-shadow:0 18px 45px rgba(0,0,0,.27)}.product-art{aspect-ratio:1.12/1;background-repeat:no-repeat;background-size:360% auto;position:relative;background-color:#0b1f27}.product-art:after{content:"";position:absolute;inset:0;box-shadow:inset 0 -34px 40px rgba(0,0,0,.08)}.sale-badge{position:absolute;z-index:2;top:10px;right:10px;background:#8b1e24;color:#fff;padding:5px 8px;border-radius:2px;font-size:11px;font-weight:700}.product-body{padding:15px 16px 17px}.product-category{text-transform:uppercase;font-size:9px;letter-spacing:1.3px;color:#9b7a3d;margin-bottom:7px}.product-body h3{font-family:\'Cormorant Garamond\',serif;font-size:21px;line-height:1.03;margin:0 0 11px;min-height:43px}.price-row{display:flex;gap:8px;align-items:center;min-height:23px}.price{font-weight:700;color:#14242a}.old-price{text-decoration:line-through;color:#88969b;font-size:12px}.add-btn{width:100%;margin-top:14px;border:1px solid #cf9b3e;background:transparent;color:#1c2930;padding:10px 12px;font-weight:700;font-size:12px;transition:.2s}.add-btn:hover{background:var(--gold);color:#07151c}\nfooter{margin-top:38px;background:#031218;border-top:1px solid rgba(213,163,72,.22);padding-top:55px}.footer-grid{display:grid;grid-template-columns:1.5fr 1fr .8fr;gap:60px;padding-bottom:42px}.footer-grid .brand{align-items:flex-start;margin-bottom:18px}.footer-grid p{color:#9cb0b6;line-height:1.8;font-size:13px;max-width:560px}.footer-grid h3{font-family:\'Cormorant Garamond\',serif;color:var(--gold2);font-size:24px;margin:3px 0 18px}.footer-grid>div{display:flex;flex-direction:column;gap:10px}.footer-grid>div span,.footer-grid>div>a{color:#9fb0b5;font-size:13px;line-height:1.6}.footer-socials{display:flex;gap:10px}.footer-socials a{width:38px;height:38px;border:1px solid rgba(213,163,72,.3);display:grid;place-items:center;border-radius:50%;color:var(--gold2)}.copyright{text-align:center;border-top:1px solid rgba(255,255,255,.07);padding:15px;color:#72878e;font-size:11px;text-transform:lowercase}.copyright a{color:var(--gold)}\n.scrim{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:89;opacity:0;visibility:hidden;transition:.25s}.scrim.show{opacity:1;visibility:visible}.drawer{position:fixed;z-index:90;right:0;top:0;height:100dvh;width:min(410px,92vw);background:#fff;color:#122229;transform:translateX(105%);transition:.3s;display:flex;flex-direction:column;box-shadow:-20px 0 60px rgba(0,0,0,.32)}.drawer.open{transform:none}.drawer-head{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e7ecee;padding:19px 20px}.drawer-head h3{font-family:\'Cormorant Garamond\',serif;font-size:25px;margin:0}.icon-btn{border:0;background:none}.drawer-body{padding:14px 20px;overflow:auto;flex:1}.empty-cart{height:55vh;display:grid;place-items:center;align-content:center;color:#85969c;gap:8px}.cart-line{display:flex;justify-content:space-between;gap:12px;padding:13px 0;border-bottom:1px solid #edf0f1}.cart-line strong{display:block;font-family:\'Cormorant Garamond\',serif;font-size:18px}.cart-line small{display:block;color:#7f8e93;margin-top:4px}.cart-line button{border:0;background:none;font-size:22px;color:#9d2b2f}.drawer-footer{border-top:1px solid #e7ecee;padding:18px 20px}.drawer-footer>div{display:flex;justify-content:space-between;margin-bottom:14px}.gold-btn{border:0;background:var(--gold);color:#07151c;padding:13px 18px;font-weight:800;width:100%}.modal-wrap{position:fixed;z-index:120;inset:0;background:rgba(0,0,0,.72);display:grid;place-items:center;padding:20px}.modal-card{width:min(470px,100%);background:#fff;color:#13232a;padding:30px;position:relative;text-align:center;border-top:4px solid var(--gold);box-shadow:0 20px 70px rgba(0,0,0,.4)}.modal-close{position:absolute;right:12px;top:12px;border:0;background:transparent;color:#5d6b70}.mini-mark{display:flex;justify-content:center;margin-bottom:17px}.modal-card h2{font-family:\'Cormorant Garamond\',serif;font-size:31px;margin:0 0 7px}.modal-card p{color:#76878d;font-size:13px;margin:0 0 20px}.modal-card select{width:100%;padding:13px 12px;border:1px solid #d7dcde;margin-bottom:13px;background:#fff;color:#122229}\n@media(max-width:980px){.desktop-nav{display:none}.hamburger,.mobile-cart{display:flex}.header-row{justify-content:space-between;min-height:76px}.logo-link{position:absolute;left:50%;transform:translateX(-50%)}.mobile-menu{display:grid;padding:8px 20px 18px;background:#061820;border-top:1px solid rgba(255,255,255,.05)}.mobile-menu a{padding:12px;border-bottom:1px solid rgba(255,255,255,.06);font-size:14px}.product-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.footer-grid{grid-template-columns:1fr 1fr}.footer-grid>div:first-child{grid-column:1/-1}.topbar .follow,.topbar .social{display:none}.hero>img{min-height:0}.shop-section{padding-top:8px}}\n@media(max-width:600px){.container{width:min(100% - 24px,1180px)}.topbar-inner{height:38px;gap:12px}.top-link:nth-child(2){display:none}.cart-button span{display:none}.cart-button{padding-left:11px}.brand-badge{width:94px;height:49px}.brand-badge strong{font-size:26px}.brand-tag{display:none}.header-row{min-height:66px}.hero>img{width:100%;min-height:250px;object-fit:cover;object-position:center}.quick-nav{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;padding-bottom:8px}.quick-nav a{flex:0 0 auto}.divider{height:46px}.divider img{width:86%}.section-banner{width:calc(100% - 24px);margin-bottom:14px}.section-head{width:calc(100% - 24px);margin-top:10px}.section-head h2{font-size:30px}.section-head>span:first-child{display:none}.product-grid{width:calc(100% - 24px);display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:9px;gap:12px}.product-card{flex:0 0 72%;scroll-snap-align:start}.product-body h3{font-size:19px}.footer-grid{grid-template-columns:1fr;gap:25px}.footer-grid>div:first-child{grid-column:auto}.modal-card{padding:26px 20px}.section-banner img{min-height:190px;object-fit:cover}.shop-section{padding-bottom:18px}}\n';

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(true);
  const [area, setArea] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

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

  return (
    <>
    <style>{INLINE_CSS}</style>
    <div className="app-shell">
      <div className="topbar">
        <div className="container topbar-inner">
          <button className="top-link" onClick={() => setAreaOpen(true)}><Icon name="pin" />{area || 'Select Area'}</button>
          <a className="top-link" href="tel:+923342632631"><Icon name="phone" />+92 334 2632631</a>
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
          <nav className="desktop-nav">{nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
          <button className="mobile-cart" onClick={() => setCartOpen(true)}><Icon name="bag" /><span>{count}</span></button>
        </div>
        {menuOpen && <nav className="mobile-menu">{nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="hero">
          <img src={ASSET.hero} alt="Cake Bites hero" />
          <div className="hero-overlay"><div className="hero-copy"><span className="eyebrow">Serving sweet moments in Karachi</span><h1>Premium cakes, baked for memorable moments.</h1><a href="#best" className="hero-cta">Explore Best Sellers</a></div></div>
        </section>

        <div className="quick-nav container">{nav.slice(0, 7).map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>

        {sections.map((section) => <Section key={section.id} section={section} onAdd={add} />)}
      </main>

      <footer>
        <div className="footer-grid container">
          <div><BrandMark /><p>At CakeBites.pk, we create delicious baked treats that bring sweetness, joy, and warmth to every occasion. From rich chocolate cakes and creamy cheesecakes to freshly baked desserts, every item is made with care and premium-quality ingredients.</p></div>
          <div><h3>FIND US</h3><a href="tel:+923342632631">+92 334 2632631</a><span>Shop #18, Block 4, Gulshan-e-Iqbal, Karachi</span><span>North Nazimabad • Shah Faisal • Clifton</span></div>
          <div><h3>FOLLOW US</h3><div className="footer-socials"><a href="#"><Icon name="facebook" /></a><a href="#"><Icon name="instagram" /></a></div><a href="mailto:info@cakebites.pk">info@cakebites.pk</a></div>
        </div>
        <div className="copyright">all rights reserved cakebites and powered by <a href="https://rojrztech.com">rojrztech</a></div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
      <AreaModal open={areaOpen} onClose={() => setAreaOpen(false)} area={area} setArea={setArea} />
    </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
