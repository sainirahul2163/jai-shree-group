"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getAvailableArrangements,
  getCalculatorId,
  getInputWarnings,
  HOLE_SHAPES,
  OPEN_AREA_FORMULAS,
  type HoleShape,
  type SlotEndType,
} from "@/lib/open-area";
import type { PatternLibraryContent } from "@/sites/content/types";

const ProductViewer3D = dynamic(
  () => import("@/components/products/ProductViewer3D").then((m) => m.ProductViewer3D),
  { ssr: false }
);

/** Starting sizes (mm) per formula, so every layout opens with a sensible pattern. */
const DEFAULTS: Record<number, Record<string, number>> = {
  1: { D: 5, C: 8 },
  2: { D: 5, C: 8 },
  3: { D: 5, C1: 8, C2: 8 },
  4: { S: 5, C1: 8, C2: 8 },
  5: { S: 5, C1: 8, C2: 8 },
  6: { S: 6, C: 9 },
  7: { W: 3, L: 15, C1: 6, C2: 20 },
  8: { W: 3, L: 15, C1: 6, C2: 20 },
  9: { W: 3, L: 15, C1: 6, C2: 20 },
  10: { W: 3, L: 15, C1: 6, C2: 20 },
};

type Hole = { x: number; y: number };

/** Hole centres (mm) covering a `width` × `height` window for the chosen layout. */
function holeCentres(id: number, v: Record<string, number>, width: number, height: number): Hole[] {
  const holes: Hole[] = [];
  let dx = 0;
  let dy = 0;
  let rowShift = 0;

  if (id === 1 || id === 6) {
    // 60° staggered: pitch C along the row, rows C·sin60 apart, every other row shifted C/2.
    dx = v.C;
    dy = v.C * Math.sin(Math.PI / 3);
    rowShift = v.C / 2;
  } else if (id === 2) {
    // 45° staggered: a square grid of pitch C turned 45°.
    dx = v.C * Math.SQRT2;
    dy = v.C / Math.SQRT2;
    rowShift = dx / 2;
  } else if (id === 3 || id === 4 || id === 8 || id === 9) {
    dx = v.C1;
    dy = v.C2;
  } else if (id === 5 || id === 7 || id === 10) {
    dx = v.C1;
    dy = v.C2;
    rowShift = v.C1 / 2;
  }
  if (!(dx > 0) || !(dy > 0)) return holes;

  for (let row = 0, y = dy / 2; y < height + dy; row++, y += dy) {
    const shift = row % 2 === 1 ? rowShift : 0;
    for (let x = dx / 2 + shift - dx; x < width + dx; x += dx) {
      holes.push({ x, y });
    }
  }
  return holes;
}

function hexPoints(cx: number, cy: number, acrossFlats: number): string {
  const r = acrossFlats / Math.sqrt(3);
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

function HolePath({
  id,
  hole,
  v,
}: {
  id: number;
  hole: Hole;
  v: Record<string, number>;
}) {
  const fill = "var(--brand)";
  if (id <= 3) return <circle cx={hole.x} cy={hole.y} r={v.D / 2} fill={fill} />;
  if (id === 4 || id === 5) {
    return <rect x={hole.x - v.S / 2} y={hole.y - v.S / 2} width={v.S} height={v.S} fill={fill} />;
  }
  if (id === 6) return <polygon points={hexPoints(hole.x, hole.y, v.S)} fill={fill} />;
  // Slots run along the length (vertical here); round ends for 7–8.
  const rounded = id === 7 || id === 8;
  return (
    <rect
      x={hole.x - v.W / 2}
      y={hole.y - v.L / 2}
      width={v.W}
      height={v.L}
      rx={rounded ? v.W / 2 : 0}
      fill={fill}
    />
  );
}

/** "Hole Diameter (D)" → "hole diameter"; "Pitch 1 (C₁)" → "pitch C₁". */
function fieldName(label: string, variable: string): string {
  const name = label.replace(/\s*\(.*\)$/, "").toLowerCase();
  return /^pitch \d$/.test(name) ? `pitch ${variable}` : name;
}

function formatMm(value: number): string {
  return `${Number(value.toFixed(2))} mm`;
}

export function PatternLibrary({ content }: { content: PatternLibraryContent }) {
  const [shape, setShape] = useState<HoleShape & string>("round");
  const [slotEnd, setSlotEnd] = useState<SlotEndType>("round-end");
  const arrangements = getAvailableArrangements(shape, shape === "slot" ? slotEnd : null);
  const [arrangement, setArrangement] = useState(arrangements[0]?.id ?? null);
  const activeArrangement = arrangements.some((a) => a.id === arrangement)
    ? arrangement
    : arrangements[0]?.id ?? null;

  const formulaId = getCalculatorId(shape, shape === "slot" ? slotEnd : null, activeArrangement);
  const formula = formulaId ? OPEN_AREA_FORMULAS[formulaId] : null;

  const [values, setValues] = useState<Record<number, Record<string, number>>>(DEFAULTS);
  const v = useMemo(
    () => (formulaId ? values[formulaId] : ({} as Record<string, number>)),
    [formulaId, values]
  );

  const valid = formula ? formula.fields.every((f) => v[f.key] > 0) : false;
  const warnings = formulaId && valid ? getInputWarnings(formulaId, v) : {};
  const openArea = formula && valid ? formula.calculate(v) : null;
  const tooHigh = openArea !== null && openArea >= 100;

  const view = useMemo(() => {
    if (!formulaId || !valid) return null;
    const pitch = Math.max(...Object.entries(v).filter(([k]) => k.startsWith("C")).map(([, n]) => n));
    const width = pitch * 7;
    const height = width * 0.6;
    return { width, height, holes: holeCentres(formulaId, v, width, height) };
  }, [formulaId, valid, v]);

  const arrangementLabel = arrangements.find((a) => a.id === activeArrangement)?.label ?? "";
  const shapeLabel =
    shape === "slot"
      ? `${slotEnd === "round-end" ? "Round-end" : "Square-end"} slot`
      : HOLE_SHAPES.find((s) => s.id === shape)?.label ?? shape;
  const summary =
    formula && valid
      ? `${shapeLabel} holes, ${arrangementLabel.toLowerCase()}: ${formula.fields
          .map((f) => `${fieldName(f.label, f.variable)} ${formatMm(v[f.key])}`)
          .join(", ")}${openArea !== null && !tooHigh ? `; open area about ${openArea.toFixed(1)}%` : ""}`
      : "";

  function updateValue(key: string, raw: string) {
    if (!formulaId) return;
    const n = Number(raw);
    setValues((prev) => ({ ...prev, [formulaId]: { ...prev[formulaId], [key]: n } }));
  }

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Controls */}
        <div
          className="rounded-xl border p-6 lg:col-span-2"
          style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
        >
          <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {content.intro}
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Hole shape
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {HOLE_SHAPES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setShape(s.id)}
                aria-pressed={shape === s.id}
                className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                style={{
                  borderColor: shape === s.id ? "var(--brand)" : "var(--border)",
                  backgroundColor:
                    shape === s.id ? "color-mix(in oklab, var(--brand) 15%, transparent)" : "transparent",
                  color: shape === s.id ? "var(--brand-text)" : "var(--text-secondary)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {shape === "slot" && (
            <>
              <p className="mt-5 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Slot ends
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(["round-end", "square-end"] as const).map((end) => (
                  <button
                    key={end}
                    type="button"
                    onClick={() => setSlotEnd(end)}
                    aria-pressed={slotEnd === end}
                    className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      borderColor: slotEnd === end ? "var(--brand)" : "var(--border)",
                      color: slotEnd === end ? "var(--brand-text)" : "var(--text-secondary)",
                    }}
                  >
                    {end === "round-end" ? "Round ends" : "Square ends"}
                  </button>
                ))}
              </div>
            </>
          )}

          <label className="mt-5 block text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Layout
            <select
              value={activeArrangement ?? ""}
              onChange={(e) => setArrangement(e.target.value)}
              className="mt-2 block h-10 w-full rounded-lg border px-3 text-sm font-normal"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              {arrangements.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>

          {formula && (
            <div className="mt-5 grid grid-cols-2 gap-3">
              {formula.fields.map((field) => (
                <label key={field.key} className="block text-sm" style={{ color: "var(--text-secondary)" }}>
                  {field.label}, mm
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    step={0.1}
                    value={Number.isFinite(v[field.key]) ? v[field.key] : ""}
                    onChange={(e) => updateValue(field.key, e.target.value)}
                    className="mt-1.5 block h-10 w-full rounded-lg border px-3 text-sm"
                    style={{
                      backgroundColor: "var(--surface-2)",
                      borderColor: warnings[field.key] ? "var(--destructive)" : "var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                  {warnings[field.key] && (
                    <span className="mt-1 block text-xs" style={{ color: "var(--destructive)" }}>
                      {warnings[field.key]}
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}

          {formula && (
            <p className="mt-4 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {formula.formulaText}
            </p>
          )}
        </div>

        {/* Result */}
        <div className="lg:col-span-3">
          <div
            className="rounded-xl border p-6"
            style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--brand-text)" }}>
                  {content.resultLabel}
                </p>
                <p className="mt-1 text-4xl font-black" style={{ color: "var(--foreground)" }}>
                  {openArea !== null && !tooHigh ? `${openArea.toFixed(1)}%` : "—"}
                </p>
              </div>
              <p className="max-w-xs text-xs" style={{ color: "var(--text-muted)" }}>
                {content.note}
              </p>
            </div>

            {tooHigh && (
              <p className="mt-4 flex items-center gap-2 text-sm" style={{ color: "var(--destructive)" }}>
                <TriangleAlert className="size-4" />
                {content.overlapWarning}
              </p>
            )}

            <div
              className="mt-6 overflow-hidden rounded-lg border"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-2)" }}
            >
              {view ? (
                <svg
                  viewBox={`0 0 ${view.width} ${view.height}`}
                  className="block h-auto w-full"
                  role="img"
                  aria-label={summary}
                >
                  {view.holes.map((hole, index) => (
                    <HolePath key={index} id={formulaId!} hole={hole} v={v} />
                  ))}
                </svg>
              ) : (
                <div className="flex aspect-[5/3] items-center justify-center text-sm" style={{ color: "var(--text-muted)" }}>
                  {content.emptyText}
                </div>
              )}
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
              {content.drawingCaption}
            </p>

            {summary && (
              <p className="mt-5 text-sm" style={{ color: "var(--text-secondary)" }}>
                {summary}
              </p>
            )}

            <Button
              asChild
              size="lg"
              className="mt-6 border-0 font-semibold"
              style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
            >
              <Link href={summary ? `/get-quote?pattern=${encodeURIComponent(summary)}` : "/get-quote"}>
                {content.requestLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {content.previewLabel}
            </p>
            <ProductViewer3D variant="sheet" height={360} />
          </div>
        </div>
      </div>
    </section>
  );
}
