"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { MagneticHexBackground } from "@/components/home/MagneticHexBackground";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/sites/content/types";

export function HeroSection({ content }: { content: HeroContent }) {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16 md:pt-20"
      style={{ backgroundColor: "var(--background)" }}
    >
      <MagneticHexBackground containerRef={heroRef} />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top right, color-mix(in oklab, var(--brand) 18%, transparent) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--foreground) 1px, transparent 1px),
              linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 md:px-8 lg:grid-cols-5 lg:gap-8 lg:px-16 lg:py-24">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full px-4 py-1.5"
            style={{
              backgroundColor: "var(--surface-2)",
              border: "1px solid var(--brand)",
            }}
          >
            <span
              className="mr-2 size-1.5 rounded-full"
              style={{ backgroundColor: "var(--brand)" }}
            />
            <span
              className="text-xs font-medium sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {content.badge}
            </span>
          </motion.div>

          <h1 className="font-display text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
            {content.lines.map((line) => (
              <span key={line.text} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                  style={{
                    color: line.accent ? "var(--brand-text)" : "var(--foreground)",
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {content.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="glow-orange-hover h-12 border-0 px-6 text-base font-semibold hover:opacity-90"
              style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
            >
              <Link href={content.primaryCta.href}>
                {content.primaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 bg-transparent px-6 text-base font-semibold hover:bg-surface-2"
              style={{
                borderColor: "var(--foreground)",
                color: "var(--foreground)",
              }}
            >
              <Link href={content.secondaryCta.href}>
                {content.secondaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-6 sm:gap-8"
          >
            {content.stats.map((stat, index) => (
              <div key={stat.value} className="flex items-center gap-6 sm:gap-8">
                <div>
                  <p
                    className="text-sm font-bold sm:text-base"
                    style={{ color: "var(--foreground)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </div>
                {index < content.stats.length - 1 && (
                  <div
                    className="hidden h-8 w-px sm:block"
                    style={{ backgroundColor: "var(--border)" }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-center">
            <ProductShowcase />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
