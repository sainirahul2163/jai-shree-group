"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

const CITIES = [
  {
    name: "Pune",
    ghost: "PUNE",
    unitCount: "6 Manufacturing Units",
    branches: [
      { name: "Jai Shree Metal Perforators", area: "Talawade" },
      { name: "Shree Perforators", area: "Talawade" },
      { name: "Shree Weld Mesh", area: "Talawade" },
      { name: "Jai Shree Jaliwala", area: "Bhosari" },
      { name: "Dev Shree Metal Perforators", area: "Talawade" },
      { name: "Chandan Metal Perforators", area: "Pisoli" },
    ],
    areas: "TALAWADE • BHOSARI • PISOLI",
  },
  {
    name: "Mumbai",
    ghost: "MUMBAI",
    unitCount: "3 Manufacturing Units",
    branches: [
      { name: "Jai Shree Filtration", area: "Masjid Bunder" },
      { name: "Jai Shree Industries", area: "Bhayander" },
      { name: "Jai Shree Perforator", area: "Palghar" },
    ],
    areas: "BHAYANDER • MASJID BUNDER • PALGHAR",
  },
];

export function LandingLocations() {
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
    <section className="border-y border-[#1C1C1C] bg-[#0C0C0C] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          {...reveal(0)}
          className="flex items-center justify-center gap-3"
        >
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-orange-500">
            Where We Are
          </span>
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
        </motion.div>

        <motion.h2
          {...reveal(0.1)}
          className="mt-6 text-center text-5xl font-black tracking-tight md:text-7xl"
        >
          <span className="text-white">9 Units. 2 Cities. </span>
          <span className="bg-gradient-to-r from-[#E8521A] via-[#FF6B35] to-[#E8521A] bg-clip-text text-transparent">
            All of India.
          </span>
        </motion.h2>

        {/* City cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {CITIES.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { ...SPRING, delay: i * 0.1 },
              }}
              viewport={{ once: true, margin: "-10% 0px" }}
              className="group relative overflow-hidden rounded-3xl border border-[#1C1C1C] bg-[#060606] p-10 transition-colors duration-300 hover:border-[#E8521A]/30"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-4 right-4 select-none text-8xl font-black leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-white/[0.05]"
              >
                {city.ghost}
              </span>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-2 w-2 bg-[#E8521A]" />
                  <h3 className="text-4xl font-black text-white">
                    {city.name}
                  </h3>
                </div>
                <p className="mt-2 text-[#8A8A8A]">{city.unitCount}</p>

                <div className="mt-8">
                  {city.branches.map((branch) => (
                    <div
                      key={branch.name}
                      className="flex items-center justify-between border-b border-[#141414] py-3"
                    >
                      <span className="text-sm font-medium text-white/90">
                        {branch.name}
                      </span>
                      <span className="text-xs text-[#8A8A8A]">
                        {branch.area}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-xs tracking-widest text-orange-500/80">
                  {city.areas}
                </p>

                <Link
                  href="/group"
                  className="mt-6 flex w-fit items-center gap-1.5 text-sm font-medium text-[#E8521A] transition-colors hover:text-[#FF6B35]"
                >
                  View {city.name} Units
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...reveal(0.3)}
          className="mt-12 text-center text-sm text-[#8A8A8A]"
        >
          Serving clients across Maharashtra and Pan India
        </motion.p>
      </div>
    </section>
  );
}