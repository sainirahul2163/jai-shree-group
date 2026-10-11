"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PATTERNS = [
  {
    id: "round-60",
    name: "Standard Round",
    sub: "60° Staggered",
    description:
      "Most popular pattern. Maximum open area with highest strength. Used in filters, facades, acoustic panels.",
    openArea: "Up to 77%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => {
            const x = col * 22 + (row % 2 === 1 ? 11 : 0) + 10;
            const y = row * 18 + 10;
            if (x > 115) return null;
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r="7"
                fill="none"
                stroke="var(--brand-text)"
                strokeWidth="1.5"
              />
            );
          })
        )}
      </svg>
    ),
  },
  {
    id: "round-straight",
    name: "Straight Line Round",
    sub: "Grid arrangement",
    description:
      "Holes aligned in both directions. Clean, uniform look. Popular for architectural and decorative applications.",
    openArea: "Up to 60%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => {
            const x = col * 20 + 10;
            const y = row * 20 + 10;
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r="7"
                fill="none"
                stroke="var(--brand-text)"
                strokeWidth="1.5"
              />
            );
          })
        )}
      </svg>
    ),
  },
  {
    id: "round-45",
    name: "45° Staggered Round",
    sub: "Optional pattern",
    description:
      "Diagonal arrangement of holes. Offers good open area with a distinctive diagonal visual pattern.",
    openArea: "Up to 65%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => {
            const x = col * 20 + (row % 2 === 1 ? 10 : 0) + 10;
            const y = row * 18 + 10;
            if (x > 118) return null;
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r="7"
                fill="none"
                stroke="var(--brand-text)"
                strokeWidth="1.5"
              />
            );
          })
        )}
      </svg>
    ),
  },
  {
    id: "square-staggered",
    name: "Square Staggered",
    sub: "Offset rows",
    description:
      "Square holes in staggered arrangement. High open area with increased structural rigidity.",
    openArea: "Up to 65%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4].map((col) => {
            const x = col * 22 + (row % 2 === 1 ? 11 : 0) + 8;
            const y = row * 18 + 8;
            if (x > 114) return null;
            return (
              <rect
                key={`${row}-${col}`}
                x={x}
                y={y}
                width="12"
                height="12"
                fill="none"
                stroke="var(--brand-text)"
                strokeWidth="1.5"
                rx="1"
              />
            );
          })
        )}
      </svg>
    ),
  },
  {
    id: "square-straight",
    name: "Straight Line Square",
    sub: "Grid arrangement",
    description:
      "Square holes aligned in grid. Maximum flow with clean industrial appearance.",
    openArea: "Up to 70%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 22 + 8}
              y={row * 18 + 8}
              width="12"
              height="12"
              fill="none"
              stroke="var(--brand-text)"
              strokeWidth="1.5"
              rx="1"
            />
          ))
        )}
      </svg>
    ),
  },
  {
    id: "hexagonal",
    name: "Hexagonal",
    sub: "Staggered pattern",
    description:
      "Honeycomb hex pattern. Highest open area of all patterns. Maximum flow with excellent structural strength.",
    openArea: "Up to 83%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => {
            const x = col * 24 + (row % 2 === 1 ? 12 : 0) + 12;
            const y = row * 22 + 14;
            if (x > 116) return null;
            const pts = [0, 1, 2, 3, 4, 5]
              .map((i) => {
                const angle = ((i * 60 - 30) * Math.PI) / 180;
                return `${x + 9 * Math.cos(angle)},${y + 9 * Math.sin(angle)}`;
              })
              .join(" ");
            return (
              <polygon
                key={`${row}-${col}`}
                points={pts}
                fill="none"
                stroke="var(--brand-text)"
                strokeWidth="1.5"
              />
            );
          })
        )}
      </svg>
    ),
  },
  {
    id: "ornamental",
    name: "Ornamental",
    sub: "Decorative pattern",
    description:
      "Clover/flower shaped decorative holes. Used in architectural facades, interior design, decorative panels.",
    openArea: "Up to 45%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const cx = col * 28 + (row % 2 === 1 ? 14 : 0) + 16;
            const cy = row * 24 + 14;
            if (cx > 114) return null;
            const r = 8;
            return (
              <g key={`${row}-${col}`}>
                <circle
                  cx={cx}
                  cy={cy - r / 2}
                  r={r / 2 + 1}
                  fill="none"
                  stroke="var(--brand-text)"
                  strokeWidth="1.2"
                />
                <circle
                  cx={cx + r / 2}
                  cy={cy}
                  r={r / 2 + 1}
                  fill="none"
                  stroke="var(--brand-text)"
                  strokeWidth="1.2"
                />
                <circle
                  cx={cx}
                  cy={cy + r / 2}
                  r={r / 2 + 1}
                  fill="none"
                  stroke="var(--brand-text)"
                  strokeWidth="1.2"
                />
                <circle
                  cx={cx - r / 2}
                  cy={cy}
                  r={r / 2 + 1}
                  fill="none"
                  stroke="var(--brand-text)"
                  strokeWidth="1.2"
                />
              </g>
            );
          })
        )}
      </svg>
    ),
  },
  {
    id: "slots-staggered",
    name: "Side Staggered Slots",
    sub: "Rectangular offset",
    description:
      "Elongated slots in staggered rows. High flow rate. Used in sieves, conveyor screens, drainage.",
    openArea: "Up to 65%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2].map((col) => {
            const x = col * 38 + (row % 2 === 1 ? 19 : 0) + 4;
            const y = row * 18 + 8;
            if (x > 112) return null;
            return (
              <rect
                key={`${row}-${col}`}
                x={x}
                y={y}
                width="30"
                height="10"
                fill="none"
                stroke="var(--brand-text)"
                strokeWidth="1.5"
                rx="3"
              />
            );
          })
        )}
      </svg>
    ),
  },
  {
    id: "slots-straight",
    name: "Straight Line Slots",
    sub: "Rectangular parallel",
    description:
      "Full-width continuous slots. Maximum flow rate. Used in sugar screens, pulverizing screens, drainage.",
    openArea: "Up to 75%",
    svg: (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {[0, 1, 2, 3, 4].map((row) => (
          <rect
            key={row}
            x="6"
            y={row * 18 + 8}
            width="108"
            height="10"
            fill="none"
            stroke="var(--brand-text)"
            strokeWidth="1.5"
            rx="3"
          />
        ))}
      </svg>
    ),
  },
];

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

const DEFAULT_METALS = ["SS", "MS", "GI", "Aluminum", "Copper", "Brass", "Titanium"];

/** `metals`: the "Available in" chips; defaults to the group's list. */
export function PerforationPatterns({
  metals = DEFAULT_METALS,
}: {
  metals?: string[];
} = {}) {
  const [selected, setSelected] = useState(PATTERNS[0]);

  return (
    <section className="border-t border-surface-2 py-16">
      <div className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-6 bg-[color-mix(in_oklab,var(--label-accent)_40%,transparent)]" />
          <span className="text-xs font-medium tracking-[0.25em] text-[var(--label-accent)] uppercase">
            Hole Patterns
          </span>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-foreground">
          9 Perforation Patterns Available
        </h2>
        <p className="mt-2 max-w-xl text-sm text-text-secondary">
          Select any pattern below to see details. All patterns available in any
          metal — SS, MS, GI, Aluminum, Copper, Brass.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="grid grid-cols-3 gap-3">
          {PATTERNS.map((pattern) => (
            <motion.button
              key={pattern.id}
              type="button"
              onClick={() => setSelected(pattern)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border p-2 transition-all duration-300 ${
                selected.id === pattern.id
                  ? "border-brand bg-brand/5"
                  : "border-surface-2 bg-background hover:border-brand/40"
              }`}
            >
              {selected.id === pattern.id && (
                <motion.div
                  layoutId="active-pattern"
                  className="absolute inset-0 rounded-xl border-2 border-brand"
                  transition={SPRING}
                />
              )}

              <div className="flex w-full flex-1 items-center justify-center p-1">
                {pattern.svg}
              </div>

              <div className="mt-1 w-full px-1">
                <p className="truncate text-[9px] leading-tight font-bold text-foreground">
                  {pattern.name}
                </p>
                <p className="truncate text-[8px] text-[#555]">{pattern.sub}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={SPRING}
              className="flex h-full flex-col rounded-2xl border border-surface-2 bg-background p-6"
            >
              <div className="mb-6 flex aspect-video w-full items-center justify-center rounded-xl border border-surface-2 bg-[#080808] p-6">
                <div className="h-full w-full max-w-xs">{selected.svg}</div>
              </div>

              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black text-foreground">
                    {selected.name}
                  </h3>
                  <p className="text-sm text-brand-text">{selected.sub}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs tracking-widest text-text-muted uppercase">
                    Open Area
                  </p>
                  <p className="text-lg font-black text-brand-text">
                    {selected.openArea}
                  </p>
                </div>
              </div>

              <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                {selected.description}
              </p>

              <div className="mt-6 border-t border-surface-2 pt-4">
                <p className="mb-2 text-xs tracking-widest text-[#555] uppercase">
                  Available in
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {metals.map(
                    (m) => (
                      <span
                        key={m}
                        className="rounded border border-surface-2 px-2 py-0.5 text-xs text-text-muted"
                      >
                        {m}
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
