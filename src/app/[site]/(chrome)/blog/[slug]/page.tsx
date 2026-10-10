import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { BlogPostingSchema } from "@/components/seo/BlogPostingSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug as getStaticBlogPost } from "@/data/blog-posts";
import { BLOG_POSTS } from "@/lib/constants";
import { siteUrl } from "@/lib/seo";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/lib/supabase/queries";
import { findSite } from "@/sites";
import { siteFromParams } from "@/sites/params";
import type { SiteConfig } from "@/sites/types";

type PageProps = {
  params: Promise<{ site: string; slug: string }>;
};

function resolvePost(
  site: SiteConfig,
  slug: string,
  dbPost: Awaited<ReturnType<typeof getBlogPostBySlug>>
) {
  // The seed posts in src/data/blog-posts.ts belong to the group site only.
  const staticPost =
    site.key === "group" ? getStaticBlogPost(slug) : undefined;
  if (!dbPost && !staticPost) return null;

  const title = dbPost?.title ?? staticPost!.title;
  const category = dbPost?.category ?? staticPost!.category;
  const excerpt = dbPost?.excerpt ?? staticPost!.excerpt;
  const date =
    dbPost?.published_at ?? dbPost?.created_at ?? staticPost!.date;
  const content = (dbPost?.content?.trim() || staticPost?.content || "").trim();
  const metaTitle =
    dbPost?.meta_title?.trim() ||
    staticPost?.meta_title ||
    `${title} | ${site.name} Blog`;
  const metaDescription =
    dbPost?.meta_description?.trim() ||
    staticPost?.meta_description ||
    excerpt;
  const coverUrl = dbPost?.cover_image_url ?? null;

  return {
    title,
    category,
    excerpt,
    date,
    content,
    metaTitle,
    metaDescription,
    coverUrl,
  };
}

export async function generateStaticParams({
  params,
}: {
  params: { site: string };
}) {
  const site = findSite(params.site);
  if (!site) return [];
  const dbSlugs = await getAllBlogSlugs(site.key);
  const constantSlugs =
    site.key === "group" ? BLOG_POSTS.map((p) => p.slug) : [];
  const slugs = [...new Set([...dbSlugs, ...constantSlugs])];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = await siteFromParams(params);
  const dbPost = await getBlogPostBySlug(site.key, slug);
  const post = resolvePost(site, slug, dbPost);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: siteUrl(site, `/blog/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: siteUrl(site, `/blog/${slug}`),
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const site = await siteFromParams(params);
  const dbPost = await getBlogPostBySlug(site.key, slug);
  const post = resolvePost(site, slug, dbPost);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostingSchema
        site={site}
        title={post.title}
        description={post.metaDescription}
        slug={slug}
        datePublished={post.date}
      />
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <section
        className="section-padding pt-28 md:pt-32"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="mx-auto max-w-3xl">
          {post.coverUrl && (
            <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-xl">
              <Image
                src={post.coverUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--brand-text)" }}
          >
            {post.category}
          </span>
          <h1
            className="mt-4 text-3xl font-black sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            {post.title}
          </h1>
          <time
            className="mt-4 block text-sm"
            style={{ color: "var(--text-muted)" }}
            dateTime={post.date}
          >
            {new Date(post.date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          {post.content ? (
            <BlogArticleContent content={post.content} />
          ) : (
            <>
              <p
                className="mt-8 text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {post.excerpt}
              </p>
              <div
                className="mt-12 rounded-xl border p-8 text-center"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  Coming Soon
                </p>
                <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
                  Full article content is being prepared.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild className="glow-orange">
                    <Link href="/products">Browse Products</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-border bg-transparent"
                  >
                    <Link href="/calculator">Open Area Calculator</Link>
                  </Button>
                </div>
              </div>
            </>
          )}

          <Button
            asChild
            variant="link"
            className="mt-8 px-0"
            style={{ color: "var(--brand-text)" }}
          >
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
