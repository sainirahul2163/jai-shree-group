"use client";

import Link from "next/link";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { deleteBlogPost } from "@/lib/supabase/actions";
import type { BlogPost } from "@/types/database";

export function BlogAdminClient({ posts }: { posts: BlogPost[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Blog Posts</h2>
        <Button asChild className="glow-orange">
          <Link href="/admin/blog/new">New Post</Link>
        </Button>
      </div>

      <div
        className="overflow-x-auto rounded-xl border"
        style={{ borderColor: "#2A2A2A" }}
      >
        <table className="w-full text-left text-sm">
          <thead style={{ backgroundColor: "#111111", color: "#666666" }}>
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center" style={{ color: "#666666" }}>
                  No blog posts yet
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-t" style={{ borderColor: "#2A2A2A" }}>
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3">{post.category}</td>
                  <td className="px-4 py-3">
                    {post.is_published ? (
                      <span style={{ color: "#22C55E" }}>Published</span>
                    ) : (
                      <span style={{ color: "#666666" }}>Draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#A0A0A0" }}>
                    {new Date(post.created_at).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline" className="border-[#2A2A2A]">
                        <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-900/50 text-red-400"
                        disabled={isPending}
                        onClick={() =>
                          startTransition(async () => {
                            await deleteBlogPost(post.id);
                          })
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
