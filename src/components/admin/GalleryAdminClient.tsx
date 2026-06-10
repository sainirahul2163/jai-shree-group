"use client";

import { useState, useTransition } from "react";
import Image from "next/image";

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
import {
  deleteGalleryItem,
  saveGalleryItem,
  toggleGalleryPublished,
} from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/client";
import { PRODUCTS } from "@/lib/constants";
import type { GalleryItem } from "@/types/database";

export function GalleryAdminClient({ items }: { items: GalleryItem[] }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(
    PRODUCTS[0]?.slug ?? "general"
  );
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) return;
    setError("");

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${title.replace(/\s+/g, "-").toLowerCase()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(path, file);

    if (uploadError) {
      setError(uploadError.message);
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);

    startTransition(async () => {
      await saveGalleryItem({
        image_url: urlData.publicUrl,
        title,
        description,
        product_category: category,
      });
      setTitle("");
      setDescription("");
      setFile(null);
    });
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black">Gallery Management</h2>

      <form
        onSubmit={handleUpload}
        className="rounded-xl border p-6"
        style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
      >
        <h3 className="mb-4 font-bold">Upload New Photo</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Image File</Label>
            <Input
              type="file"
              accept="image/*"
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
              required
            />
          </div>
          <div>
            <Label>Product Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRODUCTS.map((p) => (
                  <SelectItem key={p.slug} value={p.slug}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
              rows={2}
            />
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <Button
          type="submit"
          className="mt-4 glow-orange"
          disabled={isPending || !file}
        >
          {isPending ? "Uploading..." : "Upload Photo"}
        </Button>
      </form>

      <div>
        <h3 className="mb-4 font-bold">Existing Photos ({items.length})</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: "#2A2A2A", backgroundColor: "#111111" }}
            >
              <div className="relative aspect-video">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs capitalize" style={{ color: "#666666" }}>
                  {item.product_category.replace(/-/g, " ")}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#2A2A2A]"
                    onClick={() =>
                      startTransition(async () => {
                        await toggleGalleryPublished(
                          item.id,
                          !item.is_published
                        );
                      })
                    }
                  >
                    {item.is_published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-900/50 text-red-400"
                    onClick={() =>
                      startTransition(async () => {
                        await deleteGalleryItem(item.id);
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
