"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { HOME_INDUSTRIES, HOME_SECTIONS } from "@/lib/constants";
import { getIndustryIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export function IndustriesSection() {
  const { industries: section } = HOME_SECTIONS;

  return (
    <section
      id={section.id}
      className="section-padding"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#E8521A" }}
          >
            {section.label}
          </p>
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: "#FFFFFF" }}
          >
            {section.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_INDUSTRIES.map((industry, index) => {
            const Icon = getIndustryIcon(industry.icon);
            return (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col rounded-xl border p-6 transition-all duration-300 hover:border-[#E8521A] hover:bg-[#1A1A1A]"
                  style={{
                    backgroundColor: "#111111",
                    borderColor: "#2A2A2A",
                  }}
                >
                  <Icon
                    className="mb-4 size-10 transition-colors"
                    style={{ color: "#E8521A" }}
                  />
                  <h3
                    className="text-base font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {industry.name}
                  </h3>
                  <p
                    className="mt-2 text-base leading-relaxed"
                    style={{ color: "#A0A0A0" }}
                  >
                    {industry.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-xl border p-8 sm:flex-row"
          style={{
            backgroundColor: "#1A1A1A",
            borderColor: "#2A2A2A",
          }}
        >
          <p
            className="text-center text-base sm:text-left sm:text-lg"
            style={{ color: "#FFFFFF" }}
          >
            {section.banner.text}
          </p>
          <Button
            asChild
            size="lg"
            className="shrink-0 border-0 px-6 font-semibold hover:opacity-90"
            style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
          >
            <Link href={section.banner.cta.href}>
              {section.banner.cta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
