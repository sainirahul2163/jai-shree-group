"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left"
      style={{
        scaleX,
        backgroundColor: "#E8521A",
        boxShadow: "0 0 8px rgba(232, 82, 26, 0.6)",
      }}
    />
  );
}
