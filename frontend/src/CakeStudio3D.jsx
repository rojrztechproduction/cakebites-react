import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Pre-defined options for the customizer
export const FLAVORS = [
  { id: 'choco', name: 'Belgian Dark Fudge', price: 300, baseColor: 0x27140c, desc: 'Rich 70% dark cocoa sponge' },
  { id: 'velvet', name: 'Red Velvet Royale', price: 250, baseColor: 0x821524, desc: 'Velvety crimson sponge with hints of cocoa' },
  { id: 'lotus', name: 'Lotus Biscoff Dream', price: 350, baseColor: 0xbc7d35, desc: 'Caramelized Belgian biscoff sponge' },
  { id: 'vanilla', name: 'Classic Madagascar Vanilla', price: 0, baseColor: 0xf3ece0, desc: 'Aromatic pure vanilla bean sponge' },
  { id: 'mango', name: 'Tropical Mango Bliss', price: 200, baseColor: 0xf5a528, desc: 'Sweet Chaunsa mango infused sponge' },
  { id: 'pistachio', name: 'Royal Pistachio Kulfi', price: 400, baseColor: 0x869b76, desc: 'Crushed pistachio & cardamom sponge' }
];

export const FROSTINGS = [
  { id: 'ivory', name: 'Ivory Whipped Cream', color: 0xfffcf2, price: 0 },
  { id: 'darkchoc', name: 'Dark Truffle Ganache', color: 0x24140e, price: 200 },
  { id: 'milkchoc', name: 'Milk Chocolate Silk', color: 0x5a3825, price: 150 },
  { id: 'pastelpink', name: 'Pastel Rose Buttercream', color: 0xf7b5c8, price: 100 },
  { id: 'caramel', name: 'Salted Dulce Caramel', color: 0xd49b4c, price: 200 },
  { id: 'mint', name: 'Sage Pistachio Cream', color: 0xaec69d, price: 150 },
  { id: 'lavender', name: 'Velvet Lilac Cream', color: 0xd3bde8, price: 100 }
];

export const DRIPS = [
  { id: 'none', name: 'No Drip (Clean Edge)', color: null, price: 0 },
  { id: 'choc-drip', name: 'Dark Chocolate Ganache Drip', color: 0x1f0e08, price: 250 },
  { id: 'caramel-drip', name: 'Salted Caramel Drip', color: 0xc4802c, price: 250 },
  { id: 'gold-drip', name: 'Gilded Golden Shimmer Drip', color: 0xdaa520, price: 350 },
  { id: 'white-drip', name: 'White Chocolate Cream Drip', color: 0xfdf7eb, price: 200 }
];

export const TOPPINGS_LIST = [
  { id: 'strawberries', name: 'Fresh Strawberries', icon: '🍓', price: 250 },
  { id: 'macarons', name: 'French Macarons (Pastel)', icon: '🧁', price: 300 },
  { id: 'ferrero', name: 'Ferrero Rocher Truffles', icon: '🍫', price: 350 },
  { id: 'sprinkles', name: 'Golden Sugar Pearls & Sprinkles', icon: '✨', price: 150 },
  { id: 'candles', name: 'Golden Birthday Candle with Flame', icon: '🕯️', price: 100 }
];

// Helper to create high-resolution dynamic plaque canvas texture
function createMessageTexture(text, bgColor = '#1e110a', textColor = '#f2cf7a') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');

  // Background plaque with bevel
  ctx.fillStyle = bgColor;
  ctx.roundRect(16, 16, canvas.width - 32, canvas.height - 32, 28);
  ctx.fill();

  // Gold border
  ctx.strokeStyle = '#d5a348';
  ctx.lineWidth = 10;
  ctx.roundRect(24, 24, canvas.width - 48, canvas.height - 48, 22);
  ctx.stroke();

  // Inner subtle border
  ctx.strokeStyle = 'rgba(213,163,72,0.4)';
  ctx.lineWidth = 3;
  ctx.roundRect(36, 36, canvas.width - 72, canvas.height - 72, 16);
  ctx.stroke();

  // Small brand mark top
  ctx.fillStyle = '#cfb06d';
  ctx.font = '600 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CAKE BITES • KARACHI', canvas.width / 2, 80);

  // Main Calligraphy text
  const displayText = (text && text.trim().length > 0) ? text.trim() : 'Cake Bites Celebration';
  ctx.fillStyle = textColor;
  ctx.font = 'bold 54px "Poppins", sans-serif';
  ctx.shadowColor = 'rgba(0,0,0,0.7)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 4;

  // Handle multi-line if text is long
  if (displayText.length > 24) {
    const words = displayText.split(' ');
    const half = Math.ceil(words.length / 2);
    const line1 = words.slice(0, half).join(' ');
    const line2 = words.slice(half).join(' ');
    ctx.fillText(line1, canvas.width / 2, 175);
    ctx.fillText(line2, canvas.width / 2, 250);
  } else {
    ctx.fillText(displayText, canvas.width / 2, 205);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CakeStudio3D({ open, onClose, onAddToCart }) {
  const mountRef = useRef(null);

  // Customization state
  const [tierCount, setTierCount] = useState(2); // 1, 2, or 3
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [selectedDrip, setSelectedDrip] = useState(DRIPS[1]);
  const [selectedToppings, setSelectedToppings] = useState(['strawberries', 'sprinkles', 'candles']);
  const [customMessage, setCustomMessage] = useState('Happy Birthday!');
  const [activeTab, setActiveTab] = useState('tiers'); // 'tiers', 'flavor', 'frosting', 'drip', 'toppings', 'message'

  // Three.js internal references
  const sceneRef = useRef(null);
  const cakeRootRef = useRef(null);
  const controlsRef = useRef(null);
  const candleLightRef = useRef(null);
  const flameMeshRef = useRef(null);
  const plaqueMeshRef = useRef(null);

  // Calculate live dynamic price
  const tierPricing = {
    1: { base: 2499, lbs: '2.5 lbs (8-10 servings)' },
    2: { base: 3999, lbs: '5.0 lbs (18-22 servings)' },
    3: { base: 5999, lbs: '8.0 lbs (30-35 servings)' }
  };

  const totalPrice = 
    tierPricing[tierCount].base +
    selectedFlavor.price +
    selectedFrosting.price +
    selectedDrip.price +
    selectedToppings.reduce((acc, tId) => {
      const topItem = TOPPINGS_LIST.find((t) => t.id === tId);
      return acc + (topItem ? topItem.price : 0);
    }, 0);

  // Toggle topping helper
  const toggleTopping = (id) => {
    setSelectedToppings((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // --- Initialize Three.js Scene and OrbitControls ---
  useEffect(() => {
    if (!open) return;
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 4.5;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // don't go below floor
    controls.target.set(0, 1.4, 0);
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ea, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(6, 10, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf2ca72, 2.6);
    rimLight.position.set(-7, 6, -6);
    scene.add(rimLight);

    const warmUnderLight = new THREE.PointLight(0xffb74d, 1.0, 10);
    warmUnderLight.position.set(0, -1, 3);
    scene.add(warmUnderLight);

    // Stand / Floor Mirror Shadow
    const floorGeo = new THREE.CircleGeometry(4, 32);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x030c10,
      transparent: true,
      opacity: 0.65
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.96;
    scene.add(floor);

    // Cake root group
    const cakeRoot = new THREE.Group();
    scene.add(cakeRoot);
    cakeRootRef.current = cakeRoot;

    // Animation loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Flame flicker
      if (candleLightRef.current && flameMeshRef.current) {
        const flicker = 1.0 + Math.sin(elapsedTime * 24) * 0.18 + Math.cos(elapsedTime * 40) * 0.12;
        candleLightRef.current.intensity = 2.6 * flicker;
        flameMeshRef.current.scale.set(
          1 + Math.sin(elapsedTime * 20) * 0.15,
          1 + Math.cos(elapsedTime * 26) * 0.22,
          1 + Math.sin(elapsedTime * 20) * 0.15
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [open]);

  // --- Rebuild Cake 3D Model whenever customization options change ---
  useEffect(() => {
    const cakeRoot = cakeRootRef.current;
    if (!cakeRoot || !open) return;

    // Clear previous cake elements
    while (cakeRoot.children.length > 0) {
      const obj = cakeRoot.children[0];
      cakeRoot.remove(obj);
    }
    candleLightRef.current = null;
    flameMeshRef.current = null;
    plaqueMeshRef.current = null;

    // --- 1. Gold Pedestal Stand ---
    const standMat = new THREE.MeshStandardMaterial({
      color: 0xd4a348,
      metalness: 0.88,
      roughness: 0.2,
    });

    const standBase = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.9, 0.22, 48), standMat);
    standBase.position.y = -0.85;
    cakeRoot.add(standBase);

    const standStem = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.7, 0.75, 32), standMat);
    standStem.position.y = -0.42;
    cakeRoot.add(standStem);

    const standPlate = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 2.95, 0.2, 48), standMat);
    standPlate.position.y = 0.05;
    cakeRoot.add(standPlate);

    // Cake paper doily
    const doilyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const doily = new THREE.Mesh(new THREE.CylinderGeometry(2.95, 2.95, 0.04, 48), doilyMat);
    doily.position.y = 0.17;
    cakeRoot.add(doily);

    // --- Tier specifications ---
    let tiersConfig = [];
    if (tierCount === 1) {
      tiersConfig = [{ radius: 2.3, height: 1.85, yBase: 0.2 }];
    } else if (tierCount === 2) {
      tiersConfig = [
        { radius: 2.4, height: 1.5, yBase: 0.2 },
        { radius: 1.6, height: 1.35, yBase: 1.7 }
      ];
    } else {
      // 3 Tiers
      tiersConfig = [
        { radius: 2.5, height: 1.3, yBase: 0.2 },
        { radius: 1.75, height: 1.15, yBase: 1.5 },
        { radius: 1.15, height: 1.05, yBase: 2.65 }
      ];
    }

    const frostingMat = new THREE.MeshStandardMaterial({
      color: selectedFrosting.color,
      roughness: 0.38,
      metalness: 0.06
    });

    const rosetteMat = new THREE.MeshStandardMaterial({
      color: selectedFrosting.color,
      roughness: 0.28,
      metalness: 0.05
    });

    const dripMat = selectedDrip.color !== null ? new THREE.MeshStandardMaterial({
      color: selectedDrip.color,
      roughness: 0.2,
      metalness: 0.15
    }) : null;

    // Build each tier
    tiersConfig.forEach((tier, index) => {
      // Cake Tier Body
      const tierMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(tier.radius, tier.radius, tier.height, 48),
        frostingMat
      );
      tierMesh.position.y = tier.yBase + tier.height / 2;
      cakeRoot.add(tierMesh);

      // Cream Bevel Top Edge
      const topEdge = new THREE.Mesh(
        new THREE.TorusGeometry(tier.radius - 0.04, 0.08, 12, 48),
        rosetteMat
      );
      topEdge.rotation.x = Math.PI / 2;
      topEdge.position.y = tier.yBase + tier.height;
      cakeRoot.add(topEdge);

      // Base Piped Rosettes for each tier
      const rosetteCount = Math.round(tier.radius * 9);
      for (let r = 0; r < rosetteCount; r++) {
        const angle = (r / rosetteCount) * Math.PI * 2;
        const ros = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), rosetteMat);
        ros.position.set(
          Math.cos(angle) * (tier.radius + 0.05),
          tier.yBase + 0.08,
          Math.sin(angle) * (tier.radius + 0.05)
        );
        cakeRoot.add(ros);
      }

      // Top Piped Rosettes
      for (let r = 0; r < rosetteCount; r++) {
        const angle = (r / rosetteCount) * Math.PI * 2;
        const ros = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), rosetteMat);
        ros.position.set(
          Math.cos(angle) * (tier.radius - 0.1),
          tier.yBase + tier.height + 0.04,
          Math.sin(angle) * (tier.radius - 0.1)
        );
        cakeRoot.add(ros);
      }

      // Drip Effect running down the tier edge
      if (dripMat) {
        const dripDrops = Math.round(tier.radius * 12);
        for (let d = 0; d < dripDrops; d++) {
          const angle = (d / dripDrops) * Math.PI * 2;
          const dropLength = 0.25 + Math.sin(d * 2.3) * 0.18 + Math.cos(d * 1.5) * 0.12;
          const dropMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.02, dropLength, 8),
            dripMat
          );
          dropMesh.position.set(
            Math.cos(angle) * (tier.radius + 0.02),
            tier.yBase + tier.height - dropLength / 2,
            Math.sin(angle) * (tier.radius + 0.02)
          );
          cakeRoot.add(dropMesh);

          // Droplet tip
          const tip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), dripMat);
          tip.position.set(
            Math.cos(angle) * (tier.radius + 0.02),
            tier.yBase + tier.height - dropLength,
            Math.sin(angle) * (tier.radius + 0.02)
          );
          cakeRoot.add(tip);
        }
      }
    });

    // Top tier parameters
    const topTier = tiersConfig[tiersConfig.length - 1];
    const topY = topTier.yBase + topTier.height;
    const topRadius = topTier.radius;

    // --- Toppings on Top Tier ---
    // 1. Fresh Strawberries
    if (selectedToppings.includes('strawberries')) {
      const berryMat = new THREE.MeshStandardMaterial({ color: 0xce182b, roughness: 0.18, metalness: 0.05 });
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x247a32, roughness: 0.4 });
      const berryGeo = new THREE.ConeGeometry(0.2, 0.38, 14);
      berryGeo.rotateX(Math.PI);

      const berryPositions = [
        [-topRadius * 0.5, topY + 0.18, -topRadius * 0.35],
        [topRadius * 0.5, topY + 0.18, -topRadius * 0.35],
        [-topRadius * 0.4, topY + 0.18, topRadius * 0.5],
        [topRadius * 0.45, topY + 0.18, topRadius * 0.45]
      ];

      berryPositions.forEach(([bx, by, bz]) => {
        const berry = new THREE.Mesh(berryGeo, berryMat);
        berry.position.set(bx, by, bz);
        cakeRoot.add(berry);

        for (let l = 0; l < 4; l++) {
          const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.14), leafMat);
          leaf.position.set(bx, by + 0.19, bz);
          leaf.rotation.y = (l * Math.PI) / 2;
          cakeRoot.add(leaf);
        }
      });
    }

    // 2. French Macarons
    if (selectedToppings.includes('macarons')) {
      const macColors = [0xf5b2c2, 0xbfdfbe, 0xfce39d, 0xd0bdf4];
      const macCount = 3;
      for (let m = 0; m < macCount; m++) {
        const angle = (m / macCount) * Math.PI * 2 + 0.5;
        const dist = topRadius * 0.65;
        const macMat = new THREE.MeshStandardMaterial({
          color: macColors[m % macColors.length],
          roughness: 0.4,
          metalness: 0.05
        });
        const fillingMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });

        // Two shells + cream center
        const macGroup = new THREE.Group();
        const shell1 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.24, 0.09, 16), macMat);
        shell1.position.y = 0.06;
        const filling = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16), fillingMat);
        const shell2 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.09, 16), macMat);
        shell2.position.y = -0.06;
        macGroup.add(shell1, filling, shell2);

        macGroup.position.set(Math.cos(angle) * dist, topY + 0.15, Math.sin(angle) * dist);
        macGroup.rotation.set(0.3, angle, 0.4);
        cakeRoot.add(macGroup);
      }
    }

    // 3. Ferrero Rocher Truffles
    if (selectedToppings.includes('ferrero')) {
      const truffleMat = new THREE.MeshStandardMaterial({
        color: 0x3d1c0c,
        roughness: 0.65,
        metalness: 0.25
      });
      const truffleGeo = new THREE.SphereGeometry(0.22, 14, 14);
      const positions = [
        [0, topY + 0.2, -topRadius * 0.6],
        [-topRadius * 0.55, topY + 0.2, 0],
        [topRadius * 0.55, topY + 0.2, 0]
      ];
      positions.forEach(([tx, ty, tz]) => {
        const truffle = new THREE.Mesh(truffleGeo, truffleMat);
        truffle.position.set(tx, ty, tz);
        cakeRoot.add(truffle);
      });
    }

    // 4. Gold Sprinkles
    if (selectedToppings.includes('sprinkles')) {
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.1 });
      const sprGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 6);
      for (let s = 0; s < 40; s++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * (topRadius * 0.85);
        const spr = new THREE.Mesh(sprGeo, goldMat);
        spr.position.set(Math.cos(angle) * dist, topY + 0.04, Math.sin(angle) * dist);
        spr.rotation.set(Math.PI / 2, Math.random() * Math.PI, Math.random() * Math.PI);
        cakeRoot.add(spr);
      }
    }

    // 5. Birthday Candle with Lit Flame
    if (selectedToppings.includes('candles')) {
      const candleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
      const candleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 16), candleMat);
      candleMesh.position.set(0, topY + 0.45, 0);
      cakeRoot.add(candleMesh);

      // Gold spiral rings
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xd4a348, metalness: 0.9, roughness: 0.15 });
      for (let g = 0; g < 4; g++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.052, 0.01, 8, 20), ringMat);
        ring.position.set(0, topY + 0.2 + g * 0.18, 0);
        ring.rotation.x = Math.PI / 2 + 0.3;
        cakeRoot.add(ring);
      }

      // Flame
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.22, 16), new THREE.MeshBasicMaterial({ color: 0xffa011 }));
      flame.position.set(0, topY + 1.02, 0);
      cakeRoot.add(flame);
      flameMeshRef.current = flame;

      // Candle Light
      const cLight = new THREE.PointLight(0xff9900, 2.8, 6, 1.6);
      cLight.position.set(0, topY + 1.05, 0);
      cakeRoot.add(cLight);
      candleLightRef.current = cLight;
    }

    // --- 6. 3D Edible Message Plaque ---
    if (customMessage && customMessage.trim().length > 0) {
      const plaqueTexture = createMessageTexture(customMessage);
      const plaqueMat = new THREE.MeshStandardMaterial({
        map: plaqueTexture,
        roughness: 0.3,
        metalness: 0.2,
        side: THREE.DoubleSide
      });
      // Gently curved / tilted chocolate plaque
      const plaqueGeo = new THREE.PlaneGeometry(1.6, 0.6);
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, topY + 0.38, topRadius * 0.45);
      plaqueMesh.rotation.set(-0.35, 0, 0);
      cakeRoot.add(plaqueMesh);
      plaqueMeshRef.current = plaqueMesh;
    }

    // Adjust camera target to cake center
    if (controlsRef.current) {
      controlsRef.current.target.set(0, (topY + 0.2) / 2, 0);
    }
  }, [open, tierCount, selectedFlavor, selectedFrosting, selectedDrip, selectedToppings, customMessage]);

  if (!open) return null;

  // Handle Add to Cart
  const handleAddToCart = () => {
    const summaryTiers = `${tierCount}-Tier (${tierPricing[tierCount].lbs.split(' ')[0]})`;
    const toppingsSummary = selectedToppings.map((t) => TOPPINGS_LIST.find((x) => x.id === t)?.name).filter(Boolean).join(', ');

    const customCakeItem = {
      name: `3D Custom Cake: ${selectedFlavor.name} (${tierCount}-Tier)`,
      price: totalPrice,
      oldPrice: totalPrice + 600,
      badge: '3D Custom',
      img: '/assets/banners/custom-banner.png',
      category: 'Customized Cakes',
      customDetails: {
        tiers: summaryTiers,
        flavor: selectedFlavor.name,
        frosting: selectedFrosting.name,
        drip: selectedDrip.name,
        toppings: toppingsSummary || 'None',
        message: customMessage || 'None'
      }
    };

    onAddToCart(customCakeItem);
    onClose();
  };

  return (
    <div className="modal-wrap studio-modal-wrap">
      <div className="studio-modal-card">
        <button className="modal-close" onClick={onClose} title="Close Studio">
          ✕
        </button>

        {/* Studio Header */}
        <div className="studio-header">
          <div className="studio-header-title">
            <span className="studio-tag">✨ 3D Interactive Bakery Studio</span>
            <h2>Design Your Dream Cake</h2>
          </div>
          <div className="studio-price-pill">
            <span className="price-label">Estimated Total:</span>
            <span className="price-num">Rs {totalPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Studio Main Grid */}
        <div className="studio-layout">
          {/* Left: 3D Viewport */}
          <div className="studio-viewport-col">
            <div ref={mountRef} className="studio-three-canvas" title="Drag to rotate, pinch/scroll to zoom" />

            <div className="studio-viewport-overlay">
              <div className="orbit-hint">
                <span>🖱️ Drag to rotate 360°</span>
                <span>•</span>
                <span>🔍 Scroll to zoom</span>
              </div>
              <div className="live-badge">
                <span className="live-dot" />
                <span>Real-Time 3D Engine</span>
              </div>
            </div>

            {/* Spec Summary Card */}
            <div className="studio-spec-summary">
              <div>
                <strong>Tiers:</strong> {tierCount} ({tierPricing[tierCount].lbs})
              </div>
              <div>
                <strong>Flavor:</strong> {selectedFlavor.name}
              </div>
              <div>
                <strong>Frosting:</strong> {selectedFrosting.name}
              </div>
              {customMessage && (
                <div>
                  <strong>Plaque:</strong> "{customMessage}"
                </div>
              )}
            </div>
          </div>

          {/* Right: Customization Controls Panel */}
          <div className="studio-controls-col">
            {/* Step Navigation Tabs */}
            <div className="studio-tabs">
              <button
                type="button"
                className={`studio-tab ${activeTab === 'tiers' ? 'active' : ''}`}
                onClick={() => setActiveTab('tiers')}
              >
                1. Tiers
              </button>
              <button
                type="button"
                className={`studio-tab ${activeTab === 'flavor' ? 'active' : ''}`}
                onClick={() => setActiveTab('flavor')}
              >
                2. Flavor
              </button>
              <button
                type="button"
                className={`studio-tab ${activeTab === 'frosting' ? 'active' : ''}`}
                onClick={() => setActiveTab('frosting')}
              >
                3. Frosting
              </button>
              <button
                type="button"
                className={`studio-tab ${activeTab === 'drip' ? 'active' : ''}`}
                onClick={() => setActiveTab('drip')}
              >
                4. Drip
              </button>
              <button
                type="button"
                className={`studio-tab ${activeTab === 'toppings' ? 'active' : ''}`}
                onClick={() => setActiveTab('toppings')}
              >
                5. Toppings
              </button>
              <button
                type="button"
                className={`studio-tab ${activeTab === 'message' ? 'active' : ''}`}
                onClick={() => setActiveTab('message')}
              >
                6. Text
              </button>
            </div>

            {/* Tab Body */}
            <div className="studio-tab-content">
              {/* TAB 1: TIERS */}
              {activeTab === 'tiers' && (
                <div className="control-section">
                  <h3>Select Cake Size & Tiers</h3>
                  <p className="control-desc">Choose the number of tiers suited for your occasion.</p>
                  <div className="tier-cards-grid">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className={`tier-card ${tierCount === num ? 'active' : ''}`}
                        onClick={() => setTierCount(num)}
                      >
                        <div className="tier-icon">{num === 1 ? '🎂' : num === 2 ? '🍰🍰' : '👑'}</div>
                        <h4>{num} {num === 1 ? 'Tier' : 'Tiers'}</h4>
                        <span className="tier-servings">{tierPricing[num].lbs}</span>
                        <div className="tier-price">Base: Rs {tierPricing[num].base.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: FLAVOR */}
              {activeTab === 'flavor' && (
                <div className="control-section">
                  <h3>Choose Sponge & Inner Filling</h3>
                  <p className="control-desc">Baked fresh with premium imported cocoa and dairy.</p>
                  <div className="flavor-options-list">
                    {FLAVORS.map((f) => (
                      <div
                        key={f.id}
                        className={`option-row ${selectedFlavor.id === f.id ? 'active' : ''}`}
                        onClick={() => setSelectedFlavor(f)}
                      >
                        <span
                          className="swatch-circle"
                          style={{ background: `#${f.baseColor.toString(16).padStart(6, '0')}` }}
                        />
                        <div className="option-info">
                          <strong>{f.name}</strong>
                          <span>{f.desc}</span>
                        </div>
                        <div className="option-price">
                          {f.price > 0 ? `+Rs ${f.price}` : 'Included'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: FROSTING */}
              {activeTab === 'frosting' && (
                <div className="control-section">
                  <h3>Select Outer Frosting & Cream Color</h3>
                  <p className="control-desc">Smooth whipped cream and ganache crafted to perfection.</p>
                  <div className="frosting-grid">
                    {FROSTINGS.map((fr) => (
                      <div
                        key={fr.id}
                        className={`frosting-card ${selectedFrosting.id === fr.id ? 'active' : ''}`}
                        onClick={() => setSelectedFrosting(fr)}
                      >
                        <span
                          className="frosting-swatch"
                          style={{
                            background: `#${fr.color.toString(16).padStart(6, '0')}`,
                            border: fr.id === 'ivory' ? '1px solid #ccc' : 'none'
                          }}
                        />
                        <div className="frosting-name">{fr.name}</div>
                        <div className="frosting-price">
                          {fr.price > 0 ? `+Rs ${fr.price}` : 'Free'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: DRIP */}
              {activeTab === 'drip' && (
                <div className="control-section">
                  <h3>Decadent Glaze & Drip Style</h3>
                  <p className="control-desc">Hand-piped dripping glaze cascaded over tier edges.</p>
                  <div className="drip-options-list">
                    {DRIPS.map((d) => (
                      <div
                        key={d.id}
                        className={`option-row ${selectedDrip.id === d.id ? 'active' : ''}`}
                        onClick={() => setSelectedDrip(d)}
                      >
                        <span
                          className="swatch-circle"
                          style={{
                            background: d.color !== null ? `#${d.color.toString(16).padStart(6, '0')}` : '#e2e7ea',
                            border: d.id === 'white-drip' ? '1px solid #ccc' : 'none'
                          }}
                        />
                        <div className="option-info">
                          <strong>{d.name}</strong>
                        </div>
                        <div className="option-price">
                          {d.price > 0 ? `+Rs ${d.price}` : 'Free'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: TOPPINGS */}
              {activeTab === 'toppings' && (
                <div className="control-section">
                  <h3>Gourmet Artisanal Toppings</h3>
                  <p className="control-desc">Select toppings to scatter gracefully across the crown.</p>
                  <div className="toppings-grid">
                    {TOPPINGS_LIST.map((t) => {
                      const isSelected = selectedToppings.includes(t.id);
                      return (
                        <div
                          key={t.id}
                          className={`topping-card ${isSelected ? 'active' : ''}`}
                          onClick={() => toggleTopping(t.id)}
                        >
                          <span className="topping-icon">{t.icon}</span>
                          <div className="topping-info">
                            <strong>{t.name}</strong>
                            <span>+Rs {t.price}</span>
                          </div>
                          <span className={`check-indicator ${isSelected ? 'checked' : ''}`}>
                            {isSelected ? '✓' : '+'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 6: CUSTOM TEXT */}
              {activeTab === 'message' && (
                <div className="control-section">
                  <h3>3D Edible Plaque Message</h3>
                  <p className="control-desc">
                    Type a personalized message to render in golden calligraphy on an edible chocolate plaque in 3D!
                  </p>
                  <div className="message-input-box">
                    <label>Message on Cake:</label>
                    <input
                      type="text"
                      maxLength={40}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="e.g. Happy Birthday Sarah!"
                    />
                    <small>{40 - customMessage.length} characters left</small>
                  </div>

                  <div className="quick-messages">
                    <span>Quick presets:</span>
                    {['Happy Birthday! 🎉', 'Congratulations! 🎓', 'Happy Anniversary! ❤️', 'Best Wishes ✨'].map(
                      (msg) => (
                        <button key={msg} type="button" onClick={() => setCustomMessage(msg)}>
                          {msg}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Studio Bottom Bar / CTA */}
            <div className="studio-bottom-bar">
              <div className="total-display">
                <span className="sub">Total Price (COD / Karachi):</span>
                <span className="main-price">Rs {totalPrice.toLocaleString()}</span>
              </div>
              <button type="button" className="add-btn studio-add-btn" onClick={handleAddToCart}>
                <span className="add-btn-inner">
                  <svg className="cart-bag-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.5 8.5h13a1.5 1.5 0 0 1 1.5 1.5v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a1.5 1.5 0 0 1 1.5-1.5z" />
                    <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
                  </svg>
                  Add to Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
