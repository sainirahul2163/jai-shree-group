"use client";

import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

type CardSpotlight = {
  /** Radial glow that tracks the cursor inside the card. */
  background: MotionValue<string>;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  enabled: boolean;
};

export function useCardSpotlight(): CardSpotlight {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduceMotion = useReducedMotion() ?? false;

  const background = useMotionTemplate`radial-gradient(400px circle at ${x}px ${y}px, rgba(232,82,26,0.06), transparent 70%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return { background, onMouseMove, enabled: !reduceMotion };
}
