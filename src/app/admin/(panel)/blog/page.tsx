import { BlogAdminClient } from "@/components/admin/BlogAdminClient";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Blog | Admin | Jai Shree Group",
};

export default async function AdminBlogPage() {
  const supabase = await createServerClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return <BlogAdminClient posts={posts ?? []} />;
}
