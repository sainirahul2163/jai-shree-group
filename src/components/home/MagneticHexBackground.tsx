"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

// Flat-top hexagons in a honeycomb: columns sit 1.5r apart, rows √3r apart, and
// every other column drops half a row so the cells interlock — the same packing
// as a real hex-perforated sheet.
const HEX_RADIUS = 18;
const COL_STEP = 1.5 * HEX_RADIUS;
const ROW_STEP = Math.sqrt(3) * HEX_RADIUS;
const CELL_INSET = 0.92; // gap between cells, so they read as holes not a grid

const BASE_OPACITY = 0.42;
const MAX_OPACITY = 0.95;
const BASE_LINE_WIDTH = 1;
const MAX_LINE_WIDTH = 1.8;
const DETECTION_RADIUS = 150;
const MAX_PUSH = 14;
const SPRING_DECAY = 0.82;
const HEX_RGB = { r: 232, g: 82, b: 26 };
const BRIGHT_RGB = { r: 255, g: 138, b: 76 };

// Depth-of-field falloff: the mesh fades out top and bottom so it reads as a
// sheet receding out of focus rather than flat wallpaper, and stays clear of
// the headline.
const DEPTH_BUCKETS = 10;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function depthAt(y: number, height: number) {
  if (height <= 0) return 0;
  // The grid starts a row above the canvas and ends a row below it, so y can sit
  // outside [0, height] — clamp before the ramp or the falloff goes negative.
  const t = clamp01(y / height);
  if (t < 0.38) return clamp01(0.14 + (t / 0.38) * 0.86);
  if (t > 0.62) return clamp01(0.12 + ((1 - t) / 0.38) * 0.88);
  return 1;
}

type Cell = {
  baseX: number;
  baseY: number;
  currentX: number;
  currentY: number;
  depth: number;
  bucket: number;
  proximity: number;
};

interface MagneticHexBackgroundProps {
  containerRef: RefObject<HTMLElement | null>;
}

export function MagneticHexBackground({
  containerRef,
}: MagneticHexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<Cell[]>([]);
  const staticRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);

  const traceHex = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number
  ) => {
    ctx.moveTo(cx + r, cy);
    for (let i = 1; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    ctx.closePath();
  };

  const buildGrid = useCallback((width: number, height: number) => {
    const cells: Cell[] = [];
    const cols = Math.ceil(width / COL_STEP) + 2;
    const rows = Math.ceil(height / ROW_STEP) + 2;

    for (let col = -1; col < cols; col++) {
      const baseX = col * COL_STEP;
      const yOffset = Math.abs(col % 2) === 1 ? ROW_STEP / 2 : 0;
      for (let row = -1; row < rows; row++) {
        const baseY = row * ROW_STEP + yOffset;
        const depth = depthAt(baseY, height);
        cells.push({
          baseX,
          baseY,
          currentX: baseX,
          currentY: baseY,
          depth,
          // Pre-bucketing by depth lets a whole band stroke in one call instead
          // of setting a fill style per cell across a few thousand of them.
          bucket: Math.max(
            0,
            Math.min(DEPTH_BUCKETS - 1, Math.floor(depth * DEPTH_BUCKETS))
          ),
          proximity: 0,
        });
      }
    }
    cellsRef.current = cells;
  }, []);

  /** The at-rest mesh, drawn once and blitted while the pointer is away. */
  const renderStatic = useCallback((width: number, height: number, dpr: number) => {
    const off = document.createElement("canvas");
    off.width = Math.max(1, Math.floor(width * dpr));
    off.height = Math.max(1, Math.floor(height * dpr));
    const ctx = off.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = BASE_LINE_WIDTH;

    const byBucket: Cell[][] = Array.from({ length: DEPTH_BUCKETS }, () => []);
    cellsRef.current.forEach((c) => byBucket[c.bucket].push(c));

    byBucket.forEach((group, i) => {
      if (!group.length) return;
      const depth = (i + 0.5) / DEPTH_BUCKETS;
      ctx.beginPath();
      group.forEach((c) =>
        traceHex(ctx, c.baseX, c.baseY, HEX_RADIUS * CELL_INSET)
      );
      ctx.strokeStyle = `rgba(${HEX_RGB.r}, ${HEX_RGB.g}, ${HEX_RGB.b}, ${
        BASE_OPACITY * depth
      })`;
      ctx.stroke();
    });

    staticRef.current = off;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = wrapper.getBoundingClientRect();

    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    buildGrid(width, height);
    renderStatic(width, height, dpr);
  }, [buildGrid, renderStatic]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    resizeCanvas();

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const mouse = mouseRef.current;
      const cells = cellsRef.current;
      const off = staticRef.current;

      if (!off) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // The at-rest mesh is a single bitmap, so every frame starts free and only
      // the patch around the cursor is ever re-traced. Redrawing all ~1,800
      // cells each frame measured 10-18ms, which drops frames at 60fps.
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(off, 0, 0, width, height);

      if (reduceMotion) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const pointerIn = mouse.x > -500;
      const reach = DETECTION_RADIUS + MAX_PUSH + HEX_RADIUS;
      let x0 = Infinity;
      let y0 = Infinity;
      let x1 = -Infinity;
      let y1 = -Infinity;
      const include = (x: number, y: number, pad: number) => {
        if (x - pad < x0) x0 = x - pad;
        if (y - pad < y0) y0 = y - pad;
        if (x + pad > x1) x1 = x + pad;
        if (y + pad > y1) y1 = y + pad;
      };

      if (pointerIn) include(mouse.x, mouse.y, reach);

      for (const cell of cells) {
        let dispX = cell.currentX - cell.baseX;
        let dispY = cell.currentY - cell.baseY;
        const wasDisplaced = Math.abs(dispX) > 0.05 || Math.abs(dispY) > 0.05;

        // Cells at rest and far from the pointer cannot change this frame.
        if (!wasDisplaced && !pointerIn) {
          cell.proximity = 0;
          continue;
        }

        let proximity = 0;
        const dx = cell.baseX - mouse.x;
        const dy = cell.baseY - mouse.y;

        if (
          pointerIn &&
          Math.abs(dx) <= DETECTION_RADIUS &&
          Math.abs(dy) <= DETECTION_RADIUS
        ) {
          const distance = Math.hypot(dx, dy);
          if (distance < DETECTION_RADIUS && distance > 0) {
            const factor = 1 - distance / DETECTION_RADIUS;
            const push = factor * MAX_PUSH;
            dispX += ((dx / distance) * push - dispX) * 0.35;
            dispY += ((dy / distance) * push - dispY) * 0.35;
            proximity = factor;
          } else {
            dispX *= SPRING_DECAY;
            dispY *= SPRING_DECAY;
          }
        } else {
          dispX *= SPRING_DECAY;
          dispY *= SPRING_DECAY;
        }

        cell.currentX = cell.baseX + dispX;
        cell.currentY = cell.baseY + dispY;
        cell.proximity = proximity;

        // Springing-back cells stay dirty until they have actually settled.
        if (Math.abs(dispX) > 0.05 || Math.abs(dispY) > 0.05) {
          include(cell.baseX, cell.baseY, HEX_RADIUS + MAX_PUSH);
        }
      }

      if (x0 === Infinity) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      x0 = Math.max(0, x0);
      y0 = Math.max(0, y0);
      x1 = Math.min(width, x1);
      y1 = Math.min(height, y1);
      if (x1 <= x0 || y1 <= y0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(x0, y0, x1 - x0, y1 - y0);
      ctx.clip();
      ctx.clearRect(x0, y0, x1 - x0, y1 - y0);

      // A hexagon whose centre sits just outside the patch still overlaps it.
      const edge = HEX_RADIUS + MAX_PUSH;
      const byBucket: Cell[][] = Array.from({ length: DEPTH_BUCKETS }, () => []);
      const active: Cell[] = [];

      for (const cell of cells) {
        if (
          cell.baseX < x0 - edge ||
          cell.baseX > x1 + edge ||
          cell.baseY < y0 - edge ||
          cell.baseY > y1 + edge
        ) {
          continue;
        }
        if (cell.proximity > 0.01) active.push(cell);
        else byBucket[cell.bucket].push(cell);
      }

      ctx.lineWidth = BASE_LINE_WIDTH;
      byBucket.forEach((group, i) => {
        if (!group.length) return;
        const depth = (i + 0.5) / DEPTH_BUCKETS;
        ctx.beginPath();
        group.forEach((c) =>
          traceHex(ctx, c.currentX, c.currentY, HEX_RADIUS * CELL_INSET)
        );
        ctx.strokeStyle = `rgba(${HEX_RGB.r}, ${HEX_RGB.g}, ${HEX_RGB.b}, ${
          BASE_OPACITY * depth
        })`;
        ctx.stroke();
      });

      // Cells under the cursor are few, so they can afford their own colour.
      for (const cell of active) {
        const p = cell.proximity;
        const opacity =
          (BASE_OPACITY + p * (MAX_OPACITY - BASE_OPACITY)) *
          Math.max(cell.depth, 0.35);
        const r = Math.round(HEX_RGB.r + p * (BRIGHT_RGB.r - HEX_RGB.r));
        const g = Math.round(HEX_RGB.g + p * (BRIGHT_RGB.g - HEX_RGB.g));
        const b = Math.round(HEX_RGB.b + p * (BRIGHT_RGB.b - HEX_RGB.b));

        ctx.beginPath();
        traceHex(ctx, cell.currentX, cell.currentY, HEX_RADIUS * CELL_INSET);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.lineWidth = BASE_LINE_WIDTH + p * (MAX_LINE_WIDTH - BASE_LINE_WIDTH);
        ctx.stroke();
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
