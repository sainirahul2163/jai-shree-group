"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE_NS from "three";

/**
 * Interactive 3D product viewer.
 *
 * Geometry is real: holes are cut out of the shape and extruded, so you can see
 * through the part and read its thickness at the edge — unlike a texture fake.
 * Lit with a PMREM-filtered room environment so the steel reflects like steel.
 *
 * Interaction: the part follows the cursor while hovering, can be grabbed and
 * spun with inertia, and drifts slowly when idle.
 */
export type ProductModel = "round-blank" | "fine-screen" | "sheet" | "coil";

interface Spec {
  readonly label: string;
  readonly title: string;
  readonly specs: readonly string[];
}

/**
 * Per-variant framing and motion. Flat parts sway rather than spin — a disc
 * rotating through 360° spends half the time edge-on and reads as a sliver.
 */
const MOTION: Record<
  ProductModel,
  { yaw: number; pitch: number; yawAmp: number; pitchAmp: number; idle: "sway" | "spin"; dist: number }
> = {
  "round-blank": { yaw: -0.3, pitch: -0.24, yawAmp: 0.5, pitchAmp: 0.34, idle: "sway", dist: 11 },
  "fine-screen": { yaw: -0.28, pitch: -0.22, yawAmp: 0.5, pitchAmp: 0.34, idle: "sway", dist: 11 },
  sheet: { yaw: -0.42, pitch: -0.3, yawAmp: 0.55, pitchAmp: 0.34, idle: "sway", dist: 12.5 },
  coil: { yaw: -0.5, pitch: 0.24, yawAmp: 0.9, pitchAmp: 0.4, idle: "spin", dist: 11.5 },
};

const MODEL_SPECS: Record<ProductModel, Spec> = {
  "round-blank": {
    label: "3D Preview — Perforated Round Blank",
    title: "Perforated Round Blank",
    specs: ["Material: Stainless Steel", "Pattern: Round, 60° Staggered", "Process: Turret Punching"],
  },
  "fine-screen": {
    label: "3D Preview — Fine Perforated Screen",
    title: "Fine Perforated Screen",
    specs: ["Material: Stainless Steel", "Pattern: Micro Perforation", "Process: CNC Perforation"],
  },
  sheet: {
    label: "3D Preview — Perforated Sheet",
    title: "Perforated Sheet",
    specs: ["Material: Carbon / Stainless Steel", "Pattern: Round, 60° Staggered", "Process: CNC Perforation"],
  },
  coil: {
    label: "3D Preview — Perforated Coil Stock",
    title: "Perforated Coil Stock",
    specs: ["Material: Coil Stock", "Form: Coil-to-Coil", "Process: Perforation & Leveling"],
  },
};

/** Ring of points for a circle — resolution is ours, not the curve's. */
function circlePoints(
  THREE: typeof THREE_NS,
  r: number,
  segments: number,
  cx = 0,
  cy = 0,
  clockwise = false,
): THREE_NS.Vector2[] {
  const pts: THREE_NS.Vector2[] = [];
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const t = clockwise ? -a : a;
    pts.push(new THREE.Vector2(cx + Math.cos(t) * r, cy + Math.sin(t) * r));
  }
  return pts;
}

/** 60°-staggered hole centres, filtered by a containment test. */
function staggeredCentres(
  pitch: number,
  extent: number,
  keep: (x: number, y: number) => boolean,
): Array<[number, number]> {
  const rowGap = pitch * Math.sqrt(3) * 0.5;
  const out: Array<[number, number]> = [];
  const rows = Math.ceil(extent / rowGap) + 1;
  const cols = Math.ceil(extent / pitch) + 1;
  for (let row = -rows; row <= rows; row++) {
    const offset = row % 2 === 0 ? 0 : pitch * 0.5;
    for (let col = -cols; col <= cols; col++) {
      const x = col * pitch + offset;
      const y = row * rowGap;
      if (keep(x, y)) out.push([x, y]);
    }
  }
  return out;
}

function perforatedGeometry(
  THREE: typeof THREE_NS,
  opts: {
    outline: THREE_NS.Vector2[];
    holes: Array<[number, number]>;
    holeR: number;
    holeSegments: number;
    depth: number;
  },
): THREE_NS.ExtrudeGeometry {
  const shape = new THREE.Shape(opts.outline);
  for (const [cx, cy] of opts.holes) {
    shape.holes.push(
      new THREE.Path(circlePoints(THREE, opts.holeR, opts.holeSegments, cx, cy, true)),
    );
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: opts.depth,
    bevelEnabled: false,
    steps: 1,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/** Concentric wound layers for the coil end faces. */
function coilEndTexture(THREE: typeof THREE_NS): THREE_NS.CanvasTexture {
  const S = 512;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#8d9096";
  ctx.fillRect(0, 0, S, S);
  const mid = S / 2;
  for (let r = S * 0.5; r > S * 0.16; r -= 1.15) {
    const shade = 120 + Math.sin(r * 0.9) * 42 + (Math.random() - 0.5) * 16;
    ctx.strokeStyle = `rgb(${shade},${shade + 3},${shade + 8})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(mid, mid, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Dot grid used as a bump map so the coil surface reads as perforated. */
function perforationBumpTexture(THREE: typeof THREE_NS): THREE_NS.CanvasTexture {
  const S = 512;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, S, S);
  const pitch = 26;
  const r = 8;
  ctx.fillStyle = "#0b0b0b";
  for (let row = 0; row * pitch * 0.866 < S + pitch; row++) {
    const y = row * pitch * 0.866;
    const off = row % 2 === 0 ? 0 : pitch / 2;
    for (let col = -1; col * pitch < S + pitch; col++) {
      ctx.beginPath();
      ctx.arc(col * pitch + off, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function buildModel(
  THREE: typeof THREE_NS,
  variant: ProductModel,
): { object: THREE_NS.Object3D; dispose: () => void } {
  const disposables: Array<{ dispose: () => void }> = [];
  const steel = (over: Partial<THREE_NS.MeshStandardMaterialParameters> = {}) => {
    const m = new THREE.MeshStandardMaterial({
      color: 0x8f959c,
      metalness: 1.0,
      roughness: 0.33,
      envMapIntensity: 0.85,
      side: THREE.DoubleSide,
      ...over,
    });
    disposables.push(m);
    return m;
  };

  if (variant === "coil") {
    const group = new THREE.Group();
    const R = 2.45;
    const bore = 0.92;
    const width = 2.5;

    const bump = perforationBumpTexture(THREE);
    bump.repeat.set(18, 3); // matches the cylinder UV aspect so holes stay round
    disposables.push(bump);

    const outer = new THREE.CylinderGeometry(R, R, width, 128, 1, true);
    disposables.push(outer);
    const outerMesh = new THREE.Mesh(
      outer,
      steel({ roughness: 0.34, bumpMap: bump, bumpScale: 0.05, side: THREE.FrontSide }),
    );
    group.add(outerMesh);

    const inner = new THREE.CylinderGeometry(bore, bore, width, 64, 1, true);
    disposables.push(inner);
    group.add(new THREE.Mesh(inner, steel({ roughness: 0.5, side: THREE.BackSide })));

    const endTex = coilEndTexture(THREE);
    disposables.push(endTex);
    const ring = new THREE.RingGeometry(bore, R, 128, 1);
    disposables.push(ring);
    const endMat = steel({ map: endTex, roughness: 0.42, metalness: 0.92 });
    for (const sign of [1, -1]) {
      const cap = new THREE.Mesh(ring, endMat);
      cap.rotation.x = Math.PI / 2;
      cap.position.y = (width / 2) * sign;
      cap.rotation.y = sign > 0 ? 0 : Math.PI;
      group.add(cap);
    }

    // the strapped loose end, peeling away tangentially
    const tail = new THREE.CylinderGeometry(R * 1.035, R * 1.035, width, 64, 1, true, 0, 1.15);
    disposables.push(tail);
    group.add(new THREE.Mesh(tail, steel({ roughness: 0.3, bumpMap: bump, bumpScale: 0.05 })));

    // binding straps
    const strapGeo = new THREE.TorusGeometry(R * 1.05, 0.035, 8, 96);
    disposables.push(strapGeo);
    const strapMat = steel({ color: 0x6d7176, roughness: 0.55, metalness: 0.9 });
    for (const z of [-0.55, 0.55]) {
      const strap = new THREE.Mesh(strapGeo, strapMat);
      strap.rotation.x = Math.PI / 2; // torus axis -> coil axis, so it belts the drum
      strap.position.y = z * width * 0.5;
      group.add(strap);
    }

    group.rotation.z = Math.PI / 2;
    return { object: group, dispose: () => disposables.forEach((d) => d.dispose()) };
  }

  let geo: THREE_NS.ExtrudeGeometry;
  if (variant === "sheet") {
    const halfW = 3.3;
    const halfH = 2.1;
    const holeR = 0.135;
    const pitch = 0.35;
    const margin = holeR + 0.16;
    geo = perforatedGeometry(THREE, {
      outline: [
        new THREE.Vector2(-halfW, -halfH),
        new THREE.Vector2(halfW, -halfH),
        new THREE.Vector2(halfW, halfH),
        new THREE.Vector2(-halfW, halfH),
      ],
      holes: staggeredCentres(pitch, Math.max(halfW, halfH) * 1.2, (x, y) =>
        Math.abs(x) < halfW - margin && Math.abs(y) < halfH - margin),
      holeR,
      holeSegments: 12,
      depth: 0.1,
    });
  } else {
    const R = 2.62;
    const fine = variant === "fine-screen";
    const holeR = fine ? 0.058 : 0.118;
    const pitch = fine ? 0.163 : 0.305;
    const rim = fine ? 0.2 : 0.26;
    geo = perforatedGeometry(THREE, {
      outline: circlePoints(THREE, R, 128),
      holes: staggeredCentres(pitch, R * 1.15, (x, y) => Math.hypot(x, y) < R - rim - holeR),
      holeR,
      holeSegments: fine ? 8 : 12,
      depth: fine ? 0.07 : 0.095,
    });
  }
  disposables.push(geo);

  const mesh = new THREE.Mesh(geo, steel());
  return { object: mesh, dispose: () => disposables.forEach((d) => d.dispose()) };
}

export function ProductViewer3D({
  variant,
  height = 440,
}: {
  variant: ProductModel;
  height?: number;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const spec = MODEL_SPECS[variant];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/addons/environments/RoomEnvironment.js"
      );
      if (cancelled || !mountRef.current) return;

      const W = mount.clientWidth || 640;
      const H = height;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.92;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 100);
      camera.position.set(0, 0, 11.5);

      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envRT.texture;

      const { object: model, dispose: disposeModel } = buildModel(THREE, variant);
      scene.add(model);
      setLoaded(true);

      const key = new THREE.DirectionalLight(0xffffff, 3.2);
      key.position.set(5, 7, 6);
      scene.add(key);

      // brand-orange rim from behind, so the part edge catches the house colour
      const brand = new THREE.PointLight(0xe8521a, 90, 30);
      brand.position.set(-6, -1.5, -4);
      scene.add(brand);

      const cool = new THREE.DirectionalLight(0x9fb6ff, 1.1);
      cool.position.set(-5, 2, -4);
      scene.add(cool);

      scene.add(new THREE.AmbientLight(0xffffff, 0.12));

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ── interaction: hover-follow, grab-and-spin with inertia, wheel zoom
      const M = MOTION[variant];
      let yaw = M.yaw;
      let pitch = M.pitch;
      let targetYaw = yaw;
      let targetPitch = pitch;
      let velYaw = 0;
      let velPitch = 0;
      let dragging = false;
      let hovering = false;
      let lastX = 0;
      let lastY = 0;
      let dist = M.dist;
      let targetDist = dist;
      let baseYaw = yaw;
      const basePitch = pitch;

      const el = renderer.domElement;
      el.style.touchAction = "pan-y";

      const onPointerDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        el.setPointerCapture(e.pointerId);
        el.style.cursor = "grabbing";
      };
      const onPointerUp = (e: PointerEvent) => {
        dragging = false;
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        el.style.cursor = "grab";
      };
      const onPointerMove = (e: PointerEvent) => {
        if (dragging) {
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
          velYaw = dx * 0.006;
          velPitch = dy * 0.005;
          targetYaw += velYaw;
          targetPitch = Math.max(-1.3, Math.min(1.3, targetPitch + velPitch));
        } else {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          targetYaw = baseYaw + nx * M.yawAmp * 2;
          targetPitch = Math.max(-1.2, Math.min(1.2, basePitch + ny * M.pitchAmp * 2));
        }
      };
      const onEnter = () => {
        hovering = true;
        el.style.cursor = "grab";
      };
      const onLeave = () => {
        hovering = false;
        dragging = false;
        targetYaw = baseYaw;
        targetPitch = basePitch;
      };
      const onWheel = (e: WheelEvent) => {
        if (!hovering) return;
        e.preventDefault();
        targetDist = Math.max(7.5, Math.min(17, targetDist + e.deltaY * 0.01));
      };

      el.addEventListener("pointerdown", onPointerDown);
      el.addEventListener("pointerup", onPointerUp);
      el.addEventListener("pointercancel", onPointerUp);
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("wheel", onWheel, { passive: false });

      let raf = 0;
      let t = 0;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        t += 0.01;

        if (!dragging && !hovering && !reduceMotion) {
          // flat parts sway so they never sit edge-on; the coil spins freely
          if (M.idle === "spin") baseYaw += 0.0024;
          else baseYaw = M.yaw + Math.sin(t * 0.42) * 0.34;
          targetYaw = baseYaw;
          targetPitch = basePitch + Math.sin(t * 0.31) * 0.09;
        }
        if (!dragging) {
          velYaw *= 0.94;
          velPitch *= 0.94;
          if (Math.abs(velYaw) > 0.0004) targetYaw += velYaw; // release inertia
        }

        yaw += (targetYaw - yaw) * 0.085;
        pitch += (targetPitch - pitch) * 0.085;
        model.rotation.y = yaw;
        model.rotation.x = variant === "coil" ? pitch : pitch - 0.12;

        dist += (targetDist - dist) * 0.09;
        camera.position.set(0, 0, dist);
        camera.lookAt(0, 0, 0);

        brand.intensity = 45 + Math.sin(t * 1.4) * 12;
        brand.position.x = -5.5 + Math.sin(t * 0.5) * 1.6;

        renderer.render(scene, camera);
      };
      animate();

      const ro = new ResizeObserver(() => {
        const w = mount.clientWidth || W;
        camera.aspect = w / H;
        camera.updateProjectionMatrix();
        renderer.setSize(w, H);
      });
      ro.observe(mount);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("pointercancel", onPointerUp);
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("wheel", onWheel);
        if (mount.contains(el)) mount.removeChild(el);
        disposeModel();
        envRT.dispose();
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [variant, height]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-[#1E1E1E]"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #16181c 0%, #0A0A0A 62%)" }}
    >
      <div className="flex items-center justify-between border-b border-[#1A1A1A] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8521A]" />
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#E8521A]">
            {spec.label}
          </span>
        </div>
        <span className="hidden text-xs text-[#444] sm:block">
          Drag to rotate · scroll to zoom
        </span>
      </div>

      <div ref={mountRef} className="w-full" style={{ height }} />

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E8521A] border-t-transparent" />
            <span className="text-xs text-[#444]">Building 3D model…</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-[#1A1A1A] px-4 py-2.5">
        {spec.specs.map((s) => (
          <span key={s} className="text-[10px] text-[#555]">
            {s}
          </span>
        ))}
        <span className="ml-auto text-[10px] font-medium text-[#E8521A]">
          Jai Shree Group
        </span>
      </div>
    </div>
  );
}
