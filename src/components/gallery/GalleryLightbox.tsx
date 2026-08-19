"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryItem } from "@/types/database";

/**
 * Full-size viewer for a gallery photo. Radix handles Esc and the focus trap;
 * we add left/right arrow keys so a visitor can page through the set the same
 * way they would in any photo viewer.
 */
export function GalleryLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const open = index !== null;
  const item = open ? items[index] : null;

  const step = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  if (!item) return null;

  const multiple = items.length > 1;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-5xl border p-0 sm:max-w-5xl"
        style={{ backgroundColor: "#0A0A0A", borderColor: "#2A2A2A" }}
      >
        <DialogTitle className="sr-only">{item.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {item.description ?? item.title}
        </DialogDescription>

        <div className="relative">
          <div
            className="relative max-h-[75vh] min-h-[240px] w-full"
            style={{ aspectRatio: "3 / 2" }}
          >
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          {multiple && (
            <>
              <button
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#FFFFFF" }}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#FFFFFF" }}
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        <div
          className="flex flex-wrap items-start justify-between gap-3 border-t px-5 py-4"
          style={{ borderColor: "#2A2A2A" }}
        >
          <div className="min-w-0">
            <p className="font-semibold" style={{ color: "#FFFFFF" }}>
              {item.title}
            </p>
            {item.description && (
              <p className="mt-1 text-sm" style={{ color: "#A0A0A0" }}>
                {item.description}
              </p>
            )}
          </div>
          {multiple && (
            <span
              className="shrink-0 text-xs tabular-nums"
              style={{ color: "#666666" }}
            >
              {(index ?? 0) + 1} / {items.length}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
