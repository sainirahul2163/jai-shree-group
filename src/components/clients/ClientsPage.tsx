"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { CtaBanner } from "@/components/shared/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { HOME_INDUSTRIES } from "@/lib/constants";
import type { Testimonial } from "@/types/database";

const CLIENT_PLACEHOLDERS = [
  { industry: "Automobile", name: "Automotive OEM — Pune" },
  { industry: "Automobile", name: "Tier-1 Supplier — PCMC" },
  { industry: "Construction", name: "Builder — Mumbai" },
  { industry: "Construction", name: "Architect — Pune" },
  { industry: "Pharmaceutical", name: "Pharma Equipment — Maharashtra" },
  { industry: "Petrochemical", name: "Refinery Supplier — Mumbai" },
  { industry: "Food & Beverage", name: "Food Processing — Pune" },
  { industry: "Sugar Industry", name: "Sugar Mill — Maharashtra" },
];

const TESTIMONIALS = [
  {
    quote:
      "Jai Shree Group has been our trusted perforated sheet supplier for over a decade. Quality is consistent and delivery is always on time.",
    author: "Purchase Manager",
    company: "Automotive OEM, Pune",
  },
  {
    quote:
      "Their demister pads meet our exact specifications for refinery applications. ISO certification gives us confidence in every order.",
    author: "Project Engineer",
    company: "Petrochemical Plant, Mumbai",
  },
  {
    quote:
      "From custom hole patterns to large sheet sizes, they deliver exactly what we promise to our customers. Highly recommended.",
    author: "Production Head",
    company: "Fabrication Company, Maharashtra",
  },
];

type ClientsPageProps = {
  testimonials?: Testimonial[];
};

export function ClientsPage({ testimonials = [] }: ClientsPageProps) {
  const displayTestimonials =
    testimonials.length > 0
      ? testimonials.map((t) => ({
          quote: t.message,
          author: t.client_name,
          company: [t.company_name, t.industry].filter(Boolean).join(" · "),
          rating: t.rating,
        }))
      : TESTIMONIALS.map((t) => ({ ...t, rating: 5 }));

  return (
    <>
      <PageHero
        label="CLIENTS"
        title="Our Trusted Clients"
        subtitle="Serving leading manufacturers across automobile, construction, pharmaceutical, and industrial sectors for over 50 years."
      />

      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-8 text-2xl font-black"
            style={{ color: "#FFFFFF" }}
          >
            Industry-wise Clients
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CLIENT_PLACEHOLDERS.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex flex-col items-center justify-center rounded-xl border p-6 text-center"
                style={{
                  backgroundColor: "#0A0A0A",
                  borderColor: "#2A2A2A",
                }}
              >
                <div
                  className="mb-3 flex size-16 items-center justify-center rounded-lg text-lg font-black"
                  style={{
                    backgroundColor: "#111111",
                    color: "#666666",
                  }}
                >
                  {client.industry.charAt(0)}
                </div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#E8521A" }}
                >
                  {client.industry}
                </p>
                <p
                  className="mt-1 text-sm font-medium"
                  style={{ color: "#A0A0A0" }}
                >
                  {client.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-8 text-2xl font-black"
            style={{ color: "#FFFFFF" }}
          >
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {displayTestimonials.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.company + item.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="rounded-xl border p-6"
                style={{
                  backgroundColor: "#111111",
                  borderColor: "#2A2A2A",
                }}
              >
                <Quote
                  className="mb-4 size-8"
                  style={{ color: "#E8521A" }}
                />
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-[#E8521A] text-[#E8521A]"
                    />
                  ))}
                </div>
                <p
                  className="text-base leading-relaxed italic"
                  style={{ color: "#A0A0A0" }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-6 border-t pt-4" style={{ borderColor: "#2A2A2A" }}>
                  <p className="font-semibold" style={{ color: "#FFFFFF" }}>
                    {item.author}
                  </p>
                  <p className="text-sm" style={{ color: "#666666" }}>
                    {item.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl text-center">
          <h2
            className="text-2xl font-black"
            style={{ color: "#FFFFFF" }}
          >
            Industries Served
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {HOME_INDUSTRIES.map((industry) => (
              <span
                key={industry.slug}
                className="rounded-full border px-4 py-2 text-sm font-semibold"
                style={{
                  borderColor: "#2A2A2A",
                  color: "#A0A0A0",
                  backgroundColor: "#0A0A0A",
                }}
              >
                {industry.name}
              </span>
            ))}
          </div>
          <p className="mt-8 text-3xl font-black" style={{ color: "#E8521A" }}>
            8+ Industries
          </p>
          <p className="mt-2 text-base" style={{ color: "#A0A0A0" }}>
            Trusted by manufacturers across India since 1970
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
