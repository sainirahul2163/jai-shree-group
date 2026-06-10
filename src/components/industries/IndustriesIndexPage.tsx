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
        subtitle="Precision metal products for every sector — from automotive filters to petrochemical demister pads."
      />
      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
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
                    className="group flex h-full flex-col rounded-xl border p-8 transition-all duration-300 hover:border-[#E8521A] hover:bg-[#1A1A1A]"
                    style={{
                      backgroundColor: "#0A0A0A",
                      borderColor: "#2A2A2A",
                    }}
                  >
                    <Icon
                      className="mb-5 size-12 transition-colors"
                      style={{ color: "#E8521A" }}
                    />
                    <h2
                      className="text-lg font-bold"
                      style={{ color: "#FFFFFF" }}
                    >
                      {industry.name}
                    </h2>
                    <p
                      className="mt-3 flex-1 text-base leading-relaxed"
                      style={{ color: "#A0A0A0" }}
                    >
                      {detail?.description ?? industry.description}
                    </p>
                    <span
                      className="mt-5 inline-flex items-center text-sm font-semibold"
                      style={{ color: "#E8521A" }}
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
