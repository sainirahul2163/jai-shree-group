"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const SPRING = { type: "spring", stiffness: 100, damping: 30 } as const;

export function LandingNav() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight * 0.8);
  });

  return (
    <AnimatePresence>
      {visible && (
        <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center">
          <motion.nav
            initial={{ y: -72, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -72, opacity: 0 }}
            transition={SPRING}
            className="pointer-events-auto flex max-w-fit items-center gap-4 rounded-full border border-white/10 bg-black/60 px-6 py-3 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-bold tracking-widest text-white"
              aria-label="Scroll to top"
            >
              JAI SHREE
            </button>
            <span aria-hidden className="h-1 w-1 rounded-full bg-white/30" />
            <Link
              href="/get-quote"
              className="text-sm font-medium text-[#E8521A] transition-colors hover:text-[#FF6B35]"
            >
              Get Quote
            </Link>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
