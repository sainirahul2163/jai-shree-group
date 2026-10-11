"use client";

import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Heart,
  Handshake,
  Package,
  Settings,
  Shield,
  Truck,
  ArrowRight,
} from "lucide-react";

import { CtaBanner } from "@/components/shared/CtaBanner";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/button";
import type { AboutPageContent } from "@/sites/content/types";

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

export function AboutPage({ content }: { content: AboutPageContent }) {
  const { hero, story, numbers, strengths, quality } = content;

  return (
    <>
      <PageHero
        label={hero.label}
        title={hero.title}
        subtitle={hero.subtitle}
        badges={hero.badges?.map((text) => ({ text }))}
      />

      {/* Our Story */}
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--brand-text)" }}
            >
              {story.label}
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: "var(--foreground)" }}
            >
              {story.heading}
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              {story.paragraphs.map((text) => (
                <p
                  key={text.slice(0, 24)}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {text}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          {story.timeline && (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {story.timeline.map((item, index) => (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="rounded-xl border p-5"
                style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                }}
              >
                <span
                  className="text-lg font-black"
                  style={{ color: "var(--brand-text)" }}
                >
                  {item.year}
                </span>
                <h3
                  className="mt-2 text-base font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          )}

          {/* Leadership */}
          {story.leadership && (
          <div className="mt-16">
            <h3
              className="text-2xl font-black"
              style={{ color: "var(--foreground)" }}
            >
              {story.leadership.heading}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {story.leadership.people.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="rounded-xl border p-5"
                  style={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                >
                  <p className="font-bold" style={{ color: "var(--foreground)" }}>
                    {leader.name}
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold"
                    style={{ color: "var(--brand-text)" }}
                  >
                    {leader.role}
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {leader.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          )}
        </div>
      </section>

      {/* By the Numbers */}
      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
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
              style={{ color: "var(--brand-text)" }}
            >
              {numbers.label}
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: "var(--foreground)" }}
            >
              {numbers.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {numbers.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="rounded-xl border p-6 text-center"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <p
                  className="text-2xl font-black sm:text-3xl"
                  style={{ color: "var(--brand-text)" }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-2 text-xs leading-snug sm:text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Strengths */}
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
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
              style={{ color: "var(--brand-text)" }}
            >
              {strengths.label}
            </p>
            <h2
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: "var(--foreground)" }}
            >
              {strengths.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.items.map((strength, index) => {
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
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                  }}
                >
                  <Icon
                    className="mb-4 size-8"
                    style={{ color: "var(--brand-text)" }}
                  />
                  <h3
                    className="text-base font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {strength.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {strength.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certification */}
      {quality && (
      <section className="section-padding" style={{ backgroundColor: "var(--background)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center rounded-2xl border p-12"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="flex size-32 items-center justify-center rounded-full border-4"
                style={{
                  borderColor: "var(--brand)",
                  backgroundColor: "color-mix(in oklab, var(--brand) 10%, transparent)",
                }}
              >
                <span
                  className="text-center text-sm font-black leading-tight"
                  style={{ color: "var(--brand-text)" }}
                >
                  {quality.badgeLines.map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </span>
              </div>
              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: "var(--text-secondary)" }}
              >
                {quality.badgeCaption}
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
                style={{ color: "var(--brand-text)" }}
              >
                {quality.label}
              </p>
              <h2
                className="text-3xl font-black tracking-tight"
                style={{ color: "var(--foreground)" }}
              >
                {quality.heading}
              </h2>
              <div className="mt-6 space-y-4">
                {quality.paragraphs.map((paragraph) =>
                  paragraph.emphasis ? (
                    <p
                      key={paragraph.text.slice(0, 24)}
                      className="text-base font-semibold leading-relaxed"
                      style={{ color: "var(--foreground)" }}
                    >
                      {paragraph.text}
                    </p>
                  ) : (
                    <p
                      key={paragraph.text.slice(0, 24)}
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {paragraph.text}
                    </p>
                  )
                )}
              </div>
              {quality.cta && (
                <Button asChild className="mt-8 glow-orange">
                  <Link href={quality.cta.href}>
                    <ArrowRight className="mr-2 size-4" />
                    {quality.cta.label}
                  </Link>
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* Vision & Mission */}
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border p-8"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="text-xl font-black"
                style={{ color: "var(--brand-text)" }}
              >
                Vision
              </h3>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {content.vision}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="rounded-xl border p-8"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="text-xl font-black"
                style={{ color: "var(--brand-text)" }}
              >
                Mission
              </h3>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {content.mission}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
