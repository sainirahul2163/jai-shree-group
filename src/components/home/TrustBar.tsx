"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const TRUST_STATS = [
  { value: 50, suffix: "+", label: "Years of Experience", animate: true },
  { value: 6, suffix: "", label: "Manufacturing Units", animate: true },
  {
    value: null,
    display: "ISO 9001:2015",
    label: "Certified",
    animate: false,
  },
  {
    value: null,
    display: "Global Delivery",
    label: "",
    animate: false,
  },
] as const;

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
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="border-y"
      style={{
        backgroundColor: "#111111",
        borderColor: "#2A2A2A",
      }}
      aria-label="Company credentials"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4"
      >
        {TRUST_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center border-[#2A2A2A] px-4 py-8 text-center sm:px-6 sm:py-10 [&:not(:last-child)]:border-r"
          >
            <p
              className="text-2xl font-black sm:text-3xl md:text-4xl"
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
            <p
              className="mt-2 text-xs font-medium sm:text-sm"
              style={{ color: "#A0A0A0" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
