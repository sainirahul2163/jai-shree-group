/**
 * Seeds blog post content into Supabase.
 * Run: npx tsx scripts/seed-blog-posts.ts
 * Requires SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL in .env.local
 */
import { readFileSync } from "fs";
import { resolve } from "path";

import { BLOG_POSTS } from "../src/data/blog-posts";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    console.warn("Could not read .env.local — using existing environment variables.");
  }
}

async function updatePost(
  url: string,
  serviceKey: string,
  post: (typeof BLOG_POSTS)[number]
) {
  const endpoint = `${url}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(post.slug)}`;
  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      is_published: true,
      published_at: post.date,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${text}`);
  }
}

async function main() {
  loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  for (const post of BLOG_POSTS) {
    try {
      await updatePost(url, serviceKey, post);
      console.log(`Updated: ${post.slug}`);
    } catch (error) {
      console.error(
        `Failed to update "${post.slug}":`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log("Done seeding blog posts.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
