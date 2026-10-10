"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import type { ProductCard as ProductCardData } from "@/data/products";
import { getProductIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { PageHeroContent } from "@/sites/content/types";
import { useSiteProducts } from "@/sites/SiteProvider";

function ProductCard({
  product,
  index,
}: {
  product: ProductCardData;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const Icon = getProductIcon(product.icon);
  const specEntries = Object.entries(product.specs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.a
        ref={ref}
        href={`/products/${product.slug}`}
        onMouseMove={(e) => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "group relative flex h-full flex-col rounded-xl border p-8 transition-all duration-300",
          "border-border bg-surface hover:-translate-y-1 hover:border-brand",
          "hover:shadow-[0_8px_32px_color-mix(in oklab, var(--brand) 15%, transparent)]"
        )}
      >
        <div
          className="mb-5 flex size-14 items-center justify-center rounded-full"
          style={{ backgroundColor: "color-mix(in oklab, var(--brand) 10%, transparent)" }}
        >
          <Icon className="size-7" style={{ color: "var(--brand-text)" }} />
        </div>

        <h2 className="text-xl font-black" style={{ color: "var(--foreground)" }}>
          {product.name}
        </h2>

        <p
          className="mt-3 flex-1 text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {product.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {specEntries.slice(0, 4).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg px-3 py-2"
              style={{ backgroundColor: "var(--background)" }}
            >
              <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {product.materials.slice(0, 5).map((material) => (
            <span
              key={material}
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: "var(--surface-2)",
                color: "var(--text-secondary)",
              }}
            >
              {material}
            </span>
          ))}
        </div>

        <span
          className="mt-6 flex items-center gap-1 text-sm font-semibold"
          style={{ color: "var(--brand-text)" }}
        >
          View Full Specifications
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </motion.a>
    </motion.div>
  );
}

export function ProductsIndexPage({
  hero,
  intro,
}: {
  hero: PageHeroContent;
  intro: string;
}) {
  const products = useSiteProducts();

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
          <p
            className="mb-10 max-w-3xl text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {intro}
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
