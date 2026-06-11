"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

const HEADLINE_LINES = [
  { text: "PRECISION", className: "text-[#FAFAFA]" },
  { text: "IN EVERY", className: "text-[#3A3A3A]" },
  {
    text: "PERFORATION",
    className:
      "bg-gradient-to-r from-[#E8521A] via-[#FF6B35] to-[#E8521A] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(232,82,26,0.25)]",
  },
] as const;

export function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Spotlight position — heavy, liquid lag via spring (damping 50)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 100, damping: 50 });
  const y = useSpring(rawY, { stiffness: 100, damping: 50 });

  const glow = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(232,82,26,0.07), transparent 60%)`;
  const litMask = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, black, transparent 60%)`;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();
    rawX.set(width / 2);
    rawY.set(height * 0.42);

    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    // Touch devices: spotlight auto-drifts in a slow figure-8
    let raf = 0;
    let t = 0;
    const drift = () => {
      t += 0.006;
      const r = el.getBoundingClientRect();
      rawX.set(r.width / 2 + Math.sin(t) * r.width * 0.3);
      rawY.set(r.height / 2 + Math.sin(t * 2) * r.height * 0.18);
      raf = requestAnimationFrame(drift);
    };
    raf = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(raf);
  }, [rawX, rawY, reduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const enter = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 60,
      filter: reduceMotion ? "blur(0px)" : "blur(12px)",
    },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { ...SPRING, delay },
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#060606]"
    >
      {/* Perforation field */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Lit dots inside the spotlight — the signature interaction */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(232,82,26,0.45) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: litMask,
          WebkitMaskImage: litMask,
        }}
      />

      {/* Spotlight glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ background: glow }}
      />

      {/* Vignette — edges fall away, center glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 180px 60px #060606" }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 py-32 text-center">
        {/* Eyebrow badge */}
        <motion.div
          {...enter(0.2)}
          className="landing-shimmer rounded-full border border-orange-500/30 bg-orange-500/5 px-4 py-1.5"
        >
          <span className="text-xs tracking-[0.25em] text-orange-400/90">
            EST. 1970 — ISO 9001:2015 CERTIFIED
          </span>
        </motion.div>

        {/* Headline — metal plates sliding into place */}
        <h1 className="mt-10 text-[clamp(3.5rem,12vw,11rem)] font-black leading-[0.95] tracking-[-0.04em]">
          {HEADLINE_LINES.map((line, i) => (
            <motion.span
              key={line.text}
              {...enter(0.4 + i * 0.15)}
              className={`block ${line.className}`}
            >
              {line.text}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          {...enter(0.95)}
          className="mt-8 max-w-xl text-lg leading-relaxed text-[#8A8A8A] md:text-xl"
        >
          Fifty years of metal engineering. Nine manufacturing units. One
          uncompromising standard.
        </motion.p>

        {/* CTA row */}
        <motion.div
          {...enter(1.15)}
          className="mt-12 flex flex-col items-center gap-8 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={SPRING}
            className="rounded-full"
          >
            <Link
              href="/get-quote"
              className="group flex items-center gap-2 rounded-full bg-[#E8521A] px-8 py-4 font-semibold text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#FF6B35] hover:shadow-[0_0_40px_rgba(232,82,26,0.35)]"
            >
              Get a Free Quote
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
          </motion.div>

          <Link
            href="/products"
            className="group relative font-medium text-white/80 transition-colors duration-300 hover:text-white"
          >
            Explore Products
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <div className="relative h-12 w-px bg-gradient-to-b from-white/40 to-transparent">
          <span className="landing-cue-dot absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-white/70" />
        </div>
        <span className="text-[10px] tracking-[0.3em] text-white/30">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
