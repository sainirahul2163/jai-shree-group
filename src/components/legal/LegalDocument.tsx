import type { ReactNode } from "react";

import { PageHero } from "@/components/shared/PageHero";
import { group } from "@/sites/group";
import type { SiteConfig } from "@/sites/types";

/** "Shree Weld Mesh, a Jai Shree Group company" for endorsed units; the plain name otherwise. */
export function businessName(site: SiteConfig): string {
  return site.endorsed ? `${site.name}, a ${group.name} company` : site.name;
}

export function LegalDocument({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle: string;
  lastUpdated: { iso: string; label: string };
  children: ReactNode;
}) {
  return (
    <>
      <PageHero label="LEGAL" title={title} subtitle={subtitle} />
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <div className="mx-auto max-w-3xl space-y-10">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Last updated:{" "}
            <time dateTime={lastUpdated.iso}>{lastUpdated.label}</time>
          </p>
          {children}
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2
        className="mb-4 text-xl font-bold tracking-tight md:text-2xl"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h2>
      <div
        className="space-y-4 text-base leading-relaxed [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-brand-text [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
        style={{ color: "var(--text-secondary)" }}
      >
        {children}
      </div>
    </section>
  );
}

/** Postal address, email and phone of the site's business. */
export function BusinessContact({ site }: { site: SiteConfig }) {
  return (
    <ul>
      <li>
        <strong style={{ color: "var(--foreground)" }}>
          {businessName(site)}
        </strong>
      </li>
      <li>Address: {site.contact.address}</li>
      <li>
        Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </li>
      <li>
        Phone:{" "}
        <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>
          {site.contact.phone}
        </a>
      </li>
    </ul>
  );
}
