"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

import { ProductQuoteForm } from "@/components/products/ProductQuoteForm";
import { PageHero } from "@/components/shared/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { LocationPageData } from "@/data/locations";
import { PRODUCT_DETAILS } from "@/data/products";

type LocationPageClientProps = {
  data: LocationPageData;
};

export function LocationPageClient({ data }: LocationPageClientProps) {
  const product = PRODUCT_DETAILS[data.productSlug];

  return (
    <>
      <PageHero title={data.h1} subtitle={data.intro[0]} />

      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-2xl font-black"
                style={{ color: "#FFFFFF" }}
              >
                {data.productName} in {data.cityName}
              </h2>
              <div className="mt-4 space-y-4">
                {data.intro.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="text-base leading-relaxed"
                    style={{ color: "#A0A0A0" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div
                className="mt-8 rounded-xl border p-6"
                style={{
                  backgroundColor: "#0A0A0A",
                  borderColor: "#2A2A2A",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#E8521A" }}
                >
                  Our {data.cityName} Facility
                </p>
                <h3
                  className="mt-2 text-lg font-bold"
                  style={{ color: "#FFFFFF" }}
                >
                  {data.facilityName}
                </h3>
                <div className="mt-3 flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0"
                    style={{ color: "#E8521A" }}
                  />
                  <p className="text-base" style={{ color: "#A0A0A0" }}>
                    {data.facilityAddress}
                  </p>
                </div>
                <Button asChild size="sm" className="mt-4 glow-orange">
                  <a
                    href={data.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="overflow-hidden rounded-xl border"
              style={{ borderColor: "#2A2A2A" }}
            >
              <iframe
                src={data.mapEmbedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${data.facilityName}`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2
                className="mb-6 text-2xl font-black"
                style={{ color: "#FFFFFF" }}
              >
                Products Available
              </h2>
              <ul className="space-y-3">
                {data.products.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border px-4 py-3 text-base"
                    style={{
                      backgroundColor: "#111111",
                      borderColor: "#2A2A2A",
                      color: "#A0A0A0",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {product && (
                <Button asChild variant="outline" className="mt-6 border-[#2A2A2A]">
                  <Link href={`/products/${data.productSlug}`}>
                    View {data.productName} Details
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              )}
            </div>

            <div>
              <h2
                className="mb-6 text-2xl font-black"
                style={{ color: "#FFFFFF" }}
              >
                Industries Served in {data.cityName}
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.industries.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border px-4 py-2 text-sm font-semibold"
                    style={{
                      borderColor: "#E8521A",
                      color: "#E8521A",
                      backgroundColor: "rgba(232, 82, 26, 0.1)",
                    }}
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-8 text-2xl font-black"
            style={{ color: "#FFFFFF" }}
          >
            Specifications
          </h2>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#2A2A2A" }}>
            <table className="w-full text-left text-base">
              <tbody>
                {data.specs.map((spec, index) => (
                  <tr
                    key={spec.label}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#0A0A0A" : "#111111",
                    }}
                  >
                    <th
                      className="px-6 py-4 font-semibold"
                      style={{ color: "#FFFFFF", width: "40%" }}
                    >
                      {spec.label}
                    </th>
                    <td
                      className="px-6 py-4"
                      style={{ color: "#A0A0A0" }}
                    >
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-8 text-2xl font-black"
            style={{ color: "#FFFFFF" }}
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {data.faqs.map((faq, index) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${index}`}
                className="rounded-xl border px-4"
                style={{
                  backgroundColor: "#111111",
                  borderColor: "#2A2A2A",
                }}
              >
                <AccordionTrigger
                  className="text-left text-base font-semibold hover:no-underline"
                  style={{ color: "#FFFFFF" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-base leading-relaxed"
                  style={{ color: "#A0A0A0" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {product && (
        <section className="section-padding" style={{ backgroundColor: "#111111" }}>
          <div className="mx-auto max-w-2xl">
            <h2
              className="mb-2 text-center text-2xl font-black"
              style={{ color: "#FFFFFF" }}
            >
              Get a Quote for {data.productName} in {data.cityName}
            </h2>
            <p
              className="mb-8 text-center text-base"
              style={{ color: "#A0A0A0" }}
            >
              Fill in your requirements and we&apos;ll respond within 24 hours.
            </p>
            <ProductQuoteForm productName={product.name} />
          </div>
        </section>
      )}
    </>
  );
}
