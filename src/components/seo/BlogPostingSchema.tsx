import { COMPANY } from "@/lib/constants";

type BlogPostingSchemaProps = {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
};

export function BlogPostingSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author = "Jai Shree Group",
}: BlogPostingSchemaProps) {
  const url = `${COMPANY.website}/blog/${slug}`;

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
      url: COMPANY.website,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
      url: COMPANY.website,
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
