"use client";

import { motion } from "framer-motion";

type PageHeroProps = {
  label?: string;
  title: string;
  subtitle: string;
  badges?: { text: string }[];
};

export function PageHero({ label, title, subtitle, badges }: PageHeroProps) {
  return (
    <section
      className="section-padding relative overflow-hidden pt-28 md:pt-32"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="hex-grid-bg pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {label && (
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#E8521A" }}
            >
              {label}
            </p>
          )}
          <h1
            className="text-4xl font-black tracking-tight sm:text-5xl"
            style={{ color: "#FFFFFF" }}
          >
            {title}
          </h1>
          <p
            className="mt-4 text-lg leading-relaxed sm:text-xl"
            style={{ color: "#A0A0A0" }}
          >
            {subtitle}
          </p>
          {badges && badges.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span
                  key={badge.text}
                  className="rounded-full border px-4 py-1.5 text-sm font-semibold"
                  style={{
                    borderColor: "#E8521A",
                    color: "#E8521A",
                    backgroundColor: "rgba(232, 82, 26, 0.1)",
                  }}
                >
                  {badge.text}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
