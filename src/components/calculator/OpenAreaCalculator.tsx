"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getAvailableArrangements,
  getCalculatorId,
  getInputWarnings,
  HOLE_SHAPES,
  OPEN_AREA_FORMULAS,
  type ArrangementType,
  type HoleShape,
  type SlotEndType,
} from "@/lib/open-area";

const FORMULA_DISPLAY: Record<number, React.ReactNode> = {
  1: (
    <>
      OA = (D<sup>2</sup> × 90.69) / C<sup>2</sup>
    </>
  ),
  2: (
    <>
      OA = (D<sup>2</sup> × 78.5) / C<sup>2</sup>
    </>
  ),
  3: (
    <>
      OA = (D<sup>2</sup> × 78.5) / (C<sub>1</sub> × C<sub>2</sub>)
    </>
  ),
  4: (
    <>
      OA = (S<sup>2</sup> × 100) / (C<sub>1</sub> × C<sub>2</sub>)
    </>
  ),
  5: (
    <>
      OA = (S<sup>2</sup> × 100) / (C<sub>1</sub> × C<sub>2</sub>)
    </>
  ),
  6: (
    <>
      OA = (S<sup>2</sup> × 100) / C<sup>2</sup>
    </>
  ),
  7: (
    <>
      OA = (WL − 0.215W<sup>2</sup>) × 100 / (C<sub>1</sub> × C<sub>2</sub>)
    </>
  ),
  8: (
    <>
      OA = (WL − 0.215W<sup>2</sup>) × 100 / (C<sub>1</sub> × C<sub>2</sub>)
    </>
  ),
  9: (
    <>
      OA = (W × L × 100) / (C<sub>1</sub> × C<sub>2</sub>)
    </>
  ),
  10: (
    <>
      OA = (W × L × 100) / (C<sub>1</sub> × C<sub>2</sub>)
    </>
  ),
};

function SheetRect() {
  return (
    <rect
      x="20"
      y="30"
      width="360"
      height="140"
      fill="var(--surface-2)"
      stroke="var(--brand-text)"
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
      stroke="var(--text-muted)"
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
      fill="var(--brand-text)"
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
          fill="var(--background)"
          stroke="var(--brand-text)"
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
          fill="var(--background)"
          stroke="var(--brand-text)"
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
          fill="var(--background)"
          stroke="var(--brand-text)"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

function SlotSheetRect() {
  return (
    <rect
      x="40"
      y="30"
      width="320"
      height="150"
      fill="var(--surface-2)"
      stroke="var(--brand-text)"
      strokeWidth="1.5"
      rx="4"
    />
  );
}

const SLOT_LENGTH = 70;
const SLOT_WIDTH = 24;
const SLOT_RX = SLOT_WIDTH / 2;

type SlotLayout = "side-staggered" | "straight-line";

function getSlotPositions(layout: SlotLayout): { x: number; y: number }[] {
  const row1 = [
    { x: 55, y: 55 },
    { x: 143, y: 55 },
    { x: 231, y: 55 },
  ];
  const row2Straight = [
    { x: 55, y: 97 },
    { x: 143, y: 97 },
    { x: 231, y: 97 },
  ];
  const row2Stagger = [
    { x: 99, y: 97 },
    { x: 187, y: 97 },
  ];
  const row3 = [
    { x: 55, y: 139 },
    { x: 143, y: 139 },
    { x: 231, y: 139 },
  ];

  if (layout === "straight-line") {
    return [...row1, ...row2Straight, ...row3];
  }
  return [...row1, ...row2Stagger, ...row3];
}

function SlotShape({
  x,
  y,
  roundEnd,
}: {
  x: number;
  y: number;
  roundEnd: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={SLOT_LENGTH}
      height={SLOT_WIDTH}
      rx={roundEnd ? SLOT_RX : 0}
      ry={roundEnd ? SLOT_RX : 0}
      fill="rgba(0,0,0,0.6)"
      stroke="var(--brand-text)"
      strokeWidth="1.2"
    />
  );
}

function SlotDiagramSlots({
  clipId,
  layout,
  roundEnd,
}: {
  clipId: string;
  layout: SlotLayout;
  roundEnd: boolean;
}) {
  const slots = getSlotPositions(layout);
  return (
    <g clipPath={`url(#${clipId})`}>
      {slots.map((s, i) => (
        <SlotShape key={i} x={s.x} y={s.y} roundEnd={roundEnd} />
      ))}
    </g>
  );
}

function SlotDimLabels() {
  return (
    <>
      <DimLine x1="42" y1="55" x2="42" y2="79" />
      <text
        x="28"
        y="70"
        fill="var(--brand-text)"
        fontSize="11"
        fontFamily="monospace"
        fontWeight="bold"
      >
        W
      </text>
      <DimLine x1="55" y1="48" x2="125" y2="48" />
      <text
        x="82"
        y="44"
        fill="var(--brand-text)"
        fontSize="11"
        fontFamily="monospace"
        fontWeight="bold"
      >
        L
      </text>
      <DimLine x1="90" y1="185" x2="178" y2="185" />
      <text
        x="124"
        y="198"
        fill="var(--brand-text)"
        fontSize="11"
        fontFamily="monospace"
        fontWeight="bold"
      >
        C₁
      </text>
      <DimLine x1="32" y1="67" x2="32" y2="109" />
      <text
        x="10"
        y="92"
        fill="var(--brand-text)"
        fontSize="11"
        fontFamily="monospace"
        fontWeight="bold"
      >
        C₂
      </text>
    </>
  );
}

function SlotDiagram({
  clipId,
  layout,
  roundEnd,
}: {
  clipId: string;
  layout: SlotLayout;
  roundEnd: boolean;
}) {
  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x="40" y="30" width="320" height="150" />
        </clipPath>
      </defs>
      <SlotSheetRect />
      <SlotDiagramSlots clipId={clipId} layout={layout} roundEnd={roundEnd} />
      <SlotDimLabels />
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
            stroke="var(--text-secondary)"
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
            stroke="var(--text-secondary)"
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
          <SlotDiagram
            clipId="clip7"
            layout="side-staggered"
            roundEnd
          />
        </svg>
      );
    case 8:
      return (
        <svg {...svgProps}>
          <SlotDiagram
            clipId="clip8"
            layout="straight-line"
            roundEnd
          />
        </svg>
      );
    case 9:
      return (
        <svg {...svgProps}>
          <SlotDiagram
            clipId="clip9"
            layout="straight-line"
            roundEnd={false}
          />
        </svg>
      );
    case 10:
      return (
        <svg {...svgProps}>
          <SlotDiagram
            clipId="clip10"
            layout="side-staggered"
            roundEnd={false}
          />
        </svg>
      );
    default:
      return null;
  }
}

function RoundIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "var(--brand-text)" : "var(--text-muted)";
  return (
    <svg viewBox="0 0 40 40" className="mx-auto size-10" aria-hidden>
      <circle cx="20" cy="20" r="12" fill="none" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

function SquareIcon({ selected }: { selected: boolean }) {
  const stroke = selected ? "var(--brand-text)" : "var(--text-muted)";
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
  const stroke = selected ? "var(--brand-text)" : "var(--text-muted)";
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
  const stroke = selected ? "var(--brand-text)" : "var(--text-muted)";
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

  const config = calculatorId ? OPEN_AREA_FORMULAS[calculatorId] : null;
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
        ? "border-brand bg-brand/10 text-foreground"
        : "border-border bg-surface text-text-secondary hover:border-brand/50"
    }`;

  return (
    <div
      className="section-padding pt-28 md:pt-32"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-[760px]">
        <div className="mb-10">
          <h1
            className="text-4xl font-black tracking-tight sm:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            Perforated Sheet Open Area Calculator
          </h1>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
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
              style={{ color: "var(--brand-text)" }}
            >
              Step 1
            </p>
            <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-2xl font-bold text-foreground">
                Select Hole Shape
              </h2>
              {holeShape !== null && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm transition-opacity hover:opacity-80"
                  style={{ color: "var(--text-secondary)" }}
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
                        ? "border-brand bg-brand/10 text-foreground"
                        : "border-border bg-surface text-text-secondary hover:border-brand/50"
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
                  style={{ color: "var(--brand-text)" }}
                >
                  Step 2
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Select Arrangement
                </h2>

                {showSlotEndStep && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-text-secondary">End Type</p>
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
                  <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
                    Hex perforation uses standard honeycomb arrangement
                  </p>
                )}

                {showArrangementStep &&
                  holeShape !== "hex" &&
                  arrangements.length > 0 && (
                    <div className={showSlotEndStep ? "mt-4" : "mt-4"}>
                      {showSlotEndStep && (
                        <p className="mb-2 text-sm text-text-secondary">
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
                <div className="rounded-xl border border-border bg-surface p-5">
                  <motion.div
                    key={calculatorId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CalculatorDiagram calculatorId={calculatorId} />
                  </motion.div>
                </div>
                <div className="rounded-xl border-l-4 border-l-brand bg-surface p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-text">
                    Formula
                  </p>
                  <p className="font-mono text-lg text-foreground">
                    {FORMULA_DISPLAY[config.id]}
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
                      className="mb-1 block text-sm text-text-secondary"
                    >
                      {field.label}
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-brand-foreground">
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
                        className={`h-12 flex-1 rounded-lg border bg-surface px-4 py-3 text-foreground placeholder-[var(--text-muted)] ${
                          errors[field.key]
                            ? "border-red-500"
                            : "border-border"
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
                className="h-auto w-full rounded-xl border-0 bg-brand py-4 font-semibold text-brand-foreground hover:bg-brand-hover"
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
                className="mt-4 rounded-xl border border-brand bg-surface p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                  Open Area Result
                </p>
                <p className="mt-2 text-6xl font-black text-brand-text">
                  {result.toFixed(2)}%
                </p>
                {inputSummary && (
                  <p className="mt-2 text-sm text-text-muted">{inputSummary}</p>
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
                    className="text-sm text-text-secondary hover:text-foreground"
                  >
                    Recalculate
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm text-brand-text hover:text-brand-hover"
                  >
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 rounded-xl border border-border bg-surface p-6 text-center">
            <p className="mb-1 text-sm text-text-secondary">
              Know your specifications?
            </p>
            <p className="mb-4 font-semibold text-foreground">
              Get an instant quote from our team
            </p>
            <Link
              href="/get-quote"
              className="inline-block rounded-lg bg-brand px-8 py-3 font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
            >
              Get a Free Quote →
            </Link>
            <p className="mt-3 text-xs text-text-muted">
              Usually responds within 2 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
