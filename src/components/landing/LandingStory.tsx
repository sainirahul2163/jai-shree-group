"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import {
  LANDING_MILESTONES,
  LANDING_STORY_STRENGTHS,
} from "@/data/landing";
import { COMPANY } from "@/lib/constants";

export function LandingStory() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#E8521A" }}
          >
            Our Story
          </p>
          <h2 className="text-3xl font-black leading-tight sm:text-4xl">
            From Delhi, 1970.
            <br />
            To India&apos;s Most Trusted.
          </h2>

          <div className="mt-8 space-y-5">
            {LANDING_MILESTONES.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex gap-4"
              >
                <span
                  className="shrink-0 text-lg font-black"
                  style={{ color: "#E8521A" }}
                >
                  {item.year}
                </span>
                <p className="text-base" style={{ color: "#A0A0A0" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-base font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#E8521A" }}
          >
            Read Full Story <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <div
            className="h-full rounded-2xl border p-8 md:p-10"
            style={{
              backgroundColor: "#0F0F0F",
              borderColor: "#1F1F1F",
              boxShadow: "0 0 60px rgba(232, 82, 26, 0.08)",
            }}
          >
            <span
              className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                borderColor: "#E8521A",
                color: "#E8521A",
                backgroundColor: "rgba(232, 82, 26, 0.1)",
              }}
            >
              {COMPANY.iso}
            </span>

            <blockquote
              className="mt-8 text-2xl font-bold leading-snug sm:text-3xl"
              style={{ color: "#FFFFFF" }}
            >
              &ldquo;We offer what we promise and promise only what we can
              offer.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm" style={{ color: "#666666" }}>
              — Jai Shree Group Philosophy
            </p>

            <ul className="mt-10 space-y-4">
              {LANDING_STORY_STRENGTHS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 size-5 shrink-0"
                    style={{ color: "#E8521A" }}
                  />
                  <span className="text-base" style={{ color: "#A0A0A0" }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
