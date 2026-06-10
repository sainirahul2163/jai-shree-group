"use client";

import { motion } from "framer-motion";

import { HOME_SECTIONS, INDIA_MAP } from "@/lib/constants";

function MapPin({
  left,
  top,
  label,
}: {
  left: string;
  top: string;
  label: string;
}) {
  return (
    <div
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{ left, top }}
    >
      <div className="relative flex size-8 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: "rgba(232, 82, 26, 0.35)" }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0.15, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          className="relative size-3 rounded-full"
          style={{
            backgroundColor: "#E8521A",
            boxShadow: "0 0 12px rgba(232, 82, 26, 0.8)",
          }}
        />
      </div>
      <span
        className="mt-1.5 text-xs font-semibold"
        style={{ color: "#FFFFFF" }}
      >
        {label}
      </span>
    </div>
  );
}

type IndiaMapGraphicProps = {
  width?: number;
  showCaption?: boolean;
  className?: string;
};

function IndiaMapGraphic({
  width = 300,
  showCaption = true,
  className = "mt-12",
}: IndiaMapGraphicProps) {
  const pins = Object.values(INDIA_MAP.pins);
  const height = Math.round(width * 1.2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center ${className}`}
    >
      <div className="relative mx-auto" style={{ width }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={INDIA_MAP.src}
          alt="Map of India showing Pune and Mumbai locations"
          width={width}
          height={height}
          className="h-auto w-full"
        />
        {pins.map((pin) => (
          <MapPin
            key={pin.label}
            left={pin.left}
            top={pin.top}
            label={pin.label}
          />
        ))}
      </div>
      {showCaption && (
        <p className="mt-6 text-center text-sm" style={{ color: "#A0A0A0" }}>
          {HOME_SECTIONS.group.mapCaption}
        </p>
      )}
    </motion.div>
  );
}

export { IndiaMapGraphic };
