import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { PageHero } from "@/components/shared/PageHero";
import { BLOG_POSTS } from "@/lib/constants";
import { getPublishedBlogPosts } from "@/lib/supabase/queries";
import { contentMetadata } from "@/lib/seo";
import { getContent } from "@/sites/content";
import { siteForPage, type SiteParams } from "@/sites/params";

/** Posts are managed in Supabase — refresh the static page hourly so newly
 *  published posts appear without a redeploy. */
export const revalidate = 3600;

export async function generateMetadata({ params }: SiteParams): Promise<Metadata> {
  const site = await siteForPage(params, "/blog");
  return contentMetadata(getContent(site.key).meta.blog!, "/blog");
}

export default async function BlogIndexPage({ params }: SiteParams) {
  const site = await siteForPage(params, "/blog");
  const dbPosts = await getPublishedBlogPosts(site.key);
  // The seed posts in src/data/blog-posts.ts belong to the group site only.
  const seedPosts = site.key === "group" ? BLOG_POSTS : [];
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
      : seedPosts.map((p) => ({
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
        site={site}
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
      <section className="section-padding" style={{ backgroundColor: "var(--surface)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border transition-all hover:border-brand"
              style={{
                backgroundColor: "var(--background)",
                borderColor: "var(--border)",
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
                  style={{ color: "var(--brand-text)" }}
                >
                  {post.category}
                </span>
                <h2
                  className="mt-3 text-xl font-bold group-hover:text-brand-text"
                  style={{ color: "var(--foreground)" }}
                >
                  {post.title}
                </h2>
                <p
                  className="mt-3 flex-1 text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.excerpt}
                </p>
                <time
                  className="mt-4 text-sm"
                  style={{ color: "var(--text-muted)" }}
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
