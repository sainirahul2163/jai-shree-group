"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import type { ProcessContent } from "@/sites/content/types";
import { getProcessIcon } from "@/lib/icons";

export function ProcessSection({ content: section }: { content: ProcessContent }) {
  const steps = section.steps;

  return (
    <section
      id={section.id}
      className="section-padding"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--brand-text)" }}
          >
            {section.label}
          </p>
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            {section.heading}
          </h2>
        </motion.div>

        {/* Desktop horizontal flow */}
        <div className="hidden lg:flex lg:items-start lg:justify-between">
          {steps.map((step, index) => {
            const Icon = getProcessIcon(step.icon);
            return (
              <div key={step.step} className="flex flex-1 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  className="flex flex-1 flex-col items-center text-center"
                >
                  <div
                    className="flex size-14 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: "var(--brand)",
                      backgroundColor: "color-mix(in oklab, var(--brand) 10%, transparent)",
                    }}
                  >
                    <span
                      className="absolute -mt-16 text-xs font-bold opacity-0"
                      aria-hidden
                    />
                    <Icon className="size-6" style={{ color: "var(--brand-text)" }} />
                  </div>
                  <span
                    className="mt-3 text-xs font-bold"
                    style={{ color: "var(--brand-text)" }}
                  >
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-1 text-sm font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-1 max-w-[140px] text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="flex shrink-0 items-center px-2 pt-7">
                    <div
                      className="h-px w-8 border-t border-dashed sm:w-12"
                      style={{ borderColor: "var(--brand)" }}
                    />
                    <ChevronRight
                      className="size-4 shrink-0"
                      style={{ color: "var(--brand-text)" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile vertical stack */}
        <div className="flex flex-col gap-0 lg:hidden">
          {steps.map((step, index) => {
            const Icon = getProcessIcon(step.icon);
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative flex gap-4 pb-8 last:pb-0"
              >
                {index < steps.length - 1 && (
                  <div
                    className="absolute top-14 left-[27px] h-[calc(100%-3rem)] w-px border-l border-dashed"
                    style={{ borderColor: "var(--brand)" }}
                  />
                )}
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: "var(--brand)",
                    backgroundColor: "color-mix(in oklab, var(--brand) 10%, transparent)",
                  }}
                >
                  <Icon className="size-6" style={{ color: "var(--brand-text)" }} />
                </div>
                <div className="pt-2">
                  <span
                    className="text-xs font-bold"
                    style={{ color: "var(--brand-text)" }}
                  >
                    Step {step.step}
                  </span>
                  <h3
                    className="mt-0.5 text-base font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
