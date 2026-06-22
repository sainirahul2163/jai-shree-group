"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { IndiaMapGraphic } from "@/components/home/IndiaMapGraphic";
import { Button } from "@/components/ui/button";
import { BRANCH_PRODUCTS, getGoogleMapsUrl } from "@/data/branches";
import {
  COMPANY,
  HOME_SECTIONS,
  MUMBAI_BRANCHES,
  PUNE_BRANCHES,
  type BRANCHES,
} from "@/lib/constants";

type Branch = (typeof BRANCHES)[number];

function BranchDetailCard({
  branch,
  index,
}: {
  branch: Branch;
  index: number;
}) {
  const websiteUrl = branch.website.startsWith("http")
    ? branch.website
    : `https://${branch.website}`;
  const mapsUrl = getGoogleMapsUrl(branch.address);
  const products = BRANCH_PRODUCTS[branch.slug] ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="rounded-xl border p-6 transition-all duration-300 hover:border-[#E8521A]"
      style={{
        backgroundColor: "#111111",
        borderColor: "#2A2A2A",
      }}
    >
      <span
        className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
        style={{
          backgroundColor: "rgba(232, 82, 26, 0.15)",
          color: "#E8521A",
        }}
      >
        {branch.area}, {branch.city}
      </span>

      <h3
        className="mt-4 text-xl font-black"
        style={{ color: "#FFFFFF" }}
      >
        {branch.name}
      </h3>

      <div className="mt-4 space-y-3">
        <div className="flex items-start gap-2">
          <MapPin
            className="mt-0.5 size-4 shrink-0"
            style={{ color: "#E8521A" }}
          />
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base leading-relaxed transition-opacity hover:opacity-80"
            style={{ color: "#A0A0A0" }}
          >
            {branch.address}
          </a>
        </div>

        <a
          href={`tel:${branch.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-base transition-opacity hover:opacity-80"
        >
          <Phone className="size-4" style={{ color: "#E8521A" }} />
          <span style={{ color: "#FFFFFF" }}>{branch.phone}</span>
        </a>

        <a
          href={`mailto:${branch.email}`}
          className="flex items-center gap-2 text-base transition-opacity hover:opacity-80"
        >
          <Mail className="size-4" style={{ color: "#E8521A" }} />
          <span style={{ color: "#A0A0A0" }}>{branch.email}</span>
        </a>

        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-base transition-opacity hover:opacity-80"
        >
          <ExternalLink className="size-4" style={{ color: "#E8521A" }} />
          <span style={{ color: "#E8521A" }}>{branch.website}</span>
        </a>
      </div>

      <Button asChild size="sm" className="mt-4 glow-orange">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <Navigation className="mr-2 size-4" />
          Get Directions
        </a>
      </Button>

      {products.length > 0 && (
        <div className="mt-5 border-t pt-4" style={{ borderColor: "#2A2A2A" }}>
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#666666" }}
          >
            Products Available
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {products.map((product) => (
              <span
                key={product}
                className="rounded-md px-2 py-1 text-xs"
                style={{
                  backgroundColor: "#0A0A0A",
                  color: "#A0A0A0",
                }}
              >
                {product}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function BranchSection({
  title,
  branches,
}: {
  title: string;
  branches: readonly Branch[];
}) {
  return (
    <div className="mb-16">
      <h2
        className="mb-8 text-2xl font-black sm:text-3xl"
        style={{ color: "#FFFFFF" }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {branches.map((branch, index) => (
          <BranchDetailCard
            key={branch.slug}
            branch={branch}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export function GroupPage() {
  const { group: section } = HOME_SECTIONS;

  const overviewStats = [
    { value: "8", label: "Manufacturing Units" },
    { value: "2", label: "Cities" },
    { value: "50+", label: "Years Experience" },
    { value: "Pan India", label: "Delivery Network" },
  ];

  return (
    <>
      <PageHero
        label={section.label}
        title="Our Group"
        subtitle="8 manufacturing units strategically located across Pune and Mumbai"
      />

      {/* Overview */}
      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-base leading-relaxed" style={{ color: "#A0A0A0" }}>
              {COMPANY.name} operates {COMPANY.manufacturingUnits} specialized
              manufacturing units under one family-owned group. Each unit focuses on
              specific metal fabrication capabilities — from CNC perforation and fiber
              laser cutting to wire mesh, welded mesh, and filtration products — ensuring
              expert production at every step.
            </p>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "#A0A0A0" }}
            >
              With facilities in Talawade and Pisoli (Pune) and Bhayander,
              Masjid Bunder, and Palghar (Mumbai region), we deliver faster turnaround
              and Pan India logistics to clients across every major industrial hub.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {overviewStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="rounded-xl border p-6 text-center"
                style={{
                  backgroundColor: "#0A0A0A",
                  borderColor: "#2A2A2A",
                }}
              >
                <p
                  className="text-2xl font-black sm:text-3xl"
                  style={{ color: "#E8521A" }}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-sm" style={{ color: "#A0A0A0" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Branches */}
      <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-7xl">
          <BranchSection title="Pune Units" branches={PUNE_BRANCHES} />
          <BranchSection
            title="Mumbai & Maharashtra Units"
            branches={MUMBAI_BRANCHES}
          />
        </div>
      </section>

      {/* India Map */}
      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h2
              className="text-2xl font-black sm:text-3xl"
              style={{ color: "#FFFFFF" }}
            >
              Serving Clients Across India
            </h2>
            <p className="mt-3 text-base" style={{ color: "#A0A0A0" }}>
              {section.mapCaption}
            </p>
          </motion.div>
          <IndiaMapGraphic width={480} className="" />
        </div>
      </section>
    </>
  );
}
