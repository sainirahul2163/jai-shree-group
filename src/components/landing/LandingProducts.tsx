"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import {
  getProductBySlug,
  getProductKeySpec,
  LANDING_BENTO,
  type BentoSize,
} from "@/data/landing";
import { getProductIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function BentoCard({
  slug,
  size,
  index,
  gridClass,
}: {
  slug: string;
  size: BentoSize;
  index: number;
  gridClass: string;
}) {
  const product = getProductBySlug(slug);
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  if (!product) return null;

  const Icon = getProductIcon(product.icon);
  const keySpec = getProductKeySpec(product);

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={gridClass}
    >
      <motion.a
        ref={ref}
        href={`/products/${slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: "#0F0F0F",
          borderColor: "#1F1F1F",
        }}
        className={cn(
          "group flex h-full flex-col rounded-2xl border p-5 transition-all duration-300",
          "hover:border-[#E8521A] hover:shadow-[0_0_30px_rgba(232,82,26,0.15)]",
          size === "large" && "min-h-[280px] p-6 md:min-h-[320px]",
          size === "medium" && "min-h-[160px]",
          size === "small" && "min-h-[120px] justify-center"
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-[rgba(232,82,26,0.15)]",
            size === "large" ? "mb-5 size-14" : "mb-3 size-10"
          )}
          style={{ backgroundColor: "rgba(232, 82, 26, 0.1)" }}
        >
          <Icon
            className={size === "large" ? "size-7" : "size-5"}
            style={{ color: "#E8521A" }}
          />
        </div>

        <h3
          className={cn(
            "font-bold",
            size === "large" ? "text-xl" : "text-base"
          )}
          style={{ color: "#FFFFFF" }}
        >
          {product.name}
        </h3>

        {size === "large" && (
          <>
            <p
              className="mt-2 flex-1 text-sm leading-relaxed"
              style={{ color: "#A0A0A0" }}
            >
              {product.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.materials.slice(0, 4).map((m) => (
                <span
                  key={m}
                  className="rounded-full px-2 py-0.5 text-xs"
                  style={{
                    backgroundColor: "#1A1A1A",
                    color: "#A0A0A0",
                    border: "1px solid #2A2A2A",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </>
        )}

        {size === "medium" && (
          <p className="mt-1 text-sm" style={{ color: "#666666" }}>
            {keySpec}
          </p>
        )}

        {size !== "small" && (
          <span
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100"
            style={{ color: "#E8521A" }}
          >
            View <ArrowRight className="size-3.5" />
          </span>
        )}
      </motion.a>
    </motion.div>
  );
}

export function LandingProducts() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#E8521A" }}
          >
            What We Manufacture
          </p>
          <h2 className="text-3xl font-black sm:text-4xl md:text-5xl">
            Nine Capabilities. One Trusted Partner.
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#A0A0A0" }}>
            From CNC perforation to fiber laser cutting — precision metal
            fabrication for every industrial application.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[minmax(120px,auto)]">
          {LANDING_BENTO.map((item, index) => (
            <BentoCard
              key={item.slug}
              slug={item.slug}
              size={item.size}
              index={index}
              gridClass={item.gridClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
