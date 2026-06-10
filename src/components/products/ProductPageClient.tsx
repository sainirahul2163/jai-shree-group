"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Download,
} from "lucide-react";

import { ProductQuoteForm } from "@/components/products/ProductQuoteForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BROCHURE_URL } from "@/lib/constants";
import type { ProductDetail } from "@/data/products";
import { getProductIcon } from "@/lib/icons";
import { PRODUCTS } from "@/lib/constants";

type ProductPageClientProps = {
  product: ProductDetail;
  relatedProducts: ProductDetail[];
};

export function ProductPageClient({
  product,
  relatedProducts,
}: ProductPageClientProps) {
  const iconName =
    PRODUCTS.find((p) => p.slug === product.slug)?.icon ?? "Grid3X3";
  const Icon = getProductIcon(iconName);

  return (
    <>
      {/* Hero */}
      <section
        className="section-padding pt-28 md:pt-32"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav aria-label="Breadcrumb">
              <ol
                className="mb-6 flex flex-wrap items-center gap-1 text-base"
                style={{ color: "#A0A0A0" }}
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <Link
                    href="/"
                    itemProp="item"
                    className="hover:text-white"
                  >
                    <span itemProp="name">Home</span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <ChevronRight className="size-4" />
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <Link
                    href="/#products"
                    itemProp="item"
                    className="hover:text-white"
                  >
                    <span itemProp="name">Products</span>
                  </Link>
                  <meta itemProp="position" content="2" />
                </li>
                <ChevronRight className="size-4" />
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  style={{ color: "#E8521A" }}
                >
                  <span itemProp="name">{product.name}</span>
                  <meta itemProp="position" content="3" />
                </li>
              </ol>
            </nav>

            <h1
              className="text-4xl font-black tracking-tight sm:text-5xl"
              style={{ color: "#FFFFFF" }}
            >
              {product.name}
            </h1>
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: "#A0A0A0" }}
            >
              {product.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 border-0 font-semibold"
                style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
              >
                <Link href="/get-quote">
                  Get Quote for This Product
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 bg-transparent font-semibold hover:bg-[#1A1A1A]"
                style={{ borderColor: "#FFFFFF", color: "#FFFFFF" }}
              >
                <a
                  href={BROCHURE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="size-4" />
                  Download Brochure
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute size-48 rounded-full blur-3xl lg:size-64"
              style={{ backgroundColor: "rgba(232, 82, 26, 0.25)" }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute size-56 rounded-full border border-dashed lg:size-72"
              style={{ borderColor: "rgba(232, 82, 26, 0.4)" }}
            />
            <div
              className="relative flex size-40 items-center justify-center rounded-full lg:size-48"
              style={{ backgroundColor: "rgba(232, 82, 26, 0.1)" }}
            >
              <Icon
                className="size-20 lg:size-24"
                style={{ color: "#E8521A" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details + Quote */}
      <section
        className="section-padding"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="mb-4 text-2xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                Overview
              </h2>
              <div className="space-y-4">
                {product.overview.map((para) => (
                  <p
                    key={para.slice(0, 30)}
                    className="text-base leading-relaxed"
                    style={{ color: "#A0A0A0" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="mb-4 text-2xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                Materials Available
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((m) => (
                  <span
                    key={m}
                    className="rounded-full px-3 py-1 text-base"
                    style={{
                      backgroundColor: "#1A1A1A",
                      color: "#A0A0A0",
                      border: "1px solid #2A2A2A",
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="mb-4 text-2xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                Key Specifications
              </h2>
              <div
                className="overflow-hidden rounded-xl border"
                style={{ borderColor: "#2A2A2A" }}
              >
                <table className="w-full text-base">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr
                        key={spec.label}
                        style={{
                          backgroundColor: i % 2 === 0 ? "#111111" : "#0A0A0A",
                        }}
                      >
                        <td
                          className="px-4 py-3 font-medium"
                          style={{ color: "#FFFFFF", width: "40%" }}
                        >
                          {spec.label}
                        </td>
                        <td
                          className="px-4 py-3"
                          style={{ color: "#A0A0A0" }}
                        >
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="mb-4 text-2xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                Our Strength
              </h2>
              <ul className="space-y-3">
                {product.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <Check
                      className="mt-0.5 size-5 shrink-0"
                      style={{ color: "#E8521A" }}
                    />
                    <span className="text-base" style={{ color: "#A0A0A0" }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="mb-4 text-2xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                Applications
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <span
                    key={app}
                    className="rounded-lg border px-3 py-2 text-base"
                    style={{
                      borderColor: "#2A2A2A",
                      backgroundColor: "#0A0A0A",
                      color: "#FFFFFF",
                    }}
                  >
                    {app}
                  </span>
                ))}
              </div>
            </motion.div>

            {product.patterns && product.patterns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2
                  className="mb-4 text-2xl font-bold"
                  style={{ color: "#FFFFFF" }}
                >
                  Hole Patterns / Types
                </h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {product.patterns.map((pattern) => (
                    <div
                      key={pattern}
                      className="rounded-lg border px-4 py-3 text-base"
                      style={{
                        borderColor: "#2A2A2A",
                        backgroundColor: "#0A0A0A",
                        color: "#A0A0A0",
                      }}
                    >
                      {pattern}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProductQuoteForm productName={product.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section
        className="section-padding"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: "#FFFFFF" }}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedProducts.map((related, index) => {
              const relIcon =
                PRODUCTS.find((p) => p.slug === related.slug)?.icon ?? "Grid3X3";
              const RelIcon = getProductIcon(relIcon);
              return (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/products/${related.slug}`}
                    className="group flex h-full flex-col rounded-xl border p-6 transition-all hover:-translate-y-1 hover:border-[#E8521A]"
                    style={{
                      backgroundColor: "#111111",
                      borderColor: "#2A2A2A",
                    }}
                  >
                    <div
                      className="mb-4 flex size-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(232, 82, 26, 0.1)" }}
                    >
                      <RelIcon
                        className="size-6"
                        style={{ color: "#E8521A" }}
                      />
                    </div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "#FFFFFF" }}
                    >
                      {related.name}
                    </h3>
                    <p
                      className="mt-2 flex-1 text-base"
                      style={{ color: "#A0A0A0" }}
                    >
                      {related.tagline}
                    </p>
                    <span
                      className="mt-4 flex items-center gap-1 text-base font-semibold opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: "#E8521A" }}
                    >
                      View Details
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section-padding"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: "#FFFFFF" }}
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {product.faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="border-[#2A2A2A]"
              >
                <AccordionTrigger
                  className="text-base hover:no-underline"
                  style={{ color: "#FFFFFF" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-base"
                  style={{ color: "#A0A0A0" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
