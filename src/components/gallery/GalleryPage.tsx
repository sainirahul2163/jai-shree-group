"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const DimpleSheet3D = dynamic(
  () =>
    import("@/components/products/DimpleSheet3D").then((m) => m.DimpleSheet3D),
  { ssr: false }
);

import { PageHero } from "@/components/shared/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import type { GalleryItem } from "@/types/database";

const FILTERS = [
  { id: "all", label: "All" },
  ...GALLERY_CATEGORIES.map((c) => ({ id: c.slug, label: c.label })),
];

// Panoramic shots are uploaded with a "-wide" suffix and given a 2:1 crop, so
// they take two grid cells instead of being squashed into a square.
function isWide(imageUrl: string) {
  return /-wide\.[a-z]+$/i.test(imageUrl);
}

function GalleryEmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#1A1A1A]">
        <Camera className="h-7 w-7 text-[#E8521A]" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">
        Product Photography Coming Soon
      </h3>
      <p className="mb-8 max-w-sm text-sm text-[#A0A0A0]">
        We&apos;re documenting our manufacturing processes and product range.
        Check back soon for high-quality imagery.
      </p>
      <Link
        href="/products"
        className="rounded-lg bg-[#E8521A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#FF6B35]"
      >
        Explore Our Products →
      </Link>
    </div>
  );
}

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

  return (
    <>
      <PageHero
        label="GALLERY"
        title="Product Gallery"
        subtitle="Explore our range of perforated sheets, laser cutting, expanded metal, and wire mesh products."
      />

      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-7xl">
          <section className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-orange-500/40" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-orange-500">
                3D Interactive Preview
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-black text-white">
              Dimple / Embossed Sheet
            </h2>
            <p className="mb-6 max-w-lg text-sm text-[#666]">
              Real-time 3D render of our embossed dimple sheet. Move your mouse
              to rotate and see the metallic reflections.
            </p>
            <DimpleSheet3D />
            <p className="mt-3 text-center text-xs text-[#444]">
              Photography from our manufacturing units below
            </p>
          </section>

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
                  dbFiltered.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {dbFiltered.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.04, duration: 0.4 }}
                          className={`overflow-hidden rounded-xl border ${
                            isWide(item.image_url) ? "sm:col-span-2" : ""
                          }`}
                          style={{
                            backgroundColor: "#0A0A0A",
                            borderColor: "#2A2A2A",
                          }}
                        >
                          <div
                            className={`relative ${
                              isWide(item.image_url)
                                ? "aspect-[2/1]"
                                : "aspect-square"
                            }`}
                          >
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes={
                                isWide(item.image_url)
                                  ? "(max-width: 768px) 100vw, 50vw"
                                  : "(max-width: 768px) 100vw, 25vw"
                              }
                            />
                          </div>
                          <div className="p-4">
                            <p
                              className="text-sm font-semibold"
                              style={{ color: "#FFFFFF" }}
                            >
                              {item.title}
                            </p>
                            {item.description && (
                              <p
                                className="mt-1 text-xs"
                                style={{ color: "#A0A0A0" }}
                              >
                                {item.description}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <GalleryEmptyState />
                  )
                ) : (
                  <GalleryEmptyState />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
}
