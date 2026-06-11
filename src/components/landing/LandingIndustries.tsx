"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Car,
  Factory,
  Flame,
  FlaskConical,
  Landmark,
  Pickaxe,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { INDUSTRY_DETAILS } from "@/data/industries";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

const ICONS: Record<string, LucideIcon> = {
  automobile: Car,
  construction: Building2,
  "food-beverage": UtensilsCrossed,
  pharmaceutical: FlaskConical,
  petrochemical: Flame,
  "architecture-interior": Landmark,
  "sugar-industry": Factory,
  "mining-quarrying": Pickaxe,
};

const INDUSTRIES = Object.values(INDUSTRY_DETAILS);

function IndustryCard({
  industry,
}: {
  industry: (typeof INDUSTRIES)[number];
}) {
  const Icon = ICONS[industry.slug] ?? Factory;

  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group mx-3 flex min-w-[320px] max-w-[320px] flex-col rounded-2xl border border-[#1C1C1C] bg-[#0C0C0C] p-8 transition-colors duration-300 hover:border-[#E8521A]/40"
    >
      <Icon className="h-10 w-10 text-[#E8521A]" strokeWidth={1.5} />
      <h3 className="mt-5 text-xl font-bold text-white">{industry.name}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {industry.applications.slice(0, 2).map((app: string) => (
          <li
            key={app}
            className="flex items-start gap-2.5 text-sm leading-snug text-[#8A8A8A]"
          >
            <span
              aria-hidden
              className="mt-1.5 h-1 w-1 shrink-0 bg-[#E8521A]"
            />
            {app}
          </li>
        ))}
      </ul>
      <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-[#E8521A]">
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function LandingIndustries() {
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
    <section className="overflow-hidden bg-[#060606] py-32">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          {...reveal(0)}
          className="flex items-center justify-center gap-3"
        >
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-orange-500">
            Industries
          </span>
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
        </motion.div>

        <motion.h2
          {...reveal(0.1)}
          className="mt-6 text-center text-5xl font-black tracking-tight md:text-7xl"
        >
          <span className="text-white">Trusted Across </span>
          <span className="text-[#3A3A3A]">Every Sector</span>
        </motion.h2>
      </div>

      {/* The rail */}
      <motion.div
        {...reveal(0.2)}
        className="mt-16"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)",
        }}
      >
        <div className="landing-rail flex w-max items-stretch">
          {[...INDUSTRIES, ...INDUSTRIES].map((industry, i) => (
            <IndustryCard key={`${industry.slug}-${i}`} industry={industry} />
          ))}
        </div>
      </motion.div>

      {/* Custom CTA line */}
      <motion.p
        {...reveal(0.3)}
        className="mt-16 text-center text-sm text-[#3A3A3A]"
      >
        Can&apos;t find your industry? We build custom.{" "}
        <Link
          href="/contact"
          className="font-medium text-[#E8521A] transition-colors hover:text-[#FF6B35]"
        >
          Talk to us →
        </Link>
      </motion.p>
    </section>
  );
}