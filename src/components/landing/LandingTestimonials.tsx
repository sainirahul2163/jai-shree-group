"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { LANDING_TESTIMONIALS } from "@/data/landing";

export function LandingTestimonials() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-3xl font-black sm:text-4xl"
        >
          What Our Clients Say
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LANDING_TESTIMONIALS.map((item, index) => (
            <motion.blockquote
              key={item.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex h-full flex-col rounded-2xl border p-6"
              style={{ backgroundColor: "#0F0F0F", borderColor: "#1F1F1F" }}
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-current"
                    style={{ color: "#E8521A" }}
                  />
                ))}
              </div>
              <p
                className="flex-1 text-base leading-relaxed"
                style={{ color: "#FFFFFF" }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t pt-4" style={{ borderColor: "#1F1F1F" }}>
                <p className="font-semibold" style={{ color: "#FFFFFF" }}>
                  {item.author}
                </p>
                <p className="text-sm" style={{ color: "#666666" }}>
                  {item.company}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
