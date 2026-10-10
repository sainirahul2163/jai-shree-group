"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { CtaBanner } from "@/components/shared/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import type { IndustryDetail } from "@/data/industries";
import type { ProductDetail } from "@/data/products";
import { getProductIcon } from "@/lib/icons";

type IndustryPageClientProps = {
  industry: IndustryDetail;
  /** The industry's products that this site offers (`siteIndustryProducts`). */
  relatedProducts: ProductDetail[];
};

export function IndustryPageClient({
  industry,
  relatedProducts,
}: IndustryPageClientProps) {
  return (
    <>
      <PageHero
        label="INDUSTRY"
        title={industry.name}
        subtitle={industry.headline}
      />

      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {industry.description}
            </p>
            {industry.clients && (
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "var(--foreground)" }}
              >
                <span style={{ color: "var(--brand-text)" }}>Key clients: </span>
                {industry.clients}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-12"
          >
            <h2
              className="mb-6 text-2xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              Applications
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {industry.applications.map((app) => (
                <li
                  key={app}
                  className="flex items-start gap-3 rounded-lg border p-4"
                  style={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                >
                  <Check
                    className="mt-0.5 size-5 shrink-0"
                    style={{ color: "var(--brand-text)" }}
                  />
                  <span className="text-base" style={{ color: "var(--text-secondary)" }}>
                    {app}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-8 text-2xl font-black"
            style={{ color: "var(--foreground)" }}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.map((product, index) => {
              const Icon = getProductIcon(product.card.icon);
              return (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex h-full flex-col rounded-xl border p-6 transition-all duration-300 hover:border-brand"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <Icon
                      className="mb-4 size-10"
                      style={{ color: "var(--brand-text)" }}
                    />
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="mt-2 flex-1 text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {product.tagline}
                    </p>
                    <span
                      className="mt-4 inline-flex items-center text-sm font-semibold"
                      style={{ color: "var(--brand-text)" }}
                    >
                      View Product
                      <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-2xl font-black sm:text-3xl"
            style={{ color: "var(--foreground)" }}
          >
            Get Quote for {industry.name} Application
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--text-secondary)" }}>
            Share your specifications and our team will provide a customized
            quote within 24 hours.
          </p>
          <Button asChild size="lg" className="mt-8 glow-orange">
            <Link href={`/get-quote?industry=${industry.slug}`}>
              Request Quote
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
