"use client";

import { motion } from "framer-motion";
import { Award, Download, Shield, CheckCircle } from "lucide-react";

import { CtaBanner } from "@/components/shared/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const BENEFITS = [
  "Documented quality management processes at every stage",
  "Consistent product quality across all 8 manufacturing units",
  "Traceability from raw material to finished product",
  "Regular internal audits and continuous improvement",
  "Customer-focused approach with negligible rejection rates",
];

export function CertificationsPage() {
  return (
    <>
      <PageHero
        label="CERTIFICATIONS"
        title="ISO 9001:2015 Certified"
        subtitle="Quality you can trust — certified manufacturing processes across all our Pune and Mumbai facilities."
        badges={[{ text: COMPANY.iso }]}
      />

      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center rounded-2xl border p-12"
              style={{
                backgroundColor: "#0A0A0A",
                borderColor: "#2A2A2A",
              }}
            >
              <div
                className="flex size-40 items-center justify-center rounded-xl border-2 border-dashed"
                style={{ borderColor: "#2A2A2A" }}
              >
                <div className="text-center">
                  <Award
                    className="mx-auto mb-3 size-12"
                    style={{ color: "#E8521A" }}
                  />
                  <p
                    className="text-lg font-black"
                    style={{ color: "#E8521A" }}
                  >
                    ISO 9001:2015
                  </p>
                  <p className="mt-1 text-xs" style={{ color: "#666666" }}>
                    Certificate Preview
                  </p>
                </div>
              </div>
              <Button
                type="button"
                disabled
                className="mt-8 glow-orange opacity-60"
              >
                <Download className="mr-2 size-4" />
                Download ISO Certificate
              </Button>
              <p className="mt-3 text-xs" style={{ color: "#666666" }}>
                Certificate download coming soon
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-2xl font-black"
                style={{ color: "#FFFFFF" }}
              >
                About Our Certification
              </h2>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "#A0A0A0" }}
              >
                Jai Shree Group is certified under ISO 9001:2015 — the
                international standard for Quality Management Systems. This
                certification validates our commitment to consistent quality,
                customer satisfaction, and continuous improvement across all
                manufacturing operations.
              </p>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "#A0A0A0" }}
              >
                Our quality management system covers the entire production chain
                — from raw material procurement and in-process inspection to
                final dispatch — all under direct supervision of our promoters.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-center gap-3">
            <Shield className="size-8" style={{ color: "#E8521A" }} />
            <h2
              className="text-2xl font-black"
              style={{ color: "#FFFFFF" }}
            >
              What It Means for Our Customers
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="flex items-start gap-3 rounded-xl border p-5"
                style={{
                  backgroundColor: "#111111",
                  borderColor: "#2A2A2A",
                }}
              >
                <CheckCircle
                  className="mt-0.5 size-5 shrink-0"
                  style={{ color: "#E8521A" }}
                />
                <p className="text-base" style={{ color: "#A0A0A0" }}>
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need certified metal products?"
        primaryLabel="Get a Quote"
        primaryHref="/get-quote"
      />
    </>
  );
}
