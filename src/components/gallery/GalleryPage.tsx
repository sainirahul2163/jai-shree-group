"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Expand } from "lucide-react";

import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

const DimpleSheet3D = dynamic(
  () =>
    import("@/components/products/DimpleSheet3D").then((m) => m.DimpleSheet3D),
  { ssr: false }
);

import { PageHero } from "@/components/shared/PageHero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import type { PageHeroContent } from "@/sites/content/types";
import type { GalleryItem } from "@/types/database";

// Panoramic shots are uploaded with a "-wide" suffix and given a 2:1 crop, so
// they take two grid cells instead of being squashed into a square.
function isWide(imageUrl: string) {
  return /-wide\.[a-z]+$/i.test(imageUrl);
}

function GalleryEmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface-2">
        <Camera className="h-7 w-7 text-brand-text" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">
        Product Photography Coming Soon
      </h3>
      <p className="mb-8 max-w-sm text-sm text-text-secondary">
        We&apos;re documenting our manufacturing processes and product range.
        Check back soon for high-quality imagery.
      </p>
      <Link
        href="/products"
        className="rounded-lg bg-brand px-6 py-3 font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
      >
        Explore Our Products →
      </Link>
    </div>
  );
}

type GalleryPageProps = {
  items?: GalleryItem[];
  hero: PageHeroContent;
  /** The 3D dimple-sheet preview (group site). */
  showDimplePreview: boolean;
  /** Category tabs to offer; the group shows them all. */
  categories: string[];
};

export function GalleryPage({
  items = [],
  hero,
  showDimplePreview,
  categories,
}: GalleryPageProps) {
  const FILTERS = [
    { id: "all", label: "All" },
    ...GALLERY_CATEGORIES.filter((c) => categories.includes(c.slug)).map((c) => ({
      id: c.slug,
      label: c.label,
    })),
  ];
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasDbItems = items.length > 0;

  const dbFiltered = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.product_category === activeFilter);
  }, [items, activeFilter]);

  return (
    <>
      <PageHero
        label={hero.label}
        title={hero.title}
        subtitle={hero.subtitle}
        badges={hero.badges?.map((text) => ({ text }))}
      />

      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto max-w-7xl">
          {showDimplePreview && (
          <section className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-[color-mix(in_oklab,var(--label-accent)_40%,transparent)]" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--label-accent)]">
                3D Interactive Preview
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-black text-foreground">
              Dimple / Embossed Sheet
            </h2>
            <p className="mb-6 max-w-lg text-sm text-text-muted">
              Real-time 3D render of our embossed dimple sheet. Move your mouse
              to rotate and see the metallic reflections.
            </p>
            <DimpleSheet3D />
            <p className="mt-3 text-center text-xs text-[#444]">
              Photography from our manufacturing units below
            </p>
          </section>
          )}

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
                  className="rounded-full border px-4 py-2 data-[state=active]:border-brand data-[state=active]:bg-[color-mix(in_oklab,var(--brand)_15%,transparent)] data-[state=active]:text-brand-text"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
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
                            backgroundColor: "var(--background)",
                            borderColor: "var(--border)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setLightboxIndex(index)}
                            aria-label={`View ${item.title} full size`}
                            className={`group relative block w-full cursor-zoom-in ${
                              isWide(item.image_url)
                                ? "aspect-[2/1]"
                                : "aspect-square"
                            }`}
                          >
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes={
                                isWide(item.image_url)
                                  ? "(max-width: 768px) 100vw, 50vw"
                                  : "(max-width: 768px) 100vw, 25vw"
                              }
                            />
                            <span
                              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              style={{ backgroundColor: "rgba(10,10,10,0.45)" }}
                            >
                              <Expand
                                className="size-6"
                                style={{ color: "var(--foreground)" }}
                              />
                            </span>
                          </button>
                          <div className="p-4">
                            <p
                              className="text-sm font-semibold"
                              style={{ color: "var(--foreground)" }}
                            >
                              {item.title}
                            </p>
                            {item.description && (
                              <p
                                className="mt-1 text-xs"
                                style={{ color: "var(--text-secondary)" }}
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

      <GalleryLightbox
        items={dbFiltered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
