"use client";

import { useState } from "react";
import { FileUp, Loader2, X } from "lucide-react";

import { FormPrivacyNote } from "@/components/shared/FormPrivacyNote";
import { Button } from "@/components/ui/button";
import {
  DRAWING_ACCEPT,
  DRAWINGS_BUCKET,
  drawingFileError,
  MAX_DRAWING_FILES,
  type DrawingRef,
} from "@/lib/drawings";
import { createClient } from "@/lib/supabase/client";
import type { DrawingQuoteContent } from "@/sites/content/types";
import { useSite, useSiteProducts } from "@/sites/SiteProvider";

type Status = "idle" | "uploading" | "sending" | "success" | "error";

const fieldStyle = {
  backgroundColor: "var(--surface-2)",
  borderColor: "var(--border)",
  color: "var(--foreground)",
} as const;

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function DrawingQuoteForm({
  content,
  materials,
}: {
  content: DrawingQuoteContent;
  /** Metals the site works, for the material list. */
  materials: string[];
}) {
  const { contact } = useSite();
  const products = useSiteProducts();
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    companyName: "",
    product: products[0]?.slug ?? "",
    material: "",
    thickness: "",
    quantity: "",
    message: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    const problems: string[] = [];
    for (const file of Array.from(list)) {
      const problem = drawingFileError(file.name, file.size);
      if (problem) problems.push(problem);
      else if (next.length < MAX_DRAWING_FILES) next.push(file);
      else problems.push(`Up to ${MAX_DRAWING_FILES} files`);
    }
    setFiles(next);
    setFileError(problems.length ? problems.join("; ") : null);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10) {
      setError("Please give your name and a 10-digit phone number.");
      return;
    }
    if (files.length === 0) {
      setError("Please attach at least one drawing.");
      return;
    }

    try {
      setStatus("uploading");
      const sign = await fetch("/api/drawings/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: files.map((f) => ({ name: f.name, size: f.size })) }),
      });
      const signed = await sign.json();
      if (!sign.ok || !signed.success) throw new Error(signed.error ?? "Upload not available");

      const supabase = createClient();
      const drawings: DrawingRef[] = [];
      for (const [index, upload] of (signed.uploads as { path: string; token: string }[]).entries()) {
        const file = files[index];
        const { error: uploadError } = await supabase.storage
          .from(DRAWINGS_BUCKET)
          .uploadToSignedUrl(upload.path, upload.token, file);
        if (uploadError) throw new Error(`Could not upload ${file.name}`);
        drawings.push({ path: upload.path, name: file.name, size: file.size });
      }

      setStatus("sending");
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          companyName: form.companyName,
          products: form.product ? [form.product] : [],
          material: form.material,
          thickness: form.thickness,
          quantity: form.quantity,
          quantityUnit: form.quantity ? "pcs" : "",
          deadline: "standard",
          additionalRequirements: form.message,
          drawings,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error ?? "Could not send");
      setReference(result.reference ?? null);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        `${err instanceof Error ? err.message : "Something went wrong"}. You can also email the drawing to ${contact.email}.`
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border p-8 text-center"
        style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
      >
        <h2 className="text-2xl font-black" style={{ color: "var(--foreground)" }}>
          Drawing received
        </h2>
        <p className="mt-3 text-base" style={{ color: "var(--text-secondary)" }}>
          {content.successText}
        </p>
        {reference && (
          <p className="mt-2 text-base" style={{ color: "var(--text-secondary)" }}>
            Your reference:{" "}
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>
              {reference}
            </span>
          </p>
        )}
      </div>
    );
  }

  const busy = status === "uploading" || status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border p-6 lg:p-8"
      style={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
      noValidate
    >
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        {content.intro}
      </p>

      {/* Files */}
      <label
        htmlFor="drawing-files"
        className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors hover:border-brand"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <FileUp className="size-8" style={{ color: "var(--brand-text)" }} />
        <span className="mt-3 text-base font-semibold" style={{ color: "var(--foreground)" }}>
          Choose drawing files
        </span>
        <span className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
          DXF, DWG or PDF · up to {MAX_DRAWING_FILES} files · 20 MB each
        </span>
        <input
          id="drawing-files"
          type="file"
          multiple
          accept={DRAWING_ACCEPT}
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {fileError && (
        <p className="mt-2 text-sm" style={{ color: "var(--destructive)" }}>
          {fileError}
        </p>
      )}
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              <span className="truncate">
                {file.name}{" "}
                <span style={{ color: "var(--text-muted)" }}>({formatSize(file.size)})</span>
              </span>
              <button
                type="button"
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                aria-label={`Remove ${file.name}`}
                className="ml-3 rounded p-1 hover:bg-surface-2"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Job details */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm" style={{ color: "var(--text-secondary)" }}>
          Job work
          <select
            value={form.product}
            onChange={(e) => update("product", e.target.value)}
            className="mt-1.5 block h-10 w-full rounded-lg border px-3"
            style={fieldStyle}
          >
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm" style={{ color: "var(--text-secondary)" }}>
          Material
          <select
            value={form.material}
            onChange={(e) => update("material", e.target.value)}
            className="mt-1.5 block h-10 w-full rounded-lg border px-3"
            style={fieldStyle}
          >
            <option value="">Select a material</option>
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
            <option value="As per drawing">As per drawing</option>
          </select>
        </label>
        <label className="block text-sm" style={{ color: "var(--text-secondary)" }}>
          Thickness (mm)
          <input
            value={form.thickness}
            onChange={(e) => update("thickness", e.target.value)}
            inputMode="decimal"
            className="mt-1.5 block h-10 w-full rounded-lg border px-3"
            style={fieldStyle}
          />
        </label>
        <label className="block text-sm" style={{ color: "var(--text-secondary)" }}>
          Quantity (pieces)
          <input
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            inputMode="numeric"
            className="mt-1.5 block h-10 w-full rounded-lg border px-3"
            style={fieldStyle}
          />
        </label>
      </div>

      {/* Contact */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm" style={{ color: "var(--text-secondary)" }}>
          Name *
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
            required
            className="mt-1.5 block h-10 w-full rounded-lg border px-3"
            style={fieldStyle}
          />
        </label>
        <label className="block text-sm" style={{ color: "var(--text-secondary)" }}>
          Phone *
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            type="tel"
            autoComplete="tel"
            required
            className="mt-1.5 block h-10 w-full rounded-lg border px-3"
            style={fieldStyle}
          />
        </label>
        <label className="block text-sm" style={{ color: "var(--text-secondary)" }}>
          Email
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            type="email"
            autoComplete="email"
            className="mt-1.5 block h-10 w-full rounded-lg border px-3"
            style={fieldStyle}
          />
        </label>
        <label className="block text-sm" style={{ color: "var(--text-secondary)" }}>
          Company
          <input
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            autoComplete="organization"
            className="mt-1.5 block h-10 w-full rounded-lg border px-3"
            style={fieldStyle}
          />
        </label>
      </div>
      <label className="mt-4 block text-sm" style={{ color: "var(--text-secondary)" }}>
        Notes for our team
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className="mt-1.5 block w-full rounded-lg border px-3 py-2"
          style={fieldStyle}
        />
      </label>

      {error && (
        <p className="mt-4 text-sm" style={{ color: "var(--destructive)" }}>
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={busy}
        size="lg"
        className="mt-6 h-12 w-full border-0 font-semibold"
        style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
      >
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {status === "uploading" ? "Uploading drawings…" : "Sending…"}
          </>
        ) : (
          "Send Drawing for Quote"
        )}
      </Button>
      <FormPrivacyNote className="mt-3" />
    </form>
  );
}
