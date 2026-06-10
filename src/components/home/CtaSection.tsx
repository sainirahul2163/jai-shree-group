"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const TRUST_BADGES = [
  "Response within 24 hours",
  `${COMPANY.iso} Certified`,
  "Pan India Delivery",
] as const;

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden section-padding"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232, 82, 26, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: "#FFFFFF" }}
          >
            Ready to Get Started?
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed"
            style={{ color: "#A0A0A0" }}
          >
            Tell us your requirement and get a quote within 24 hours. Pan India
            delivery from our Pune &amp; Mumbai facilities.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="glow-orange h-14 px-8 text-base font-semibold"
            >
              <Link href="/get-quote">
                Get a Free Quote
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 border-white/30 bg-transparent px-8 text-base font-semibold hover:bg-white/5"
              style={{ color: "#FFFFFF" }}
            >
              <a href="tel:+919320204156">
                <Phone className="mr-2 size-5" />
                Call Us Now
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "#A0A0A0" }}
              >
                <Check
                  className="size-4 shrink-0"
                  style={{ color: "#E8521A" }}
                />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
