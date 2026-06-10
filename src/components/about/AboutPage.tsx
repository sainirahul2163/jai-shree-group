"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Download,
  Heart,
  Handshake,
  Package,
  Settings,
  Shield,
  Truck,
} from "lucide-react";

import { CtaBanner } from "@/components/shared/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import {
  ABOUT_STATS,
  ABOUT_STRENGTHS,
  ABOUT_TIMELINE_DETAILED,
  FAMILY_LEADERSHIP,
  VISION_MISSION,
} from "@/data/about";
import { COMPANY } from "@/lib/constants";

const STRENGTH_ICONS = {
  Shield,
  Award,
  Package,
  Clock,
  Settings,
  Truck,
  Handshake,
  Heart,
} as const;

export function AboutPage() {
  return (
    <>
      <PageHero
        title="About Jai Shree Group"
        subtitle="50+ years of precision metal manufacturing from Pune & Mumbai"
        badges={[
          { text: COMPANY.iso },
          { text: `Est. ${COMPANY.founded}` },
        ]}
      />

      {/* Our Story */}
      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#E8521A" }}
            >
              OUR STORY
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              From Delhi to India&apos;s Leading Metal Manufacturer
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-base leading-relaxed" style={{ color: "#A0A0A0" }}>
                Founded in 1970 by {COMPANY.founder} in {COMPANY.foundedIn}, Jai
                Shree Group began as a wire mesh manufacturer with a commitment to
                precision and quality. Over five decades, the group has grown into
                one of India&apos;s most trusted metal fabrication companies.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#A0A0A0" }}>
                Today, with 9 manufacturing units across Pune and Mumbai, we serve
                industries from automobile and construction to pharmaceutical and
                petrochemical — delivering perforated sheets, wire mesh, expanded
                metal, laser cutting, and more with ISO 9001:2015 certified processes.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ABOUT_TIMELINE_DETAILED.map((item, index) => (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="rounded-xl border p-5"
                style={{
                  backgroundColor: "#0A0A0A",
                  borderColor: "#2A2A2A",
                }}
              >
                <span
                  className="text-lg font-black"
                  style={{ color: "#E8521A" }}
                >
                  {item.year}
                </span>
                <h3
                  className="mt-2 text-base font-bold"
                  style={{ color: "#FFFFFF" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#A0A0A0" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Family Leadership */}
          <div className="mt-16">
            <h3
              className="text-2xl font-black"
              style={{ color: "#FFFFFF" }}
            >
              Family Leadership
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FAMILY_LEADERSHIP.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="rounded-xl border p-5"
                  style={{
                    backgroundColor: "#0A0A0A",
                    borderColor: "#2A2A2A",
                  }}
                >
                  <p className="font-bold" style={{ color: "#FFFFFF" }}>
                    {leader.name}
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold"
                    style={{ color: "#E8521A" }}
                  >
                    {leader.role}
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "#A0A0A0" }}
                  >
                    {leader.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#E8521A" }}
            >
              BY THE NUMBERS
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              Manufacturing at Scale
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {ABOUT_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="rounded-xl border p-6 text-center"
                style={{
                  backgroundColor: "#111111",
                  borderColor: "#2A2A2A",
                }}
              >
                <p
                  className="text-2xl font-black sm:text-3xl"
                  style={{ color: "#E8521A" }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-2 text-xs leading-snug sm:text-sm"
                  style={{ color: "#A0A0A0" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Strengths */}
      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-2xl"
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#E8521A" }}
            >
              OUR STRENGTHS
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: "#FFFFFF" }}
            >
              Our Edge on Others
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_STRENGTHS.map((strength, index) => {
              const Icon =
                STRENGTH_ICONS[
                  strength.icon as keyof typeof STRENGTH_ICONS
                ] ?? Shield;
              return (
                <motion.div
                  key={strength.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="rounded-xl border p-6"
                  style={{
                    backgroundColor: "#0A0A0A",
                    borderColor: "#2A2A2A",
                  }}
                >
                  <Icon
                    className="mb-4 size-8"
                    style={{ color: "#E8521A" }}
                  />
                  <h3
                    className="text-base font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {strength.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "#A0A0A0" }}
                  >
                    {strength.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ISO Certification */}
      <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center rounded-2xl border p-12"
              style={{
                backgroundColor: "#111111",
                borderColor: "#2A2A2A",
              }}
            >
              <div
                className="flex size-32 items-center justify-center rounded-full border-4"
                style={{
                  borderColor: "#E8521A",
                  backgroundColor: "rgba(232, 82, 26, 0.1)",
                }}
              >
                <span
                  className="text-center text-sm font-black leading-tight"
                  style={{ color: "#E8521A" }}
                >
                  ISO
                  <br />
                  9001:2015
                </span>
              </div>
              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: "#A0A0A0" }}
              >
                Certified Quality Management System
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#E8521A" }}
              >
                ISO CERTIFICATION
              </p>
              <h2
                className="text-3xl font-black tracking-tight"
                style={{ color: "#FFFFFF" }}
              >
                Committed to Total Quality Management
              </h2>
              <div className="mt-6 space-y-4">
                <p className="text-base leading-relaxed" style={{ color: "#A0A0A0" }}>
                  Jai Shree Group operates under {COMPANY.iso} certified quality
                  management systems. Every process — from raw material procurement to
                  final inspection — is controlled under direct supervision of our
                  promoters.
                </p>
                <p
                  className="text-base font-semibold leading-relaxed"
                  style={{ color: "#FFFFFF" }}
                >
                  Our rejection percentage is negligible.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "#A0A0A0" }}>
                  This commitment to quality has earned us long-term partnerships
                  with leading manufacturers across automobile, pharmaceutical,
                  construction, and industrial sectors.
                </p>
              </div>
              <Button asChild className="mt-8 glow-orange">
                <Link href="/certifications">
                  <Download className="mr-2 size-4" />
                  Download ISO Certificate
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border p-8"
              style={{
                backgroundColor: "#0A0A0A",
                borderColor: "#2A2A2A",
              }}
            >
              <h3
                className="text-xl font-black"
                style={{ color: "#E8521A" }}
              >
                Vision
              </h3>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "#A0A0A0" }}
              >
                {VISION_MISSION.vision}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="rounded-xl border p-8"
              style={{
                backgroundColor: "#0A0A0A",
                borderColor: "#2A2A2A",
              }}
            >
              <h3
                className="text-xl font-black"
                style={{ color: "#E8521A" }}
              >
                Mission
              </h3>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "#A0A0A0" }}
              >
                {VISION_MISSION.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
