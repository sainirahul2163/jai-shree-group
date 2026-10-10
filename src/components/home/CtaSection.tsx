"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CtaContent } from "@/sites/content/types";
import { useSite } from "@/sites/SiteProvider";

export function CtaSection({ content }: { content: CtaContent }) {
  const { contact } = useSite();

  return (
    <section
      className="relative overflow-hidden section-padding"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, color-mix(in oklab, var(--brand) 12%, transparent) 0%, transparent 70%)",
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
            style={{ color: "var(--foreground)" }}
          >
            {content.heading}
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {content.text}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="glow-orange h-14 px-8 text-base font-semibold"
            >
              <Link href={content.primaryCta.href}>
                {content.primaryCta.label}
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 border-foreground/30 bg-transparent px-8 text-base font-semibold hover:bg-foreground/5"
              style={{ color: "var(--foreground)" }}
            >
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                <Phone className="mr-2 size-5" />
                {content.callLabel}
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
            {content.badges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                <Check
                  className="size-4 shrink-0"
                  style={{ color: "var(--brand-text)" }}
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
