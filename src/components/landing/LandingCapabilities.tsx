"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

type ValuePart = { num: number; pad?: number } | { text: string };

const ROWS: { label: string; parts: ValuePart[] }[] = [
  { label: "Max Perforation", parts: [{ num: 12 }, { text: "mm" }] },
  { label: "Max Laser Cutting", parts: [{ num: 14 }, { text: "mm" }] },
  { label: "Wire Mesh Range", parts: [{ num: 2 }, { text: "—" }, { num: 400 }] },
  { label: "Manufacturing Units", parts: [{ num: 6, pad: 2 }] },
  { label: "Years of Mastery", parts: [{ num: 50 }, { text: "+" }] },
];

function CountNum({ target, pad }: { target: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion() ?? false;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {pad ? String(value).padStart(pad, "0") : value}
    </span>
  );
}

export function LandingCapabilities() {
  const reduceMotion = useReducedMotion() ?? false;

  const reveal = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 40,
      filter: reduceMotion ? "blur(0px)" : "blur(8px)",
    },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { ...SPRING, delay },
  });

  return (
    <section className="bg-[#060606] px-6 py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          {...reveal(0)}
          className="flex items-center justify-center gap-3"
        >
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-orange-500">
            Capability
          </span>
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
        </motion.div>

        <motion.h2
          {...reveal(0.1)}
          className="mt-6 text-center text-5xl font-black tracking-tight md:text-7xl"
        >
          <span className="text-white">Engineered to </span>
          <span className="bg-gradient-to-r from-[#E8521A] via-[#FF6B35] to-[#E8521A] bg-clip-text text-transparent">
            Extremes
          </span>
        </motion.h2>

        {/* Spec rows — reads like a machine's spec plate */}
        <div className="mt-20">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { ...SPRING, delay: i * 0.06 },
              }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="group relative flex flex-col gap-2 border-b border-[#1C1C1C] py-10 md:flex-row md:items-center md:justify-between"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-[#8A8A8A]">
                {row.label}
              </span>

              <span className="text-6xl font-black tabular-nums text-white transition-[color,transform] duration-300 ease-out group-hover:-translate-x-2 group-hover:text-[#E8521A] md:text-8xl">
                {row.parts.map((part, j) =>
                  "num" in part ? (
                    <CountNum key={j} target={part.num} pad={part.pad} />
                  ) : (
                    <span key={j}>{part.text}</span>
                  )
                )}
              </span>

              {/* Orange line draws across on hover */}
              <span
                aria-hidden
                className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-[#E8521A] transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}