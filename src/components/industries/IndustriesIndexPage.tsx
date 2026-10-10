"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { HOME_INDUSTRIES } from "@/lib/constants";
import { INDUSTRY_DETAILS } from "@/data/industries";
import { getIndustryIcon } from "@/lib/icons";

export function IndustriesIndexPage() {
  return (
    <>
      <PageHero
        label="INDUSTRIES"
        title="Industries We Serve"
        subtitle="Precision metal products for every sector — from automotive filters to petrochemical precision components."
      />
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_INDUSTRIES.map((industry, index) => {
              const Icon = getIndustryIcon(industry.icon);
              const detail = INDUSTRY_DETAILS[industry.slug];
              return (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                >
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col rounded-xl border p-8 transition-all duration-300 hover:border-brand hover:bg-surface-2"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <Icon
                      className="mb-5 size-12 transition-colors"
                      style={{ color: "var(--brand-text)" }}
                    />
                    <h2
                      className="text-lg font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {industry.name}
                    </h2>
                    <p
                      className="mt-3 flex-1 text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {detail?.description ?? industry.description}
                    </p>
                    <span
                      className="mt-5 inline-flex items-center text-sm font-semibold"
                      style={{ color: "var(--brand-text)" }}
                    >
                      Learn More
                      <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
