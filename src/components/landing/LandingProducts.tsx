"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { PRODUCTS } from "@/lib/constants";
import { getProductIcon } from "@/lib/icons";
import { useCardSpotlight } from "./hooks/useCardSpotlight";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

type Product = (typeof PRODUCTS)[number];
type Variant = "hero" | "medium" | "small";

/**
 * Asymmetric 4-col bento. Spans are tuned so the grid is perfectly
 * rectangular: rows of 4 cells each, zero holes.
 */
const LAYOUT: { slug: Product["slug"]; variant: Variant; className: string }[] =
  [
    {
      slug: "perforated-sheets",
      variant: "hero",
      className: "md:col-span-2 md:row-span-2",
    },
    { slug: "laser-cutting", variant: "medium", className: "md:col-span-2" },
    { slug: "wire-mesh", variant: "small", className: "" },
    { slug: "welded-mesh", variant: "small", className: "" },
    { slug: "expanded-metal", variant: "medium", className: "md:col-span-2" },
    { slug: "turret-punching", variant: "medium", className: "md:col-span-2" },
    { slug: "demister-pad", variant: "small", className: "" },
    { slug: "aluminum-grill-profile", variant: "small", className: "" },
    {
      slug: "precision-sheet-leveling",
      variant: "medium",
      className: "md:col-span-2",
    },
  ];

const PRODUCT_BY_SLUG = new Map<string, Product>(
  PRODUCTS.map((p) => [p.slug, p])
);

function heroChips(product: Product): string[] {
  return Object.entries(product.specs)
    .slice(0, 2)
    .map(([key, value]) =>
      key === "maxThickness" ? `Up to ${value}` : String(value)
    );
}

function BentoCard({
  product,
  variant,
  className,
  index,
}: {
  product: Product;
  variant: Variant;
  className: string;
  index: number;
}) {
  const { background, onMouseMove, enabled } = useCardSpotlight();
  const reduceMotion = useReducedMotion() ?? false;
  const Icon = getProductIcon(product.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { ...SPRING, delay: index * 0.06 },
      }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileHover={reduceMotion ? undefined : { scale: 1.005 }}
      transition={SPRING}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-[#1C1C1C] bg-[#0C0C0C] transition-colors duration-300 hover:border-[#E8521A]/40 ${className}`}
    >
      {variant === "hero" && (
        <>
          {/* Mini perforation field — echoes the hero */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 right-2 select-none text-[8rem] font-black leading-none text-white/[0.03]"
          >
            01
          </span>
        </>
      )}

      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}

      <Link
        href={`/products/${product.slug}`}
        className={`relative flex h-full flex-col p-6 md:p-8 ${
          variant === "small" ? "items-center justify-center text-center" : ""
        }`}
      >
        {variant === "hero" && (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E8521A]/10">
              <Icon className="h-6 w-6 text-[#E8521A]" strokeWidth={1.75} />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-white">
              {product.name}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-[#8A8A8A]">
              {product.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {heroChips(product).map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                >
                  {chip}
                </span>
              ))}
            </div>
            <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-[#E8521A]">
              Explore
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </>
        )}

        {variant === "medium" && (
          <>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8521A]/10">
                <Icon className="h-5 w-5 text-[#E8521A]" strokeWidth={1.75} />
              </div>
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#8A8A8A]">
              {product.description}
            </p>
            <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-[#E8521A] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Explore
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </>
        )}

        {variant === "small" && (
          <>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8521A]/10">
              <Icon className="h-5 w-5 text-[#E8521A]" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-base font-bold leading-snug text-white">
              {product.name}
            </h3>
          </>
        )}
      </Link>
    </motion.div>
  );
}

export function LandingProducts() {
  const reduceMotion = useReducedMotion() ?? false;

  const reveal = (delay: number) => ({
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 40,
      filter: reduceMotion ? "blur(0px)" : "blur(8px)",
    },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { ...SPRING, delay },
  });

  return (
    <section className="bg-[#060606] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div {...reveal(0)} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-orange-500/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-orange-500">
            What We Make
          </span>
        </motion.div>

        <motion.h2
          {...reveal(0.1)}
          className="mt-6 text-5xl font-black tracking-tight md:text-7xl"
        >
          <span className="block text-white">Nine Ways We</span>
          <span className="block text-[#3A3A3A]">Shape Metal</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[11rem]">
          {LAYOUT.map((entry, i) => {
            const product = PRODUCT_BY_SLUG.get(entry.slug);
            if (!product) return null;
            return (
              <BentoCard
                key={entry.slug}
                product={product}
                variant={entry.variant}
                className={entry.className}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
