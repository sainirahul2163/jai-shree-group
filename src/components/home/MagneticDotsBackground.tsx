"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

const SPACING = 52;
// 60° staggered pitch: alternate rows shift half a pitch and rows sit
// √3/2 apart, so every dot is exactly SPACING from all six neighbours.
const ROW_SPACING = (SPACING * Math.sqrt(3)) / 2;
const BASE_RADIUS = 16;
const MAX_RADIUS = 19;
const BASE_OPACITY = 0.45;
const MAX_OPACITY = 0.85;
const BASE_LINE_WIDTH = 1.5;
const MAX_LINE_WIDTH = 2.5;
const DETECTION_RADIUS = 160;
const MAX_PUSH = 25;
const SPRING_DECAY = 0.82;
const DOT_RGB = { r: 232, g: 82, b: 26 };
const BRIGHT_RGB = { r: 255, g: 107, b: 53 };
const CANVAS_ALPHA = 0.6;

type Dot = {
  baseX: number;
  baseY: number;
  currentX: number;
  currentY: number;
};

interface MagneticDotsBackgroundProps {
  containerRef: RefObject<HTMLElement | null>;
}

export function MagneticDotsBackground({
  containerRef,
}: MagneticDotsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);

  const buildGrid = useCallback((width: number, height: number) => {
    const cols = Math.ceil(width / SPACING) + 1;
    const rows = Math.ceil(height / ROW_SPACING) + 1;
    const dots: Dot[] = [];

    for (let row = 0; row < rows; row++) {
      const rowOffset = row % 2 === 0 ? 0 : SPACING / 2;

      for (let col = 0; col < cols; col++) {
        const baseX = col * SPACING + rowOffset;
        const baseY = row * ROW_SPACING;
        dots.push({
          baseX,
          baseY,
          currentX: baseX,
          currentY: baseY,
        });
      }
    }

    dotsRef.current = dots;
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
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    buildGrid(width, height);
  }, [buildGrid]);

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

    resizeCanvas();

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const mouse = mouseRef.current;
      const dots = dotsRef.current;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = CANVAS_ALPHA;

      const minX = mouse.x - DETECTION_RADIUS;
      const maxX = mouse.x + DETECTION_RADIUS;
      const minY = mouse.y - DETECTION_RADIUS;
      const maxY = mouse.y + DETECTION_RADIUS;

      for (const dot of dots) {
        let dispX = dot.currentX - dot.baseX;
        let dispY = dot.currentY - dot.baseY;
        let proximity = 0;

        const inMouseBounds =
          dot.baseX >= minX &&
          dot.baseX <= maxX &&
          dot.baseY >= minY &&
          dot.baseY <= maxY;

        if (inMouseBounds) {
          const dx = dot.baseX - mouse.x;
          const dy = dot.baseY - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < DETECTION_RADIUS && distance > 0) {
            const factor = 1 - distance / DETECTION_RADIUS;
            const push = factor * MAX_PUSH;
            const targetDispX = (dx / distance) * push;
            const targetDispY = (dy / distance) * push;

            dispX += (targetDispX - dispX) * 0.35;
            dispY += (targetDispY - dispY) * 0.35;
            proximity = factor;
          } else {
            dispX *= SPRING_DECAY;
            dispY *= SPRING_DECAY;
          }
        } else {
          dispX *= SPRING_DECAY;
          dispY *= SPRING_DECAY;
        }

        if (proximity === 0 && (Math.abs(dispX) > 0.05 || Math.abs(dispY) > 0.05)) {
          const dispMag = Math.sqrt(dispX * dispX + dispY * dispY);
          proximity = Math.min(dispMag / MAX_PUSH, 1) * 0.5;
        }

        dot.currentX = dot.baseX + dispX;
        dot.currentY = dot.baseY + dispY;

        const radius =
          BASE_RADIUS + proximity * (MAX_RADIUS - BASE_RADIUS);
        const opacity =
          BASE_OPACITY + proximity * (MAX_OPACITY - BASE_OPACITY);
        const lineWidth =
          BASE_LINE_WIDTH + proximity * (MAX_LINE_WIDTH - BASE_LINE_WIDTH);
        const r = Math.round(DOT_RGB.r + proximity * (BRIGHT_RGB.r - DOT_RGB.r));
        const g = Math.round(DOT_RGB.g + proximity * (BRIGHT_RGB.g - DOT_RGB.g));
        const b = Math.round(DOT_RGB.b + proximity * (BRIGHT_RGB.b - DOT_RGB.b));

        ctx.beginPath();
        ctx.arc(dot.currentX, dot.currentY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

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
