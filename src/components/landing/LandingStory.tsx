"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

const MILESTONES = [
  { year: "1970", title: "Founded in Delhi" },
  { year: "1980", title: "Expanded to Perforated Sheets" },
  { year: "1997", title: "Talawade Pune Plant" },
  { year: "2013", title: "Full CNC Upgrade" },
  { year: "2015", title: "Fiber Laser Technology" },
];

const STRENGTHS = [
  "100% privately owned. Zero debt.",
  "In-house R&D for special dies & tooling.",
  "Pan India delivery from Pune & Mumbai.",
];

export function LandingStory() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.5"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[2fr_3fr]">
        {/* ── Left: story + timeline ── */}
        <div>
          <motion.div {...reveal(0)} className="flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-orange-500/40" />
            <span className="text-xs uppercase tracking-[0.25em] text-orange-500">
              Our Story
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.1)}
            className="mt-6 text-4xl font-black tracking-tight md:text-5xl"
          >
            <span className="block text-white">From Delhi, 1970.</span>
            <span className="block text-[#3A3A3A]">
              To India&apos;s Most Trusted.
            </span>
          </motion.h2>

          {/* Timeline with scroll-linked fill */}
          <div ref={timelineRef} className="relative mt-12">
            <div className="absolute left-[2.5px] top-1 h-[calc(100%-0.5rem)] w-px bg-[#1C1C1C]" />
            <motion.div
              className="absolute left-[2.5px] top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-[#E8521A]"
              style={{ scaleY: reduceMotion ? 1 : fill }}
            />
            <div className="flex flex-col gap-8">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : -16 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: { ...SPRING, delay: i * 0.06 },
                  }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  className="relative pl-8"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 h-1.5 w-1.5 bg-[#E8521A]"
                  />
                  <span className="font-mono text-sm text-orange-500">
                    {m.year}
                  </span>
                  <p className="mt-0.5 font-medium text-white">{m.title}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...reveal(0.3)} className="mt-12">
            <Link
              href="/about"
              className="group relative font-medium text-white/80 transition-colors duration-300 hover:text-white"
            >
              Read Full Story →
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── Right: philosophy card ── */}
        <motion.div
          initial={{
            opacity: 0,
            scale: reduceMotion ? 1 : 0.97,
          }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={SPRING}
          className="relative overflow-hidden rounded-3xl border border-[#1C1C1C] bg-[#0C0C0C] p-10 md:p-14"
        >
          {/* Perforation dots */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Orange corner glow */}
          <div
            aria-hidden
            className="absolute bottom-0 right-0 h-80 w-80"
            style={{
              background:
                "radial-gradient(circle at 100% 100%, rgba(232,82,26,0.05), transparent 70%)",
            }}
          />

          <div className="relative">
            <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/5 px-4 py-1.5 text-xs tracking-[0.25em] text-orange-400/90">
              ISO 9001:2015
            </span>

            <blockquote className="mt-10 text-2xl font-bold leading-snug text-white md:text-4xl">
              <span aria-hidden className="text-5xl text-[#E8521A] md:text-6xl">
                &ldquo;
              </span>
              We offer what we promise. And promise only what we can offer.
              <span aria-hidden className="text-[#E8521A]">
                &rdquo;
              </span>
            </blockquote>

            <p className="mt-6 text-sm text-[#8A8A8A]">
              — Jai Shree Group Philosophy
            </p>

            <div className="my-8 border-t border-[#1C1C1C]" />

            <ul className="flex flex-col gap-4">
              {STRENGTHS.map((s) => (
                <li key={s} className="flex items-center gap-3 text-white/80">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 bg-[#E8521A]"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}