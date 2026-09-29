import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const FLAVORS = [
  { 
    id: 'choco', 
    name: 'Belgian Fudge', 
    tagline: '70% Rich Callebaut Ganache & Gold',
    color: 0x1c0c05, 
    dripColor: 0x130602,
    spongeColor: 0x2c1408,
    creamColor: 0x3d1c0b,
    topGlazeColor: 0x240f06,
    pearlColor: 0x190803,
    dot: '#4a2511',
    hasStrawberries: true,
    hasGold: true,
  },
  { 
    id: 'velvet', 
    name: 'Red Velvet', 
    tagline: 'Crimson Sponge & Cream Cheese Swirl',
    color: 0x76101c, 
    dripColor: 0xfffcf7,
    spongeColor: 0x881422,
    creamColor: 0xfff8ee,
    topGlazeColor: 0xfffcf7,
    pearlColor: 0x640d17,
    dot: '#c81e35',
    hasStrawberries: true,
    hasGold: true,
  },
  { 
    id: 'lotus', 
    name: 'Lotus Caramel', 
    tagline: 'Speculoos Biscoff & Toffee Drip',
    color: 0xb86c22, 
    dripColor: 0x8d4a0c,
    spongeColor: 0xd29752,
    creamColor: 0xfdf4e4,
    topGlazeColor: 0xfdf4e4,
    pearlColor: 0x9b5513,
    dot: '#d9822b',
    hasStrawberries: false,
    hasGold: true,
  },
  { 
    id: 'vanilla', 
    name: 'Vanilla & Berries', 
    tagline: 'Chantilly Cream & Fresh Strawberries',
    color: 0xfffcf2, 
    dripColor: 0xd43852,
    spongeColor: 0xf7e2aa,
    creamColor: 0xfffcf5,
    topGlazeColor: 0xfffcf5,
    pearlColor: 0xf0e3c5,
    dot: '#ffb3c1',
    hasStrawberries: true,
    hasGold: true,
  },
  { 
    id: 'mango', 
    name: 'Mango Alphonso', 
    tagline: 'Tropical Mango Curd & White Cream',
    color: 0xee9214, 
    dripColor: 0xcf7505,
    spongeColor: 0xfcd07c,
    creamColor: 0xfffaed,
    topGlazeColor: 0xfffaed,
    pearlColor: 0xdb7c07,
    dot: '#f5a623',
    hasStrawberries: false,
    hasGold: true,
  },
];

export default function HeroCake3D({ onOpenStudio }) {
  const mountRef = useRef(null);
  const [flavor, setFlavor] = useState(FLAVORS[0]);
  const [candleLit, setCandleLit] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [isSliced, setIsSliced] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState('');

  // 3D Object Refs
  const rootCakeGroupRef = useRef(null);
  const sliceGroupRef = useRef(null);
  const materialsRef = useRef({
    cake: null,
    drip: null,
    topGlaze: null,
    pearl: null,
    sponge: null,
    cream: null,
  });
  const candleLightRef = useRef(null);
  const flameMeshRef = useRef(null);
  const confettiStateRef = useRef({ active: false, time: 0 });
  const sliceOffsetRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);

    const isMobile = width < 860;
    if (isMobile) {
      camera.position.set(0, 2.4, 7.4);
      camera.lookAt(0, 0.4, 0);
    } else {
      camera.position.set(0, 2.5, 7.6);
      camera.lookAt(1.15, 0.45, 0);
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Studio Bakery Lighting Rig ---
    // Warm ambient bakery glow
    const ambientLight = new THREE.AmbientLight(0xfff1de, 1.4);
    scene.add(ambientLight);

    // Main Key Light from top-right
    const keySpot = new THREE.DirectionalLight(0xffffff, 3.2);
    keySpot.position.set(isMobile ? 3 : 5.5, 9, 6.5);
    scene.add(keySpot);

    // Golden Rim Light from behind
    const goldRim = new THREE.DirectionalLight(0xf5cb78, 3.4);
    goldRim.position.set(isMobile ? -3.5 : -4, 6.5, -5.5);
    scene.add(goldRim);

    // Soft warm bounce from beneath
    const warmBounce = new THREE.PointLight(0xffa534, 1.4, 12);
    warmBounce.position.set(isMobile ? 0 : 1.8, -2, 4);
    scene.add(warmBounce);

    // --- Root Cake Hierarchy ---
    const rootCakeGroup = new THREE.Group();
    scene.add(rootCakeGroup);
    rootCakeGroupRef.current = rootCakeGroup;

    // Position cake gracefully on right side for desktop, center for mobile
    const cakePosX = isMobile ? 0 : 2.05;
    rootCakeGroup.position.set(cakePosX, -0.32, 0);

    // --- Materials Setup ---
    const goldStandMat = new THREE.MeshStandardMaterial({
      color: 0xd9a443,
      metalness: 0.94,
      roughness: 0.16,
    });

    const marblePlateMat = new THREE.MeshStandardMaterial({
      color: 0xfdfdfb,
      roughness: 0.14,
      metalness: 0.05,
    });

    const cakeMat = new THREE.MeshStandardMaterial({
      color: flavor.color,
      roughness: 0.22,
      metalness: 0.12,
    });

    const dripMat = new THREE.MeshStandardMaterial({
      color: flavor.dripColor,
      roughness: 0.18,
      metalness: 0.15,
    });

    const topGlazeMat = new THREE.MeshStandardMaterial({
      color: flavor.topGlazeColor,
      roughness: 0.15,
      metalness: 0.16,
    });

    const pearlMat = new THREE.MeshStandardMaterial({
      color: flavor.pearlColor,
      roughness: 0.18,
      metalness: 0.12,
    });

    const spongeMat = new THREE.MeshStandardMaterial({
      color: flavor.spongeColor,
      roughness: 0.85,
      metalness: 0.0,
    });

    const creamFillingMat = new THREE.MeshStandardMaterial({
      color: flavor.creamColor,
      roughness: 0.28,
      metalness: 0.05,
    });

    materialsRef.current = {
      cake: cakeMat,
      drip: dripMat,
      topGlaze: topGlazeMat,
      pearl: pearlMat,
      sponge: spongeMat,
      cream: creamFillingMat,
    };

    // --- 1. Gold Pedestal Stand & Marble Plate ---
    const standBaseGeo = new THREE.CylinderGeometry(1.35, 1.85, 0.18, 48);
    const standBase = new THREE.Mesh(standBaseGeo, goldStandMat);
    standBase.position.y = -0.85;
    rootCakeGroup.add(standBase);

    const standStemGeo = new THREE.CylinderGeometry(0.28, 0.44, 0.72, 32);
    const standStem = new THREE.Mesh(standStemGeo, goldStandMat);
    standStem.position.y = -0.42;
    rootCakeGroup.add(standStem);

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.07, 16, 32), goldStandMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = -0.09;
    rootCakeGroup.add(collar);

    const standLip = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.0, 0.12, 48), goldStandMat);
    standLip.position.y = -0.06;
    rootCakeGroup.add(standLip);

    const marblePlate = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.07, 48), marblePlateMat);
    marblePlate.position.y = 0.04;
    rootCakeGroup.add(marblePlate);

    const marbleGoldRim = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.03, 12, 48), goldStandMat);
    marbleGoldRim.rotation.x = Math.PI / 2;
    marbleGoldRim.position.y = 0.06;
    rootCakeGroup.add(marbleGoldRim);

    // --- 2. Cake Geometry: Separable Slice System ---
    const cakeRadius = 1.68;
    const cakeHeight = 1.55;
    const sliceAngle = 0.52; // ~30 degree wedge

    // Function to build internal sponge & cream layers on cross-section faces
    const createLayerFace = (angle, isStart) => {
      const faceGroup = new THREE.Group();
      faceGroup.rotation.y = angle;

      const layerCount = 5;
      const layerH = (cakeHeight - 0.06) / layerCount;
      const faceW = cakeRadius;

      for (let l = 0; l < layerCount; l++) {
        const isSponge = l % 2 === 0;
        const mat = isSponge ? spongeMat : creamFillingMat;
        const planeGeo = new THREE.PlaneGeometry(faceW, layerH - 0.005);
        const mesh = new THREE.Mesh(planeGeo, mat);
        mesh.position.set(faceW / 2, 0.08 + (l + 0.5) * layerH, 0);
        if (!isStart) mesh.rotation.y = Math.PI;
        faceGroup.add(mesh);
      }
      return faceGroup;
    };

    // A. Main Cake Body (330 degrees)
    const mainCakeGroup = new THREE.Group();
    rootCakeGroup.add(mainCakeGroup);

    const mainCakeGeo = new THREE.CylinderGeometry(
      cakeRadius, cakeRadius, cakeHeight, 48, 1, false,
      sliceAngle, Math.PI * 2 - sliceAngle
    );
    const mainCakeMesh = new THREE.Mesh(mainCakeGeo, cakeMat);
    mainCakeMesh.position.y = cakeHeight / 2 + 0.07;
    mainCakeGroup.add(mainCakeMesh);

    // Top Glaze Layer on main cake
    const mainTopGeo = new THREE.CylinderGeometry(
      cakeRadius + 0.01, cakeRadius + 0.01, 0.06, 48, 1, false,
      sliceAngle, Math.PI * 2 - sliceAngle
    );
    const mainTopMesh = new THREE.Mesh(mainTopGeo, topGlazeMat);
    mainTopMesh.position.y = cakeHeight + 0.09;
    mainCakeGroup.add(mainTopMesh);

    // Inner cross-section faces of the main cake cavity
    mainCakeGroup.add(createLayerFace(sliceAngle, true));
    mainCakeGroup.add(createLayerFace(Math.PI * 2, false));

    // B. Separable Cake Slice Piece (30 degrees)
    const sliceGroup = new THREE.Group();
    rootCakeGroup.add(sliceGroup);
    sliceGroupRef.current = sliceGroup;

    const sliceGeo = new THREE.CylinderGeometry(
      cakeRadius, cakeRadius, cakeHeight, 16, 1, false,
      0, sliceAngle
    );
    const sliceMesh = new THREE.Mesh(sliceGeo, cakeMat);
    sliceMesh.position.y = cakeHeight / 2 + 0.07;
    sliceGroup.add(sliceMesh);

    const sliceTopGeo = new THREE.CylinderGeometry(
      cakeRadius + 0.01, cakeRadius + 0.01, 0.06, 16, 1, false,
      0, sliceAngle
    );
    const sliceTopMesh = new THREE.Mesh(sliceTopGeo, topGlazeMat);
    sliceTopMesh.position.y = cakeHeight + 0.09;
    sliceGroup.add(sliceTopMesh);

    // Slice inner faces
    sliceGroup.add(createLayerFace(0, false));
    sliceGroup.add(createLayerFace(sliceAngle, true));

    // --- 3. Luscious Dripping Ganache Glaze ---
    const createDrips = (parentGroup, startAng, totalAng, count) => {
      const dripGeo = new THREE.ConeGeometry(0.065, 0.35, 10);
      dripGeo.rotateX(Math.PI);
      const dropBallGeo = new THREE.SphereGeometry(0.06, 10, 10);

      for (let i = 0; i < count; i++) {
        const ang = startAng + (i / count) * totalAng;
        const dripLength = 0.18 + Math.sin(i * 2.3) * 0.14;
        const dripNode = new THREE.Group();
        dripNode.position.set(
          Math.cos(ang) * (cakeRadius + 0.015),
          cakeHeight + 0.08 - dripLength / 2,
          Math.sin(ang) * (cakeRadius + 0.015)
        );

        const cone = new THREE.Mesh(dripGeo, dripMat);
        cone.scale.set(1, dripLength / 0.35, 1);
        dripNode.add(cone);

        const dropBall = new THREE.Mesh(dropBallGeo, dripMat);
        dropBall.position.y = -dripLength / 2;
        dripNode.add(dropBall);

        parentGroup.add(dripNode);
      }
    };

    createDrips(mainCakeGroup, sliceAngle + 0.05, Math.PI * 2 - sliceAngle - 0.1, 19);
    createDrips(sliceGroup, 0.03, sliceAngle - 0.06, 4);

    // --- 4. Base Chocolate Pearl Piping ---
    const pearlGeo = new THREE.SphereGeometry(0.095, 14, 12);
    const totalPearls = 26;
    for (let p = 0; p < totalPearls; p++) {
      const ang = (p / totalPearls) * Math.PI * 2;
      const inSlice = ang >= 0 && ang <= sliceAngle;
      const targetGroup = inSlice ? sliceGroup : mainCakeGroup;

      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.set(Math.cos(ang) * (cakeRadius + 0.02), 0.13, Math.sin(ang) * (cakeRadius + 0.02));
      targetGroup.add(pearl);
    }

    // --- 5. Piped Whipped Cream Rosettes & Cherries ---
    const rosetteGroup = new THREE.Group();
    rootCakeGroup.add(rosetteGroup);

    const rosetteGeo = new THREE.ConeGeometry(0.14, 0.16, 8);
    const cherryGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const rosetteMat = new THREE.MeshStandardMaterial({
      color: 0xfffcf5,
      roughness: 0.22,
      metalness: 0.05,
    });
    const cherryMat = new THREE.MeshStandardMaterial({
      color: 0xb51225,
      roughness: 0.15,
      metalness: 0.2,
    });

    const rosetteCount = 12;
    for (let r = 0; r < rosetteCount; r++) {
      const ang = (r / rosetteCount) * Math.PI * 2;
      const inSlice = ang >= 0 && ang <= sliceAngle;
      const targetGroup = inSlice ? sliceGroup : mainCakeGroup;

      const rad = cakeRadius - 0.18;
      const rosette = new THREE.Mesh(rosetteGeo, rosetteMat);
      rosette.position.set(Math.cos(ang) * rad, cakeHeight + 0.16, Math.sin(ang) * rad);
      rosette.rotation.y = ang;
      targetGroup.add(rosette);

      const cherry = new THREE.Mesh(cherryGeo, cherryMat);
      cherry.position.set(Math.cos(ang) * rad, cakeHeight + 0.26, Math.sin(ang) * rad);
      targetGroup.add(cherry);
    }

    // --- 6. Plump Glossy Strawberries with Green Leaves ---
    const strawberryGroup = new THREE.Group();
    mainCakeGroup.add(strawberryGroup);

    const berryGeo = new THREE.ConeGeometry(0.16, 0.32, 12);
    berryGeo.rotateX(Math.PI);
    const berryMat = new THREE.MeshStandardMaterial({
      color: 0xd6182e,
      roughness: 0.15,
      metalness: 0.15,
    });
    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x2e7d32,
      roughness: 0.35,
      side: THREE.DoubleSide,
    });

    const berryPositions = [
      [-0.55, cakeHeight + 0.22, -0.65, 0.2],
      [0.65, cakeHeight + 0.22, -0.55, -0.25],
      [-0.85, cakeHeight + 0.22, 0.25, 0.35],
      [0.85, cakeHeight + 0.22, 0.35, -0.4],
    ];

    berryPositions.forEach(([bx, by, bz, rotZ]) => {
      const berryNode = new THREE.Group();
      berryNode.position.set(bx, by, bz);
      berryNode.rotation.z = rotZ;

      const berry = new THREE.Mesh(berryGeo, berryMat);
      berryNode.add(berry);

      // Cute green calyx leaf crown
      for (let l = 0; l < 5; l++) {
        const leafGeo = new THREE.PlaneGeometry(0.09, 0.05);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.y = 0.14;
        leaf.rotation.set(-0.3, (l / 5) * Math.PI * 2, 0);
        berryNode.add(leaf);
      }
      strawberryGroup.add(berryNode);
    });

    // --- 7. Patisserie Chocolate Bark Shards ---
    const shardGroup = new THREE.Group();
    mainCakeGroup.add(shardGroup);

    const shardGeo = new THREE.BoxGeometry(0.24, 0.48, 0.02);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x140602,
      roughness: 0.18,
      metalness: 0.15,
    });

    const shard1 = new THREE.Mesh(shardGeo, shardMat);
    shard1.position.set(-0.25, cakeHeight + 0.26, -0.2);
    shard1.rotation.set(0.15, 0.4, 0.2);
    shardGroup.add(shard1);

    const shard2 = new THREE.Mesh(shardGeo, shardMat);
    shard2.position.set(0.25, cakeHeight + 0.24, -0.25);
    shard2.rotation.set(-0.1, -0.5, -0.15);
    shardGroup.add(shard2);

    // --- 8. 24K Edible Gold Leaf Flakes ---
    const goldFlakeMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.98,
      roughness: 0.1,
    });
    const flakeGeo = new THREE.BoxGeometry(0.045, 0.004, 0.045);

    for (let f = 0; f < 30; f++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = 0.3 + Math.random() * 1.15;
      const flake = new THREE.Mesh(flakeGeo, goldFlakeMat);
      flake.position.set(Math.cos(ang) * dist, cakeHeight + 0.13, Math.sin(ang) * dist);
      flake.rotation.set(0, Math.random() * Math.PI, (Math.random() - 0.5) * 0.2);
      mainCakeGroup.add(flake);
    }

    // --- 9. Central Celebration Birthday Candle with Animated Flame ---
    const candleGroup = new THREE.Group();
    mainCakeGroup.add(candleGroup);

    const candleGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.95, 20);
    const candleMat = new THREE.MeshStandardMaterial({ color: 0xfffcf5, roughness: 0.25 });
    const candle = new THREE.Mesh(candleGeo, candleMat);
    candle.position.set(0, cakeHeight + 0.55, 0);
    candleGroup.add(candle);

    // Gold Spiral Rings on Candle
    const ringGeo = new THREE.TorusGeometry(0.057, 0.01, 8, 20);
    for (let s = 0; s < 5; s++) {
      const ring = new THREE.Mesh(ringGeo, goldStandMat);
      ring.position.set(0, cakeHeight + 0.2 + s * 0.15, 0);
      ring.rotation.x = Math.PI / 2 + 0.3;
      candleGroup.add(ring);
    }

    // Black Wick
    const wick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8),
      new THREE.MeshBasicMaterial({ color: 0x111111 })
    );
    wick.position.set(0, cakeHeight + 1.05, 0);
    candleGroup.add(wick);

    // Glowing Animated Flame
    const flameGeo = new THREE.ConeGeometry(0.075, 0.28, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffa41c });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.set(0, cakeHeight + 1.22, 0);
    candleGroup.add(flameMesh);
    flameMeshRef.current = flameMesh;

    // Candle Point Light casting warm dynamic flicker on top of the cake
    const candleLight = new THREE.PointLight(0xff9e1b, 3.5, 6.5, 1.8);
    candleLight.position.set(0, cakeHeight + 1.26, 0);
    candleGroup.add(candleLight);
    candleLightRef.current = candleLight;

    // --- 10. Ambient Golden Sparkles & Floating Confetti System ---
    const confettiCount = 85;
    const confettiGeos = [
      new THREE.PlaneGeometry(0.08, 0.05),
      new THREE.PlaneGeometry(0.06, 0.06),
      new THREE.CircleGeometry(0.04, 8),
    ];
    const confettiColors = [0xffd700, 0xff2a6d, 0x05d9e8, 0xd5a348, 0xfff9ea, 0x2ecc71];

    const confettiItems = [];
    const confettiGroup = new THREE.Group();
    scene.add(confettiGroup);

    for (let c = 0; c < confettiCount; c++) {
      const geo = confettiGeos[c % confettiGeos.length];
      const mat = new THREE.MeshStandardMaterial({
        color: confettiColors[c % confettiColors.length],
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      confettiGroup.add(mesh);

      confettiItems.push({
        mesh,
        velocity: new THREE.Vector3(),
        rotSpeed: new THREE.Vector3(),
      });
    }

    // Ambient floating golden fairy dust
    const dustCount = 45;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSpeeds = new Float32Array(dustCount);

    for (let d = 0; d < dustCount; d++) {
      dustPositions[d * 3] = (Math.random() - 0.5) * 7.5 + (isMobile ? 0 : 1.8);
      dustPositions[d * 3 + 1] = Math.random() * 4.8 - 0.8;
      dustPositions[d * 3 + 2] = (Math.random() - 0.5) * 5.5;
      dustSpeeds[d] = 0.005 + Math.random() * 0.008;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xf5d378,
      size: 0.065,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // --- Interactive Mouse Drag Orbit ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocityX = 0.004;

    const onPointerDown = (e) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0,
      };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = currentX - previousMousePosition.x;
      const deltaY = currentY - previousMousePosition.y;

      rootCakeGroup.rotation.y += deltaX * 0.008;
      rootCakeGroup.rotation.x = Math.max(-0.2, Math.min(0.28, rootCakeGroup.rotation.x + deltaY * 0.004));

      rotationVelocityX = deltaX * 0.003;
      previousMousePosition = { x: currentX, y: currentY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      const mobile = nw < 860;

      if (mobile) {
        camera.position.set(0, 2.4, 7.4);
        camera.lookAt(0, 0.4, 0);
        rootCakeGroup.position.set(0, -0.32, 0);
      } else {
        camera.position.set(0, 2.5, 7.6);
        camera.lookAt(1.15, 0.45, 0);
        rootCakeGroup.position.set(2.05, -0.32, 0);
      }

      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation Loop with Viewport Visibility Pause ---
    let animId;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation with momentum
      if (!isDragging) {
        if (isRotating) {
          rootCakeGroup.rotation.y += 0.0035;
        } else {
          rootCakeGroup.rotation.y += rotationVelocityX;
          rotationVelocityX *= 0.95;
        }
      }

      // Gentle floating hover
      rootCakeGroup.position.y = -0.32 + Math.sin(elapsedTime * 1.5) * 0.035;

      // Candle Flame flickering
      if (candleLightRef.current && flameMeshRef.current) {
        const flicker = 1.0 + Math.sin(elapsedTime * 24) * 0.16 + Math.cos(elapsedTime * 38) * 0.12;
        candleLightRef.current.intensity = 3.5 * flicker;
        flameMeshRef.current.scale.set(
          1 + Math.sin(elapsedTime * 22) * 0.14,
          1 + Math.cos(elapsedTime * 26) * 0.24,
          1 + Math.sin(elapsedTime * 22) * 0.14
        );
      }

      // Smooth Slice slide interpolation
      const targetOff = sliceOffsetRef.current.target;
      sliceOffsetRef.current.current += (targetOff - sliceOffsetRef.current.current) * 0.12;
      const curOffset = sliceOffsetRef.current.current;

      if (sliceGroupRef.current) {
        const midAngle = sliceAngle / 2;
        sliceGroupRef.current.position.set(
          Math.cos(midAngle) * curOffset,
          0,
          Math.sin(midAngle) * curOffset
        );
      }

      // Confetti physics update
      if (confettiStateRef.current.active) {
        confettiItems.forEach((item) => {
          item.mesh.position.add(item.velocity);
          item.velocity.y -= 0.006; // gravity
          item.mesh.rotation.x += item.rotSpeed.x;
          item.mesh.rotation.y += item.rotSpeed.y;
          item.mesh.rotation.z += item.rotSpeed.z;
        });

        confettiStateRef.current.time += 0.016;
        if (confettiStateRef.current.time > 4.0) {
          confettiStateRef.current.active = false;
          confettiItems.forEach((item) => { item.mesh.visible = false; });
        }
      }

      // Dust float
      const pos = dustGeo.attributes.position.array;
      for (let i = 0; i < dustCount; i++) {
        pos[i * 3 + 1] += dustSpeeds[i];
        if (pos[i * 3 + 1] > 4.2) {
          pos[i * 3 + 1] = -0.8;
        }
      }
      dustGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !isVisible) {
          isVisible = true;
          animId = requestAnimationFrame(animate);
        } else if (!visible && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Trigger confetti helper attached to container
    container.triggerConfetti = () => {
      confettiStateRef.current.active = true;
      confettiStateRef.current.time = 0;
      const originX = rootCakeGroup.position.x;
      const originY = cakeHeight + 0.8;

      confettiItems.forEach((item) => {
        item.mesh.visible = true;
        item.mesh.position.set(originX, originY, 0);

        const theta = Math.random() * Math.PI * 2;
        const speed = 0.06 + Math.random() * 0.12;
        item.velocity.set(
          Math.cos(theta) * speed,
          0.12 + Math.random() * 0.16,
          Math.sin(theta) * speed
        );
        item.rotSpeed.set(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        );
      });
    };

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update flavor materials dynamically
  useEffect(() => {
    const mats = materialsRef.current;
    if (mats.cake) mats.cake.color.setHex(flavor.color);
    if (mats.drip) mats.drip.color.setHex(flavor.dripColor);
    if (mats.topGlaze) mats.topGlaze.color.setHex(flavor.topGlazeColor);
    if (mats.pearl) mats.pearl.color.setHex(flavor.pearlColor);
    if (mats.sponge) mats.sponge.color.setHex(flavor.spongeColor);
    if (mats.cream) mats.cream.color.setHex(flavor.creamColor);
  }, [flavor]);

  // Handle Candle blow / relight
  const handleCandleToggle = () => {
    if (candleLit) {
      setCandleLit(false);
      if (flameMeshRef.current) flameMeshRef.current.visible = false;
      if (candleLightRef.current) candleLightRef.current.visible = false;

      // Trigger Festive Confetti burst
      if (mountRef.current && mountRef.current.triggerConfetti) {
        mountRef.current.triggerConfetti();
      }
      setCelebrationMsg('🎉 Happy Birthday! Make a sweet wish! ✨');
      setTimeout(() => setCelebrationMsg(''), 4000);
    } else {
      setCandleLit(true);
      if (flameMeshRef.current) flameMeshRef.current.visible = true;
      if (candleLightRef.current) candleLightRef.current.visible = true;
    }
  };

  // Handle Cut / Reassemble Slice
  const handleSliceToggle = () => {
    const nextState = !isSliced;
    setIsSliced(nextState);
    sliceOffsetRef.current.target = nextState ? 0.75 : 0;
    if (nextState) {
      setCelebrationMsg('🍰 Freshly cut! Triple-layer moist sponge with silky cream');
      setTimeout(() => setCelebrationMsg(''), 3500);
    }
  };

  return (
    <div className="hero-cinematic-stage">
      {/* Three.js 3D WebGL Canvas */}
      <div ref={mountRef} className="hero-three-viewport" title="Drag to spin the 3D cake" />

      {/* Main Content Layout Overlay */}
      <div className="hero-content-container container">
        {/* LEFT COLUMN: Editorial Typography & Dual Action Buttons */}
        <div className="hero-editorial-col">
          <span className="hero-eyebrow">INTERACTIVE 3D BAKERY • KARACHI</span>
          
          <h1 className="hero-cinematic-title">
            <span className="title-serif-white">Slice Into</span>
            <span className="title-serif-gold">Pure Bliss</span>
          </h1>

          <p className="hero-lead-text">
            Drag to spin in 360°, cut a fresh slice to inspect moist sponge layers, switch gourmet flavors, or design your bespoke cake in our 3D studio.
          </p>

          <div className="hero-dual-cta">
            <button type="button" className="cta-gold-primary" onClick={onOpenStudio}>
              <span className="cta-icon">🎂</span>
              <span>3D Cake Studio</span>
            </button>
            <button type="button" className="cta-glass-secondary" onClick={handleSliceToggle}>
              <span>{isSliced ? '🍰 Reassemble Cake' : '🍰 Cut a Slice'}</span>
              <span className="chevron-icon">›</span>
            </button>
          </div>

          {/* Left HUD Controls: Drag Hint & Actions */}
          <div className="hero-left-hud">
            <div className="hud-pill-drag">
              <span className="hud-tag">Interactive 3D WebGL</span>
              <span className="hud-sep">•</span>
              <span className="hud-drag-text">⇄ Drag in 360°</span>
            </div>

            <div className="hud-buttons-row">
              <button
                type="button"
                className={`hud-capsule-btn ${isSliced ? 'active-slice-btn' : ''}`}
                onClick={handleSliceToggle}
                title={isSliced ? 'Reassemble the cake' : 'Cut a slice to see sponge layers'}
              >
                <span className="hud-btn-icon">🍰</span>
                <span className="hud-btn-text">{isSliced ? 'Reassemble' : 'Cut a Slice'}</span>
              </button>

              <button
                type="button"
                className="hud-capsule-btn"
                onClick={handleCandleToggle}
                title={candleLit ? 'Blow out the candle' : 'Light the candle'}
              >
                <span className="hud-btn-icon">{candleLit ? '💨' : '🔥'}</span>
                <span className="hud-btn-text">{candleLit ? 'Blow Candle' : 'Light Candle'}</span>
              </button>

              <button
                type="button"
                className="hud-capsule-btn"
                onClick={() => setIsRotating((v) => !v)}
                title="Toggle automatic rotation"
              >
                <span className="hud-btn-icon">{isRotating ? '⏸' : '▶'}</span>
                <span className="hud-btn-text">{isRotating ? 'Pause' : 'Spin'}</span>
              </button>

              <button
                type="button"
                className="hud-capsule-btn hud-capsule-gold"
                onClick={onOpenStudio}
              >
                <span className="hud-btn-icon">✨</span>
                <span className="hud-btn-text">3D Studio</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Handwritten Annotation & Flavor Picker Panel */}
        <div className="hero-cake-overlay-col">
          {/* Handwritten Annotation pointing to the Cake */}
          <div className="handwritten-badge" onClick={onOpenStudio} style={{ cursor: 'pointer' }} title="Click to open 3D Studio">
            <div className="handwritten-script">Design<br />Your Dream<br />Cake</div>
            <svg className="handwritten-curve" width="60" height="70" viewBox="0 0 80 90" fill="none">
              <path d="M 68 15 C 40 18, 12 40, 22 75" stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" />
              <path d="M 14 66 L 22 76 L 31 68" stroke="rgba(255,255,255,0.85)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Bottom-Right GOURMET FLAVOR Selector Glass Dock */}
          <div className="hero-flavor-dock">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span className="flavor-dock-label" style={{ margin: 0 }}>GOURMET FLAVOR:</span>
              <span style={{ fontSize: 10.5, color: 'var(--gold2)', fontWeight: 700 }}>{flavor.tagline}</span>
            </div>
            
            <div className="flavor-radio-grid">
              {FLAVORS.map((f) => {
                const isActive = flavor.id === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    className={`flavor-radio-chip ${isActive ? 'active' : ''}`}
                    onClick={() => setFlavor(f)}
                  >
                    <span className="radio-outer-ring">
                      <span className="radio-inner-dot" style={{ background: f.dot }} />
                    </span>
                    <span className="radio-name">{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Celebration Toast Banner */}
      {celebrationMsg && (
        <div className="hero-celebration-toast">
          <span className="toast-sparkle-icon">✨</span>
          <span>{celebrationMsg}</span>
        </div>
      )}
    </div>
  );
}
