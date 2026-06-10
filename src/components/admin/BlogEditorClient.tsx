"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { BlogEditorForm } from "@/components/admin/BlogEditorForm";
import type { BlogPost } from "@/types/database";

export function BlogEditorClient({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <BlogEditorForm
      post={post}
      isPending={isPending}
      onSaved={() => {
        startTransition(() => {
          router.push("/admin/blog");
          router.refresh();
        });
      }}
    />
  );
}
