"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CALCULATOR_FAQS } from "@/data/calculator-faqs";

type HoleShape = "round" | "square" | "rectangular" | "capsule";
type PitchType = "triangular" | "rectangular" | "staggered";

const FORMULAS = [
  {
    id: 1,
    shape: "Round",
    pitch: "Triangular (60°)",
    formula: "Open Area % = R² × 90.69 / T²",
    note: "R = hole radius (mm), T = pitch (mm)",
  },
  {
    id: 2,
    shape: "Round",
    pitch: "Rectangular",
    formula: "Open Area % = R² × 78.5 / (U1 × U2)",
    note: "R = hole radius (mm), U1 × U2 = pitch (mm)",
  },
  {
    id: 3,
    shape: "Square",
    pitch: "Rectangular",
    formula: "Open Area % = C² × 100 / (U1 × U2)",
    note: "C = hole side (mm), U1 × U2 = pitch (mm)",
  },
  {
    id: 4,
    shape: "Round",
    pitch: "Staggered",
    formula: "Open Area % = C² × 100 / (0.5 × Z1 × Z2)",
    note: "C = hole diameter (mm), Z1 × Z2 = staggered pitch (mm)",
  },
  {
    id: 5,
    shape: "Capsule",
    pitch: "Staggered",
    formula: "Open Area % = (R × L − 0.215R²) × 100 / (0.5 × Z1 × Z2)",
    note: "R = capsule radius, L = slot length (mm)",
  },
  {
    id: 6,
    shape: "Rectangular",
    pitch: "Staggered",
    formula: "Open Area % = 100 × L × C / (0.5 × Z1 × Z2)",
    note: "L × C = hole dimensions (mm), Z1 × Z2 = pitch (mm)",
  },
];

function getPitchOptions(shape: HoleShape): PitchType[] {
  switch (shape) {
    case "round":
      return ["triangular", "rectangular", "staggered"];
    case "square":
      return ["rectangular"];
    case "rectangular":
    case "capsule":
      return ["staggered"];
    default:
      return ["triangular"];
  }
}

function calculateOpenArea(
  shape: HoleShape,
  pitch: PitchType,
  values: Record<string, number>
): { percent: number; formula: string } | null {
  const { R, T, U1, U2, C, L, Z1, Z2 } = values;

  switch (shape) {
    case "round":
      if (pitch === "triangular" && R && T) {
        return {
          percent: (R * R * 90.69) / (T * T),
          formula: "R² × 90.69 / T²",
        };
      }
      if (pitch === "rectangular" && R && U1 && U2) {
        return {
          percent: (R * R * 78.5) / (U1 * U2),
          formula: "R² × 78.5 / (U1 × U2)",
        };
      }
      if (pitch === "staggered" && C && Z1 && Z2) {
        return {
          percent: (C * C * 100) / (0.5 * Z1 * Z2),
          formula: "C² × 100 / (0.5 × Z1 × Z2)",
        };
      }
      break;
    case "square":
      if (pitch === "rectangular" && C && U1 && U2) {
        return {
          percent: (C * C * 100) / (U1 * U2),
          formula: "C² × 100 / (U1 × U2)",
        };
      }
      break;
    case "rectangular":
      if (pitch === "staggered" && L && C && Z1 && Z2) {
        return {
          percent: (100 * L * C) / (0.5 * Z1 * Z2),
          formula: "100 × L × C / (0.5 × Z1 × Z2)",
        };
      }
      break;
    case "capsule":
      if (pitch === "staggered" && R && L && Z1 && Z2) {
        return {
          percent: ((R * L - 0.215 * R * R) * 100) / (0.5 * Z1 * Z2),
          formula: "(R × L − 0.215R²) × 100 / (0.5 × Z1 × Z2)",
        };
      }
      break;
  }
  return null;
}

function getInterpretation(percent: number): string {
  if (percent >= 50) return "Good for filtration — high flow capacity";
  if (percent >= 25) return "Standard architectural — balanced strength and openness";
  return "High strength — lower open area, greater structural integrity";
}

function NumInput({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div>
      <Label htmlFor={id} style={{ color: "#A0A0A0" }}>
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
      />
    </div>
  );
}

export function OpenAreaCalculator() {
  const [shape, setShape] = useState<HoleShape>("round");
  const [pitch, setPitch] = useState<PitchType>("triangular");
  const [inputs, setInputs] = useState<Record<string, string>>({
    R: "",
    T: "",
    U1: "",
    U2: "",
    C: "",
    L: "",
    Z1: "",
    Z2: "",
  });
  const [result, setResult] = useState<{
    percent: number;
    formula: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const pitchOptions = useMemo(() => getPitchOptions(shape), [shape]);

  function handleShapeChange(s: HoleShape) {
    setShape(s);
    const options = getPitchOptions(s);
    setPitch(options[0]);
    setResult(null);
  }

  function setInput(key: string, val: string) {
    setInputs((prev) => ({ ...prev, [key]: val }));
  }

  function handleCalculate() {
    const numeric: Record<string, number> = {};
    for (const [k, v] of Object.entries(inputs)) {
      numeric[k] = parseFloat(v) || 0;
    }
    setResult(calculateOpenArea(shape, pitch, numeric));
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(
      `Open Area: ${result.percent.toFixed(1)}% (${result.formula})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="section-padding pt-28 md:pt-32"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <h1
            className="text-4xl font-black tracking-tight sm:text-5xl"
            style={{ color: "#FFFFFF" }}
          >
            Perforated Sheet Open Area Calculator
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "#A0A0A0" }}>
            Calculate the open area percentage of perforated sheets based on hole
            shape, size, and pitch arrangement. Uses standard industry formulas
            from Jai Shree Group&apos;s technical specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Calculator panel */}
          <div
            className="rounded-xl border p-6"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <h2
              className="mb-4 text-lg font-bold"
              style={{ color: "#FFFFFF" }}
            >
              Hole Shape
            </h2>
            <div className="mb-6 flex flex-wrap gap-2">
              {(
                [
                  ["round", "Round"],
                  ["square", "Square"],
                  ["rectangular", "Rectangular"],
                  ["capsule", "Capsule"],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleShapeChange(val)}
                  className="rounded-lg border px-4 py-2 text-base font-medium transition-colors"
                  style={{
                    borderColor: shape === val ? "#E8521A" : "#2A2A2A",
                    backgroundColor:
                      shape === val ? "rgba(232,82,26,0.15)" : "#0A0A0A",
                    color: shape === val ? "#E8521A" : "#A0A0A0",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <h2
              className="mb-4 text-lg font-bold"
              style={{ color: "#FFFFFF" }}
            >
              Pitch Type
            </h2>
            <div className="mb-6 flex flex-wrap gap-2">
              {pitchOptions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPitch(p);
                    setResult(null);
                  }}
                  className="rounded-lg border px-4 py-2 text-base capitalize transition-colors"
                  style={{
                    borderColor: pitch === p ? "#E8521A" : "#2A2A2A",
                    backgroundColor:
                      pitch === p ? "rgba(232,82,26,0.15)" : "#0A0A0A",
                    color: pitch === p ? "#E8521A" : "#A0A0A0",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {shape === "round" && pitch === "triangular" && (
                <>
                  <NumInput
                    id="R"
                    label="Hole Radius R (mm)"
                    value={inputs.R}
                    onChange={(v) => setInput("R", v)}
                  />
                  <NumInput
                    id="T"
                    label="Pitch T (mm)"
                    value={inputs.T}
                    onChange={(v) => setInput("T", v)}
                  />
                </>
              )}
              {shape === "round" && pitch === "rectangular" && (
                <>
                  <NumInput
                    id="R"
                    label="Hole Radius R (mm)"
                    value={inputs.R}
                    onChange={(v) => setInput("R", v)}
                  />
                  <NumInput
                    id="U1"
                    label="Pitch U1 (mm)"
                    value={inputs.U1}
                    onChange={(v) => setInput("U1", v)}
                  />
                  <NumInput
                    id="U2"
                    label="Pitch U2 (mm)"
                    value={inputs.U2}
                    onChange={(v) => setInput("U2", v)}
                  />
                </>
              )}
              {shape === "round" && pitch === "staggered" && (
                <>
                  <NumInput
                    id="C"
                    label="Hole Diameter C (mm)"
                    value={inputs.C}
                    onChange={(v) => setInput("C", v)}
                  />
                  <NumInput
                    id="Z1"
                    label="Pitch Z1 (mm)"
                    value={inputs.Z1}
                    onChange={(v) => setInput("Z1", v)}
                  />
                  <NumInput
                    id="Z2"
                    label="Pitch Z2 (mm)"
                    value={inputs.Z2}
                    onChange={(v) => setInput("Z2", v)}
                  />
                </>
              )}
              {shape === "square" && (
                <>
                  <NumInput
                    id="C"
                    label="Hole Size C (mm)"
                    value={inputs.C}
                    onChange={(v) => setInput("C", v)}
                  />
                  <NumInput
                    id="U1"
                    label="Pitch U1 (mm)"
                    value={inputs.U1}
                    onChange={(v) => setInput("U1", v)}
                  />
                  <NumInput
                    id="U2"
                    label="Pitch U2 (mm)"
                    value={inputs.U2}
                    onChange={(v) => setInput("U2", v)}
                  />
                </>
              )}
              {shape === "rectangular" && (
                <>
                  <NumInput
                    id="L"
                    label="Hole Length L (mm)"
                    value={inputs.L}
                    onChange={(v) => setInput("L", v)}
                  />
                  <NumInput
                    id="C"
                    label="Hole Width C (mm)"
                    value={inputs.C}
                    onChange={(v) => setInput("C", v)}
                  />
                  <NumInput
                    id="Z1"
                    label="Pitch Z1 (mm)"
                    value={inputs.Z1}
                    onChange={(v) => setInput("Z1", v)}
                  />
                  <NumInput
                    id="Z2"
                    label="Pitch Z2 (mm)"
                    value={inputs.Z2}
                    onChange={(v) => setInput("Z2", v)}
                  />
                </>
              )}
              {shape === "capsule" && (
                <>
                  <NumInput
                    id="R"
                    label="Capsule Radius R (mm)"
                    value={inputs.R}
                    onChange={(v) => setInput("R", v)}
                  />
                  <NumInput
                    id="L"
                    label="Slot Length L (mm)"
                    value={inputs.L}
                    onChange={(v) => setInput("L", v)}
                  />
                  <NumInput
                    id="Z1"
                    label="Pitch Z1 (mm)"
                    value={inputs.Z1}
                    onChange={(v) => setInput("Z1", v)}
                  />
                  <NumInput
                    id="Z2"
                    label="Pitch Z2 (mm)"
                    value={inputs.Z2}
                    onChange={(v) => setInput("Z2", v)}
                  />
                </>
              )}
            </div>

            <Button
              onClick={handleCalculate}
              className="mt-6 h-11 w-full border-0 text-base font-semibold"
              style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
            >
              Calculate Open Area
            </Button>
          </div>

          {/* Results panel */}
          <div
            className="rounded-xl border p-6"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <h2
              className="mb-6 text-lg font-bold"
              style={{ color: "#FFFFFF" }}
            >
              Results
            </h2>

            {result ? (
              <>
                <p
                  className="text-5xl font-black"
                  style={{ color: "#E8521A" }}
                >
                  {result.percent.toFixed(1)}%
                </p>
                <p className="mt-1 text-base" style={{ color: "#A0A0A0" }}>
                  Open Area
                </p>

                <div
                  className="mt-6 rounded-lg border p-4 font-mono text-base"
                  style={{
                    borderColor: "#2A2A2A",
                    backgroundColor: "#0A0A0A",
                    color: "#FFFFFF",
                  }}
                >
                  {result.formula}
                </div>

                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "#A0A0A0" }}
                >
                  {getInterpretation(result.percent)}
                </p>

                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="mt-6 border-[#2A2A2A] text-white"
                >
                  {copied ? (
                    <Check className="size-4" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                  {copied ? "Copied!" : "Copy Result"}
                </Button>
              </>
            ) : (
              <p className="text-base" style={{ color: "#666666" }}>
                Enter dimensions and click Calculate to see open area percentage.
              </p>
            )}
          </div>
        </div>

        {/* What is Open Area */}
        <div
          className="mt-16 rounded-xl border p-8"
          style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
        >
          <h2
            className="mb-4 text-2xl font-bold"
            style={{ color: "#FFFFFF" }}
          >
            What is Open Area?
          </h2>
          <p
            className="text-base leading-relaxed"
            style={{ color: "#A0A0A0" }}
          >
            Open area is the ratio of the total area of holes to the total surface
            area of a perforated sheet, expressed as a percentage. It determines
            how much air, liquid, or light can pass through the sheet. Higher open
            area means better flow but reduced structural strength. Selecting the
            right open area depends on your application — filtration requires high
            open area while load-bearing applications need lower open area.
          </p>
        </div>

        {/* Formula table */}
        <div className="mt-12">
          <h2
            className="mb-6 text-2xl font-bold"
            style={{ color: "#FFFFFF" }}
          >
            Formula Reference
          </h2>
          <div
            className="overflow-x-auto rounded-xl border"
            style={{ borderColor: "#2A2A2A" }}
          >
            <table className="w-full min-w-[600px] text-base">
              <thead>
                <tr style={{ backgroundColor: "#1A1A1A" }}>
                  <th
                    className="px-4 py-3 text-left font-semibold"
                    style={{ color: "#FFFFFF" }}
                  >
                    Hole Shape
                  </th>
                  <th
                    className="px-4 py-3 text-left font-semibold"
                    style={{ color: "#FFFFFF" }}
                  >
                    Pitch
                  </th>
                  <th
                    className="px-4 py-3 text-left font-semibold"
                    style={{ color: "#FFFFFF" }}
                  >
                    Formula
                  </th>
                </tr>
              </thead>
              <tbody>
                {FORMULAS.map((f, i) => (
                  <tr
                    key={f.id}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#111111" : "#0A0A0A",
                    }}
                  >
                    <td
                      className="px-4 py-3"
                      style={{ color: "#FFFFFF" }}
                    >
                      {f.shape}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ color: "#A0A0A0" }}
                    >
                      {f.pitch}
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-sm"
                      style={{ color: "#E8521A" }}
                    >
                      {f.formula}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl">
          <h2
            className="mb-6 text-2xl font-bold"
            style={{ color: "#FFFFFF" }}
          >
            Open Area FAQ
          </h2>
          <Accordion type="single" collapsible>
            {CALCULATOR_FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`calc-faq-${i}`}
                className="border-[#2A2A2A]"
              >
                <AccordionTrigger
                  className="text-base"
                  style={{ color: "#FFFFFF" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-base"
                  style={{ color: "#A0A0A0" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
