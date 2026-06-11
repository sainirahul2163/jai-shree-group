"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { LANDING_PROCESS_STEPS } from "@/data/landing";
import { getProcessIcon } from "@/lib/icons";

export function LandingProcess() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-black sm:text-4xl">
            From Enquiry to Delivery
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#A0A0A0" }}>
            Simple process. Guaranteed quality. On-time delivery.
          </p>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {LANDING_PROCESS_STEPS.map((step, index) => {
            const Icon = getProcessIcon(step.icon);
            return (
              <div key={step.step} className="flex min-w-[220px] flex-1 items-stretch lg:min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border p-6"
                  style={{
                    backgroundColor: "#0F0F0F",
                    borderColor: "#1F1F1F",
                  }}
                >
                  <span
                    className="pointer-events-none absolute -right-2 -top-4 text-7xl font-black leading-none"
                    style={{ color: "rgba(255,255,255,0.04)" }}
                    aria-hidden
                  >
                    {String(step.step).padStart(2, "0")}
                  </span>

                  <div
                    className="relative mb-4 flex size-12 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "rgba(232, 82, 26, 0.12)",
                      border: "1px solid rgba(232, 82, 26, 0.3)",
                    }}
                  >
                    <Icon className="size-5" style={{ color: "#E8521A" }} />
                  </div>

                  <p
                    className="relative text-xs font-bold"
                    style={{ color: "#E8521A" }}
                  >
                    {String(step.step).padStart(2, "0")}
                  </p>
                  <h3
                    className="relative mt-1 text-base font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="relative mt-2 text-sm leading-relaxed"
                    style={{ color: "#A0A0A0" }}
                  >
                    {step.description}
                  </p>
                </motion.div>

                {index < LANDING_PROCESS_STEPS.length - 1 && (
                  <div className="hidden shrink-0 items-center px-1 lg:flex">
                    <div
                      className="h-px w-6 border-t border-dashed"
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
      </div>
    </section>
  );
}
