"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { saveBlogPost } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/types/database";

const CATEGORIES = [
  "Technical Guide",
  "Product Guide",
  "Cost Guide",
  "Industry Insights",
  "General",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogEditorForm({
  post,
  isPending,
  onSaved,
}: {
  post?: BlogPost;
  isPending?: boolean;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [category, setCategory] = useState(post?.category ?? "General");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(
    post?.meta_description ?? ""
  );
  const [coverUrl, setCoverUrl] = useState(post?.cover_image_url ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleCoverUpload(file: File) {
    const supabase = createClient();
    const path = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("blog-covers")
      .upload(path, file);
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data } = supabase.storage.from("blog-covers").getPublicUrl(path);
    setCoverUrl(data.publicUrl);
  }

  async function handleSave(publish: boolean) {
    setSaving(true);
    setError("");
    try {
      await saveBlogPost(
        {
          title,
          slug: slug || slugify(title),
          excerpt,
          content,
          category,
          meta_title: metaTitle,
          meta_description: metaDescription,
          cover_image_url: coverUrl,
          is_published: publish,
        },
        post?.id
      );
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-2xl font-black">
        {post ? "Edit Post" : "New Blog Post"}
      </h2>

      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!post) setSlug(slugify(e.target.value));
            }}
            className="mt-1.5 border-[#2A2A2A] bg-[#111111]"
          />
        </div>
        <div>
          <Label>Slug</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1.5 border-[#2A2A2A] bg-[#111111]"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="mt-1.5 border-[#2A2A2A] bg-[#111111]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Excerpt</Label>
          <Textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1.5 border-[#2A2A2A] bg-[#111111]"
            rows={3}
          />
        </div>
        <div>
          <Label>Content (Markdown supported)</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1.5 border-[#2A2A2A] bg-[#111111] font-mono text-sm"
            rows={12}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Meta Title</Label>
            <Input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="mt-1.5 border-[#2A2A2A] bg-[#111111]"
            />
          </div>
          <div>
            <Label>Meta Description</Label>
            <Input
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="mt-1.5 border-[#2A2A2A] bg-[#111111]"
            />
          </div>
        </div>
        <div>
          <Label>Cover Image</Label>
          <Input
            type="file"
            accept="image/*"
            className="mt-1.5 border-[#2A2A2A] bg-[#111111]"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleCoverUpload(f);
            }}
          />
          {coverUrl && (
            <p className="mt-2 truncate text-xs" style={{ color: "#A0A0A0" }}>
              {coverUrl}
            </p>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="border-[#2A2A2A]"
          disabled={saving || isPending}
          onClick={() => handleSave(false)}
        >
          Save Draft
        </Button>
        <Button
          className="glow-orange"
          disabled={saving || isPending}
          onClick={() => handleSave(true)}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
