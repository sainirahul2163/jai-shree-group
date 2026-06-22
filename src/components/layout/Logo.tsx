"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const scales = { sm: 0.7, md: 1, lg: 1.3 };
  const s = scales[size];
  const w = Math.round(200 * s);
  const h = Math.round(52 * s);

  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="Jai Shree Group Home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={w}
        height={h}
        viewBox="0 0 200 52"
        fill="none"
      >
        {/* ── Flame icon ── */}
        <g transform="translate(24, 26)">
          {/* Outer flame — orange */}
          <path
            d="M0,-22 C3,-22 9,-16 11,-8 C13,-1 10,6 5,11 C3,14 1,16 0,17 C-1,16 -3,14 -5,11 C-10,6 -13,-1 -11,-8 C-9,-16 -3,-22 0,-22 Z"
            fill="#E8521A"
          />
          {/* Inner cutout — transparent dark */}
          <path
            d="M0,-12 C2,-12 6,-8 7,-4 C8,-1 6,3 3,6 C1,8 0,9 0,9 C-1,8 -2,7 -5,4 C-8,1 -8,-4 -7,-4 C-6,-8 -2,-12 0,-12 Z"
            fill="#0A0A0A"
          />
          {/* Inner bright core */}
          <path
            d="M0,-5 C1,-5 3,-3 3,-1 C4,1 2,4 1,5 C0,6 0,6 0,6 C-1,5 -2,4 -3,2 C-4,0 -4,-3 -3,-1 C-3,-3 -1,-5 0,-5 Z"
            fill="#FF6B35"
          />
          {/* Hook at bottom */}
          <path
            d="M0,17 C-2,20 -5,24 -7,26 C-9,28 -7,31 -4,31 C-2,31 1,29 3,27 C5,24 3,20 0,17 Z"
            fill="#E8521A"
          />
          {/* Dark circle in hook */}
          <circle cx="-4" cy="27" r="3" fill="#0A0A0A" />
        </g>

        {/* ── JAI SHREE wordmark ── */}
        <text
          x="50"
          y="22"
          fontFamily="Arial Black, Arial, sans-serif"
          fontSize="18"
          fontWeight="900"
          fill="#FFFFFF"
          letterSpacing="-0.3"
        >
          JAI SHREE
        </text>

        {/* Orange underline accent */}
        <rect x="50" y="26" width="142" height="1.5" fill="#E8521A" rx="0.5" />

        {/* GROUP */}
        <text
          x="50"
          y="37"
          fontFamily="Arial, sans-serif"
          fontSize="7"
          fontWeight="400"
          fill="#E8521A"
          letterSpacing="4"
        >
          GROUP
        </text>

        {/* Tagline */}
        <text
          x="50"
          y="48"
          fontFamily="Arial, sans-serif"
          fontSize="5.5"
          fontWeight="400"
          fill="#555555"
          letterSpacing="1"
        >
          PRECISION IN EVERY PERFORATION
        </text>
      </svg>
    </Link>
  );
}
