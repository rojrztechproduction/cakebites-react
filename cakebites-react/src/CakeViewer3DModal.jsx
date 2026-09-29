import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function CakeViewer3DModal({ product, open, onClose, onAddToCart }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!open || !product) return;
    const container = mountRef.current;
    if (!container) return;

    // Detect theme based on cake name
    const name = product.name.toLowerCase();
    let cakeColor = 0x2b150c; // default dark chocolate
    let creamColor = 0xfffcf2;
    let toppingColor = 0xce182b;
    let hasDrip = true;
    let dripColor = 0x1f0d06;

    if (name.includes('velvet')) {
      cakeColor = 0x851726;
      creamColor = 0xfffaed;
      dripColor = 0xfffaed;
    } else if (name.includes('lotus') || name.includes('caramel') || name.includes('malt')) {
      cakeColor = 0xc4802c;
      creamColor = 0xfff7e6;
      dripColor = 0x945718;
    } else if (name.includes('mango') || name.includes('pineapple')) {
      cakeColor = 0xf5a528;
      creamColor = 0xfffaed;
      dripColor = 0xff7b1c;
    } else if (name.includes('coffee') || name.includes('nutella')) {
      cakeColor = 0x3f2214;
      creamColor = 0xe8cfb0;
      dripColor = 0x221109;
    }

    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 3.5;
    controls.maxDistance = 10;
    controls.target.set(0, 0.4, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xfff6ea, 1.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const goldRim = new THREE.DirectionalLight(0xd4a348, 2.5);
    goldRim.position.set(-6, 5, -5);
    scene.add(goldRim);

    // Cake Group
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // Stand
    const standMat = new THREE.MeshStandardMaterial({ color: 0xd4a348, metalness: 0.85, roughness: 0.22 });
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.45, 0.16, 40), standMat);
    stand.position.y = -0.55;
    cakeGroup.add(stand);

    // White Board
    const board = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.05, 40), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    board.position.y = -0.45;
    cakeGroup.add(board);

    // Cake Base
    const cakeMat = new THREE.MeshStandardMaterial({ color: cakeColor, roughness: 0.45, metalness: 0.05 });
    const cake = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 1.6, 40), cakeMat);
    cake.position.y = 0.4;
    cakeGroup.add(cake);

    // Top Cream
    const creamMat = new THREE.MeshStandardMaterial({ color: creamColor, roughness: 0.3, metalness: 0.05 });
    const topCream = new THREE.Mesh(new THREE.CylinderGeometry(1.92, 1.92, 0.1, 40), creamMat);
    topCream.position.y = 1.22;
    cakeGroup.add(topCream);

    // Piped Rosettes along top edge
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const ros = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), creamMat);
      ros.position.set(Math.cos(angle) * 1.8, 1.28, Math.sin(angle) * 1.8);
      cakeGroup.add(ros);
    }

    // Drips
    if (hasDrip) {
      const dripMat = new THREE.MeshStandardMaterial({ color: dripColor, roughness: 0.2, metalness: 0.15 });
      for (let d = 0; d < 20; d++) {
        const angle = (d / 20) * Math.PI * 2;
        const len = 0.2 + Math.sin(d * 3) * 0.15;
        const drop = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.02, len, 6), dripMat);
        drop.position.set(Math.cos(angle) * 1.92, 1.22 - len / 2, Math.sin(angle) * 1.92);
        cakeGroup.add(drop);
      }
    }

    // Top Strawberries / Chocolates
    const berryMat = new THREE.MeshStandardMaterial({ color: toppingColor, roughness: 0.2 });
    const berryPositions = [[-0.6, 1.45, -0.4], [0.6, 1.45, -0.3], [-0.4, 1.45, 0.5], [0.5, 1.45, 0.4]];
    berryPositions.forEach(([x, y, z]) => {
      const b = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.35, 12), berryMat);
      b.rotateX(Math.PI);
      b.position.set(x, y, z);
      cakeGroup.add(b);
    });

    // Gold Sparkles
    const sprMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.1 });
    for (let s = 0; s < 25; s++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 1.4;
      const spr = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.08, 6), sprMat);
      spr.position.set(Math.cos(a) * r, 1.28, Math.sin(a) * r);
      spr.rotation.set(Math.PI / 2, Math.random() * Math.PI, 0);
      cakeGroup.add(spr);
    }

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      controls.update();
      cakeGroup.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [open, product]);

  if (!open || !product) return null;

  return (
    <div className="modal-wrap">
      <div className="modal-card viewer-3d-modal">
        <button className="modal-close" onClick={onClose} title="Close">✕</button>
        <div className="viewer-head">
          <span className="studio-tag">✨ 360° 3D Interactive View</span>
          <h2>{product.name}</h2>
          <span className="price-tag">Rs {product.price.toLocaleString()}</span>
        </div>

        <div className="viewer-canvas-wrap">
          <div ref={mountRef} className="viewer-three-canvas" />
          <div className="viewer-hint">⇄ Drag to spin 360° • Scroll to zoom</div>
        </div>

        <div className="viewer-footer">
          <button
            type="button"
            className="add-btn viewer-add-btn"
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            <span className="add-btn-inner">
              <svg className="cart-bag-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.5 8.5h13a1.5 1.5 0 0 1 1.5 1.5v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a1.5 1.5 0 0 1 1.5-1.5z" />
                <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
              </svg>
              Add to Cart (Rs {product.price.toLocaleString()})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
