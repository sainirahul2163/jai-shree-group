"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

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
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressControls = useAnimation();

  const stopAutoRotate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoRotate = useCallback(() => {
    stopAutoRotate();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SHOWCASE_PRODUCTS.length);
    }, INTERVAL);
  }, [stopAutoRotate]);

  const restartAutoRotate = useCallback(() => {
    if (isHovered) return;
    startAutoRotate();
  }, [isHovered, startAutoRotate]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      restartAutoRotate();
    },
    [restartAutoRotate]
  );

  const next = useCallback(
    (dir = 1) => {
      setCurrent(
        (prev) =>
          (prev + dir + SHOWCASE_PRODUCTS.length) % SHOWCASE_PRODUCTS.length
      );
      restartAutoRotate();
    },
    [restartAutoRotate]
  );

  useEffect(() => {
    if (isHovered) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }
    return () => stopAutoRotate();
  }, [isHovered, startAutoRotate, stopAutoRotate]);

  useEffect(() => {
    progressControls.stop();
    progressControls.set({ width: "0%" });
    if (!isHovered) {
      void progressControls.start({
        width: "100%",
        transition: { duration: INTERVAL / 1000, ease: "linear" },
      });
    }
  }, [current, isHovered, progressControls]);

  const product = SHOWCASE_PRODUCTS[current];
  const Pattern = PATTERN_MAP[product.pattern];

  const cardVariants = {
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.97,
      transition: { duration: 0.28, ease: "easeIn" as const },
    },
    enter: {
      opacity: 0,
      y: 20,
      scale: 0.97,
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.38, ease: "easeOut" as const },
    },
  };

  return (
    <div className="relative w-full max-w-sm">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-2xl border"
        style={{
          background: "#0F0F0F",
          minHeight: "260px",
          borderColor: isHovered ? "rgba(232, 82, 26, 0.7)" : "#2A2A2A",
        }}
      >
        <AnimatePresence mode="wait">
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

        <motion.button
          type="button"
          onClick={() => next(-1)}
          aria-label="Previous product"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 left-3 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-sm transition-colors hover:border-[#E8521A] hover:bg-[#E8521A]/80"
        >
          <ChevronLeft className="size-4 text-white" />
        </motion.button>

        <motion.button
          type="button"
          onClick={() => next(1)}
          aria-label="Next product"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 right-3 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-sm transition-colors hover:border-[#E8521A] hover:bg-[#E8521A]/80"
        >
          <ChevronRight className="size-4 text-white" />
        </motion.button>

        <div className="relative z-20 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.span
                className="text-xs font-bold tracking-[0.2em] text-[#E8521A] uppercase"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0 }}
              >
                {product.name}
              </motion.span>

              <motion.p
                className="mt-1.5 text-sm text-[#888888]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.06 }}
              >
                {product.tagline}
              </motion.p>

              <div className="my-4 h-px bg-[#1E1E1E]" />

              <div className="flex flex-col gap-2.5">
                {product.specs.map((spec, specIndex) => (
                  <motion.div
                    key={spec.label}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.22,
                      delay: 0.12 + specIndex * 0.06,
                    }}
                  >
                    <span className="text-xs text-[#666666]">{spec.label}</span>
                    <span className="text-sm font-semibold text-white tabular-nums">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.24 }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group mt-5 flex items-center gap-1.5 text-xs font-medium text-[#E8521A] transition-colors hover:text-[#FF6B35]"
                >
                  View Product Details
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute right-0 bottom-0 left-0 z-20 h-0.5 bg-[#1A1A1A]">
          <motion.div
            key={current}
            className="h-full bg-[#E8521A]"
            initial={{ width: "0%" }}
            animate={progressControls}
          />
        </div>
      </motion.div>

      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {SHOWCASE_PRODUCTS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className="rounded-full p-0.5"
              aria-label={`Go to ${SHOWCASE_PRODUCTS[i].name}`}
            >
              <motion.span
                layout
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="block h-2 rounded-full"
                animate={{
                  width: i === current ? 24 : 8,
                  backgroundColor:
                    i === current ? "#E8521A" : "rgba(255,255,255,0.2)",
                }}
                whileHover={{
                  backgroundColor:
                    i === current ? "#E8521A" : "rgba(255,255,255,0.4)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
