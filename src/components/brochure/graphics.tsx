/**
 * Technical figures — perforation pattern swatches, open-area formula
 * diagrams and the expanded-metal terminology drawing. Drawn as vectors so
 * they stay sharp at print resolution, in the light editorial palette.
 */

const PLATE_HI = "#E4E1DB";
const PLATE_LO = "#CFCBC3";
const HOLE = "#1B1E21";
const EDGE = "#C4C0B8";
const DIM = "#E8521A";
const SHAPE = "#B4B0A8";
const SHAPE_EDGE = "#918D85";

function holes60() {
  const out = [];
  for (let row = 0; row < 7; row++) {
    const y = 9 + row * 13.5;
    const off = row % 2 ? 8.5 : 0;
    for (let col = 0; col < 8; col++) {
      out.push(<circle key={`${row}-${col}`} cx={9 + off + col * 17} cy={y} r={5.1} />);
    }
  }
  return out;
}

function holesStraight() {
  const out = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      out.push(<circle key={`${row}-${col}`} cx={10 + col * 16.5} cy={10.5 + row * 16} r={5.1} />);
    }
  }
  return out;
}

function holes45() {
  const out = [];
  for (let row = 0; row < 9; row++) {
    const y = 7 + row * 11;
    const off = row % 2 ? 11 : 0;
    for (let col = 0; col < 7; col++) {
      out.push(<circle key={`${row}-${col}`} cx={8 + off + col * 22} cy={y} r={4.6} />);
    }
  }
  return out;
}

function squares(staggered: boolean) {
  const out = [];
  for (let row = 0; row < 6; row++) {
    const off = staggered && row % 2 ? 8 : 0;
    for (let col = 0; col < 8; col++) {
      out.push(
        <rect key={`${row}-${col}`} x={6 + off + col * 16} y={6 + row * 16} width={9.4} height={9.4} rx={0.8} />,
      );
    }
  }
  return out;
}

function hexes() {
  const out = [];
  const r = 6.4;
  const pts = (cx: number, cy: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  for (let row = 0; row < 6; row++) {
    const off = row % 2 ? 7.5 : 0;
    for (let col = 0; col < 9; col++) {
      out.push(<polygon key={`${row}-${col}`} points={pts(8 + off + col * 15, 9 + row * 15.5)} />);
    }
  }
  return out;
}

function clovers() {
  const out = [];
  for (let row = 0; row < 5; row++) {
    const off = row % 2 ? 10.5 : 0;
    for (let col = 0; col < 7; col++) {
      const cx = 11 + off + col * 21;
      const cy = 11 + row * 19;
      out.push(
        <g key={`${row}-${col}`}>
          <circle cx={cx - 3.1} cy={cy} r={3.4} />
          <circle cx={cx + 3.1} cy={cy} r={3.4} />
          <circle cx={cx} cy={cy - 3.1} r={3.4} />
          <circle cx={cx} cy={cy + 3.1} r={3.4} />
          <rect x={cx - 3.1} y={cy - 3.1} width={6.2} height={6.2} stroke="none" />
        </g>,
      );
    }
  }
  return out;
}

function slots(mode: "side" | "straight" | "end") {
  const out = [];
  for (let row = 0; row < 8; row++) {
    let off = 0;
    if (mode === "side" && row % 2) off = 14;
    if (mode === "end" && row % 2) off = -14;
    for (let col = 0; col < 6; col++) {
      out.push(
        <rect key={`${row}-${col}`} x={5 + off + col * 28} y={5.5 + row * 11.5} width={21} height={6.4} rx={3.2} />,
      );
    }
  }
  return out;
}

const RENDER: Record<string, () => React.ReactNode> = {
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
  return (
    <figure className="m-0">
      <svg viewBox="0 0 140 100" className="block w-full" style={{ border: `1px solid ${EDGE}` }}>
        <defs>
          <linearGradient id={`pl-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={PLATE_HI} />
            <stop offset="1" stopColor={PLATE_LO} />
          </linearGradient>
        </defs>
        <rect width="140" height="100" fill={`url(#pl-${id})`} />
        <g fill={HOLE}>{RENDER[id]?.()}</g>
      </svg>
      <figcaption
        className="mt-[1.8mm]"
        style={{ fontSize: "11px", lineHeight: 1.35, fontWeight: 600, color: "var(--ink-2)" }}
      >
        {label}
      </figcaption>
    </figure>
  );
}

/* ── open-area formula diagrams ── */

function Diag({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 92 34" className="block h-[13mm] w-auto shrink-0">
      <rect width="92" height="34" rx="2" fill="#EDEBE6" stroke={EDGE} strokeWidth="0.5" />
      {children}
    </svg>
  );
}

export function FormulaDiagram({ kind }: { kind: string }) {
  const dot = { fill: SHAPE, stroke: SHAPE_EDGE, strokeWidth: 0.6 };
  switch (kind) {
    case "round-tri":
      return (
        <Diag>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={11 + i * 14} cy={i % 2 ? 11 : 23} r={4.6} {...dot} />
          ))}
          <path d="M39 23 L46 11 L53 23 Z" fill="none" stroke={DIM} strokeWidth="1.5" />
          <text x="46" y="32" textAnchor="middle" fontSize="6.5" fill={DIM} fontWeight="700">T</text>
        </Diag>
      );
    case "round-rect":
      return (
        <Diag>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <circle cx={11 + i * 14} cy={11} r={4.6} {...dot} />
              <circle cx={11 + i * 14} cy={24} r={4.6} {...dot} />
            </g>
          ))}
          <rect x="39" y="11" width="14" height="13" fill="none" stroke={DIM} strokeWidth="1.5" />
          <text x="46" y="8" textAnchor="middle" fontSize="6.5" fill={DIM} fontWeight="700">U₁·U₂</text>
        </Diag>
      );
    case "square-rect":
      return (
        <Diag>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={7 + i * 14} y={7} width={8} height={8} {...dot} />
              <rect x={7 + i * 14} y={20} width={8} height={8} {...dot} />
            </g>
          ))}
          <rect x="35" y="7" width="14" height="13" fill="none" stroke={DIM} strokeWidth="1.5" />
          <text x="42" y="33" textAnchor="middle" fontSize="6.5" fill={DIM} fontWeight="700">C</text>
        </Diag>
      );
    case "square-stag":
      return (
        <Diag>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={7 + i * 14} y={7} width={8} height={8} {...dot} />
              <rect x={14 + i * 14} y={20} width={8} height={8} {...dot} />
            </g>
          ))}
          <path d="M39 28 L39 11 L53 28 L53 11" fill="none" stroke={DIM} strokeWidth="1.5" />
          <text x="46" y="6.5" textAnchor="middle" fontSize="6.5" fill={DIM} fontWeight="700">Z₁·Z₂</text>
        </Diag>
      );
    case "capsule-stag":
      return (
        <Diag>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={6 + i * 30} y={7} width={22} height={7.5} rx={3.75} {...dot} />
              <rect x={20 + i * 30} y={20} width={22} height={7.5} rx={3.75} {...dot} />
            </g>
          ))}
          <path d="M36 27 L56 10 M36 10 L36 27 M56 10 L56 27" fill="none" stroke={DIM} strokeWidth="1.5" />
        </Diag>
      );
    case "rect-stag":
      return (
        <Diag>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={6 + i * 30} y={7} width={22} height={7.5} {...dot} />
              <rect x={20 + i * 30} y={20} width={22} height={7.5} {...dot} />
            </g>
          ))}
          <path d="M36 27 L56 10 M36 10 L36 27 M56 10 L56 27" fill="none" stroke={DIM} strokeWidth="1.5" />
        </Diag>
      );
    default:
      return null;
  }
}

/* ── expanded metal terminology ── */

export function ExpandedTerminologyDiagram() {
  const diamonds = [];
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
          stroke="#8C8880"
          strokeWidth="3.2"
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 206 122" className="block w-full">
      <rect width="206" height="122" fill="#EDEBE6" stroke={EDGE} strokeWidth="0.6" />
      <clipPath id="tclip">
        <rect x="8" y="10" width="158" height="72" />
      </clipPath>
      <g clipPath="url(#tclip)">
        <rect x="8" y="10" width="158" height="72" fill="#E2DFD9" />
        {diamonds}
      </g>
      <rect x="8" y="10" width="158" height="72" fill="none" stroke={EDGE} strokeWidth="0.6" />

      <path d="M43 92 L107 92 M43 88.5v7M107 88.5v7" stroke={DIM} strokeWidth="1.5" />
      <text x="75" y="104" textAnchor="middle" fontSize="8" fill={DIM} fontWeight="700">
        LWD — Long Way of Diamond
      </text>

      <path d="M176 26 L176 52 M172.5 26h7M172.5 52h7" stroke={DIM} strokeWidth="1.5" />
      <text x="186" y="42" fontSize="8" fill={DIM} fontWeight="700" transform="rotate(90 186 42)" textAnchor="middle">
        SWD
      </text>

      <circle cx="58" cy="39" r="4.5" fill="none" stroke="#16181A" strokeWidth="1" />
      <path d="M62 42 L84 58" stroke="#16181A" strokeWidth="0.8" />
      <text x="86" y="61" fontSize="7.6" fill="#3A4046" fontWeight="600">Bond</text>

      <circle cx="99" cy="26" r="4.5" fill="none" stroke="#16181A" strokeWidth="1" />
      <path d="M103 29 L124 44" stroke="#16181A" strokeWidth="0.8" />
      <text x="126" y="47" fontSize="7.6" fill="#3A4046" fontWeight="600">Strand</text>
    </svg>
  );
}
