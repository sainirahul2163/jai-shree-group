"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { whatsappUrl } from "@/lib/email";

const TRUST_BADGES = [
  "24hr Response",
  "ISO Certified",
  "Pan India",
] as const;

export function LandingCTA() {
  return (
    <section
      className="relative overflow-hidden section-padding"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(232, 82, 26, 0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Ready to Work With Us?
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed"
            style={{ color: "#A0A0A0" }}
          >
            Share your requirement. Get a quote within 24 hours.
          </p>

          <Button
            asChild
            size="lg"
            className="glow-orange mt-10 h-14 px-10 text-base font-semibold"
          >
            <Link href="/get-quote">
              Get a Free Quote
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>

          <p className="mt-6 text-base" style={{ color: "#A0A0A0" }}>
            Or call us directly:{" "}
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="font-semibold transition-opacity hover:opacity-80"
              style={{ color: "#FFFFFF" }}
            >
              {COMPANY.phone}
            </a>
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "#A0A0A0" }}
              >
                <Check className="size-4" style={{ color: "#E8521A" }} />
                {badge}
              </span>
            ))}
          </div>

          <a
            href={whatsappUrl(COMPANY.whatsapp, "Hi, I need a quote for metal products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1 text-base font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#25D366" }}
          >
            Chat on WhatsApp <ArrowRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
