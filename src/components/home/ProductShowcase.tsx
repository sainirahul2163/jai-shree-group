"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const INTERVAL = 3500;

const SHOWCASE_PRODUCTS = [
  {
    name: "Perforated Sheets",
    slug: "perforated-sheets",
    tagline: "CNC Precision Perforation",
    specs: [
      { label: "Max Thickness", value: "12mm" },
      { label: "Materials", value: "SS / MS / GI / AL" },
    ],
    pattern: "dots",
    accentColor: "#E8521A",
  },
  {
    name: "Laser Cutting",
    slug: "laser-cutting",
    tagline: "Fiber Laser Technology",
    specs: [
      { label: "Max Thickness", value: "14mm" },
      { label: "Technology", value: "Fiber Laser" },
      { label: "Materials", value: "SS / MS / AL / Brass" },
    ],
    pattern: "laser",
    accentColor: "#E8521A",
  },
  {
    name: "Expanded Metal",
    slug: "expanded-metal",
    tagline: "Diamond & Hexagonal Patterns",
    specs: [
      { label: "Max Thickness", value: "6mm" },
      { label: "Patterns", value: "Diamond / Square / Hex" },
    ],
    pattern: "diamond",
    accentColor: "#E8521A",
  },
  {
    name: "Turret Punching",
    slug: "turret-punching",
    tagline: "CNC Any Hole Shape",
    specs: [
      { label: "Hole Types", value: "Round / Square / Hex" },
      { label: "Process", value: "CNC Turret" },
      { label: "Materials", value: "SS / MS / GI / AL" },
    ],
    pattern: "mixed",
    accentColor: "#E8521A",
  },
  {
    name: "Precision Sheet Leveling",
    slug: "precision-sheet-leveling",
    tagline: "Zero Bow. Zero Warpage.",
    specs: [
      { label: "Max Thickness", value: "5mm" },
      { label: "Tolerance", value: "As per spec" },
    ],
    pattern: "lines",
    accentColor: "#E8521A",
  },
  {
    name: "Custom Components",
    slug: "custom-components",
    tagline: "Any Drawing. Any Metal.",
    specs: [
      { label: "Process", value: "CNC + Laser + Dies" },
      { label: "Materials", value: "All Metals" },
      { label: "Specials", value: "Huller / Herringbone" },
    ],
    pattern: "custom",
    accentColor: "#E8521A",
  },
] as const;

function DotsPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(232,82,26,0.6) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 20px",
          backgroundPosition: "0 0, 12px 10px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(232,82,26,0.08), transparent)",
        }}
      />
    </div>
  );
}

function LaserPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="laser-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="32"
              x2="32"
              y2="0"
              stroke="rgba(232,82,26,0.2)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#laser-grid)" />
      </svg>
      <motion.div
        className="absolute top-0 bottom-0 w-0.5"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #FF6B35, #E8521A, transparent)",
        }}
        initial={{ left: "-2px", opacity: 0 }}
        animate={{ left: ["0%", "105%"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-8 blur-sm"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(232,82,26,0.15), transparent)",
        }}
        initial={{ left: "-32px" }}
        animate={{ left: ["-32px", "105%"] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

function DiamondPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diamond-grid"
            width="36"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="18,2 34,12 18,22 2,12"
              fill="none"
              stroke="rgba(232,82,26,0.35)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond-grid)" />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 40%, rgba(232,82,26,0.06), transparent)",
        }}
      />
    </div>
  );
}

function MixedPattern() {
  const shapes = [
    { x: 20, y: 20, type: "circle" },
    { x: 56, y: 20, type: "square" },
    { x: 92, y: 20, type: "hex" },
    { x: 128, y: 20, type: "circle" },
    { x: 164, y: 20, type: "square" },
    { x: 200, y: 20, type: "hex" },
    { x: 20, y: 56, type: "hex" },
    { x: 56, y: 56, type: "circle" },
    { x: 92, y: 56, type: "square" },
    { x: 128, y: 56, type: "hex" },
    { x: 164, y: 56, type: "circle" },
    { x: 200, y: 56, type: "square" },
    { x: 20, y: 92, type: "square" },
    { x: 56, y: 92, type: "hex" },
    { x: 92, y: 92, type: "circle" },
    { x: 128, y: 92, type: "square" },
    { x: 164, y: 92, type: "hex" },
    { x: 200, y: 92, type: "circle" },
    { x: 20, y: 128, type: "circle" },
    { x: 56, y: 128, type: "square" },
    { x: 92, y: 128, type: "hex" },
    { x: 128, y: 128, type: "circle" },
    { x: 164, y: 128, type: "square" },
    { x: 200, y: 128, type: "hex" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 220 148"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {shapes.map((s, i) => {
          const op = 0.25 + (i % 3) * 0.15;
          if (s.type === "circle") {
            return (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r="7"
                fill="none"
                stroke={`rgba(232,82,26,${op})`}
                strokeWidth="0.8"
              />
            );
          }
          if (s.type === "square") {
            return (
              <rect
                key={i}
                x={s.x - 6}
                y={s.y - 6}
                width="12"
                height="12"
                fill="none"
                stroke={`rgba(232,82,26,${op})`}
                strokeWidth="0.8"
              />
            );
          }
          return (
            <polygon
              key={i}
              points={`${s.x},${s.y - 8} ${s.x + 7},${s.y - 4} ${s.x + 7},${s.y + 4} ${s.x},${s.y + 8} ${s.x - 7},${s.y + 4} ${s.x - 7},${s.y - 4}`}
              fill="none"
              stroke={`rgba(232,82,26,${op})`}
              strokeWidth="0.8"
            />
          );
        })}
      </svg>
    </div>
  );
}

function LinesPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(232,82,26,0.15) 10px, rgba(232,82,26,0.15) 11px)",
        }}
      />
      <motion.div
        className="absolute right-0 left-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #E8521A, transparent)",
        }}
        initial={{ top: "10%" }}
        animate={{ top: ["10%", "85%", "10%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function CustomPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="custom-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="24"
              cy="24"
              r="10"
              fill="none"
              stroke="rgba(232,82,26,0.2)"
              strokeWidth="0.8"
            />
            <rect
              x="14"
              y="14"
              width="20"
              height="20"
              fill="none"
              stroke="rgba(232,82,26,0.15)"
              strokeWidth="0.8"
            />
            <line
              x1="0"
              y1="24"
              x2="14"
              y2="24"
              stroke="rgba(232,82,26,0.1)"
              strokeWidth="0.5"
            />
            <line
              x1="34"
              y1="24"
              x2="48"
              y2="24"
              stroke="rgba(232,82,26,0.1)"
              strokeWidth="0.5"
            />
            <line
              x1="24"
              y1="0"
              x2="24"
              y2="14"
              stroke="rgba(232,82,26,0.1)"
              strokeWidth="0.5"
            />
            <line
              x1="24"
              y1="34"
              x2="24"
              y2="48"
              stroke="rgba(232,82,26,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#custom-grid)" />
      </svg>
    </div>
  );
}

const PATTERN_MAP: Record<string, React.FC> = {
  dots: DotsPattern,
  laser: LaserPattern,
  diamond: DiamondPattern,
  mixed: MixedPattern,
  lines: LinesPattern,
  custom: CustomPattern,
};

export function ProductShowcase() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback((dir = 1) => {
    setDirection(dir);
    setCurrent(
      (prev) => (prev + dir + SHOWCASE_PRODUCTS.length) % SHOWCASE_PRODUCTS.length
    );
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => next(1), INTERVAL);
    return () => clearInterval(interval);
  }, [next]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    let rafId = 0;

    const frame = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [current]);

  const product = SHOWCASE_PRODUCTS[current];
  const Pattern = PATTERN_MAP[product.pattern];

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 24 : -24,
      filter: "blur(4px)",
    }),
    center: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -24 : 24,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="relative w-full max-w-sm">
      <div
        className="relative overflow-hidden rounded-2xl border border-[#2A2A2A]"
        style={{ background: "#0F0F0F", minHeight: "260px" }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`pattern-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Pattern />
          </motion.div>
        </AnimatePresence>

        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.75) 100%)",
          }}
        />

        <div className="relative z-20 p-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#E8521A] uppercase">
                {product.name}
              </span>

              <p className="mt-1.5 text-sm text-[#888888]">{product.tagline}</p>

              <div className="my-4 h-px bg-[#1E1E1E]" />

              <div className="flex flex-col gap-2.5">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-[#666666]">{spec.label}</span>
                    <span className="text-sm font-semibold text-white tabular-nums">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="group mt-5 flex items-center gap-1.5 text-xs font-medium text-[#E8521A] transition-colors hover:text-[#FF6B35]"
              >
                View Product Details
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute right-0 bottom-0 left-0 z-20 h-0.5 bg-[#1A1A1A]">
          <motion.div
            className="h-full bg-[#E8521A]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {SHOWCASE_PRODUCTS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
                setProgress(0);
              }}
              className="transition-all duration-300"
              aria-label={`Go to ${SHOWCASE_PRODUCTS[i].name}`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === current
                    ? "h-1.5 w-5 bg-[#E8521A]"
                    : "h-1.5 w-1.5 bg-[#333]"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => next(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2A2A2A] text-[#666] transition-all hover:border-[#E8521A] hover:text-[#E8521A]"
            aria-label="Previous product"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M7.5 2L4 6l3.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => next(1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2A2A2A] text-[#666] transition-all hover:border-[#E8521A] hover:text-[#E8521A]"
            aria-label="Next product"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4.5 2L8 6l-3.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
