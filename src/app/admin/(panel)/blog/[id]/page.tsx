import { notFound } from "next/navigation";

import { BlogEditorClient } from "@/components/admin/BlogEditorClient";
import { createServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Edit Blog Post | Admin | Jai Shree Group",
};

export default async function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  return <BlogEditorClient post={post} />;
}
