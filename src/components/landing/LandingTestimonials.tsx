"use client";

import { Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

const TESTIMONIALS = [
  {
    quote:
      "Excellent quality perforated sheets delivered on time. The bow control is perfect — zero rejections in our assembly line.",
    name: "Rajesh Sharma",
    company: "Tata AutoComp",
  },
  {
    quote:
      "We have been sourcing SS wire mesh from Jai Shree for 8 years. Consistent quality and responsive team.",
    name: "Priya Mehta",
    company: "Piramal Pharma",
  },
  {
    quote:
      "Best expanded metal supplier in Pune. Custom sizes, quick turnaround, and competitive pricing.",
    name: "Amit Kulkarni",
    company: "L&T Construction",
  },
];

export function LandingTestimonials() {
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
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div {...reveal(0)} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-orange-500">
            Testimonials
          </span>
        </motion.div>

        <motion.h2
          {...reveal(0.1)}
          className="mt-6 text-5xl font-black tracking-tight md:text-7xl"
        >
          <span className="text-white">Trusted by </span>
          <span className="text-[#3A3A3A]">Industry Leaders</span>
        </motion.h2>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { ...SPRING, delay: i * 0.08 },
              }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="flex flex-col rounded-2xl border border-[#1C1C1C] bg-[#0C0C0C] p-8 transition-colors duration-300 hover:border-[#E8521A]/30"
            >
              <div
                className="flex gap-1 opacity-90"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-3 w-3 fill-[#E8521A] text-[#E8521A]"
                  />
                ))}
              </div>

              <blockquote className="mt-6 flex-1 leading-relaxed text-white/90">
                {t.quote}
              </blockquote>

              <figcaption className="mt-6 border-t border-[#1C1C1C] pt-5">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="mt-0.5 text-xs text-orange-500/80">{t.company}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}