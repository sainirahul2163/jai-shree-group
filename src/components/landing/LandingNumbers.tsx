"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { LANDING_STATS } from "@/data/landing";

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export function LandingNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="landing-texture section-padding border-y"
      style={{ backgroundColor: "#0A0A0A", borderColor: "#1F1F1F" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center text-3xl font-black sm:text-4xl md:text-5xl"
        >
          The Numbers Speak
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LANDING_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group rounded-2xl border p-8 text-center transition-all duration-300 hover:border-[#E8521A] hover:shadow-[0_0_32px_rgba(232,82,26,0.12)]"
              style={{ backgroundColor: "#0F0F0F", borderColor: "#1F1F1F" }}
            >
              <p
                className="text-5xl font-black sm:text-6xl lg:text-7xl"
                style={{ color: "#E8521A" }}
              >
                {stat.animate && stat.value !== null ? (
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={inView}
                  />
                ) : (
                  "display" in stat && stat.display
                )}
              </p>
              <p className="mt-3 text-sm font-medium" style={{ color: "#A0A0A0" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
