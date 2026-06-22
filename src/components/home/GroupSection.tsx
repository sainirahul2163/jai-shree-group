"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  HOME_SECTIONS,
  MUMBAI_BRANCHES,
  PUNE_BRANCHES,
  type BRANCHES,
} from "@/lib/constants";
import { IndiaMap } from "@/components/shared/IndiaMapLoader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type Branch = (typeof BRANCHES)[number];

function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  const websiteUrl = branch.website.startsWith("http")
    ? branch.website
    : `https://${branch.website}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#E8521A] hover:shadow-[0_8px_32px_rgba(232,82,26,0.12)]"
      style={{
        backgroundColor: "#111111",
        borderColor: "#2A2A2A",
      }}
    >
      <span
        className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold"
        style={{
          backgroundColor: "rgba(232, 82, 26, 0.15)",
          color: "#E8521A",
        }}
      >
        {branch.area}, {branch.city}
      </span>

      <h3
        className="mt-3 text-base font-bold"
        style={{ color: "#FFFFFF" }}
      >
        {branch.name}
      </h3>

      <div className="mt-3 space-y-2">
        <div className="flex items-start gap-2">
          <MapPin
            className="mt-0.5 size-3.5 shrink-0"
            style={{ color: "#666666" }}
          />
          <p className="text-base leading-relaxed" style={{ color: "#A0A0A0" }}>
            {branch.address}
          </p>
        </div>

        <a
          href={`tel:${branch.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 text-base transition-opacity hover:opacity-80"
        >
          <Phone className="size-3.5" style={{ color: "#E8521A" }} />
          <span style={{ color: "#FFFFFF" }}>{branch.phone}</span>
        </a>

        <a
          href={`mailto:${branch.email}`}
          className="flex items-center gap-2 text-base transition-opacity hover:opacity-80"
        >
          <Mail className="size-3.5" style={{ color: "#E8521A" }} />
          <span style={{ color: "#A0A0A0" }}>{branch.email}</span>
        </a>

        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-base transition-opacity hover:opacity-80"
        >
          <ExternalLink className="size-3.5" style={{ color: "#E8521A" }} />
          <span style={{ color: "#E8521A" }}>{branch.website}</span>
        </a>
      </div>
    </motion.div>
  );
}

function BranchGrid({ branches }: { branches: readonly Branch[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch, index) => (
        <BranchCard key={branch.slug} branch={branch} index={index} />
      ))}
    </div>
  );
}

export function GroupSection() {
  const { group: section } = HOME_SECTIONS;

  return (
    <section
      id={section.id}
      className="section-padding"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#E8521A" }}
          >
            {section.label}
          </p>
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: "#FFFFFF" }}
          >
            {section.heading}
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#A0A0A0" }}>
            {section.subtext}
          </p>
        </motion.div>

        <Tabs defaultValue="pune" className="gap-6">
          <TabsList
            className="h-auto w-full justify-start gap-2 rounded-xl border p-1 sm:w-auto"
            style={{
              backgroundColor: "#111111",
              borderColor: "#2A2A2A",
            }}
          >
            <TabsTrigger
              value="pune"
              className="rounded-lg px-6 py-2 data-active:bg-[#E8521A] data-active:text-white"
              style={{ color: "#A0A0A0" }}
            >
              {section.tabs.pune} ({PUNE_BRANCHES.length})
            </TabsTrigger>
            <TabsTrigger
              value="mumbai"
              className="rounded-lg px-6 py-2 data-active:bg-[#E8521A] data-active:text-white"
              style={{ color: "#A0A0A0" }}
            >
              {section.tabs.mumbai} ({MUMBAI_BRANCHES.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pune">
            <BranchGrid branches={PUNE_BRANCHES} />
          </TabsContent>

          <TabsContent value="mumbai">
            <BranchGrid branches={MUMBAI_BRANCHES} />
          </TabsContent>
        </Tabs>

        <div className="mt-16">
          <IndiaMap />
        </div>
      </div>
    </section>
  );
}
