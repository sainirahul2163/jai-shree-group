"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "perforated", label: "Perforated" },
  { id: "laser", label: "Laser" },
  { id: "expanded", label: "Expanded" },
  { id: "wire-mesh", label: "Wire Mesh" },
  { id: "welded", label: "Welded" },
] as const;

const PLACEHOLDER_ITEMS = [
  { name: "Perforated SS Sheet — Round Holes", category: "perforated" },
  { name: "CNC Perforated Panel", category: "perforated" },
  { name: "Laser Cut Bracket", category: "laser" },
  { name: "Fiber Laser Cut Enclosure", category: "laser" },
  { name: "Diamond Expanded Metal", category: "expanded" },
  { name: "Expanded Metal Stair Tread", category: "expanded" },
  { name: "SS Wire Mesh 100 Mesh", category: "wire-mesh" },
  { name: "Crimped Vibrating Screen", category: "wire-mesh" },
  { name: "Welded Mesh Panel", category: "welded" },
  { name: "Heavy Duty Welded Grid", category: "welded" },
  { name: "Automotive Filter Screen", category: "perforated" },
  { name: "Architectural Facade Panel", category: "perforated" },
];

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PLACEHOLDER_ITEMS
      : PLACEHOLDER_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <>
      <PageHero
        label="GALLERY"
        title="Product Gallery"
        subtitle="Explore our range of perforated sheets, laser cutting, expanded metal, and wire mesh products."
      />

      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <Tabs
            value={activeFilter}
            onValueChange={setActiveFilter}
            className="w-full"
          >
            <TabsList
              className="mb-8 flex h-auto flex-wrap gap-2 bg-transparent p-0"
            >
              {FILTERS.map((filter) => (
                <TabsTrigger
                  key={filter.id}
                  value={filter.id}
                  className="rounded-full border px-4 py-2 data-[state=active]:border-[#E8521A] data-[state=active]:bg-[rgba(232,82,26,0.15)] data-[state=active]:text-[#E8521A]"
                  style={{
                    borderColor: "#2A2A2A",
                    color: "#A0A0A0",
                  }}
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {FILTERS.map((filter) => (
              <TabsContent key={filter.id} value={filter.id}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04, duration: 0.4 }}
                      className="flex aspect-square flex-col items-center justify-center rounded-xl border p-6 text-center"
                      style={{
                        backgroundColor: "#0A0A0A",
                        borderColor: "#2A2A2A",
                      }}
                    >
                      <Camera
                        className="mb-4 size-12"
                        style={{ color: "#666666" }}
                      />
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#FFFFFF" }}
                      >
                        {item.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <p
            className="mt-12 text-center text-base"
            style={{ color: "#A0A0A0" }}
          >
            Images coming soon —{" "}
            <a href="/contact" className="font-semibold" style={{ color: "#E8521A" }}>
              contact us
            </a>{" "}
            for product samples
          </p>
        </div>
      </section>
    </>
  );
}
