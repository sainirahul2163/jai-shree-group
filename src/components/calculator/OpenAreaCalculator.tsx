"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HoleShape = "round" | "square" | "hex" | "slot" | null;
type SlotEndType = "round-end" | "square-end" | null;
type ArrangementType = string | null;

type InputFieldDef = {
  key: string;
  label: string;
  variable: string;
};

type CalculatorConfig = {
  id: number;
  name: string;
  formulaText: string;
  formulaDisplay: React.ReactNode;
  fields: InputFieldDef[];
  calculate: (v: Record<string, number>) => number;
};

const CALCULATOR_CONFIG: Record<number, CalculatorConfig> = {
  1: {
    id: 1,
    name: "Round Perforation — 60° Staggered",
    formulaText: "OA = (D² × 90.69) / C²",
    formulaDisplay: (
      <>
        OA = (D<sup>2</sup> × 90.69) / C<sup>2</sup>
      </>
    ),
    fields: [
      { key: "D", label: "Hole Diameter (D)", variable: "D" },
      { key: "C", label: "Pitch (C)", variable: "C" },
    ],
    calculate: ({ D, C }) => (D * D * 90.69) / (C * C),
  },
  2: {
    id: 2,
    name: "Round Perforation — 45° Staggered",
    formulaText: "OA = (D² × 78.5) / C²",
    formulaDisplay: (
      <>
        OA = (D<sup>2</sup> × 78.5) / C<sup>2</sup>
      </>
    ),
    fields: [
      { key: "D", label: "Hole Diameter (D)", variable: "D" },
      { key: "C", label: "Pitch (C)", variable: "C" },
    ],
    calculate: ({ D, C }) => (D * D * 78.5) / (C * C),
  },
  3: {
    id: 3,
    name: "Round Perforation — Straight Line",
    formulaText: "OA = (D² × 78.5) / (C₁ × C₂)",
    formulaDisplay: (
      <>
        OA = (D<sup>2</sup> × 78.5) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "D", label: "Hole Diameter (D)", variable: "D" },
      { key: "C1", label: "Pitch 1 (C₁)", variable: "C₁" },
      { key: "C2", label: "Pitch 2 (C₂)", variable: "C₂" },
    ],
    calculate: ({ D, C1, C2 }) => (D * D * 78.5) / (C1 * C2),
  },
  4: {
    id: 4,
    name: "Square Perforation — Straight Line",
    formulaText: "OA = (S² × 100) / (C₁ × C₂)",
    formulaDisplay: (
      <>
        OA = (S<sup>2</sup> × 100) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "S", label: "Hole Size (S)", variable: "S" },
      { key: "C1", label: "Pitch 1 (C₁)", variable: "C₁" },
      { key: "C2", label: "Pitch 2 (C₂)", variable: "C₂" },
    ],
    calculate: ({ S, C1, C2 }) => (S * S * 100) / (C1 * C2),
  },
  5: {
    id: 5,
    name: "Square Perforation — Staggered",
    formulaText: "OA = (S² × 100) / (C₁ × C₂)",
    formulaDisplay: (
      <>
        OA = (S<sup>2</sup> × 100) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "S", label: "Hole Size (S)", variable: "S" },
      { key: "C1", label: "Pitch 1 (C₁)", variable: "C₁" },
      { key: "C2", label: "Pitch 2 (C₂)", variable: "C₂" },
    ],
    calculate: ({ S, C1, C2 }) => (S * S * 100) / (C1 * C2),
  },
  6: {
    id: 6,
    name: "Hex Perforation — Standard",
    formulaText: "OA = (S² × 100) / C²",
    formulaDisplay: (
      <>
        OA = (S<sup>2</sup> × 100) / C<sup>2</sup>
      </>
    ),
    fields: [
      { key: "S", label: "Hole Size (S)", variable: "S" },
      { key: "C", label: "Pitch (C)", variable: "C" },
    ],
    calculate: ({ S, C }) => (S * S * 100) / (C * C),
  },
  7: {
    id: 7,
    name: "Round End Slot — Side Staggered",
    formulaText: "OA = (WL − 0.215W²) × 100 / (C₁ × C₂)",
    formulaDisplay: (
      <>
        OA = (WL − 0.215W<sup>2</sup>) × 100 / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "W", label: "Hole Width (W)", variable: "W" },
      { key: "L", label: "Hole Length (L)", variable: "L" },
      { key: "C1", label: "Pitch 1 (C₁)", variable: "C₁" },
      { key: "C2", label: "Pitch 2 (C₂)", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) =>
      ((W * L - 0.215 * W * W) * 100) / (C1 * C2),
  },
  8: {
    id: 8,
    name: "Round End Slot — Straight Line",
    formulaText: "OA = (WL − 0.215W²) × 100 / (C₁ × C₂)",
    formulaDisplay: (
      <>
        OA = (WL − 0.215W<sup>2</sup>) × 100 / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "W", label: "Hole Width (W)", variable: "W" },
      { key: "L", label: "Hole Length (L)", variable: "L" },
      { key: "C1", label: "Pitch 1 (C₁)", variable: "C₁" },
      { key: "C2", label: "Pitch 2 (C₂)", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) =>
      ((W * L - 0.215 * W * W) * 100) / (C1 * C2),
  },
  9: {
    id: 9,
    name: "Square End Slot — Straight Line",
    formulaText: "OA = (W × L × 100) / (C₁ × C₂)",
    formulaDisplay: (
      <>
        OA = (W × L × 100) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "W", label: "Hole Width (W)", variable: "W" },
      { key: "L", label: "Hole Length (L)", variable: "L" },
      { key: "C1", label: "Pitch 1 (C₁)", variable: "C₁" },
      { key: "C2", label: "Pitch 2 (C₂)", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) => (W * L * 100) / (C1 * C2),
  },
  10: {
    id: 10,
    name: "Square End Slot — Staggered",
    formulaText: "OA = (W × L × 100) / (C₁ × C₂)",
    formulaDisplay: (
      <>
        OA = (W × L × 100) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "W", label: "Hole Width (W)", variable: "W" },
      { key: "L", label: "Hole Length (L)", variable: "L" },
      { key: "C1", label: "Pitch 1 (C₁)", variable: "C₁" },
      { key: "C2", label: "Pitch 2 (C₂)", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) => (W * L * 100) / (C1 * C2),
  },
};

const HOLE_SHAPES: { id: HoleShape & string; label: string }[] = [
  { id: "round", label: "Round" },
  { id: "square", label: "Square" },
  { id: "hex", label: "Hex" },
  { id: "slot", label: "Slot" },
];

function getAvailableArrangements(
  holeShape: HoleShape,
  slotEndType: SlotEndType
): { id: string; label: string }[] {
  if (holeShape === "round") {
    return [
      { id: "60-staggered", label: "60° Staggered" },
      { id: "45-staggered", label: "45° Staggered" },
      { id: "straight-line", label: "Straight Line" },
    ];
  }
  if (holeShape === "square") {
    return [
      { id: "straight-line", label: "Straight Line" },
      { id: "staggered", label: "Staggered" },
    ];
  }
  if (holeShape === "hex") {
    return [{ id: "standard", label: "Standard" }];
  }
  if (holeShape === "slot" && slotEndType === "round-end") {
    return [
      { id: "side-staggered", label: "Side Staggered" },
      { id: "straight-line", label: "Straight Line" },
    ];
  }
  if (holeShape === "slot" && slotEndType === "square-end") {
    return [
      { id: "straight-line", label: "Straight Line" },
      { id: "staggered", label: "Staggered" },
    ];
  }
  return [];
}

function getCalculatorId(
  holeShape: HoleShape,
  slotEndType: SlotEndType,
  arrangement: ArrangementType
): number | null {
  if (!holeShape || !arrangement) return null;

  if (holeShape === "round") {
    if (arrangement === "60-staggered") return 1;
    if (arrangement === "45-staggered") return 2;
    if (arrangement === "straight-line") return 3;
  }
  if (holeShape === "square") {
    if (arrangement === "straight-line") return 4;
    if (arrangement === "staggered") return 5;
  }
  if (holeShape === "hex" && arrangement === "standard") return 6;
  if (holeShape === "slot" && slotEndType === "round-end") {
    if (arrangement === "side-staggered") return 7;
    if (arrangement === "straight-line") return 8;
  }
  if (holeShape === "slot" && slotEndType === "square-end") {
    if (arrangement === "straight-line") return 9;
    if (arrangement === "staggered") return 10;
  }
  return null;
}

function getInputWarnings(
  calculatorId: number,
  values: Record<string, number>
): Record<string, string> {
  const warnings: Record<string, string> = {};
  const msg = "Hole diameter should be less than pitch";

  if (calculatorId === 1 || calculatorId === 2) {
    if (values.D >= values.C) warnings.D = msg;
  }
  if (calculatorId === 3) {
    if (values.D >= values.C1) warnings.D = msg;
    if (values.D >= values.C2) warnings.D = msg;
  }
  if (calculatorId === 4 || calculatorId === 5) {
    if (values.S >= values.C1) warnings.S = msg;
    if (values.S >= values.C2) warnings.S = msg;
  }
  if (calculatorId === 6) {
    if (values.S >= values.C) warnings.S = msg;
  }
  if (calculatorId >= 7 && calculatorId <= 10) {
    if (values.W >= values.C1) warnings.W = msg;
    if (values.L >= values.C2) warnings.L = msg;
  }
  return warnings;
}

function SheetRect() {
  return (
    <rect
      x="20"
      y="30"
      width="360"
      height="140"
      fill="#1A1A1A"
      stroke="#E8521A"
      strokeWidth="1.5"
      rx="4"
    />
  );
}

function DimLine({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number | string;
  y1: number | string;
  x2: number | string;
  y2: number | string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#666666"
      strokeWidth="1"
      strokeDasharray="4 2"
    />
  );
}

function VarLabel({
  x,
  y,
  children,
}: {
  x: number | string;
  y: number | string;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fill="#E8521A"
      fontSize="13"
      fontFamily="monospace"
      fontWeight="bold"
    >
      {children}
    </text>
  );
}

function RoundHoles({
  stagger = "none",
}: {
  stagger?: "60" | "45" | "none";
}) {
  const rows = 3;
  const cols = 6;
  const startX = 55;
  const startY = 55;
  const pitchX = 52;
  const pitchY = 42;
  const r = 12;

  const holes: { cx: number; cy: number }[] = [];
  for (let row = 0; row < rows; row++) {
    let offset = 0;
    if (stagger === "60" || stagger === "45") {
      offset = row % 2 === 1 ? pitchX / 2 : 0;
    }
    for (let col = 0; col < cols; col++) {
      holes.push({
        cx: startX + col * pitchX + offset,
        cy: startY + row * pitchY,
      });
    }
  }

  return (
    <>
      {holes.map((h, i) => (
        <circle
          key={i}
          cx={h.cx}
          cy={h.cy}
          r={r}
          fill="#0A0A0A"
          stroke="#E8521A"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

function SquareHoles({ stagger = false }: { stagger?: boolean }) {
  const size = 22;
  const holes: { x: number; y: number }[] = [];
  for (let row = 0; row < 3; row++) {
    const offset = stagger && row % 2 === 1 ? 26 : 0;
    for (let col = 0; col < 6; col++) {
      holes.push({ x: 48 + col * 52 + offset, y: 48 + row * 40 });
    }
  }
  return (
    <>
      {holes.map((h, i) => (
        <rect
          key={i}
          x={h.x}
          y={h.y}
          width={size}
          height={size}
          rx="2"
          fill="#0A0A0A"
          stroke="#E8521A"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

function HexHoles() {
  const hexPoints = (cx: number, cy: number, s: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      pts.push(`${cx + s * Math.cos(angle)},${cy + s * Math.sin(angle)}`);
    }
    return pts.join(" ");
  };
  const centers = [
    [70, 70],
    [122, 70],
    [174, 70],
    [226, 70],
    [278, 70],
    [330, 70],
    [96, 108],
    [148, 108],
    [200, 108],
    [252, 108],
    [304, 108],
    [122, 146],
    [174, 146],
    [226, 146],
    [278, 146],
  ];
  return (
    <>
      {centers.map(([cx, cy], i) => (
        <polygon
          key={i}
          points={hexPoints(cx, cy, 14)}
          fill="#0A0A0A"
          stroke="#E8521A"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

function SlotShape({
  x,
  y,
  w,
  h,
  roundEnd,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  roundEnd: boolean;
}) {
  if (roundEnd) {
    const r = h / 2;
    return (
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        fill="#0A0A0A"
        stroke="#E8521A"
        strokeWidth="1"
      />
    );
  }
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill="#0A0A0A"
      stroke="#E8521A"
      strokeWidth="1"
    />
  );
}

function SlotHoles({
  roundEnd,
  stagger = false,
}: {
  roundEnd: boolean;
  stagger?: boolean;
}) {
  const slots: { x: number; y: number }[] = [];
  for (let row = 0; row < 3; row++) {
    const offset = stagger && row % 2 === 1 ? 55 : 0;
    for (let col = 0; col < 5; col++) {
      slots.push({ x: 45 + col * 68 + offset, y: 52 + row * 38 });
    }
  }
  return (
    <>
      {slots.map((s, i) => (
        <SlotShape key={i} x={s.x} y={s.y} w={48} h={16} roundEnd={roundEnd} />
      ))}
    </>
  );
}

function CalculatorDiagram({ calculatorId }: { calculatorId: number }) {
  const svgProps = {
    viewBox: "0 0 400 200",
    className: "mx-auto h-auto max-h-[220px] w-full",
    role: "img" as const,
  };

  switch (calculatorId) {
    case 1:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <RoundHoles stagger="60" />
          <DimLine x1="55" y1="185" x2="79" y2="185" />
          <VarLabel x="58" y="198">
            D
          </VarLabel>
          <DimLine x1="55" y1="175" x2="107" y2="175" />
          <VarLabel x="72" y="172">
            C
          </VarLabel>
          <path
            d="M 130 130 A 20 20 0 0 1 145 115"
            fill="none"
            stroke="#A0A0A0"
            strokeWidth="1"
          />
          <VarLabel x="148" y="118">
            60°
          </VarLabel>
        </svg>
      );
    case 2:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <RoundHoles stagger="45" />
          <DimLine x1="55" y1="185" x2="79" y2="185" />
          <VarLabel x="58" y="198">
            D
          </VarLabel>
          <DimLine x1="55" y1="175" x2="107" y2="175" />
          <VarLabel x="72" y="172">
            C
          </VarLabel>
          <path
            d="M 130 130 A 20 20 0 0 1 144 112"
            fill="none"
            stroke="#A0A0A0"
            strokeWidth="1"
          />
          <VarLabel x="148" y="112">
            45°
          </VarLabel>
        </svg>
      );
    case 3:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <RoundHoles />
          <DimLine x1="43" y1="67" x2="67" y2="67" />
          <VarLabel x="46" y="62">
            D
          </VarLabel>
          <DimLine x1="43" y1="185" x2="95" y2="185" />
          <VarLabel x="58" y="198">
            C₁
          </VarLabel>
          <DimLine x1="30" y1="55" x2="30" y2="97" />
          <VarLabel x="8" y="80">
            C₂
          </VarLabel>
        </svg>
      );
    case 4:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <SquareHoles />
          <DimLine x1="48" y1="48" x2="70" y2="48" />
          <VarLabel x="50" y="44">
            S
          </VarLabel>
          <DimLine x1="48" y1="185" x2="100" y2="185" />
          <VarLabel x="62" y="198">
            C₁
          </VarLabel>
          <DimLine x1="35" y1="48" x2="35" y2="88" />
          <VarLabel x="12" y="72">
            C₂
          </VarLabel>
        </svg>
      );
    case 5:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <SquareHoles stagger />
          <DimLine x1="48" y1="48" x2="70" y2="48" />
          <VarLabel x="50" y="44">
            S
          </VarLabel>
          <DimLine x1="48" y1="185" x2="100" y2="185" />
          <VarLabel x="62" y="198">
            C₁
          </VarLabel>
          <DimLine x1="35" y1="48" x2="35" y2="88" />
          <VarLabel x="12" y="72">
            C₂
          </VarLabel>
        </svg>
      );
    case 6:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <HexHoles />
          <DimLine x1="56" y1="56" x2="84" y2="56" />
          <VarLabel x="58" y="52">
            S
          </VarLabel>
          <DimLine x1="70" y1="185" x2="122" y2="185" />
          <VarLabel x="82" y="198">
            C
          </VarLabel>
        </svg>
      );
    case 7:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <SlotHoles roundEnd stagger />
          <DimLine x1="45" y1="52" x2="45" y2="68" />
          <VarLabel x="28" y="64">
            W
          </VarLabel>
          <DimLine x1="45" y1="60" x2="93" y2="60" />
          <VarLabel x="58" y="56">
            L
          </VarLabel>
          <DimLine x1="45" y1="185" x2="113" y2="185" />
          <VarLabel x="68" y="198">
            C₁
          </VarLabel>
          <DimLine x1="32" y1="52" x2="32" y2="90" />
          <VarLabel x="10" y="76">
            C₂
          </VarLabel>
        </svg>
      );
    case 8:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <SlotHoles roundEnd />
          <DimLine x1="45" y1="52" x2="45" y2="68" />
          <VarLabel x="28" y="64">
            W
          </VarLabel>
          <DimLine x1="45" y1="60" x2="93" y2="60" />
          <VarLabel x="58" y="56">
            L
          </VarLabel>
          <DimLine x1="45" y1="185" x2="113" y2="185" />
          <VarLabel x="68" y="198">
            C₁
          </VarLabel>
          <DimLine x1="32" y1="52" x2="32" y2="90" />
          <VarLabel x="10" y="76">
            C₂
          </VarLabel>
        </svg>
      );
    case 9:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <SlotHoles roundEnd={false} />
          <DimLine x1="45" y1="52" x2="45" y2="68" />
          <VarLabel x="28" y="64">
            W
          </VarLabel>
          <DimLine x1="45" y1="60" x2="93" y2="60" />
          <VarLabel x="58" y="56">
            L
          </VarLabel>
          <DimLine x1="45" y1="185" x2="113" y2="185" />
          <VarLabel x="68" y="198">
            C₁
          </VarLabel>
          <DimLine x1="32" y1="52" x2="32" y2="90" />
          <VarLabel x="10" y="76">
            C₂
          </VarLabel>
        </svg>
      );
    case 10:
      return (
        <svg {...svgProps}>
          <SheetRect />
          <SlotHoles roundEnd={false} stagger />
          <DimLine x1="45" y1="52" x2="45" y2="68" />
          <VarLabel x="28" y="64">
            W
          </VarLabel>
          <DimLine x1="45" y1="60" x2="93" y2="60" />
          <VarLabel x="58" y="56">
            L
          </VarLabel>
          <DimLine x1="45" y1="185" x2="113" y2="185" />
          <VarLabel x="68" y="198">
            C₁
          </VarLabel>
          <DimLine x1="32" y1="52" x2="32" y2="90" />
          <VarLabel x="10" y="76">
            C₂
          </VarLabel>
        </svg>
      );
    default:
      return null;
  }
}

function RoundIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "#E8521A" : "#666666";
  return (
    <svg viewBox="0 0 40 40" className="mx-auto size-10" aria-hidden>
      <circle cx="20" cy="20" r="12" fill="none" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

function SquareIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "#E8521A" : "#666666";
  return (
    <svg viewBox="0 0 40 40" className="mx-auto size-10" aria-hidden>
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        rx="2"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}

function HexIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "#E8521A" : "#666666";
  return (
    <svg viewBox="0 0 40 40" className="mx-auto size-10" aria-hidden>
      <polygon
        points="20,6 33,14 33,26 20,34 7,26 7,14"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}

function SlotIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "#E8521A" : "#666666";
  return (
    <svg viewBox="0 0 40 40" className="mx-auto size-10" aria-hidden>
      <rect
        x="6"
        y="14"
        width="28"
        height="12"
        rx="6"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}

function HoleShapeIcon({
  shape,
  selected,
}: {
  shape: string;
  selected: boolean;
}) {
  switch (shape) {
    case "round":
      return <RoundIcon selected={selected} />;
    case "square":
      return <SquareIcon selected={selected} />;
    case "hex":
      return <HexIcon selected={selected} />;
    case "slot":
      return <SlotIcon selected={selected} />;
    default:
      return null;
  }
}

const initialState = {
  holeShape: null as HoleShape,
  slotEndType: null as SlotEndType,
  arrangement: null as ArrangementType,
  inputs: {} as Record<string, string>,
  errors: {} as Record<string, string>,
  warnings: {} as Record<string, string>,
  result: null as number | null,
  isCalculating: false,
  hasCalculated: false,
};

export function OpenAreaCalculator() {
  const [holeShape, setHoleShape] = useState<HoleShape>(initialState.holeShape);
  const [slotEndType, setSlotEndType] = useState<SlotEndType>(
    initialState.slotEndType
  );
  const [arrangement, setArrangement] = useState<ArrangementType>(
    initialState.arrangement
  );
  const [inputs, setInputs] = useState<Record<string, string>>(
    initialState.inputs
  );
  const [errors, setErrors] = useState<Record<string, string>>(
    initialState.errors
  );
  const [warnings, setWarnings] = useState<Record<string, string>>(
    initialState.warnings
  );
  const [result, setResult] = useState<number | null>(initialState.result);
  const [isCalculating, setIsCalculating] = useState(initialState.isCalculating);
  const [hasCalculated, setHasCalculated] = useState(initialState.hasCalculated);

  const calculatorId = useMemo(
    () => getCalculatorId(holeShape, slotEndType, arrangement),
    [holeShape, slotEndType, arrangement]
  );

  const config = calculatorId ? CALCULATOR_CONFIG[calculatorId] : null;
  const arrangements = useMemo(
    () => getAvailableArrangements(holeShape, slotEndType),
    [holeShape, slotEndType]
  );

  const showStep2 = holeShape !== null;
  const showSlotEndStep = holeShape === "slot";
  const showArrangementStep =
    holeShape === "hex" ||
    (holeShape === "slot" && slotEndType !== null) ||
    holeShape === "round" ||
    holeShape === "square";

  useEffect(() => {
    if (holeShape === "hex" && arrangement !== "standard") {
      setArrangement("standard");
    }
  }, [holeShape, arrangement]);

  useEffect(() => {
    if (!config) return;
    setInputs((prev) => {
      const next: Record<string, string> = {};
      for (const field of config.fields) {
        next[field.key] = prev[field.key] ?? "";
      }
      return next;
    });
    setResult(null);
    setHasCalculated(false);
    setErrors({});
    setWarnings({});
  }, [calculatorId, config]);

  const handleReset = useCallback(() => {
    setHoleShape(null);
    setSlotEndType(null);
    setArrangement(null);
    setInputs({});
    setErrors({});
    setWarnings({});
    setResult(null);
    setIsCalculating(false);
    setHasCalculated(false);
  }, []);

  const handleRecalculate = useCallback(() => {
    setResult(null);
    setHasCalculated(false);
    setErrors({});
    setWarnings({});
  }, []);

  function selectHoleShape(shape: HoleShape) {
    setHoleShape(shape);
    setSlotEndType(null);
    setArrangement(shape === "hex" ? "standard" : null);
    setResult(null);
    setHasCalculated(false);
    setErrors({});
    setWarnings({});
  }

  function selectSlotEnd(end: SlotEndType) {
    setSlotEndType(end);
    setArrangement(null);
    setResult(null);
    setHasCalculated(false);
  }

  function selectArrangement(id: string) {
    setArrangement(id);
    setResult(null);
    setHasCalculated(false);
  }

  function handleInputChange(key: string, value: string) {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleCalculate() {
    if (!config || !calculatorId) return;

    const fieldErrors: Record<string, string> = {};
    const numeric: Record<string, number> = {};

    for (const field of config.fields) {
      const raw = inputs[field.key]?.trim() ?? "";
      const val = parseFloat(raw);
      if (!raw || Number.isNaN(val) || val <= 0) {
        fieldErrors[field.key] = "Please enter a valid value";
      } else {
        numeric[field.key] = val;
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setWarnings({});
      return;
    }

    setErrors({});
    setWarnings(getInputWarnings(calculatorId, numeric));
    setIsCalculating(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    setResult(config.calculate(numeric));
    setHasCalculated(true);
    setIsCalculating(false);
  }

  const inputSummary = config
    ? config.fields
        .map((f) => {
          const val = inputs[f.key]?.trim();
          if (!val) return null;
          return `${f.variable} = ${val} mm`;
        })
        .filter(Boolean)
        .join(" · ")
    : "";

  const arrangementSelected =
    holeShape === "hex"
      ? arrangement === "standard"
      : holeShape === "slot"
        ? slotEndType !== null && arrangement !== null
        : arrangement !== null;

  const calculatorReady = calculatorId !== null && arrangementSelected;

  const arrangementButtonClass = (selected: boolean) =>
    `flex-1 min-w-[120px] rounded-lg border px-3 text-sm font-medium transition-all h-[52px] ${
      selected
        ? "border-[#E8521A] bg-[#E8521A]/10 text-white"
        : "border-[#2A2A2A] bg-[#111111] text-[#A0A0A0] hover:border-[#E8521A]/50"
    }`;

  return (
    <div
      className="section-padding pt-28 md:pt-32"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-[760px]">
        <div className="mb-10">
          <h1
            className="text-4xl font-black tracking-tight sm:text-5xl"
            style={{ color: "#FFFFFF" }}
          >
            Perforated Sheet Open Area Calculator
          </h1>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "#A0A0A0" }}
          >
            Select your hole shape and arrangement, then enter dimensions to
            calculate open area percentage using industry-standard formulas.
          </p>
        </div>

        <div className="space-y-10">
          {/* Section 1 — Hole Shape */}
          <section>
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#E8521A" }}
            >
              Step 1
            </p>
            <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-2xl font-bold text-white">
                Select Hole Shape
              </h2>
              {holeShape !== null && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm transition-opacity hover:opacity-80"
                  style={{ color: "#A0A0A0" }}
                >
                  ← Start over
                </button>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {HOLE_SHAPES.map((shape) => {
                const selected = holeShape === shape.id;
                return (
                  <button
                    key={shape.id}
                    type="button"
                    onClick={() => selectHoleShape(shape.id as HoleShape)}
                    className={`flex h-[100px] flex-col items-center justify-center rounded-xl border text-center transition-all ${
                      selected
                        ? "border-[#E8521A] bg-[#E8521A]/10 text-white"
                        : "border-[#2A2A2A] bg-[#111111] text-[#A0A0A0] hover:border-[#E8521A]/50"
                    }`}
                  >
                    <HoleShapeIcon shape={shape.id} selected={selected} />
                    <span className="mt-2 block text-sm font-medium">
                      {shape.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 2 — Arrangement */}
          <AnimatePresence>
            {showStep2 && (
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "#E8521A" }}
                >
                  Step 2
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Select Arrangement
                </h2>

                {showSlotEndStep && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-[#A0A0A0]">End Type</p>
                    <div className="flex gap-2">
                      {(
                        [
                          ["round-end", "Round End"],
                          ["square-end", "Square End"],
                        ] as const
                      ).map(([id, label]) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => selectSlotEnd(id)}
                          className={arrangementButtonClass(slotEndType === id)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {holeShape === "hex" && (
                  <p className="mt-4 text-sm" style={{ color: "#666666" }}>
                    Hex perforation uses standard honeycomb arrangement
                  </p>
                )}

                {showArrangementStep &&
                  holeShape !== "hex" &&
                  arrangements.length > 0 && (
                    <div className={showSlotEndStep ? "mt-4" : "mt-4"}>
                      {showSlotEndStep && (
                        <p className="mb-2 text-sm text-[#A0A0A0]">
                          Arrangement
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {arrangements.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => selectArrangement(opt.id)}
                            className={arrangementButtonClass(
                              arrangement === opt.id
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </motion.section>
            )}
          </AnimatePresence>

          {/* Section 3 — Diagram + Formula */}
          <AnimatePresence>
            {calculatorReady && config && calculatorId && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 gap-4 md:grid-cols-[55%_45%]"
              >
                <div className="rounded-xl border border-[#2A2A2A] bg-[#111111] p-5">
                  <motion.div
                    key={calculatorId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CalculatorDiagram calculatorId={calculatorId} />
                  </motion.div>
                </div>
                <div className="rounded-xl border-l-4 border-l-[#E8521A] bg-[#111111] p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#E8521A]">
                    Formula
                  </p>
                  <p className="font-mono text-lg text-white">
                    {config.formulaDisplay}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 4 — Input Fields */}
          <AnimatePresence>
            {calculatorReady && config && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {config.fields.map((field, index) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <label
                      htmlFor={`input-${field.key}`}
                      className="mb-1 block text-sm text-[#A0A0A0]"
                    >
                      {field.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8521A] text-sm font-bold text-white">
                        {field.variable}
                      </span>
                      <Input
                        id={`input-${field.key}`}
                        type="number"
                        step="0.01"
                        min="0.001"
                        placeholder="Enter value in mm"
                        value={inputs[field.key] ?? ""}
                        onChange={(e) =>
                          handleInputChange(field.key, e.target.value)
                        }
                        className={`h-12 flex-1 rounded-lg border bg-[#111111] px-4 py-3 text-white placeholder-[#666666] ${
                          errors[field.key]
                            ? "border-red-500"
                            : "border-[#2A2A2A]"
                        }`}
                      />
                    </div>
                    {errors[field.key] && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors[field.key]}
                      </p>
                    )}
                    {warnings[field.key] && !errors[field.key] && (
                      <p className="mt-1 text-xs text-amber-400">
                        {warnings[field.key]}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 5 — Calculate Button */}
          {calculatorReady && config && (
            <motion.div whileTap={{ scale: 0.98 }} className="mt-6">
              <Button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="h-auto w-full rounded-xl border-0 bg-[#E8521A] py-4 font-semibold text-white hover:bg-[#FF6B35]"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Calculate Open Area"
                )}
              </Button>
            </motion.div>
          )}

          {/* Section 6 — Result */}
          <AnimatePresence>
            {result !== null && hasCalculated && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="mt-4 rounded-xl border border-[#E8521A] bg-[#111111] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#E8521A]">
                  Open Area Result
                </p>
                <p className="mt-2 text-6xl font-black text-[#E8521A]">
                  {result.toFixed(2)}%
                </p>
                {inputSummary && (
                  <p className="mt-2 text-sm text-[#666666]">{inputSummary}</p>
                )}

                {result > 100 && (
                  <div className="mt-3 rounded-lg border border-amber-500 bg-amber-950 p-3 text-sm text-amber-400">
                    Result exceeds 100% — please recheck your input values
                  </div>
                )}
                {result <= 0 && (
                  <div className="mt-3 rounded-lg border border-red-500 bg-red-950/50 p-3 text-sm text-red-400">
                    Invalid result — please check all inputs are positive
                  </div>
                )}

                <div className="mt-5 flex gap-4">
                  <button
                    type="button"
                    onClick={handleRecalculate}
                    className="text-sm text-[#A0A0A0] hover:text-white"
                  >
                    Recalculate
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm text-[#E8521A] hover:text-[#FF6B35]"
                  >
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
