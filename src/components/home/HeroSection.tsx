"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const MICRO_STATS = [
  { value: "50+ Years", label: "Experience" },
  { value: "6 Units", label: "Manufacturing" },
  { value: "ISO Certified", label: "Quality" },
];

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: "rgba(232, 82, 26, 0.4)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16 md:pt-20"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(232, 82, 26, 0.18) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="hex-grid-bg absolute inset-0 opacity-[0.03]" />
        <FloatingParticles />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 md:px-8 lg:grid-cols-5 lg:gap-8 lg:px-16 lg:py-24">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full px-4 py-1.5"
            style={{
              backgroundColor: "#1A1A1A",
              border: "1px solid #E8521A",
            }}
          >
            <span
              className="mr-2 size-1.5 rounded-full"
              style={{ backgroundColor: "#E8521A" }}
            />
            <span
              className="text-xs font-medium sm:text-sm"
              style={{ color: "#A0A0A0" }}
            >
              {COMPANY.iso} Certified • Since {COMPANY.founded}
            </span>
          </motion.div>

          <h1
            className="font-display text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ color: "#FFFFFF" }}
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ color: "#FFFFFF" }}
              >
                Perforated Sheet Manufacturers in Pune &amp; Mumbai
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "#A0A0A0" }}
          >
            India&apos;s trusted manufacturer of perforated sheets, expanded
            metal, laser cutting &amp; precision components. {COMPANY.iso}{" "}
            certified. {COMPANY.experience} years of experience.
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
              className="h-12 bg-transparent px-6 text-base font-semibold hover:bg-[#1A1A1A]"
              style={{
                borderColor: "#FFFFFF",
                color: "#FFFFFF",
              }}
            >
              <Link href="/products">
                Explore Products
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
            {MICRO_STATS.map((stat, index) => (
              <div key={stat.value} className="flex items-center gap-6 sm:gap-8">
                <div>
                  <p
                    className="text-sm font-bold sm:text-base"
                    style={{ color: "#FFFFFF" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: "#666666" }}>
                    {stat.label}
                  </p>
                </div>
                {index < MICRO_STATS.length - 1 && (
                  <div
                    className="hidden h-8 w-px sm:block"
                    style={{ backgroundColor: "#2A2A2A" }}
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
