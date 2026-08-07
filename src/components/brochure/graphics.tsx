/**
 * Vector graphics for the catalogue — perforation pattern swatches,
 * open-area formula diagrams and the expanded-metal terminology diagram.
 * All drawn in the brand palette so they stay crisp at print resolution.
 */

const PLATE = "#1d2126";
const PLATE_EDGE = "#2f353c";
const HOLE = "#0a0a0a";
const HOLE_RIM = "rgba(232,82,26,0.35)";

function holes60(): React.ReactNode {
  const out: React.ReactNode[] = [];
  for (let row = 0; row < 7; row++) {
    const y = 9 + row * 13.5;
    const off = row % 2 ? 8.5 : 0;
    for (let col = 0; col < 8; col++) {
      out.push(
        <circle key={`${row}-${col}`} cx={9 + off + col * 17} cy={y} r={5.1} />,
      );
    }
  }
  return out;
}

function holesStraight(): React.ReactNode {
  const out: React.ReactNode[] = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      out.push(
        <circle key={`${row}-${col}`} cx={10 + col * 16.5} cy={10.5 + row * 16} r={5.1} />,
      );
    }
  }
  return out;
}

function holes45(): React.ReactNode {
  const out: React.ReactNode[] = [];
  for (let row = 0; row < 9; row++) {
    const y = 7 + row * 11;
    const off = row % 2 ? 11 : 0;
    for (let col = 0; col < 7; col++) {
      out.push(
        <circle key={`${row}-${col}`} cx={8 + off + col * 22} cy={y} r={4.6} />,
      );
    }
  }
  return out;
}

function squares(staggered: boolean): React.ReactNode {
  const out: React.ReactNode[] = [];
  for (let row = 0; row < 6; row++) {
    const off = staggered && row % 2 ? 8 : 0;
    for (let col = 0; col < 8; col++) {
      out.push(
        <rect
          key={`${row}-${col}`}
          x={6 + off + col * 16}
          y={6 + row * 16}
          width={9.4}
          height={9.4}
          rx={1}
        />,
      );
    }
  }
  return out;
}

function hexes(): React.ReactNode {
  const out: React.ReactNode[] = [];
  const r = 6.4;
  const pts = (cx: number, cy: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  for (let row = 0; row < 6; row++) {
    const off = row % 2 ? 7.5 : 0;
    for (let col = 0; col < 9; col++) {
      out.push(
        <polygon key={`${row}-${col}`} points={pts(8 + off + col * 15, 9 + row * 15.5)} />,
      );
    }
  }
  return out;
}

function clovers(): React.ReactNode {
  const out: React.ReactNode[] = [];
  const clover = (cx: number, cy: number, key: string) => (
    <g key={key}>
      <circle cx={cx - 3.1} cy={cy} r={3.4} />
      <circle cx={cx + 3.1} cy={cy} r={3.4} />
      <circle cx={cx} cy={cy - 3.1} r={3.4} />
      <circle cx={cx} cy={cy + 3.1} r={3.4} />
      <rect x={cx - 3.1} y={cy - 3.1} width={6.2} height={6.2} stroke="none" />
    </g>
  );
  for (let row = 0; row < 5; row++) {
    const off = row % 2 ? 10.5 : 0;
    for (let col = 0; col < 7; col++) {
      out.push(clover(11 + off + col * 21, 11 + row * 19, `${row}-${col}`));
    }
  }
  return out;
}

function slots(mode: "side" | "straight" | "end"): React.ReactNode {
  const out: React.ReactNode[] = [];
  const w = 21;
  const h = 6.4;
  for (let row = 0; row < 8; row++) {
    let off = 0;
    if (mode === "side" && row % 2) off = 14;
    if (mode === "end" && row % 2) off = -14;
    for (let col = 0; col < 6; col++) {
      out.push(
        <rect
          key={`${row}-${col}`}
          x={5 + off + col * 28}
          y={5.5 + row * 11.5}
          width={w}
          height={h}
          rx={h / 2}
        />,
      );
    }
  }
  return out;
}

const PATTERN_RENDER: Record<string, () => React.ReactNode> = {
  "round-60": holes60,
  "round-straight": holesStraight,
  "round-45": holes45,
  "square-staggered": () => squares(true),
  "square-straight": () => squares(false),
  hex: hexes,
  ornamental: clovers,
  "slot-side": () => slots("side"),
  "slot-straight": () => slots("straight"),
  "slot-end": () => slots("end"),
};

export function PatternSwatch({ id, label }: { id: string; label: string }) {
  const render = PATTERN_RENDER[id];
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[8px] border border-[#2a2a2a]">
        <svg viewBox="0 0 140 100" className="block w-full">
          <defs>
            <linearGradient id={`plate-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={PLATE_EDGE} />
              <stop offset="0.5" stopColor={PLATE} />
              <stop offset="1" stopColor="#14171b" />
            </linearGradient>
          </defs>
          <rect width="140" height="100" fill={`url(#plate-${id})`} />
          <g fill={HOLE} stroke={HOLE_RIM} strokeWidth="0.5">
            {render?.()}
          </g>
        </svg>
      </div>
      <figcaption className="mt-[1.2mm] text-center text-[7.2px] font-bold uppercase leading-[1.35] tracking-[0.05em] text-[#a0a0a0]">
        {label}
      </figcaption>
    </figure>
  );
}

/* ── open-area formula mini diagrams ── */

const DIM = "#ff6b35";
const SHAPE = "#3a4048";
const SHAPE_EDGE = "#555d66";

function DiagRow({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 92 34" className="block h-[11.5mm] w-auto shrink-0">
      <rect width="92" height="34" rx="4" fill="#161a1e" />
      {children}
    </svg>
  );
}

export function FormulaDiagram({ kind }: { kind: string }) {
  switch (kind) {
    case "round-tri":
      return (
        <DiagRow>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={11 + i * 14} cy={i % 2 ? 11 : 23} r={4.6} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
          ))}
          <path d="M39 23 L46 11 L53 23 Z" fill="none" stroke={DIM} strokeWidth="1.4" />
          <text x="46" y="31.5" textAnchor="middle" fontSize="6" fill={DIM} fontWeight="700">T</text>
        </DiagRow>
      );
    case "round-rect":
      return (
        <DiagRow>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <circle cx={11 + i * 14} cy={11} r={4.6} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
              <circle cx={11 + i * 14} cy={24} r={4.6} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
            </g>
          ))}
          <rect x="39" y="11" width="14" height="13" fill="none" stroke={DIM} strokeWidth="1.4" />
          <text x="46" y="8" textAnchor="middle" fontSize="6" fill={DIM} fontWeight="700">U₁·U₂</text>
        </DiagRow>
      );
    case "square-rect":
      return (
        <DiagRow>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={7 + i * 14} y={7} width={8} height={8} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
              <rect x={7 + i * 14} y={20} width={8} height={8} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
            </g>
          ))}
          <rect x="35" y="7" width="14" height="13" fill="none" stroke={DIM} strokeWidth="1.4" />
          <text x="42" y="33" textAnchor="middle" fontSize="6" fill={DIM} fontWeight="700">C</text>
        </DiagRow>
      );
    case "square-stag":
      return (
        <DiagRow>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={7 + i * 14} y={7} width={8} height={8} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
              <rect x={14 + i * 14} y={20} width={8} height={8} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
            </g>
          ))}
          <path d="M39 28 L39 11 L53 28 L53 11" fill="none" stroke={DIM} strokeWidth="1.4" />
          <text x="46" y="8" textAnchor="middle" fontSize="6" fill={DIM} fontWeight="700">Z₁·Z₂</text>
        </DiagRow>
      );
    case "capsule-stag":
      return (
        <DiagRow>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={6 + i * 30} y={7} width={22} height={7.5} rx={3.75} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
              <rect x={20 + i * 30} y={20} width={22} height={7.5} rx={3.75} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
            </g>
          ))}
          <path d="M36 27 L56 10 M36 10 L36 27 M56 10 L56 27" fill="none" stroke={DIM} strokeWidth="1.4" />
        </DiagRow>
      );
    case "rect-stag":
      return (
        <DiagRow>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={6 + i * 30} y={7} width={22} height={7.5} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
              <rect x={20 + i * 30} y={20} width={22} height={7.5} fill={SHAPE} stroke={SHAPE_EDGE} strokeWidth="0.6" />
            </g>
          ))}
          <path d="M36 27 L56 10 M36 10 L36 27 M56 10 L56 27" fill="none" stroke={DIM} strokeWidth="1.4" />
        </DiagRow>
      );
    default:
      return null;
  }
}

/* ── expanded metal terminology diagram ── */

export function ExpandedTerminologyDiagram() {
  const diamonds: React.ReactNode[] = [];
  for (let row = 0; row < 4; row++) {
    const off = row % 2 ? 17 : 0;
    for (let col = 0; col < 5; col++) {
      const cx = 24 + off + col * 34;
      const cy = 26 + row * 13;
      diamonds.push(
        <path
          key={`${row}-${col}`}
          d={`M${cx - 15} ${cy} L${cx} ${cy - 10} L${cx + 15} ${cy} L${cx} ${cy + 10} Z`}
          fill="none"
          stroke="#8a8a8a"
          strokeWidth="3.4"
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 206 118" className="block w-full">
      <rect width="206" height="118" rx="8" fill="#111111" stroke="#2a2a2a" />
      <clipPath id="term-clip">
        <rect x="8" y="10" width="158" height="72" rx="4" />
      </clipPath>
      <g clipPath="url(#term-clip)">
        <rect x="8" y="10" width="158" height="72" fill="#16191d" />
        {diamonds}
      </g>
      {/* LWD marker */}
      <path d="M43 92 L107 92" stroke={DIM} strokeWidth="1.4" />
      <path d="M43 88.5v7M107 88.5v7" stroke={DIM} strokeWidth="1.4" />
      <text x="75" y="102" textAnchor="middle" fontSize="7.5" fill={DIM} fontWeight="700">
        LWD — Long Way of Diamond
      </text>
      {/* SWD marker */}
      <path d="M176 26 L176 52" stroke={DIM} strokeWidth="1.4" />
      <path d="M172.5 26h7M172.5 52h7" stroke={DIM} strokeWidth="1.4" />
      <text x="184" y="44" fontSize="7.5" fill={DIM} fontWeight="700" transform="rotate(90 184 44)" textAnchor="middle">
        SWD
      </text>
      {/* strand + bond call-outs */}
      <circle cx="58" cy="39" r="4.5" fill="none" stroke="#ffffff" strokeWidth="1" />
      <path d="M62 42 L84 58" stroke="#ffffff" strokeWidth="0.8" />
      <text x="86" y="61" fontSize="6.8" fill="#c0c0c0" fontWeight="600">
        Bond
      </text>
      <circle cx="99" cy="26" r="4.5" fill="none" stroke="#ffffff" strokeWidth="1" />
      <path d="M103 29 L124 44" stroke="#ffffff" strokeWidth="0.8" />
      <text x="126" y="47" fontSize="6.8" fill="#c0c0c0" fontWeight="600">
        Strand
      </text>
    </svg>
  );
}
