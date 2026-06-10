import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { PageHero } from "@/components/shared/PageHero";
import { BLOG_POSTS } from "@/lib/constants";
import { getPublishedBlogPosts } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Metal Manufacturing Insights | Blog | Jai Shree Group",
  description:
    "Technical guides, product tutorials, and industry insights on perforated sheets, wire mesh, laser cutting and expanded metal from Jai Shree Group.",
  alternates: {
    canonical: "https://jaishreegroup.in/blog",
  },
};

export default async function BlogIndexPage() {
  const dbPosts = await getPublishedBlogPosts();
  const posts =
    dbPosts.length > 0
      ? dbPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          date: p.published_at ?? p.created_at,
          cover_image_url: p.cover_image_url,
        }))
      : BLOG_POSTS.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          date: p.date,
          cover_image_url: null as string | null,
        }));

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
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border transition-all hover:border-[#E8521A]"
              style={{
                backgroundColor: "#0A0A0A",
                borderColor: "#2A2A2A",
              }}
            >
              {post.cover_image_url && (
                <div className="relative aspect-[2/1]">
                  <Image
                    src={post.cover_image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col p-8">
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
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
