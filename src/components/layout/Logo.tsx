"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Hexagon } from "lucide-react";

import { cn } from "@/lib/utils";

function TextLogo() {
  return (
    <>
      <Hexagon
        className="size-7 transition-transform duration-300 group-hover:rotate-90"
        strokeWidth={1.5}
        style={{ color: "#E8521A", fill: "rgba(232, 82, 26, 0.2)" }}
      />
      <div className="flex flex-col leading-none">
        <span
          className="text-sm font-black tracking-[0.2em] sm:text-base"
          style={{ color: "#FFFFFF" }}
        >
          JAI SHREE
        </span>
        <span
          className="text-xs font-bold tracking-[0.35em] sm:text-sm"
          style={{ color: "#E8521A" }}
        >
          GROUP
        </span>
      </div>
    </>
  );
}

export function Logo({ className }: { className?: string }) {
  const [showTextLogo, setShowTextLogo] = useState(false);

  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      {showTextLogo ? (
        <TextLogo />
      ) : (
        <Image
          src="/logo.png"
          alt="Shree Perforators"
          width={160}
          height={48}
          className="h-10 w-auto sm:h-12"
          priority
          onError={() => setShowTextLogo(true)}
        />
      )}
    </Link>
  );
}
