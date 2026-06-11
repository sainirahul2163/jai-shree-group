"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { LANDING_INDUSTRIES } from "@/data/landing";
import { INDUSTRY_DETAILS } from "@/data/industries";
import { getIndustryIcon } from "@/lib/icons";

function IndustryCard({
  industry,
}: {
  industry: (typeof LANDING_INDUSTRIES)[number];
}) {
  const detail = INDUSTRY_DETAILS[industry.slug];
  const Icon = getIndustryIcon(industry.icon);
  const applications = detail?.applications.slice(0, 3) ?? [industry.description];

  return (
    <div
      className="group w-[320px] shrink-0 rounded-2xl border p-6 transition-all duration-300 hover:border-[#E8521A] hover:shadow-[0_0_28px_rgba(232,82,26,0.12)] sm:w-[360px]"
      style={{ backgroundColor: "#0F0F0F", borderColor: "#1F1F1F" }}
    >
      <Icon className="mb-4 size-10" style={{ color: "#E8521A" }} />
      <h3 className="text-xl font-black" style={{ color: "#FFFFFF" }}>
        {industry.name}
      </h3>
      <ul className="mt-4 space-y-2">
        {applications.map((app) => (
          <li
            key={app}
            className="flex items-start gap-2 text-sm leading-snug"
            style={{ color: "#A0A0A0" }}
          >
            <span style={{ color: "#E8521A" }}>•</span>
            <span>{app.split("—")[0]?.trim() ?? app}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/industries/${industry.slug}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-opacity group-hover:opacity-80"
        style={{ color: "#E8521A" }}
      >
        Learn More <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

export function LandingIndustries() {
  const cards = [...LANDING_INDUSTRIES, ...LANDING_INDUSTRIES];

  return (
    <section
      className="section-padding overflow-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-3xl font-black sm:text-4xl"
        >
          Trusted Across Every Sector
        </motion.h2>
      </div>

      <div className="overflow-hidden">
        <div className="landing-industries-track flex w-max gap-5 px-4">
          {cards.map((industry, index) => (
            <IndustryCard key={`${industry.slug}-${index}`} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  );
}
