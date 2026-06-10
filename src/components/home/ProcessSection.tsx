"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { HOME_SECTIONS, PROCESS_STEPS } from "@/lib/constants";
import { getProcessIcon } from "@/lib/icons";

export function ProcessSection() {
  const { process: section } = HOME_SECTIONS;

  return (
    <section
      id={section.id}
      className="section-padding"
      style={{ backgroundColor: "#111111" }}
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

        {/* Desktop horizontal flow */}
        <div className="hidden lg:flex lg:items-start lg:justify-between">
          {PROCESS_STEPS.map((step, index) => {
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
                      borderColor: "#E8521A",
                      backgroundColor: "rgba(232, 82, 26, 0.1)",
                    }}
                  >
                    <span
                      className="absolute -mt-16 text-xs font-bold opacity-0"
                      aria-hidden
                    />
                    <Icon className="size-6" style={{ color: "#E8521A" }} />
                  </div>
                  <span
                    className="mt-3 text-xs font-bold"
                    style={{ color: "#E8521A" }}
                  >
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-1 text-sm font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-1 max-w-[140px] text-xs leading-relaxed"
                    style={{ color: "#A0A0A0" }}
                  >
                    {step.description}
                  </p>
                </motion.div>

                {index < PROCESS_STEPS.length - 1 && (
                  <div className="flex shrink-0 items-center px-2 pt-7">
                    <div
                      className="h-px w-8 border-t border-dashed sm:w-12"
                      style={{ borderColor: "#E8521A" }}
                    />
                    <ChevronRight
                      className="size-4 shrink-0"
                      style={{ color: "#E8521A" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile vertical stack */}
        <div className="flex flex-col gap-0 lg:hidden">
          {PROCESS_STEPS.map((step, index) => {
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
                {index < PROCESS_STEPS.length - 1 && (
                  <div
                    className="absolute top-14 left-[27px] h-[calc(100%-3rem)] w-px border-l border-dashed"
                    style={{ borderColor: "#E8521A" }}
                  />
                )}
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: "#E8521A",
                    backgroundColor: "rgba(232, 82, 26, 0.1)",
                  }}
                >
                  <Icon className="size-6" style={{ color: "#E8521A" }} />
                </div>
                <div className="pt-2">
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#E8521A" }}
                  >
                    Step {step.step}
                  </span>
                  <h3
                    className="mt-0.5 text-base font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "#A0A0A0" }}
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
