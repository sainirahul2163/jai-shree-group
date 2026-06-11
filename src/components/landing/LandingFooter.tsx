"use client";

import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { COMPANY, FOOTER } from "@/lib/constants";
import { whatsappUrl } from "@/lib/email";

export function LandingFooter() {
  return (
    <footer
      className="border-t px-4 py-8 md:px-8"
      style={{ backgroundColor: "#0A0A0A", borderColor: "#1F1F1F" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo />
        <p className="text-sm" style={{ color: "#666666" }}>
          {FOOTER.copyright}
        </p>
        <a
          href={whatsappUrl(COMPANY.whatsapp, "Hi, I need a quote.")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ color: "#25D366" }}
        >
          WhatsApp Us →
        </a>
      </div>
    </footer>
  );
}
