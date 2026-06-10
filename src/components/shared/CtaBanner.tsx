"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type CtaBannerProps = {
  title?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBanner({
  title = "Ready to work with us?",
  primaryLabel = "Get a Quote",
  primaryHref = "/get-quote",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact",
}: CtaBannerProps) {
  return (
    <section className="section-padding" style={{ backgroundColor: "#111111" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-2xl border px-8 py-12 text-center"
        style={{
          backgroundColor: "#0A0A0A",
          borderColor: "#2A2A2A",
        }}
      >
        <h2
          className="text-2xl font-black sm:text-3xl"
          style={{ color: "#FFFFFF" }}
        >
          {title}
        </h2>
        <p className="mt-3 text-base" style={{ color: "#A0A0A0" }}>
          Share your requirements and our team will respond within 24 hours.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="glow-orange">
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#2A2A2A] bg-transparent hover:bg-[#1A1A1A]"
          >
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
