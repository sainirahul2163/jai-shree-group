import { siteUrl } from "@/lib/seo";
import type { SiteConfig } from "@/sites/types";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbSchemaProps = {
  site: SiteConfig;
  items: BreadcrumbItem[];
};

export function BreadcrumbSchema({ site, items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(site, item.path),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
