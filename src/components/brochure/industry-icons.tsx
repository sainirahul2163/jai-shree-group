/**
 * Sector marks for the Industries page.
 *
 * Technical pictograms, not illustrations: a single uniform stroke,
 * orthographic geometry, butt caps and mitred joins, no fills beyond
 * perforation dots, no rounded blobs, no gradients. Each shows the equipment
 * the group actually supplies into that sector — a filter cartridge, a
 * coating drum, a distillation column — so the page reads as engineering.
 *
 * Drawn on a 48×48 field and printed at 9mm, which is roughly 17 units per
 * millimetre: anything finer than about 1.5 units disappears on paper, so the
 * geometry is deliberately spare. Stroke 2 lands at ~1pt printed.
 */

type IconProps = { className?: string; style?: React.CSSProperties };

const S = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "butt",
  strokeLinejoin: "miter",
} as const;

/** Perforation dots on a staggered grid, clipped to an ellipse. */
function dots(cx: number, cy: number, rx: number, ry: number, step: number, r = 1.15) {
  const out: React.ReactNode[] = [];
  let row = 0;
  for (let y = cy - ry; y <= cy + ry + 0.01; y += step, row++) {
    for (let x = cx - rx + (row % 2 ? step / 2 : 0); x <= cx + rx + 0.01; x += step) {
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      if (nx * nx + ny * ny <= 0.78) {
        out.push(
          <circle key={`${x}-${y}`} cx={+x.toFixed(1)} cy={+y.toFixed(1)} r={r} fill="currentColor" stroke="none" />,
        );
      }
    }
  }
  return out;
}

/** Automobile — spin-on filter cartridge, the group's core automotive part. */
export function IconAutomobile({ className, style }: IconProps) {
  return (
    <svg {...S} className={className} style={style}>
      <ellipse cx="24" cy="13" rx="9" ry="3.5" />
      <path d="M15 13v20M33 13v20" />
      <path d="M15 33a9 3.5 0 0 0 18 0" />
      <path d="M20 16v15M24 16v15M28 16v15" />
      <path d="M21 8h6v2h-6z" />
    </svg>
  );
}

/** Construction — perforated cladding on a building elevation. */
export function IconConstruction({ className, style }: IconProps) {
  return (
    <svg {...S} className={className} style={style}>
      <rect x="13" y="8" width="22" height="32" />
      <path d="M13 18h22M13 28h22" />
      <path d="M24 8v32" />
      <path d="M7 40h34" />
    </svg>
  );
}

/** Food & beverage — round processing sieve with a perforated deck. */
export function IconFood({ className, style }: IconProps) {
  return (
    <svg {...S} className={className} style={style}>
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="12" />
      {dots(24, 24, 11, 11, 5.5)}
    </svg>
  );
}

/** Pharmaceutical — perforated tablet-coating drum. */
export function IconPharma({ className, style }: IconProps) {
  return (
    <svg {...S} className={className} style={style}>
      <path d="M16 13h16M16 35h16" />
      <ellipse cx="32" cy="24" rx="5" ry="11" />
      <path d="M16 13a5 11 0 0 0 0 22" />
      {dots(23, 24, 4.5, 7, 6)}
      <path d="M20 35v6M28 35v6" />
    </svg>
  );
}

/** Petrochemical — distillation column with internal trays. */
export function IconPetrochemical({ className, style }: IconProps) {
  return (
    <svg {...S} className={className} style={style}>
      <path d="M15 17a9 7 0 0 1 18 0v19H15z" />
      <path d="M15 24h18M15 30h18" />
      <path d="M33 20h5v16" />
      <path d="M11 36h26" />
    </svg>
  );
}

/** Architecture & interior — decorative lattice screen. */
export function IconArchitecture({ className, style }: IconProps) {
  return (
    <svg {...S} className={className} style={style}>
      <rect x="9" y="8" width="30" height="32" />
      <path d="M17 15l6 5-6 5-6-5zM31 15l6 5-6 5-6-5z" />
      <path d="M17 28l6 5-6 5-6-5zM31 28l6 5-6 5-6-5z" />
    </svg>
  );
}

/** Sugar — herringbone huller screen. */
export function IconSugar({ className, style }: IconProps) {
  return (
    <svg {...S} className={className} style={style}>
      <rect x="8" y="12" width="32" height="24" />
      <path d="M8 18h32" />
      <path d="M12 32l6-8 6 8M24 32l6-8 6 8" />
    </svg>
  );
}

/** Mining — inclined vibrating screen deck under aggregate. */
export function IconMining({ className, style }: IconProps) {
  return (
    <svg {...S} className={className} style={style}>
      <path d="M14 28l6-10 6 10zM27 28l5-8 5 8z" />
      <path d="M8 28h32M8 35h32" />
      <path d="M12 28v14M36 28v14" />
      <path d="M15 31.5h3M22 31.5h3M29 31.5h3" />
    </svg>
  );
}

export const INDUSTRY_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  automobile: IconAutomobile,
  construction: IconConstruction,
  "food-beverage": IconFood,
  pharmaceutical: IconPharma,
  petrochemical: IconPetrochemical,
  "architecture-interior": IconArchitecture,
  "sugar-industry": IconSugar,
  "mining-quarrying": IconMining,
};
