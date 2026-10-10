/**
 * Open-area (OA %) formulas for perforated sheets, used by the calculator.
 * Pure data and functions; the JSX formula displays stay in
 * `src/components/calculator/OpenAreaCalculator.tsx`.
 */

export type HoleShape = "round" | "square" | "hex" | "slot" | null;
export type SlotEndType = "round-end" | "square-end" | null;
export type ArrangementType = string | null;

export type InputFieldDef = {
  key: string;
  label: string;
  variable: string;
};

export type OpenAreaFormula = {
  id: number;
  name: string;
  formulaText: string;
  fields: InputFieldDef[];
  calculate: (v: Record<string, number>) => number;
};

export const OPEN_AREA_FORMULAS: Record<number, OpenAreaFormula> = {
  1: {
    id: 1,
    name: "Round Perforation — 60° Staggered",
    formulaText: "OA = (D² × 90.69) / C²",
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
    fields: [
      { key: "W", label: "Hole Width (W)", variable: "W" },
      { key: "L", label: "Hole Length (L)", variable: "L" },
      { key: "C1", label: "Pitch 1 (C₁)", variable: "C₁" },
      { key: "C2", label: "Pitch 2 (C₂)", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) => (W * L * 100) / (C1 * C2),
  },
};

export const HOLE_SHAPES: { id: HoleShape & string; label: string }[] = [
  { id: "round", label: "Round" },
  { id: "square", label: "Square" },
  { id: "hex", label: "Hex" },
  { id: "slot", label: "Slot" },
];

export function getAvailableArrangements(
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

export function getCalculatorId(
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

export function getInputWarnings(
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
