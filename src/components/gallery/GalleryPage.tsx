"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GalleryItem } from "@/types/database";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "perforated-sheets", label: "Perforated" },
  { id: "laser-cutting", label: "Laser" },
  { id: "expanded-metal", label: "Expanded" },
  { id: "wire-mesh", label: "Wire Mesh" },
  { id: "welded-mesh", label: "Welded" },
] as const;

const PLACEHOLDER_ITEMS = [
  { name: "Perforated SS Sheet — Round Holes", category: "perforated-sheets" },
  { name: "CNC Perforated Panel", category: "perforated-sheets" },
  { name: "Laser Cut Bracket", category: "laser-cutting" },
  { name: "Fiber Laser Cut Enclosure", category: "laser-cutting" },
  { name: "Diamond Expanded Metal", category: "expanded-metal" },
  { name: "Expanded Metal Stair Tread", category: "expanded-metal" },
  { name: "SS Wire Mesh 100 Mesh", category: "wire-mesh" },
  { name: "Crimped Vibrating Screen", category: "wire-mesh" },
  { name: "Welded Mesh Panel", category: "welded-mesh" },
  { name: "Heavy Duty Welded Grid", category: "welded-mesh" },
  { name: "Automotive Filter Screen", category: "perforated-sheets" },
  { name: "Architectural Facade Panel", category: "perforated-sheets" },
];

type GalleryPageProps = {
  items?: GalleryItem[];
};

export function GalleryPage({ items = [] }: GalleryPageProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const hasDbItems = items.length > 0;

  const dbFiltered = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.product_category === activeFilter);
  }, [items, activeFilter]);

  const placeholderFiltered =
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
            <TabsList className="mb-8 flex h-auto flex-wrap gap-2 bg-transparent p-0">
              {FILTERS.map((filter) => (
                <TabsTrigger
                  key={filter.id}
                  value={filter.id}
                  className="rounded-full border px-4 py-2 data-[state=active]:border-[#E8521A] data-[state=active]:bg-[rgba(232,82,26,0.15)] data-[state=active]:text-[#E8521A]"
                  style={{ borderColor: "#2A2A2A", color: "#A0A0A0" }}
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {FILTERS.map((filter) => (
              <TabsContent key={filter.id} value={filter.id}>
                {hasDbItems ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {dbFiltered.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04, duration: 0.4 }}
                        className="overflow-hidden rounded-xl border"
                        style={{
                          backgroundColor: "#0A0A0A",
                          borderColor: "#2A2A2A",
                        }}
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="mt-1 text-xs" style={{ color: "#A0A0A0" }}>
                              {item.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {placeholderFiltered.map((item, index) => (
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
                        <Camera className="mb-4 size-12" style={{ color: "#666666" }} />
                        <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                          {item.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {!hasDbItems && (
            <p className="mt-12 text-center text-base" style={{ color: "#A0A0A0" }}>
              Images coming soon —{" "}
              <a href="/contact" className="font-semibold" style={{ color: "#E8521A" }}>
                contact us
              </a>{" "}
              for product samples
            </p>
          )}
        </div>
      </section>
    </>
  );
}
