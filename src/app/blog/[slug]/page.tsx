import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, COMPANY } from "@/lib/constants";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/lib/supabase/queries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getFallbackPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
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
  const fallback = getFallbackPost(slug);
  const post = dbPost ?? fallback;
  if (!post) return {};

  const title = "meta_title" in post && post.meta_title
    ? post.meta_title
    : `${post.title} | Jai Shree Group Blog`;
  const description =
    "meta_description" in post && post.meta_description
      ? post.meta_description
      : post.excerpt;

  return {
    title,
    description,
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
  const fallback = getFallbackPost(slug);

  if (!dbPost && !fallback) {
    notFound();
  }

  const title = dbPost?.title ?? fallback!.title;
  const category = dbPost?.category ?? fallback!.category;
  const excerpt = dbPost?.excerpt ?? fallback!.excerpt;
  const date =
    dbPost?.published_at ?? dbPost?.created_at ?? fallback!.date;
  const content = dbPost?.content;
  const coverUrl = dbPost?.cover_image_url;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: title, path: `/blog/${slug}` },
        ]}
      />
      <section
        className="section-padding pt-28 md:pt-32"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="mx-auto max-w-3xl">
          {coverUrl && (
            <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-xl">
              <Image src={coverUrl} alt={title} fill className="object-cover" />
            </div>
          )}
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#E8521A" }}
          >
            {category}
          </span>
          <h1
            className="mt-4 text-3xl font-black sm:text-4xl"
            style={{ color: "#FFFFFF" }}
          >
            {title}
          </h1>
          <time
            className="mt-4 block text-sm"
            style={{ color: "#666666" }}
            dateTime={date}
          >
            {new Date(date).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          {content ? (
            <article
              className="prose prose-invert mt-8 max-w-none text-base leading-relaxed"
              style={{ color: "#A0A0A0" }}
            >
              {content.split("\n").map((para) => (
                <p key={para.slice(0, 30)} className="mb-4">
                  {para}
                </p>
              ))}
            </article>
          ) : (
            <>
              <p
                className="mt-8 text-lg leading-relaxed"
                style={{ color: "#A0A0A0" }}
              >
                {excerpt}
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
