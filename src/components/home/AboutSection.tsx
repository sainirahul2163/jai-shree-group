"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ABOUT_TIMELINE, HOME_SECTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  const { about: section } = HOME_SECTIONS;

  return (
    <section
      id={section.id}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="hex-grid-bg pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

          <div className="mt-6 space-y-4">
            {section.paragraphs.map((para) => (
              <p
                key={para.slice(0, 20)}
                className="text-base leading-relaxed"
                style={{ color: "#A0A0A0" }}
              >
                {para}
              </p>
            ))}
            <p
              className="text-base leading-relaxed"
              style={{ color: "#A0A0A0" }}
            >
              Operating as Shree Perforators and Jai Shree Metal Perforators
              across our 8 manufacturing units in Pune and Mumbai, we bring over
              50 years of precision to every order.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {section.highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "#0A0A0A",
                  borderColor: "#2A2A2A",
                }}
              >
                <p
                  className="text-xl font-black sm:text-2xl"
                  style={{ color: "#E8521A" }}
                >
                  {item.value}
                </p>
                <p className="mt-1 text-xs" style={{ color: "#A0A0A0" }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="mt-8 h-12 border-0 px-6 font-semibold hover:opacity-90"
            style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
          >
            <Link href={section.cta.href}>
              {section.cta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Right column — Timeline */}
        <div className="relative pl-8">
          <div
            className="absolute top-2 bottom-2 left-[11px] w-px"
            style={{ backgroundColor: "#2A2A2A" }}
          />

          {ABOUT_TIMELINE.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pb-8 last:pb-0"
            >
              <div
                className="absolute -left-8 top-1.5 size-[10px] rounded-full"
                style={{
                  backgroundColor: "#E8521A",
                  boxShadow: "0 0 0 4px rgba(232, 82, 26, 0.2), 0 0 12px rgba(232, 82, 26, 0.4)",
                }}
              />
              <p
                className="text-sm font-bold"
                style={{ color: "#E8521A" }}
              >
                {milestone.year}
              </p>
              <p
                className="mt-1 text-sm"
                style={{ color: "#FFFFFF" }}
              >
                {milestone.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
