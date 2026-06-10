import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { PageHero } from "@/components/shared/PageHero";
import { BLOG_POSTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Metal Manufacturing Insights | Blog | Jai Shree Group",
  description:
    "Technical guides, product tutorials, and industry insights on perforated sheets, wire mesh, laser cutting and expanded metal from Jai Shree Group.",
  alternates: {
    canonical: "https://jaishreegroup.in/blog",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <PageHero
        label="BLOG"
        title="Metal Manufacturing Insights"
        subtitle="Technical guides, product tutorials, and industry insights"
      />
      <section className="section-padding" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border p-8 transition-all hover:border-[#E8521A]"
              style={{
                backgroundColor: "#0A0A0A",
                borderColor: "#2A2A2A",
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#E8521A" }}
              >
                {post.category}
              </span>
              <h2
                className="mt-3 text-xl font-bold group-hover:text-[#E8521A]"
                style={{ color: "#FFFFFF" }}
              >
                {post.title}
              </h2>
              <p
                className="mt-3 flex-1 text-base leading-relaxed"
                style={{ color: "#A0A0A0" }}
              >
                {post.excerpt}
              </p>
              <time
                className="mt-4 text-sm"
                style={{ color: "#666666" }}
                dateTime={post.date}
              >
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
