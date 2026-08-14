"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ExternalLink, Search, Trash2, Upload, X } from "lucide-react";

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
  bulkSetGalleryPublished,
  bulkUpdateGalleryCategory,
  deleteGalleryItem,
  saveGalleryItem,
  toggleGalleryPublished,
  updateGalleryItem,
} from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/client";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import type { GalleryItem } from "@/types/database";

const DEFAULT_CATEGORY = GALLERY_CATEGORIES[0].slug;

const labelFor = (slug: string) =>
  GALLERY_CATEGORIES.find((c) => c.slug === slug)?.label ??
  slug.replace(/-/g, " ");

type Draft = {
  title: string;
  description: string;
  product_category: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "busy"; message: string }
  | { kind: "ok"; message: string }
  | { kind: "error"; message: string };

export function GalleryAdminClient({ items }: { items: GalleryItem[] }) {
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [isPending, startTransition] = useTransition();

  // Upload form
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORY);
  const [file, setFile] = useState<File | null>(null);

  const draftFor = (item: GalleryItem): Draft =>
    drafts[item.id] ?? {
      title: item.title,
      description: item.description ?? "",
      product_category: item.product_category,
    };

  const isDirty = (item: GalleryItem) => {
    const d = drafts[item.id];
    if (!d) return false;
    return (
      d.title !== item.title ||
      d.description !== (item.description ?? "") ||
      d.product_category !== item.product_category
    );
  };

  const dirtyItems = items.filter(isDirty);

  function setField(item: GalleryItem, patch: Partial<Draft>) {
    setDrafts((prev) => ({
      ...prev,
      [item.id]: { ...draftFor(item), ...patch },
    }));
  }

  function run(message: string, fn: () => Promise<void>) {
    setStatus({ kind: "busy", message });
    startTransition(async () => {
      try {
        await fn();
        setStatus({ kind: "ok", message: `${message} — live on the site` });
      } catch (e) {
        setStatus({
          kind: "error",
          message: e instanceof Error ? e.message : "Something went wrong",
        });
      }
    });
  }

  function saveItem(item: GalleryItem) {
    const d = draftFor(item);
    run(`Saved “${d.title}”`, async () => {
      await updateGalleryItem(item.id, {
        title: d.title.trim(),
        description: d.description.trim() || null,
        product_category: d.product_category,
      });
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    });
  }

  function saveAll() {
    const pending = dirtyItems.map((item) => ({ item, d: draftFor(item) }));
    run(`Saved ${pending.length} photo${pending.length === 1 ? "" : "s"}`, async () => {
      for (const { item, d } of pending) {
        await updateGalleryItem(item.id, {
          title: d.title.trim(),
          description: d.description.trim() || null,
          product_category: d.product_category,
        });
      }
      setDrafts({});
    });
  }

  function applyBulkCategory(slug: string) {
    const ids = [...selected];
    run(`Moved ${ids.length} photo${ids.length === 1 ? "" : "s"} to ${labelFor(slug)}`, async () => {
      await bulkUpdateGalleryCategory(ids, slug);
      // Drop any local edits to the category for these rows - the server won.
      setDrafts((prev) => {
        const next = { ...prev };
        ids.forEach((id) => delete next[id]);
        return next;
      });
      setSelected(new Set());
    });
  }

  function applyBulkPublish(publish: boolean) {
    const ids = [...selected];
    run(`${publish ? "Published" : "Unpublished"} ${ids.length} photo${ids.length === 1 ? "" : "s"}`, async () => {
      await bulkSetGalleryPublished(ids, publish);
      setSelected(new Set());
    });
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) return;

    setStatus({ kind: "busy", message: "Uploading" });
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${title.replace(/\s+/g, "-").toLowerCase()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(path, file);

    if (uploadError) {
      setStatus({ kind: "error", message: uploadError.message });
      return;
    }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);

    run(`Uploaded “${title}”`, async () => {
      await saveGalleryItem({
        image_url: urlData.publicUrl,
        title,
        description,
        product_category: category,
      });
      setTitle("");
      setDescription("");
      setFile(null);
      setShowUpload(false);
    });
  }

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: items.length };
    items.forEach((i) => {
      map[i.product_category] = (map[i.product_category] ?? 0) + 1;
    });
    return map;
  }, [items]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((i) => {
      if (activeCategory !== "all" && i.product_category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        i.title.toLowerCase().includes(q) ||
        (i.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [items, activeCategory, search]);

  const allVisibleSelected =
    visible.length > 0 && visible.every((i) => selected.has(i.id));

  function toggleSelectAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) visible.forEach((i) => next.delete(i.id));
      else visible.forEach((i) => next.add(i.id));
      return next;
    });
  }

  const publishedCount = items.filter((i) => i.is_published).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black">Gallery Management</h2>
          <p className="mt-1 text-sm" style={{ color: "#666666" }}>
            {items.length} photos · {publishedCount} live ·{" "}
            {items.length - publishedCount} hidden
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-[#2A2A2A]"
            onClick={() => setShowUpload((v) => !v)}
          >
            <Upload className="mr-1.5 size-4" />
            {showUpload ? "Close" : "Add Photo"}
          </Button>
          <Button asChild variant="outline" className="border-[#2A2A2A]">
            <Link href="/gallery" target="_blank">
              <ExternalLink className="mr-1.5 size-4" />
              View live
            </Link>
          </Button>
        </div>
      </div>

      {/* Status line */}
      {status.kind !== "idle" && (
        <div
          className="flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-sm"
          style={{
            borderColor:
              status.kind === "error" ? "rgba(248,113,113,0.4)" : "#2A2A2A",
            backgroundColor:
              status.kind === "error" ? "rgba(248,113,113,0.08)" : "#111111",
            color: status.kind === "error" ? "#F87171" : "#A0A0A0",
          }}
        >
          <span className="flex items-center gap-2">
            {status.kind === "ok" && (
              <Check className="size-4" style={{ color: "#4ADE80" }} />
            )}
            {status.message}
            {status.kind === "busy" && "…"}
          </span>
          <button
            onClick={() => setStatus({ kind: "idle" })}
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Upload */}
      {showUpload && (
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
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GALLERY_CATEGORIES.map((c) => (
                    <SelectItem key={c.slug} value={c.slug}>
                      {c.label}
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
          <Button
            type="submit"
            className="mt-4 glow-orange"
            disabled={isPending || !file}
          >
            Upload Photo
          </Button>
        </form>
      )}

      {/* Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
              style={{ color: "#666666" }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or description…"
              className="border-[#2A2A2A] bg-[#0A0A0A] pl-9"
            />
          </div>
          {dirtyItems.length > 0 && (
            <Button
              onClick={saveAll}
              disabled={isPending}
              className="glow-orange"
            >
              Save {dirtyItems.length} change
              {dirtyItems.length === 1 ? "" : "s"}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {[{ slug: "all", label: "All" }, ...GALLERY_CATEGORIES].map((c) => {
            const active = activeCategory === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  borderColor: active ? "#E8521A" : "#2A2A2A",
                  backgroundColor: active ? "rgba(232,82,26,0.15)" : "transparent",
                  color: active ? "#E8521A" : "#A0A0A0",
                }}
              >
                {c.label} ({counts[c.slug] ?? 0})
              </button>
            );
          })}
        </div>
      </div>

      {/* Bulk bar */}
      <div
        className="flex flex-wrap items-center gap-2 rounded-lg border px-4 py-3"
        style={{ borderColor: "#2A2A2A", backgroundColor: "#111111" }}
      >
        <label
          className="flex cursor-pointer items-center gap-2 text-sm"
          style={{ color: "#A0A0A0" }}
        >
          <input
            type="checkbox"
            checked={allVisibleSelected}
            onChange={toggleSelectAll}
            className="size-4 accent-[#E8521A]"
          />
          Select all {visible.length} shown
        </label>

        {selected.size > 0 ? (
          <>
            <span className="text-sm font-semibold" style={{ color: "#E8521A" }}>
              {selected.size} selected
            </span>
            <Select onValueChange={applyBulkCategory}>
              <SelectTrigger className="h-9 w-[210px] border-[#2A2A2A] bg-[#0A0A0A] text-sm">
                <SelectValue placeholder="Move to category…" />
              </SelectTrigger>
              <SelectContent>
                {GALLERY_CATEGORIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              variant="outline"
              className="border-[#2A2A2A]"
              disabled={isPending}
              onClick={() => applyBulkPublish(true)}
            >
              Publish
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-[#2A2A2A]"
              disabled={isPending}
              onClick={() => applyBulkPublish(false)}
            >
              Unpublish
            </Button>
            <button
              onClick={() => setSelected(new Set())}
              className="text-xs underline"
              style={{ color: "#666666" }}
            >
              Clear
            </button>
          </>
        ) : (
          <span className="text-xs" style={{ color: "#666666" }}>
            Tick photos to change their category in bulk
          </span>
        )}
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm" style={{ color: "#666666" }}>
          No photos match this filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => {
            const d = draftFor(item);
            const dirty = isDirty(item);
            const checked = selected.has(item.id);

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border"
                style={{
                  borderColor: dirty ? "#E8521A" : "#2A2A2A",
                  backgroundColor: "#111111",
                }}
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <label className="absolute left-2 top-2 flex size-7 cursor-pointer items-center justify-center rounded-md bg-black/70">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setSelected((prev) => {
                          const next = new Set(prev);
                          if (next.has(item.id)) next.delete(item.id);
                          else next.add(item.id);
                          return next;
                        })
                      }
                      className="size-4 accent-[#E8521A]"
                    />
                  </label>
                  <span
                    className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                    style={{
                      backgroundColor: item.is_published
                        ? "rgba(74,222,128,0.15)"
                        : "rgba(0,0,0,0.7)",
                      color: item.is_published ? "#4ADE80" : "#A0A0A0",
                    }}
                  >
                    {item.is_published ? "Live" : "Hidden"}
                  </span>
                </div>

                <div className="space-y-3 p-4">
                  <div>
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={d.title}
                      onChange={(e) => setField(item, { title: e.target.value })}
                      className="mt-1 h-9 border-[#2A2A2A] bg-[#0A0A0A] text-sm"
                    />
                  </div>

                  <div>
                    <Label className="text-xs">Category</Label>
                    <Select
                      value={d.product_category}
                      onValueChange={(v) =>
                        setField(item, { product_category: v })
                      }
                    >
                      <SelectTrigger className="mt-1 h-9 border-[#2A2A2A] bg-[#0A0A0A] text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {GALLERY_CATEGORIES.map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={d.description}
                      onChange={(e) =>
                        setField(item, { description: e.target.value })
                      }
                      rows={2}
                      className="mt-1 border-[#2A2A2A] bg-[#0A0A0A] text-sm"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button
                      size="sm"
                      className="glow-orange"
                      disabled={!dirty || isPending}
                      onClick={() => saveItem(item)}
                    >
                      {dirty ? "Save" : "Saved"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#2A2A2A]"
                      disabled={isPending}
                      onClick={() =>
                        run(
                          item.is_published
                            ? `Hid “${item.title}”`
                            : `Published “${item.title}”`,
                          () =>
                            toggleGalleryPublished(item.id, !item.is_published)
                        )
                      }
                    >
                      {item.is_published ? "Hide" : "Publish"}
                    </Button>

                    {confirmDelete === item.id ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-900/50 text-red-400"
                          disabled={isPending}
                          onClick={() => {
                            setConfirmDelete(null);
                            run(`Deleted “${item.title}”`, () =>
                              deleteGalleryItem(item.id)
                            );
                          }}
                        >
                          Confirm delete
                        </Button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="text-xs underline"
                          style={{ color: "#666666" }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-auto border-[#2A2A2A] text-red-400"
                        onClick={() => setConfirmDelete(item.id)}
                        aria-label={`Delete ${item.title}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
