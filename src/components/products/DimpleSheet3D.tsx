"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

export function DimpleSheet3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 600;
    const H = 420;

    let animId = 0;
    let disposeScene: (() => void) | undefined;
    let cancelled = false;

    import("three").then((THREE) => {
      if (cancelled || !mountRef.current) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a0a);

      const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
      camera.position.set(0, 4.5, 7);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      mount.appendChild(renderer.domElement);
      setLoaded(true);

      const RES = 220;
      const SIZE = 7;
      const geo = new THREE.PlaneGeometry(SIZE, SIZE, RES, RES);
      geo.rotateX(-Math.PI / 2);

      const DOME_R = 0.26;
      const DOME_H = 0.14;
      const SX = 0.72;
      const SZ = 0.624;

      const centers: [number, number][] = [];
      for (let row = -12; row <= 12; row++) {
        for (let col = -12; col <= 12; col++) {
          centers.push([
            col * SX + (row % 2 !== 0 ? SX * 0.5 : 0),
            row * SZ,
          ]);
        }
      }

      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        let best = 0;
        for (const [cx, cz] of centers) {
          const dx = x - cx;
          const dz = z - cz;
          const d = Math.sqrt(dx * dx + dz * dz);
          if (d < DOME_R) {
            const h = DOME_H * Math.sqrt(Math.max(0, 1 - (d / DOME_R) ** 2));
            if (h > best) best = h;
          }
        }
        pos.setY(i, best);
      }
      geo.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: 0xc5c5c5,
        metalness: 0.96,
        roughness: 0.12,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      scene.add(mesh);

      scene.add(new THREE.AmbientLight(0x303040, 0.8));

      const key = new THREE.DirectionalLight(0xffffff, 2.5);
      key.position.set(4, 8, 4);
      key.castShadow = true;
      key.shadow.mapSize.width = 2048;
      key.shadow.mapSize.height = 2048;
      scene.add(key);

      const orange = new THREE.PointLight(0xe8521a, 6, 18);
      orange.position.set(-4, 3, 2);
      scene.add(orange);

      const fill = new THREE.DirectionalLight(0xaabbff, 0.8);
      fill.position.set(-3, 2, -3);
      scene.add(fill);

      const rim = new THREE.DirectionalLight(0xffeecc, 1.2);
      rim.position.set(0, -2, -5);
      scene.add(rim);

      let mx = 0;
      let my = 0;
      const onMouseMove = (e: MouseEvent) => {
        const r = mount.getBoundingClientRect();
        mx = (e.clientX - r.left) / r.width - 0.5;
        my = (e.clientY - r.top) / r.height - 0.5;
      };
      mount.addEventListener("mousemove", onMouseMove);

      const onTouchMove = (e: TouchEvent) => {
        const r = mount.getBoundingClientRect();
        const touch = e.touches[0];
        if (!touch) return;
        mx = (touch.clientX - r.left) / r.width - 0.5;
        my = (touch.clientY - r.top) / r.height - 0.5;
      };
      mount.addEventListener("touchmove", onTouchMove, { passive: true });

      let t = 0;
      let rotX = -0.35;
      let rotY = 0;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.008;

        const trgY = mx * 0.5 + Math.sin(t * 0.3) * 0.08;
        const trgX = -0.35 + my * 0.25;
        rotX += (trgX - rotX) * 0.06;
        rotY += (trgY - rotY) * 0.06;
        mesh.rotation.x = rotX;
        mesh.rotation.y = rotY;

        orange.position.x = Math.sin(t * 0.5) * 5;
        orange.position.z = Math.cos(t * 0.4) * 4;
        orange.position.y = 3 + Math.sin(t * 0.3) * 1;
        orange.intensity = 5 + Math.sin(t) * 1.5;
        key.position.x = 4 + Math.sin(t * 0.2) * 1;

        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        const newW = mount.clientWidth;
        camera.aspect = newW / H;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, H);
      };
      window.addEventListener("resize", onResize);

      disposeScene = () => {
        cancelAnimationFrame(animId);
        mount.removeEventListener("mousemove", onMouseMove);
        mount.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("resize", onResize);
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      disposeScene?.();
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-[#1E1E1E]"
      style={{ background: "#0A0A0A" }}
    >
      <div className="flex items-center justify-between border-b border-[#1A1A1A] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8521A]" />
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#E8521A]">
            3D Preview — Dimple Sheet
          </span>
        </div>
        <span className="text-xs text-[#444]">Move mouse to rotate</span>
      </div>

      <div
        ref={mountRef}
        className="w-full cursor-crosshair"
        style={{ height: "420px" }}
      />

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E8521A] border-t-transparent" />
            <span className="text-xs text-[#444]">Loading 3D render...</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-6 border-t border-[#1A1A1A] px-4 py-2.5">
        <span className="text-[10px] text-[#555]">Material: Stainless Steel</span>
        <span className="text-[10px] text-[#555]">Pattern: Dome / Dimple</span>
        <span className="text-[10px] text-[#555]">Process: Embossing</span>
        <span className="ml-auto text-[10px] font-medium text-[#E8521A]">
          Jai Shree Group
        </span>
      </div>
    </div>
  );
}
