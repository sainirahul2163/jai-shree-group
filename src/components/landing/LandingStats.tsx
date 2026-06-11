"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Stat = {
  target: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 50, suffix: "+", label: "Years of Mastery" },
  { target: 9, label: "Manufacturing Units" },
  { target: 400, label: "Mesh Fineness Range" },
  { target: 12, suffix: "mm", label: "Max Perforation" },
];

function CountUp({ target, suffix }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion() ?? false;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    // Fast start, slow landing — like a machine settling into position
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function LandingStats() {
  return (
    <section className="border-y border-[#1C1C1C] bg-[#0C0C0C]/50 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-6 py-12 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {STATS.map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && (
              <span
                aria-hidden
                className="hidden h-12 w-px self-center bg-[#1C1C1C] md:block"
              />
            )}
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl font-black text-white md:text-5xl">
                <CountUp target={stat.target} suffix={stat.suffix} />
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8A8A8A]">
                {stat.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
