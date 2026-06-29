"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CALCULATOR_FAQS } from "@/data/calculator-faqs";

type CalcField = {
  key: string;
  label: string;
  variable: string;
};

type CalculatorDefinition = {
  id: string;
  tabLabel: string;
  category: string;
  title: string;
  formulaDisplay: React.ReactNode;
  fields: CalcField[];
  calculate: (inputs: Record<string, number>) => number;
};

const CALCULATORS: CalculatorDefinition[] = [
  {
    id: "calc-round-60-staggered",
    tabLabel: "60° Staggered Round",
    category: "ROUND PERFORATION",
    title: "60° Staggered",
    formulaDisplay: (
      <>
        OA = (D<sup>2</sup> × 90.69) / C<sup>2</sup>
      </>
    ),
    fields: [
      { key: "D", label: "Hole diameter", variable: "D" },
      { key: "C", label: "Pitch", variable: "C" },
    ],
    calculate: ({ D, C }) => (D * D * 90.69) / (C * C),
  },
  {
    id: "calc-round-45-staggered",
    tabLabel: "45° Staggered Round",
    category: "ROUND PERFORATION",
    title: "45° Staggered",
    formulaDisplay: (
      <>
        OA = (D<sup>2</sup> × 78.5) / C<sup>2</sup>
      </>
    ),
    fields: [
      { key: "D", label: "Hole diameter", variable: "D" },
      { key: "C", label: "Pitch", variable: "C" },
    ],
    calculate: ({ D, C }) => (D * D * 78.5) / (C * C),
  },
  {
    id: "calc-round-straight",
    tabLabel: "Straight Line Round",
    category: "ROUND PERFORATION",
    title: "Straight Line",
    formulaDisplay: (
      <>
        OA = (D<sup>2</sup> × 78.5) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "D", label: "Hole diameter", variable: "D" },
      { key: "C1", label: "Pitch 1", variable: "C₁" },
      { key: "C2", label: "Pitch 2", variable: "C₂" },
    ],
    calculate: ({ D, C1, C2 }) => (D * D * 78.5) / (C1 * C2),
  },
  {
    id: "calc-square-straight",
    tabLabel: "Straight Line Square",
    category: "SQUARE PERFORATION",
    title: "Straight Line",
    formulaDisplay: (
      <>
        OA = (S<sup>2</sup> × 100) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "S", label: "Hole size", variable: "S" },
      { key: "C1", label: "Pitch 1", variable: "C₁" },
      { key: "C2", label: "Pitch 2", variable: "C₂" },
    ],
    calculate: ({ S, C1, C2 }) => (S * S * 100) / (C1 * C2),
  },
  {
    id: "calc-square-staggered",
    tabLabel: "Staggered Square",
    category: "SQUARE PERFORATION",
    title: "Staggered",
    formulaDisplay: (
      <>
        OA = (S<sup>2</sup> × 100) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "S", label: "Hole size", variable: "S" },
      { key: "C1", label: "Pitch 1", variable: "C₁" },
      { key: "C2", label: "Pitch 2", variable: "C₂" },
    ],
    calculate: ({ S, C1, C2 }) => (S * S * 100) / (C1 * C2),
  },
  {
    id: "calc-hex",
    tabLabel: "Hex",
    category: "HEX PERFORATION",
    title: "Hexagonal",
    formulaDisplay: (
      <>
        OA = (S<sup>2</sup> × 100) / C<sup>2</sup>
      </>
    ),
    fields: [
      { key: "S", label: "Hole size", variable: "S" },
      { key: "C", label: "Pitch", variable: "C" },
    ],
    calculate: ({ S, C }) => (S * S * 100) / (C * C),
  },
  {
    id: "calc-round-end-slot-side-staggered",
    tabLabel: "Side Staggered Slot",
    category: "ROUND END SLOT",
    title: "Side Staggered",
    formulaDisplay: (
      <>
        OA = (W×L − 0.215×W<sup>2</sup>) × 100 / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "W", label: "Hole width", variable: "W" },
      { key: "L", label: "Hole length", variable: "L" },
      { key: "C1", label: "Pitch 1", variable: "C₁" },
      { key: "C2", label: "Pitch 2", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) =>
      ((W * L - 0.215 * W * W) * 100) / (C1 * C2),
  },
  {
    id: "calc-round-end-slot-straight",
    tabLabel: "Straight Line Slot (Round)",
    category: "ROUND END SLOT",
    title: "Straight Line",
    formulaDisplay: (
      <>
        OA = (W×L − 0.215×W<sup>2</sup>) × 100 / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "W", label: "Hole width", variable: "W" },
      { key: "L", label: "Hole length", variable: "L" },
      { key: "C1", label: "Pitch 1", variable: "C₁" },
      { key: "C2", label: "Pitch 2", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) =>
      ((W * L - 0.215 * W * W) * 100) / (C1 * C2),
  },
  {
    id: "calc-square-end-slot-straight",
    tabLabel: "Straight Line Slot (Square)",
    category: "SQUARE END SLOT",
    title: "Straight Line",
    formulaDisplay: (
      <>
        OA = (W × L × 100) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "W", label: "Hole width", variable: "W" },
      { key: "L", label: "Hole length", variable: "L" },
      { key: "C1", label: "Pitch 1", variable: "C₁" },
      { key: "C2", label: "Pitch 2", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) => (W * L * 100) / (C1 * C2),
  },
  {
    id: "calc-square-end-slot-staggered",
    tabLabel: "Staggered Slot (Square)",
    category: "SQUARE END SLOT",
    title: "Staggered",
    formulaDisplay: (
      <>
        OA = (W × L × 100) / (C<sub>1</sub> × C<sub>2</sub>)
      </>
    ),
    fields: [
      { key: "W", label: "Hole width", variable: "W" },
      { key: "L", label: "Hole length", variable: "L" },
      { key: "C1", label: "Pitch 1", variable: "C₁" },
      { key: "C2", label: "Pitch 2", variable: "C₂" },
    ],
    calculate: ({ W, L, C1, C2 }) => (W * L * 100) / (C1 * C2),
  },
];

function emptyInputs(fields: CalcField[]): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f.key, ""]));
}

function CalculatorCard({
  id,
  category,
  title,
  formulaDisplay,
  fields,
  calculate,
}: CalculatorDefinition) {
  const [inputs, setInputs] = useState(() => emptyInputs(fields));
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  function handleInputChange(key: string, value: string) {
    setInputs((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function handleCalculate() {
    const newErrors: Record<string, boolean> = {};
    const numeric: Record<string, number> = {};

    for (const field of fields) {
      const raw = inputs[field.key]?.trim() ?? "";
      const val = parseFloat(raw);
      if (!raw || Number.isNaN(val) || val <= 0) {
        newErrors[field.key] = true;
      } else {
        numeric[field.key] = val;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setResult(null);
      return;
    }

    setErrors({});
    setResult(calculate(numeric));
    setHasCalculated(true);
  }

  function handleReset() {
    setInputs(emptyInputs(fields));
    setErrors({});
    setResult(null);
    setHasCalculated(false);
  }

  return (
    <article
      id={id}
      className="scroll-mt-36 rounded-xl border p-6 md:p-8"
      style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: "#E8521A" }}
      >
        {category}
      </p>
      <h2
        className="mt-2 text-2xl font-bold"
        style={{ color: "#FFFFFF" }}
      >
        {title}
      </h2>

      <div
        className="mt-5 rounded-lg border px-4 py-3 font-mono text-sm md:text-base"
        style={{
          backgroundColor: "#1A1A1A",
          borderColor: "#E8521A",
          color: "#FFFFFF",
        }}
      >
        {formulaDisplay}
      </div>

      <div className="mt-6 space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={`${id}-${field.key}`}
              className="mb-1.5 block text-sm"
              style={{ color: "#A0A0A0" }}
            >
              {field.label} ({field.variable})
            </label>
            <div className="flex items-center gap-2">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-md text-sm font-bold"
                style={{
                  backgroundColor: "rgba(232, 82, 26, 0.15)",
                  color: "#E8521A",
                }}
              >
                {field.variable}
              </span>
              <Input
                id={`${id}-${field.key}`}
                type="number"
                step="0.01"
                min="0.001"
                placeholder="Enter value in mm"
                value={inputs[field.key]}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className="h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                style={
                  errors[field.key]
                    ? { borderColor: "#ef4444" }
                    : undefined
                }
              />
            </div>
            {errors[field.key] && (
              <p className="mt-1.5 text-sm text-red-400">
                Please enter a valid value
              </p>
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={handleCalculate}
        className="mt-6 h-11 border-0 px-6 text-base font-semibold"
        style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
      >
        Calculate
      </Button>

      <AnimatePresence>
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mt-6"
          >
            <p className="text-base" style={{ color: "#A0A0A0" }}>
              Open Area ={" "}
              <span
                className="text-3xl font-black md:text-4xl"
                style={{ color: "#E8521A" }}
              >
                {result.toFixed(2)}
              </span>{" "}
              %
            </p>
            {result > 100 && (
              <p
                className="mt-3 rounded-lg border px-3 py-2 text-sm"
                style={{
                  borderColor: "#f59e0b",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  color: "#fbbf24",
                }}
              >
                Result exceeds 100% — please recheck inputs
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {hasCalculated && (
        <button
          type="button"
          onClick={handleReset}
          className="mt-4 text-sm underline-offset-2 transition-opacity hover:opacity-80 hover:underline"
          style={{ color: "#A0A0A0" }}
        >
          Reset
        </button>
      )}
    </article>
  );
}

export function OpenAreaCalculator() {
  const [activeTab, setActiveTab] = useState(CALCULATORS[0].id);

  const scrollToCalculator = useCallback((id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <div
      className="section-padding pt-28 md:pt-32"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 max-w-3xl">
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
            Calculate open area percentage using the same 10 industry-standard
            formulas from Jai Shree Group&apos;s technical specifications —
            round, square, hex, and slot perforation patterns.
          </p>
        </div>

        <nav
          className="sticky top-20 z-20 -mx-1 mb-8 border-b pb-4"
          style={{
            backgroundColor: "#0A0A0A",
            borderColor: "#2A2A2A",
          }}
          aria-label="Calculator types"
        >
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CALCULATORS.map((calc) => (
              <button
                key={calc.id}
                type="button"
                onClick={() => scrollToCalculator(calc.id)}
                className="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                style={{
                  borderColor: activeTab === calc.id ? "#E8521A" : "#2A2A2A",
                  backgroundColor:
                    activeTab === calc.id
                      ? "rgba(232, 82, 26, 0.15)"
                      : "#111111",
                  color: activeTab === calc.id ? "#E8521A" : "#A0A0A0",
                }}
              >
                {calc.tabLabel}
              </button>
            ))}
          </div>
        </nav>

        <div className="space-y-8">
          {CALCULATORS.map((calc) => (
            <CalculatorCard key={calc.id} {...calc} />
          ))}
        </div>

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
            Open area is the ratio of the total area of holes to the total
            surface area of a perforated sheet, expressed as a percentage. It
            determines how much air, liquid, or light can pass through the
            sheet. Higher open area means better flow but reduced structural
            strength.
          </p>
        </div>

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
