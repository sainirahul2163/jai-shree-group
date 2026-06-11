"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-[#E8521A] to-[#FF6B35]"
      style={{ scaleX }}
    />
  );
}
