import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BlogArticleContent } from "@/components/blog/BlogArticleContent";
import { BlogPostingSchema } from "@/components/seo/BlogPostingSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug as getStaticBlogPost } from "@/data/blog-posts";
import { BLOG_POSTS, COMPANY } from "@/lib/constants";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/lib/supabase/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolvePost(slug: string, dbPost: Awaited<ReturnType<typeof getBlogPostBySlug>>) {
  const staticPost = getStaticBlogPost(slug);
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
    `${title} | Jai Shree Group Blog`;
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

export async function generateStaticParams() {
  const dbSlugs = await getAllBlogSlugs();
  const constantSlugs = BLOG_POSTS.map((p) => p.slug);
  const slugs = [...new Set([...dbSlugs, ...constantSlugs])];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbPost = await getBlogPostBySlug(slug);
  const post = resolvePost(slug, dbPost);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `${COMPANY.website}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${COMPANY.website}/blog/${slug}`,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const dbPost = await getBlogPostBySlug(slug);
  const post = resolvePost(slug, dbPost);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostingSchema
        title={post.title}
        description={post.metaDescription}
        slug={slug}
        datePublished={post.date}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <section
        className="section-padding pt-28 md:pt-32"
        style={{ backgroundColor: "#0A0A0A" }}
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
            style={{ color: "#E8521A" }}
          >
            {post.category}
          </span>
          <h1
            className="mt-4 text-3xl font-black sm:text-4xl"
            style={{ color: "#FFFFFF" }}
          >
            {post.title}
          </h1>
          <time
            className="mt-4 block text-sm"
            style={{ color: "#666666" }}
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
                style={{ color: "#A0A0A0" }}
              >
                {post.excerpt}
              </p>
              <div
                className="mt-12 rounded-xl border p-8 text-center"
                style={{
                  backgroundColor: "#111111",
                  borderColor: "#2A2A2A",
                }}
              >
                <p className="text-xl font-bold" style={{ color: "#FFFFFF" }}>
                  Coming Soon
                </p>
                <p className="mt-3 text-base" style={{ color: "#A0A0A0" }}>
                  Full article content is being prepared.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild className="glow-orange">
                    <Link href="/products">Browse Products</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#2A2A2A] bg-transparent"
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
            style={{ color: "#E8521A" }}
          >
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
