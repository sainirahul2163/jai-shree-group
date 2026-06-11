"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

const STEPS = [
  { num: "01", title: "Submit Enquiry", desc: "Share your requirements" },
  { num: "02", title: "Review & Drawing", desc: "We review specs and drawings" },
  { num: "03", title: "Material Selection", desc: "Best metal for your use" },
  { num: "04", title: "CNC Manufacturing", desc: "Precision CNC production" },
  { num: "05", title: "QC & Delivery", desc: "Inspection + Pan India delivery" },
];

export function LandingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [activeCount, setActiveCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.5"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Step i (0-indexed) activates when fill passes its dot at i/(n-1)
    const n = STEPS.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
      if (v >= i / (n - 1) - 0.02) count = i + 1;
    }
    setActiveCount(reduceMotion ? n : count);
  });

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
    <section
      ref={sectionRef}
      className="border-y border-[#1C1C1C] bg-[#0C0C0C] px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div {...reveal(0)} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-orange-500">
            How It Works
          </span>
        </motion.div>

        <motion.h2
          {...reveal(0.1)}
          className="mt-6 text-5xl font-black tracking-tight md:text-7xl"
        >
          <span className="block text-white">Five Steps.</span>
          <span className="block text-[#3A3A3A]">Zero Compromise.</span>
        </motion.h2>

        {/* ── Desktop: horizontal timeline ── */}
        <div className="mt-20 hidden md:block">
          {/* Ghost numbers row */}
          <div className="grid grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <span
                key={step.num}
                className={`text-7xl font-black leading-none transition-colors duration-500 ${
                  i < activeCount ? "text-[#E8521A]/20" : "text-white/[0.06]"
                }`}
              >
                {step.num}
              </span>
            ))}
          </div>

          {/* Line + dots */}
          <div className="relative mt-8 h-2">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#1C1C1C]" />
            <motion.div
              className="absolute left-0 top-1/2 h-px w-full origin-left -translate-y-1/2 bg-[#E8521A]"
              style={{ scaleX: reduceMotion ? 1 : fill }}
            />
            <div className="absolute inset-0 grid grid-cols-5 gap-6">
              {STEPS.map((step, i) => (
                <div key={step.num} className="relative">
                  <span
                    className={`absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                      i < activeCount
                        ? "scale-[1.4] bg-[#E8521A] shadow-[0_0_12px_rgba(232,82,26,0.6)]"
                        : "bg-[#3A3A3A]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Titles + descriptions */}
          <div className="mt-8 grid grid-cols-5 gap-6">
            {STEPS.map((step) => (
              <div key={step.num}>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="relative mt-16 md:hidden">
          <div className="absolute left-[3px] top-0 h-full w-px bg-[#1C1C1C]" />
          <motion.div
            className="absolute left-[3px] top-0 h-full w-px origin-top bg-[#E8521A]"
            style={{ scaleY: reduceMotion ? 1 : fill }}
          />
          <div className="flex flex-col gap-12">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative pl-10">
                <span
                  className={`absolute left-0 top-1.5 h-2 w-2 rounded-full transition-all duration-500 ${
                    i < activeCount
                      ? "scale-[1.4] bg-[#E8521A] shadow-[0_0_12px_rgba(232,82,26,0.6)]"
                      : "bg-[#3A3A3A]"
                  }`}
                />
                <span
                  className={`text-5xl font-black leading-none transition-colors duration-500 ${
                    i < activeCount ? "text-[#E8521A]/20" : "text-white/[0.06]"
                  }`}
                >
                  {step.num}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#8A8A8A]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}