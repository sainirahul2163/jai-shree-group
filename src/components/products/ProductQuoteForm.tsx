"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";

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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

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
        style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
      >
        <div
          className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
        >
          <span className="text-2xl text-green-500">✓</span>
        </div>
        <p className="font-semibold" style={{ color: "#FFFFFF" }}>
          Enquiry sent successfully!
        </p>
        <p className="mt-2 text-base" style={{ color: "#A0A0A0" }}>
          We&apos;ll respond within 24 hours.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
          style={{ borderColor: "#2A2A2A", color: "#FFFFFF" }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border p-6"
      style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
    >
      {!compact && (
        <h3
          className="mb-4 text-lg font-bold"
          style={{ color: "#FFFFFF" }}
        >
          Get a Quote
        </h3>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="pq-name" style={{ color: "#A0A0A0" }}>
            Name *
          </Label>
          <Input
            id="pq-name"
            className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-400">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="pq-phone" style={{ color: "#A0A0A0" }}>
            Phone *
          </Label>
          <Input
            id="pq-phone"
            className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
            {...form.register("phone")}
          />
          {form.formState.errors.phone && (
            <p className="mt-1 text-sm text-red-400">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="pq-email" style={{ color: "#A0A0A0" }}>
            Email *
          </Label>
          <Input
            id="pq-email"
            type="email"
            className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-400">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="pq-product" style={{ color: "#A0A0A0" }}>
            Product
          </Label>
          <Input
            id="pq-product"
            disabled
            className="mt-1.5 h-10 border-[#2A2A2A] bg-[#0A0A0A] text-white opacity-70"
            {...form.register("product")}
          />
        </div>

        <div>
          <Label htmlFor="pq-message" style={{ color: "#A0A0A0" }}>
            Message / Requirements *
          </Label>
          <Textarea
            id="pq-message"
            rows={4}
            className="mt-1.5 border-[#2A2A2A] bg-[#1A1A1A] text-white"
            {...form.register("message")}
          />
          {form.formState.errors.message && (
            <p className="mt-1 text-sm text-red-400">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        {status === "error" && (
          <p className="text-sm text-red-400">
            Failed to send. Please try WhatsApp below or call us.
          </p>
        )}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-11 w-full border-0 font-semibold"
          style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Submit Enquiry"
          )}
        </Button>
      </form>

      <Link
        href={whatsappUrl(
          COMPANY.whatsapp,
          `Hi, I need a quote for ${productName}.`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-1 text-base font-medium transition-opacity hover:opacity-80"
        style={{ color: "#E8521A" }}
      >
        Or WhatsApp us directly
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
