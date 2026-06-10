import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, COMPANY } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Jai Shree Group Blog`,
    description: post.excerpt,
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
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
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
        <div className="mx-auto max-w-3xl text-center">
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
          <p
            className="mt-8 text-lg leading-relaxed"
            style={{ color: "#A0A0A0" }}
          >
            {post.excerpt}
          </p>
          <div
            className="mt-12 rounded-xl border p-8"
            style={{
              backgroundColor: "#111111",
              borderColor: "#2A2A2A",
            }}
          >
            <p
              className="text-xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              Coming Soon
            </p>
            <p className="mt-3 text-base" style={{ color: "#A0A0A0" }}>
              This article is being prepared. In the meantime, explore our
              products or use our open area calculator.
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
          <Button asChild variant="link" className="mt-8" style={{ color: "#E8521A" }}>
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
