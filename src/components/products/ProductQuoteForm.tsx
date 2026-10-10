"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";

import { FormPrivacyNote } from "@/components/shared/FormPrivacyNote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY } from "@/lib/constants";
import { whatsappUrl } from "@/lib/email";
import {
  productQuoteFormSchema,
  type ProductQuoteFormValues,
} from "@/lib/validations";

type ProductQuoteFormProps = {
  productName: string;
  compact?: boolean;
};

export function ProductQuoteForm({
  productName,
  compact = false,
}: ProductQuoteFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "unavailable"
  >("idle");

  const form = useForm<ProductQuoteFormValues>({
    resolver: zodResolver(productQuoteFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      product: productName,
      message: "",
    },
  });

  async function onSubmit(values: ProductQuoteFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          productInterest: values.product,
          message: values.message,
        }),
      });

      const data = await res.json();
      if (res.status === 503) {
        setStatus("unavailable");
        return;
      }
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setStatus("success");
      form.reset({ ...values, name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border p-6 text-center"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div
          className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
        >
          <span className="text-2xl text-green-500">✓</span>
        </div>
        <p className="font-semibold" style={{ color: "var(--foreground)" }}>
          Enquiry sent successfully!
        </p>
        <p className="mt-2 text-base" style={{ color: "var(--text-secondary)" }}>
          We&apos;ll respond within 24 hours.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border p-6"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      {!compact && (
        <h3
          className="mb-4 text-lg font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Get a Quote
        </h3>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="pq-name" style={{ color: "var(--text-secondary)" }}>
            Name *
          </Label>
          <Input
            id="pq-name"
            className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-400">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="pq-phone" style={{ color: "var(--text-secondary)" }}>
            Phone *
          </Label>
          <Input
            id="pq-phone"
            className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
            {...form.register("phone")}
          />
          {form.formState.errors.phone && (
            <p className="mt-1 text-sm text-red-400">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="pq-email" style={{ color: "var(--text-secondary)" }}>
            Email *
          </Label>
          <Input
            id="pq-email"
            type="email"
            className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-400">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="pq-product" style={{ color: "var(--text-secondary)" }}>
            Product
          </Label>
          <Input
            id="pq-product"
            disabled
            className="mt-1.5 h-10 border-border bg-background text-foreground opacity-70"
            {...form.register("product")}
          />
        </div>

        <div>
          <Label htmlFor="pq-message" style={{ color: "var(--text-secondary)" }}>
            Message / Requirements *
          </Label>
          <Textarea
            id="pq-message"
            rows={4}
            className="mt-1.5 border-border bg-surface-2 text-foreground"
            {...form.register("message")}
          />
          {form.formState.errors.message && (
            <p className="mt-1 text-sm text-red-400">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        {status === "unavailable" && (
          <div className="space-y-3 rounded-lg border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Our online form is temporarily unavailable. Please WhatsApp us
              directly for a quick response.
            </p>
            <Button
              asChild
              className="h-11 w-full border-0"
              style={{ backgroundColor: "#25D366", color: "var(--foreground)" }}
            >
              <a
                href={whatsappUrl(
                  COMPANY.whatsapp,
                  `Hi, I need a quote for ${productName}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us Directly
              </a>
            </Button>
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-red-400">
            Failed to send. Please try WhatsApp below or call us.
          </p>
        )}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-11 w-full border-0 font-semibold"
          style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Submit Enquiry"
          )}
        </Button>
        <FormPrivacyNote />
      </form>

      <Link
        href={whatsappUrl(
          COMPANY.whatsapp,
          `Hi, I need a quote for ${productName}.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-1 text-base font-medium transition-opacity hover:opacity-80"
        style={{ color: "var(--brand-text)" }}
      >
        Or WhatsApp us directly
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
