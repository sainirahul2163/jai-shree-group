"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Lock,
  Mail,
  Phone,
} from "lucide-react";

import { FormPrivacyNote } from "@/components/shared/FormPrivacyNote";
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
import { MATERIALS } from "@/lib/constants";
import type { QuoteContent } from "@/sites/content/types";
import { useSite, useSiteProducts } from "@/sites/SiteProvider";
import { getProductIcon } from "@/lib/icons";
import { whatsappUrl } from "@/lib/email";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validations";

const STEPS = ["Product Selection", "Specifications", "Contact Details"];

const DEADLINE_OPTIONS = [
  { value: "urgent", label: "Urgent (< 1 week)" },
  { value: "standard", label: "Standard (2–3 weeks)" },
  { value: "flexible", label: "Flexible" },
] as const;

type ProductSlug =
  | "perforated-sheets"
  | "laser-cutting"
  | "expanded-metal"
  | "turret-punching"
  | "precision-sheet-leveling"
  | "custom-components";

const INCOMPATIBLE: Record<ProductSlug, ProductSlug[]> = {
  "perforated-sheets": ["expanded-metal", "turret-punching"],
  "laser-cutting": ["expanded-metal"],
  "expanded-metal": ["perforated-sheets", "turret-punching"],
  "turret-punching": ["perforated-sheets", "expanded-metal"],
  "custom-components": [],
  "precision-sheet-leveling": [],
};

const PRECISION_SLUG: ProductSlug = "precision-sheet-leveling";
const CUSTOM_SLUG: ProductSlug = "custom-components";

function getDisabledProducts(selected: string[]): Set<string> {
  const disabled = new Set<string>();
  for (const slug of selected) {
    for (const incompatible of INCOMPATIBLE[slug as ProductSlug] ?? []) {
      disabled.add(incompatible);
    }
  }
  for (const slug of selected) {
    disabled.delete(slug);
  }
  return disabled;
}

const initialForm: QuoteFormValues = {
  products: [],
  material: "",
  thickness: "",
  quantity: "",
  quantityUnit: "pcs",
  deadline: "standard",
  additionalRequirements: "",
  customComponentNote: "",
  name: "",
  companyName: "",
  phone: "",
  email: "",
  city: "",
  sendWhatsApp: false,
};

export function GetQuotePage({ content }: { content: QuoteContent }) {
  const { contact } = useSite();
  const products = useSiteProducts();
  const getProductLabel = (slug: string) =>
    products.find((p) => p.slug === slug)?.name ?? slug;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteFormValues>(initialForm);

  // A pattern sent from the pattern library (?pattern=…) pre-fills the request.
  // Read from the browser URL so the page stays static (no useSearchParams).
  useEffect(() => {
    const pattern = new URLSearchParams(window.location.search).get("pattern");
    if (!pattern) return;
    const offersPerforated = products.some((p) => p.slug === "perforated-sheets");
    // Runs once after load: the static page cannot know the query string at render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => ({
      ...prev,
      products:
        offersPerforated && !prev.products.includes("perforated-sheets")
          ? [...prev.products, "perforated-sheets"]
          : prev.products,
      additionalRequirements: prev.additionalRequirements || `Pattern: ${pattern.slice(0, 500)}`,
    }));
  }, [products]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "unavailable"
  >("idle");
  const [waLink, setWaLink] = useState<string | undefined>();
  const [reference, setReference] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [precisionHintVisible, setPrecisionHintVisible] = useState(false);
  const [incompatMessage, setIncompatMessage] = useState<string | null>(null);
  const [customComponentNoteError, setCustomComponentNoteError] = useState<
    string | null
  >(null);

  const disabledProducts = useMemo(
    () => getDisabledProducts(form.products),
    [form.products]
  );

  const hasCustomSelected = form.products.includes(CUSTOM_SLUG);
  const customSelectedAlone =
    hasCustomSelected && form.products.length === 1;

  const selectionSummary =
    form.products.length > 1
      ? `Selected: ${form.products.map(getProductLabel).join(" + ")}`
      : null;

  useEffect(() => {
    if (!precisionHintVisible) return;
    const timer = window.setTimeout(() => setPrecisionHintVisible(false), 4000);
    return () => window.clearTimeout(timer);
  }, [precisionHintVisible]);

  useEffect(() => {
    if (!incompatMessage) return;
    const timer = window.setTimeout(() => setIncompatMessage(null), 3000);
    return () => window.clearTimeout(timer);
  }, [incompatMessage]);

  const specsComplete =
    form.material.trim() !== "" && form.thickness.trim().length >= 1;

  const directWhatsAppUrl = whatsappUrl(
    contact.whatsapp,
    "Hi, I need a quote for metal products."
  );

  function handleProductClick(slug: string) {
    setPrecisionHintVisible(false);
    setIncompatMessage(null);

    if (disabledProducts.has(slug)) {
      setIncompatMessage("Not compatible with your current selection");
      return;
    }

    const isSelected = form.products.includes(slug);

    if (!isSelected && slug === PRECISION_SLUG && form.products.length === 0) {
      setPrecisionHintVisible(true);
      return;
    }

    if (isSelected) {
      let next = form.products.filter((p) => p !== slug);
      if (next.length === 1 && next[0] === PRECISION_SLUG) {
        next = [];
      }
      if (slug === CUSTOM_SLUG) {
        updateField("customComponentNote", "");
        setCustomComponentNoteError(null);
      }
      updateField("products", next);
      return;
    }

    updateField("products", [...form.products, slug]);
  }

  function validateStep1(): boolean {
    if (form.products.length === 0) {
      setStepError("Please select at least one product.");
      return false;
    }
    if (
      customSelectedAlone &&
      form.customComponentNote?.trim() === ""
    ) {
      setCustomComponentNoteError("Please describe your requirement");
      return false;
    }
    setCustomComponentNoteError(null);
    setStepError(null);
    return true;
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
      if (res.status === 503) {
        setWaLink(data.whatsapp ?? "https://wa.me/919370606017");
        setStatus("unavailable");
        return;
      }
      if (!res.ok) throw new Error(data.error);
      setWaLink(data.whatsappUrl);
      setReference(typeof data.reference === "string" ? data.reference : null);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="section-padding flex min-h-[70vh] items-center justify-center pt-28"
        style={{ backgroundColor: "var(--background)" }}
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
            style={{ color: "var(--foreground)" }}
          >
            Thank you!
          </h1>
          <p className="mt-3 text-lg" style={{ color: "var(--text-secondary)" }}>
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
          {waLink && (
            <Button
              asChild
              className="mt-6 h-12 border-0"
              style={{ backgroundColor: "#25D366", color: "var(--foreground)" }}
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
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
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
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-4xl">
        <h1
          className="text-4xl font-black tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          {content.heading}
        </h1>

        <div
          className="mt-6 rounded-xl border p-5"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--brand-text)" }}>
            Prefer to talk directly?
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              <Phone className="size-4" style={{ color: "var(--brand-text)" }} />
              Prefer to call? {contact.phone}
            </a>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              WhatsApp: {contact.phone}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
              style={{ color: "var(--text-secondary)" }}
            >
              <Mail className="size-4" style={{ color: "var(--brand-text)" }} />
              Email: {contact.email}
            </a>
          </div>
          <Button
            asChild
            className="mt-4 h-12 w-full border-0 sm:w-auto"
            style={{ backgroundColor: "#25D366", color: "var(--foreground)" }}
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
                  color: i <= step ? "var(--brand-text)" : "var(--text-muted)",
                }}
              >
                Step {i + 1}
              </span>
            ))}
          </div>
          <div
            className="h-2 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--surface-2)" }}
          >
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${((step + 1) / 3) * 100}%`,
                backgroundColor: "var(--brand)",
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
                style={{ color: "var(--foreground)" }}
              >
                What do you need?
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => {
                  const Icon = getProductIcon(product.icon);
                  const selected = form.products.includes(product.slug);
                  const disabled = disabledProducts.has(product.slug);
                  return (
                    <button
                      key={product.slug}
                      type="button"
                      onClick={() => handleProductClick(product.slug)}
                      className={`relative rounded-xl border p-4 text-left transition-all ${
                        disabled
                          ? "cursor-not-allowed opacity-40"
                          : selected
                            ? ""
                            : "hover:border-brand"
                      }`}
                      style={{
                        backgroundColor: selected ? "var(--surface-2)" : "var(--surface)",
                        borderColor: selected ? "var(--brand)" : "var(--border)",
                      }}
                    >
                      {selected && !disabled && (
                        <Check
                          className="absolute top-3 right-3 size-5"
                          style={{ color: "var(--brand-text)" }}
                        />
                      )}
                      {disabled && (
                        <Lock
                          className="absolute top-3 right-3 size-4"
                          style={{ color: "var(--text-muted)" }}
                        />
                      )}
                      <Icon
                        className="mb-2 size-6"
                        style={{ color: disabled ? "var(--text-muted)" : "var(--brand-text)" }}
                      />
                      <p
                        className="font-bold"
                        style={{ color: disabled ? "var(--text-muted)" : "var(--foreground)" }}
                      >
                        {product.name}
                      </p>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {precisionHintVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 rounded-xl border p-4 text-sm"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--brand)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Precision Sheet Leveling works best alongside another
                    process. Please select at least one other product first.
                  </motion.div>
                )}
              </AnimatePresence>

              {incompatMessage && (
                <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {incompatMessage}
                </p>
              )}

              {selectionSummary && (
                <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                  {selectionSummary}
                </p>
              )}

              <AnimatePresence>
                {hasCustomSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <Label style={{ color: "var(--text-secondary)" }}>
                        {customSelectedAlone
                          ? "Describe your custom component requirement *"
                          : "Any custom component notes? (optional)"}
                      </Label>
                      <Textarea
                        rows={4}
                        className="mt-1.5 border-border bg-surface-2 text-foreground"
                        placeholder={
                          customSelectedAlone
                            ? "Please describe the product you want to customize — material, shape, application, quantity, any reference dimensions or drawings..."
                            : "Describe any customization needed for your selected products..."
                        }
                        value={form.customComponentNote ?? ""}
                        onChange={(e) => {
                          updateField("customComponentNote", e.target.value);
                          if (e.target.value.trim()) {
                            setCustomComponentNoteError(null);
                          }
                        }}
                      />
                      {customComponentNoteError && (
                        <p className="mt-2 text-sm text-red-400">
                          {customComponentNoteError}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {stepError && step === 0 && (
                <p className="mt-4 text-sm text-red-400">{stepError}</p>
              )}

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => {
                    if (!validateStep1()) return;
                    setStep(1);
                  }}
                  disabled={form.products.length === 0}
                  className="h-11 border-0 px-6"
                  style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
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
                style={{ color: "var(--foreground)" }}
              >
                Your Requirements
              </h2>
              <p className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
                Tell us the material, thickness, and quantity. Our team will
                follow up for any missing details.
              </p>

              <div>
                <Label style={{ color: "var(--text-secondary)" }}>Material Required *</Label>
                <Select
                  value={form.material}
                  onValueChange={(v) => updateField("material", v)}
                >
                  <SelectTrigger className="mt-1.5 h-10 w-full border-border bg-surface-2 text-foreground">
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
                <Label style={{ color: "var(--text-secondary)" }}>Thickness *</Label>
                <Input
                  className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                  placeholder="e.g. 2mm"
                  value={form.thickness}
                  onChange={(e) => updateField("thickness", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "var(--text-secondary)" }}>Quantity</Label>
                <Input
                  className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                  placeholder="e.g. 50 pcs"
                  value={form.quantity}
                  onChange={(e) => updateField("quantity", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "var(--text-secondary)" }}>When do you need it?</Label>
                <Select
                  value={form.deadline}
                  onValueChange={(v) =>
                    updateField("deadline", v as QuoteFormValues["deadline"])
                  }
                >
                  <SelectTrigger className="mt-1.5 h-10 w-full border-border bg-surface-2 text-foreground">
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
                <Label style={{ color: "var(--text-secondary)" }}>
                  Anything else we should know?
                </Label>
                <Textarea
                  rows={3}
                  className="mt-1.5 border-border bg-surface-2 text-foreground"
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
                  className="border-border text-foreground"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                <Button
                  onClick={() => {
                    if (!specsComplete) {
                      setStepError(
                        "Please select a material and enter thickness."
                      );
                      return;
                    }
                    setStepError(null);
                    setStep(2);
                  }}
                  disabled={!specsComplete}
                  className="border-0"
                  style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
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
                style={{ color: "var(--foreground)" }}
              >
                Contact Details
              </h2>

              <div>
                <Label style={{ color: "var(--text-secondary)" }}>Name *</Label>
                <Input
                  className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "var(--text-secondary)" }}>Company Name</Label>
                <Input
                  className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "var(--text-secondary)" }}>Phone *</Label>
                <Input
                  className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "var(--text-secondary)" }}>Email *</Label>
                <Input
                  type="email"
                  className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div>
                <Label style={{ color: "var(--text-secondary)" }}>City / Location</Label>
                <Input
                  className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
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
                  className="size-4 accent-brand"
                />
                <span style={{ color: "var(--text-secondary)" }}>
                  Send quote on WhatsApp too
                </span>
              </label>

              {status === "unavailable" && (
                <div className="space-y-3 rounded-xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Our online form is temporarily unavailable. Please WhatsApp
                    us directly for a quick response.
                  </p>
                  <Button
                    asChild
                    className="h-11 w-full border-0"
                    style={{ backgroundColor: "#25D366", color: "var(--foreground)" }}
                  >
                    <a
                      href={waLink ?? "https://wa.me/919370606017"}
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
                  {stepError ??
                    `Submission failed. Please call ${contact.phone}.`}
                </p>
              )}

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-border text-foreground"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="border-0 px-6"
                  style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
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

        <FormPrivacyNote className="mt-6 md:text-right" />
      </div>
    </div>
  );
}
