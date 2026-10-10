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

import { HOME_SECTIONS, PRODUCTS } from "@/lib/constants";
import { getProductIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const Icon = getProductIcon(product.icon);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.a
        ref={ref}
        href={`/products/${product.slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "group relative flex h-full flex-col rounded-xl border p-6 transition-all duration-300",
          "border-border bg-surface hover:-translate-y-1 hover:border-brand",
          "hover:shadow-[0_8px_32px_color-mix(in oklab, var(--brand) 15%, transparent)]"
        )}
      >
        <div
          className="mb-4 flex size-12 items-center justify-center rounded-full"
          style={{ backgroundColor: "color-mix(in oklab, var(--brand) 10%, transparent)" }}
        >
          <Icon className="size-6" style={{ color: "var(--brand-text)" }} />
        </div>

        <h3
          className="text-lg font-bold"
          style={{ color: "var(--foreground)" }}
        >
          {product.name}
        </h3>

        <p
          className="mt-2 flex-1 text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.materials.slice(0, 4).map((material) => (
            <span
              key={material}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
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
          className="mt-4 flex items-center gap-1 text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ color: "var(--brand-text)" }}
        >
          View Details
          <ArrowRight className="size-3.5" />
        </span>
      </motion.a>
    </motion.div>
  );
}

export function ProductsSection() {
  const { products: section } = HOME_SECTIONS;

  return (
    <section
      id={section.id}
      className="section-padding"
      style={{ backgroundColor: "var(--background)" }}
    >
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
            {section.label}
          </p>
          <h2
            className="text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            {section.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {section.subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
