import { createAnonClient } from "@/lib/supabase/anon";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerClient } from "@/lib/supabase/server";
import type {
  BlogPost,
  GalleryItem,
  Lead,
  Testimonial,
} from "@/types/database";

function mapRows<T>(data: unknown): T[] {
  return (data ?? []) as T[];
}

function mapRow<T>(data: unknown): T | null {
  return (data ?? null) as T | null;
}

export async function getPublishedGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Gallery fetch error:", error);
    return [];
  }
  return mapRows<GalleryItem>(data);
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  if (error) {
    console.error("Blog fetch error:", error);
    return [];
  }
  return mapRows<BlogPost>(data);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) {
    console.error("Blog post fetch error:", error);
    return null;
  }
  return mapRow<BlogPost>(data);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createAnonClient();
  const { data, error } = await supabase.from("blog_posts").select("slug");
  if (error) return [];
  return mapRows<{ slug: string }>(data).map((row) => row.slug);
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Testimonials fetch error:", error);
    return [];
  }
  return mapRows<Testimonial>(data);
}

export async function getLeadsStats() {
  if (!isSupabaseConfigured()) {
    return { total: 0, newCount: 0, monthCount: 0, converted: 0 };
  }
  const supabase = await createServerClient();
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalRes, newRes, monthRes, convertedRes] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString()),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "converted"),
  ]);

  return {
    total: totalRes.count ?? 0,
    newCount: newRes.count ?? 0,
    monthCount: monthRes.count ?? 0,
    converted: convertedRes.count ?? 0,
  };
}

export async function getRecentLeads(limit = 10): Promise<Lead[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return mapRows<Lead>(data);
}

export async function getPageViewStats() {
  if (!isSupabaseConfigured()) {
    return { today: 0, topPages: [] as { page: string; count: number }[] };
  }
  const supabase = await createServerClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  const { count: today } = await supabase
    .from("page_views")
    .select("id", { count: "exact", head: true })
    .gte("created_at", todayStart.toISOString());

  const { data: views } = await supabase
    .from("page_views")
    .select("page")
    .gte("created_at", weekStart.toISOString());

  const pageCounts: Record<string, number> = {};
  mapRows<{ page: string }>(views).forEach((v) => {
    pageCounts[v.page] = (pageCounts[v.page] ?? 0) + 1;
  });

  const topPages = Object.entries(pageCounts)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { today: today ?? 0, topPages };
}

export async function getLeadProductStats() {
  if (!isSupabaseConfigured()) return [] as { product: string; count: number }[];
  const supabase = await createServerClient();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data } = await supabase
    .from("leads")
    .select("product_interest, products_selected")
    .gte("created_at", thirtyDaysAgo.toISOString());

  const counts: Record<string, number> = {};
  mapRows<Pick<Lead, "product_interest" | "products_selected">>(data).forEach(
    (lead) => {
      if (lead.products_selected?.length) {
        lead.products_selected.forEach((p) => {
          counts[p] = (counts[p] ?? 0) + 1;
        });
      } else if (lead.product_interest) {
        counts[lead.product_interest] = (counts[lead.product_interest] ?? 0) + 1;
      }
    }
  );

  return Object.entries(counts)
    .map(([product, count]) => ({ product, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}
