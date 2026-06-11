"use client";

import { LANDING_MARQUEE_ITEMS } from "@/data/landing";

export function LandingMarquee() {
  const items = [...LANDING_MARQUEE_ITEMS, ...LANDING_MARQUEE_ITEMS];

  return (
    <section
      className="overflow-hidden border-y py-4"
      style={{ backgroundColor: "#0F0F0F", borderColor: "#1F1F1F" }}
    >
      <div className="landing-marquee-track flex w-max gap-8 whitespace-nowrap">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: index % 2 === 0 ? "#A0A0A0" : "#E8521A" }}
          >
            {item}
            <span style={{ color: "#333333" }}>◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
