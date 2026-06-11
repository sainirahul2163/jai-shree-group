"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  MUMBAI_BRANCHES,
  PUNE_BRANCHES,
} from "@/lib/constants";

export function LandingLocations() {
  const puneAreas = [...new Set(PUNE_BRANCHES.map((b) => b.area))].join(" • ");
  const mumbaiAreas = [...new Set(MUMBAI_BRANCHES.map((b) => b.area))].join(
    " • "
  );

  return (
    <section className="section-padding" style={{ backgroundColor: "#111111" }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#E8521A" }}
          >
            Where We Are
          </p>
          <h2 className="text-3xl font-black sm:text-4xl">
            9 Units. 2 Cities. All of India.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border p-8"
            style={{ backgroundColor: "#0F0F0F", borderColor: "#1F1F1F" }}
          >
            <h3 className="text-4xl font-black" style={{ color: "#E8521A" }}>
              Pune
            </h3>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#FFFFFF" }}>
              {PUNE_BRANCHES.length} Manufacturing Units
            </p>
            <ul className="mt-6 space-y-2">
              {PUNE_BRANCHES.map((b) => (
                <li key={b.slug} className="text-sm" style={{ color: "#A0A0A0" }}>
                  {b.name} — {b.area}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-medium" style={{ color: "#666666" }}>
              {puneAreas}
            </p>
            <Button asChild className="mt-6 glow-orange-hover">
              <Link href="/group">
                View Pune Units <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border p-8"
            style={{ backgroundColor: "#0F0F0F", borderColor: "#1F1F1F" }}
          >
            <h3 className="text-4xl font-black" style={{ color: "#E8521A" }}>
              Mumbai
            </h3>
            <p className="mt-2 text-lg font-semibold" style={{ color: "#FFFFFF" }}>
              {MUMBAI_BRANCHES.length} Manufacturing Units
            </p>
            <ul className="mt-6 space-y-2">
              {MUMBAI_BRANCHES.map((b) => (
                <li key={b.slug} className="text-sm" style={{ color: "#A0A0A0" }}>
                  {b.name} — {b.area}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-medium" style={{ color: "#666666" }}>
              {mumbaiAreas}
            </p>
            <Button asChild className="mt-6 glow-orange-hover">
              <Link href="/group">
                View Mumbai Units <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <p
          className="mt-10 text-center text-base"
          style={{ color: "#A0A0A0" }}
        >
          Serving clients across Maharashtra and Pan India
        </p>
      </div>
    </section>
  );
}
