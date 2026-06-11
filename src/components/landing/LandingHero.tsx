"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const HEADLINE_WORDS = ["PRECISION", "ENGINEERED", "IN METAL"];

const MICRO_STATS = [
  { value: "50+ Years", label: "Experience" },
  { value: "9 Units", label: "Manufacturing" },
  { value: "ISO Certified", label: "Quality" },
];

function PerforatedVisual() {
  const dots = useMemo(() => {
    const result: { x: number; y: number; opacity: number }[] = [];
    const rows = 10;
    const cols = 8;
    const hSpacing = 14;
    const vSpacing = 12;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = row % 2 === 0 ? 0 : hSpacing / 2;
        const x = col * hSpacing + offsetX;
        const y = row * vSpacing;
        const cx = (cols * hSpacing) / 2;
        const cy = (rows * vSpacing) / 2;
        const dist = Math.hypot(x - cx, y - cy);
        const maxDist = Math.hypot(cx, cy);
        result.push({ x, y, opacity: 0.15 + (1 - dist / maxDist) * 0.55 });
      }
    }
    return result;
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute size-56 rounded-full blur-3xl lg:size-72"
        style={{ backgroundColor: "rgba(232, 82, 26, 0.2)" }}
      />
      <svg
        viewBox="0 0 120 130"
        className="relative h-48 w-44 lg:h-64 lg:w-56"
        aria-hidden
      >
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x + 8}
            cy={dot.y + 8}
            r={2.2}
            fill="#E8521A"
            opacity={dot.opacity}
          />
        ))}
      </svg>
    </div>
  );
}

export function LandingHero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(232, 82, 26, 0.12) 0%, transparent 50%)",
          }}
        />
        <div className="hex-grid-bg absolute inset-0 opacity-[0.04]" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-4 py-24 md:px-8 lg:grid-cols-2 lg:px-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="landing-badge-shimmer mb-8 inline-flex items-center rounded-full px-4 py-1.5"
            style={{
              backgroundColor: "#0F0F0F",
              border: "1px solid #E8521A",
            }}
          >
            <span
              className="mr-2 size-1.5 rounded-full"
              style={{ backgroundColor: "#E8521A" }}
            />
            <span className="text-xs font-medium sm:text-sm" style={{ color: "#A0A0A0" }}>
              {COMPANY.iso} Certified • Since {COMPANY.founded}
            </span>
          </motion.div>

          <h1 className="font-display text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
            {HEADLINE_WORDS.map((word, index) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.3 + index * 0.08,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {word === "IN METAL" ? (
                    <>
                      <span>IN </span>
                      <span style={{ color: "#E8521A" }}>METAL</span>
                    </>
                  ) : (
                    word
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "#A0A0A0" }}
          >
            India&apos;s trusted manufacturer of perforated sheets, wire mesh
            &amp; expanded metal. {COMPANY.experience} years.{" "}
            {COMPANY.manufacturingUnits} manufacturing units. Pan India delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="glow-orange-hover h-12 border-0 px-6 font-semibold"
              style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
            >
              <Link href="/get-quote">
                Get a Free Quote
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 bg-transparent px-6 font-semibold hover:bg-[#1A1A1A]"
              style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
            >
              <Link href="/products">
                Explore Products
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-6 sm:gap-10"
          >
            {MICRO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-bold" style={{ color: "#FFFFFF" }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "#666666" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden lg:block"
        >
          <PerforatedVisual />
        </motion.div>
      </div>
    </section>
  );
}
