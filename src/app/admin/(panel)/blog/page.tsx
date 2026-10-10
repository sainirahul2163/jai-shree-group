import { BlogAdminClient } from "@/components/admin/BlogAdminClient";
import { createServerClient } from "@/lib/supabase/server";
import { parseSiteFilter } from "@/sites/names";

export const metadata = {
  title: "Blog | Admin | Jai Shree Group",
};

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const site = parseSiteFilter((await searchParams).site);
  const supabase = await createServerClient();
  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (site) query = query.eq("site", site);
  const { data: posts } = await query;

  return <BlogAdminClient posts={posts ?? []} site={site} />;
}
