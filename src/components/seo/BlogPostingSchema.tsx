import { siteUrl } from "@/lib/seo";
import type { SiteConfig } from "@/sites/types";

type BlogPostingSchemaProps = {
  site: SiteConfig;
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
};

export function BlogPostingSchema({
  site,
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author = site.name,
}: BlogPostingSchemaProps) {
  const url = siteUrl(site, `/blog/${slug}`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: site.origin,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.origin,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
