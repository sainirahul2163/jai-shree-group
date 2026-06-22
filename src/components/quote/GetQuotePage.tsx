"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Mail, Phone } from "lucide-react";

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
import { COMPANY, MATERIALS, PRODUCTS } from "@/lib/constants";
import { getProductIcon } from "@/lib/icons";
import { whatsappUrl } from "@/lib/email";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validations";

const STEPS = ["Product Selection", "Specifications", "Contact Details"];

const DEADLINE_OPTIONS = [
  { value: "urgent", label: "Urgent (< 1 week)" },
  { value: "standard", label: "Standard (2–3 weeks)" },
  { value: "flexible", label: "Flexible" },
] as const;

const initialForm: QuoteFormValues = {
  products: [],
  material: "",
  thickness: "",
  dimensions: "",
  quantity: "",
  quantityUnit: "pcs",
  deadline: "standard",
  additionalRequirements: "",
  name: "",
  companyName: "",
  phone: "",
  email: "",
  city: "",
  sendWhatsApp: false,
};

export function GetQuotePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteFormValues>(initialForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [waLink, setWaLink] = useState<string | undefined>();
  const [stepError, setStepError] = useState<string | null>(null);

  const specsComplete =
    form.material.trim() !== "" && form.dimensions.trim().length >= 5;

  const directWhatsAppUrl = whatsappUrl(
    COMPANY.whatsapp,
    "Hi, I need a quote for metal products."
  );

  function toggleProduct(slug: string) {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(slug)
        ? prev.products.filter((p) => p !== slug)
        : [...prev.products, slug],
    }));
  }

  function updateField<K extends keyof QuoteFormValues>(
    key: K,
    value: QuoteFormValues[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    const parsed = quoteFormSchema.safeParse(form);
    if (!parsed.success) {
      setStepError("Please fill in all required fields correctly.");
      setStatus("error");
      return;
    }

    setStepError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setWaLink(data.whatsappUrl);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="section-padding flex min-h-[70vh] items-center justify-center pt-28"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="max-w-md text-center">
          <div
            className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
          >
            <span className="text-3xl text-green-500">✓</span>
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "#FFFFFF" }}
          >
            Thank you!
          </h1>
          <p className="mt-3 text-lg" style={{ color: "#A0A0A0" }}>
            We&apos;ll send your quote within 24 hours.
          </p>
          {waLink && (
            <Button
              asChild
              className="mt-6 h-12 border-0"
              style={{ backgroundColor: "#25D366", color: "#FFF" }}
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                Continue on WhatsApp
              </a>
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            className="mt-4 block w-full"
            style={{ borderColor: "#2A2A2A", color: "#FFF" }}
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="section-padding pt-28 md:pt-32"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-4xl">
        <h1
          className="text-4xl font-black tracking-tight"
          style={{ color: "#FFFFFF" }}
        >
          Get a Free Quote
        </h1>

        <div
          className="mt-6 rounded-xl border p-5"
          style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#E8521A" }}>
            Prefer to talk directly?
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: "#FFFFFF" }}
            >
              <Phone className="size-4" style={{ color: "#E8521A" }} />
              Prefer to call? {COMPANY.phone}
            </a>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: "#FFFFFF" }}
            >
              WhatsApp: {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: "#A0A0A0" }}
            >
              <Mail className="size-4" style={{ color: "#E8521A" }} />
              Email: {COMPANY.email}
            </a>
          </div>
          <Button
            asChild
            className="mt-4 h-12 w-full border-0 sm:w-auto"
            style={{ backgroundColor: "#25D366", color: "#FFFFFF" }}
          >
            <a href={directWhatsAppUrl} target="_blank" rel="noopener noreferrer">
              Get Quote on WhatsApp
            </a>
          </Button>
        </div>

        {/* Progress */}
        <div className="mt-8 mb-10">
          <div className="mb-2 flex justify-between text-base">
            {STEPS.map((label, i) => (
              <span
                key={label}
                style={{
                  color: i <= step ? "#E8521A" : "#666666",
                }}
              >
                Step {i + 1}
              </span>
            ))}
          </div>
          <div
            className="h-2 overflow-hidden rounded-full"
            style={{ backgroundColor: "#1A1A1A" }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((step + 1) / 3) * 100}%`,
                backgroundColor: "#E8521A",
              }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2
                className="mb-6 text-2xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                What do you need?
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PRODUCTS.map((product) => {
                  const Icon = getProductIcon(product.icon);
                  const selected = form.products.includes(product.slug);
                  return (
                    <button
                      key={product.slug}
                      type="button"
                      onClick={() => toggleProduct(product.slug)}
                      className="relative rounded-xl border p-4 text-left transition-all"
                      style={{
                        backgroundColor: selected ? "#1A1A1A" : "#111111",
                        borderColor: selected ? "#E8521A" : "#2A2A2A",
                      }}
                    >
                      {selected && (
                        <Check
                          className="absolute top-3 right-3 size-5"
                          style={{ color: "#E8521A" }}
                        />
                      )}
                      <Icon
                        className="mb-2 size-6"
                        style={{ color: "#E8521A" }}
                      />
                      <p
                        className="font-bold"
                        style={{ color: "#FFFFFF" }}
                      >
                        {product.name}
                      </p>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => {
                    setStepError(null);
                    setStep(1);
                  }}
                  disabled={form.products.length === 0}
                  className="h-11 border-0 px-6"
                  style={{ backgroundColor: "#E8521A", color: "#FFF" }}
                >
                  Next
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2
                className="mb-4 text-2xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                Your Requirements
              </h2>
              <p className="mb-6 text-sm" style={{ color: "#A0A0A0" }}>
                Tell us the material and what you need — size, thickness, and
                quantity can all go in one message. Our team will follow up for
                any missing details.
              </p>

              <div>
                <Label style={{ color: "#A0A0A0" }}>Material Required *</Label>
                <Select
                  value={form.material}
                  onValueChange={(v) => updateField("material", v)}
                >
                  <SelectTrigger className="mt-1.5 h-10 w-full border-[#2A2A2A] bg-[#1A1A1A] text-white">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {MATERIALS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label style={{ color: "#A0A0A0" }}>
                  Size, thickness &amp; quantity *
                </Label>
                <Textarea
                  rows={4}
                  className="mt-1.5 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                  placeholder="e.g. SS304 perforated sheet, 2mm thick, 1000×2000mm, 50 pcs"
                  value={form.dimensions}
                  onChange={(e) => updateField("dimensions", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "#A0A0A0" }}>When do you need it?</Label>
                <Select
                  value={form.deadline}
                  onValueChange={(v) =>
                    updateField("deadline", v as QuoteFormValues["deadline"])
                  }
                >
                  <SelectTrigger className="mt-1.5 h-10 w-full border-[#2A2A2A] bg-[#1A1A1A] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEADLINE_OPTIONS.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label style={{ color: "#A0A0A0" }}>
                  Anything else we should know?
                </Label>
                <Textarea
                  rows={3}
                  className="mt-1.5 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                  placeholder="Drawing reference, finishing, delivery city, etc."
                  value={form.additionalRequirements}
                  onChange={(e) =>
                    updateField("additionalRequirements", e.target.value)
                  }
                />
              </div>

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(0)}
                  className="border-[#2A2A2A] text-white"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                <Button
                  onClick={() => {
                    if (!specsComplete) {
                      setStepError(
                        "Please select a material and describe your requirements."
                      );
                      return;
                    }
                    setStepError(null);
                    setStep(2);
                  }}
                  disabled={!specsComplete}
                  className="border-0"
                  style={{ backgroundColor: "#E8521A", color: "#FFF" }}
                >
                  Next
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              {stepError && step === 1 && (
                <p className="mt-4 text-sm text-red-400">{stepError}</p>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2
                className="mb-4 text-2xl font-bold"
                style={{ color: "#FFFFFF" }}
              >
                Contact Details
              </h2>

              <div>
                <Label style={{ color: "#A0A0A0" }}>Name *</Label>
                <Input
                  className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "#A0A0A0" }}>Company Name</Label>
                <Input
                  className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "#A0A0A0" }}>Phone *</Label>
                <Input
                  className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "#A0A0A0" }}>Email *</Label>
                <Input
                  type="email"
                  className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "#A0A0A0" }}>City / Location</Label>
                <Input
                  className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </div>

              <label className="flex items-center gap-2 text-base">
                <input
                  type="checkbox"
                  checked={form.sendWhatsApp}
                  onChange={(e) =>
                    updateField("sendWhatsApp", e.target.checked)
                  }
                  className="size-4 accent-[#E8521A]"
                />
                <span style={{ color: "#A0A0A0" }}>
                  Send quote on WhatsApp too
                </span>
              </label>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  {stepError ??
                    `Submission failed. Please call ${COMPANY.phone}.`}
                </p>
              )}

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-[#2A2A2A] text-white"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="border-0 px-6"
                  style={{ backgroundColor: "#E8521A", color: "#FFF" }}
                >
                  {status === "loading" ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Submit Quote Request
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
