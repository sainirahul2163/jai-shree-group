"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import type { TrustContent } from "@/sites/content/types";


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

export function TrustBar({ content }: { content: TrustContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="border-y"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
      aria-label={content.ariaLabel}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4"
      >
        {content.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center border-border px-4 py-8 text-center sm:px-6 sm:py-10 [&:not(:last-child)]:border-r"
          >
            <p
              className="text-2xl font-black sm:text-3xl md:text-4xl"
              style={{ color: "var(--brand-text)" }}
            >
              {"count" in stat ? (
                <AnimatedNumber
                  value={stat.count}
                  suffix={stat.suffix ?? ""}
                  inView={inView}
                />
              ) : (
                stat.display
              )}
            </p>
            <p
              className="mt-2 text-xs font-medium sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
