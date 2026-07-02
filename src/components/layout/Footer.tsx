import Link from "next/link";
import { Download, Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import {
  BROCHURE_URL,
  COMPANY,
  FOOTER,
  PRODUCTS,
} from "@/lib/constants";

function whatsappUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  Linkedin: LinkedInIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
} as const;

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "#0A0A0A",
        borderColor: "#2A2A2A",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p
              className="mt-4 text-sm italic"
              style={{ color: "#A0A0A0" }}
            >
              {COMPANY.tagline}
            </p>
            <p
              className="mt-2 text-xs"
              style={{ color: "#666666" }}
            >
              Also known as Shree Perforators | Jai Shree Metal Perforators
            </p>
            <span
              className="mt-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                borderColor: "#E8521A",
                backgroundColor: "#1A1A1A",
                color: "#E8521A",
              }}
            >
              {COMPANY.iso} Certified
            </span>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "#A0A0A0" }}
            >
              {FOOTER.description}
            </p>
            <div className="mt-6 flex gap-3">
              {FOOTER.social.map((item) => {
                const Icon =
                  SOCIAL_ICONS[item.icon as keyof typeof SOCIAL_ICONS] ??
                  LinkedInIcon;
                const href = item.href as string;
                const isPlaceholder = !href || href === "#";

                if (isPlaceholder) {
                  return (
                    <span
                      key={item.name}
                      title={`${item.name} — coming soon`}
                      className="flex size-9 cursor-not-allowed items-center justify-center rounded-lg border opacity-50"
                      style={{
                        borderColor: "#2A2A2A",
                        color: "#A0A0A0",
                        backgroundColor: "#111111",
                      }}
                      aria-label={`${item.name} coming soon`}
                    >
                      <Icon className="size-4" />
                    </span>
                  );
                }

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex size-9 items-center justify-center rounded-lg border transition-colors hover:border-[#E8521A] hover:text-[#E8521A]"
                    style={{
                      borderColor: "#2A2A2A",
                      color: "#A0A0A0",
                      backgroundColor: "#111111",
                    }}
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 — Products */}
          <div>
            <h3
              className="mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ color: "#E8521A" }}
            >
              {FOOTER.headings.products}
            </h3>
            <ul className="space-y-2.5">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-sm transition-colors hover:text-[#E8521A]"
                    style={{ color: "#A0A0A0" }}
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Quick Links */}
          <div>
            <h3
              className="mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ color: "#E8521A" }}
            >
              {FOOTER.headings.company}
            </h3>
            <ul className="space-y-2.5">
              {FOOTER.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#E8521A]"
                    style={{ color: "#A0A0A0" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3
              className="mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ color: "#E8521A" }}
            >
              {FOOTER.headings.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: "#E8521A" }}
                />
                <span className="text-sm" style={{ color: "#A0A0A0" }}>
                  {COMPANY.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-[#FFFFFF]"
                  style={{ color: "#A0A0A0" }}
                >
                  <Phone className="size-4 shrink-0" style={{ color: "#E8521A" }} />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-[#FFFFFF]"
                  style={{ color: "#A0A0A0" }}
                >
                  <Mail className="size-4 shrink-0" style={{ color: "#E8521A" }} />
                  {COMPANY.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                asChild
                variant="outline"
                className="h-10 w-full bg-transparent font-semibold hover:bg-[#1A1A1A]"
                style={{
                  borderColor: "#E8521A",
                  color: "#E8521A",
                }}
              >
                <a
                  href={BROCHURE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="size-4" />
                  {FOOTER.buttons.brochure}
                </a>
              </Button>
              <Button
                asChild
                className="h-10 w-full border-0 font-semibold hover:opacity-90"
                style={{
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                }}
              >
                <a
                  href={whatsappUrl(COMPANY.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {FOOTER.buttons.whatsapp}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "#2A2A2A" }}
      >
        <div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs md:flex-row md:px-8 md:text-left lg:px-16"
          style={{ color: "#666666" }}
        >
          <p>{FOOTER.copyright}</p>
          <p>{FOOTER.certification}</p>
        </div>
      </div>
    </footer>
  );
}
