"use client";

import dynamic from "next/dynamic";

export const IndiaMap = dynamic(
  () => import("@/components/shared/IndiaMap").then((m) => m.IndiaMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[480px] w-full animate-pulse items-center justify-center rounded-2xl border border-border bg-surface">
        <span className="text-sm text-[#444]">Loading map...</span>
      </div>
    ),
  }
);
