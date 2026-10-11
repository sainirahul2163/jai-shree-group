"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Clock,
  Loader2,
  Mail,
  MapPin,
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
import type { ContactContent } from "@/sites/content/types";
import { useSite, useSiteProducts } from "@/sites/SiteProvider";
import { whatsappUrl } from "@/lib/email";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations";

const SUBMIT_TIMEOUT_MS = 10_000;

export function ContactPage({ content }: { content: ContactContent }) {
  const site = useSite();
  const products = useSiteProducts();
  const { contact } = site;
  // Without a written table: the site's hours (or the fallback) and its weekly holiday.
  const hoursRows = content.hours ?? [
    {
      days: "Working hours",
      hours: contact.hours ?? "Call or WhatsApp for timings",
      closed: false,
    },
    { days: "Weekly holiday", hours: `Closed ${contact.weeklyHoliday}`, closed: true },
  ];
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "unavailable"
  >("idle");
  const [waLink, setWaLink] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      companyName: "",
      phone: "",
      email: "",
      productInterest: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    setWaLink(null);
    setReference(null);

    const fallbackWa = whatsappUrl(
      contact.whatsapp,
      `Hi, I'm ${values.name}. Product: ${values.productInterest}. ${values.message}`
    );

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      const data = await res.json();
      if (res.status === 503) {
        setWaLink(data.whatsapp ?? fallbackWa);
        setStatus("unavailable");
        form.reset();
        return;
      }
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setWaLink(data.whatsappUrl ?? fallbackWa);
      setReference(typeof data.reference === "string" ? data.reference : null);
      setStatus("success");
      form.reset();
    } catch {
      setWaLink(fallbackWa);
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`;
  const whatsappDisplay = `+91 ${contact.phone.replace(/^\+91\s?/, "")}`;

  return (
    <div
      className="section-padding pt-28 md:pt-32"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <h1
            className="text-4xl font-black tracking-tight sm:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            {content.heading}
          </h1>
          <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
            {content.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <Phone className="size-5" style={{ color: "var(--brand-text)" }} />
                <span className="text-base" style={{ color: "var(--foreground)" }}>
                  {contact.phone}
                </span>
              </a>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <a
                href={whatsappUrl(contact.whatsapp, "Hi, I have an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <span className="text-lg">💬</span>
                <span className="text-base" style={{ color: "var(--foreground)" }}>
                  WhatsApp: {whatsappDisplay}
                </span>
              </a>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <Mail className="size-5" style={{ color: "var(--brand-text)" }} />
                <span className="text-base" style={{ color: "var(--foreground)" }}>
                  {contact.email}
                </span>
              </a>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-opacity hover:opacity-80"
              >
                <MapPin
                  className="mt-0.5 size-5 shrink-0"
                  style={{ color: "var(--brand-text)" }}
                />
                <span className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {contact.address}
                </span>
              </a>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0" style={{ color: "var(--brand-text)" }} />
                <div className="space-y-2">
                  {hoursRows.map((row) => (
                    <div
                      key={row.days}
                      className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span
                        className="text-base font-medium"
                        style={{ color: row.closed ? "var(--brand-text)" : "var(--foreground)" }}
                      >
                        {row.days}
                      </span>
                      <span
                        className="text-base"
                        style={{ color: row.closed ? "var(--brand-text)" : "var(--text-secondary)" }}
                      >
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {content.branches && (
            <div>
              <h3
                className="mb-3 text-lg font-bold"
                style={{ color: "var(--brand-text)" }}
              >
                {content.branches.heading}
              </h3>
              <ul className="space-y-4">
                {content.branches.list.map((b) => (
                  <li
                    key={b.slug}
                    className="text-base leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <p className="font-semibold" style={{ color: "var(--foreground)" }}>
                      {b.name}
                    </p>
                    <p>
                      {b.area}, {b.city}
                    </p>
                    <p>{b.address}</p>
                    <p>Weekly holiday: {b.weeklyOff}</p>
                    <a
                      href={`tel:${b.phone.replace(/\s/g, "")}`}
                      className="block transition-opacity hover:opacity-80"
                      style={{ color: "var(--brand-text)" }}
                    >
                      {b.phone}
                    </a>
                    <a
                      href={`mailto:${b.email}`}
                      className="block transition-opacity hover:opacity-80"
                      style={{ color: "var(--brand-text)" }}
                    >
                      {b.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>

          {/* Right — Form */}
          <div
            className="rounded-xl border p-6 lg:p-8"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          >
            {status === "success" ? (
              <div className="py-8 text-center">
                <div
                  className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
                >
                  <span className="text-3xl text-green-500">✓</span>
                </div>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--foreground)" }}
                >
                  Enquiry Sent!
                </h2>
                <p className="mt-2 text-base" style={{ color: "var(--text-secondary)" }}>
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
                    style={{ backgroundColor: "#25D366", color: "var(--whatsapp-text)" }}
                  >
                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                      Continue on WhatsApp
                    </a>
                  </Button>
                )}
                <Button
                  className="mt-4"
                  onClick={() => {
                    setStatus("idle");
                    setWaLink(null);
                    setReference(null);
                  }}
                  style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
                >
                  Send Another Enquiry
                </Button>
              </div>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="contact-name" style={{ color: "var(--text-secondary)" }}>Name *</Label>
                  <Input
                    className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                    id="contact-name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contact-companyName" style={{ color: "var(--text-secondary)" }}>Company Name</Label>
                  <Input
                    className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                    id="contact-companyName"
                    {...form.register("companyName")}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-phone" style={{ color: "var(--text-secondary)" }}>Phone *</Label>
                  <Input
                    className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                    id="contact-phone"
                    {...form.register("phone")}
                  />
                  {form.formState.errors.phone && (
                    <p className="mt-1 text-sm text-red-400">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contact-email" style={{ color: "var(--text-secondary)" }}>Email *</Label>
                  <Input
                    type="email"
                    className="mt-1.5 h-10 border-border bg-surface-2 text-foreground"
                    id="contact-email"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contact-product" style={{ color: "var(--text-secondary)" }}>Product Interest *</Label>
                  <Select
                    value={form.watch("productInterest")}
                    onValueChange={(v) =>
                      form.setValue("productInterest", v, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger
                      id="contact-product"
                      aria-label="Product interest"
                      className="mt-1.5 h-10 w-full border-border bg-surface-2 text-foreground"
                    >
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.slug} value={p.name}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.productInterest && (
                    <p className="mt-1 text-sm text-red-400">
                      {form.formState.errors.productInterest.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="contact-message" style={{ color: "var(--text-secondary)" }}>
                    Message / Requirements *
                  </Label>
                  <Textarea
                    rows={5}
                    className="mt-1.5 border-border bg-surface-2 text-foreground"
                    id="contact-message"
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                {status === "unavailable" && (
                  <div className="space-y-3 rounded-xl border p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Our online form is temporarily unavailable. Please WhatsApp
                      us directly for a quick response.
                    </p>
                    {waLink && (
                      <Button
                        asChild
                        className="h-11 w-full border-0"
                        style={{ backgroundColor: "#25D366", color: "var(--whatsapp-text)" }}
                      >
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          WhatsApp Us Directly
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                {status === "error" && (
                  <div className="space-y-3">
                    <p className="text-sm text-red-400">
                      Failed to send — request timed out or server error. Please
                      call us or use WhatsApp.
                    </p>
                    {waLink && (
                      <Button
                        asChild
                        className="h-11 w-full border-0"
                        style={{ backgroundColor: "#25D366", color: "var(--whatsapp-text)" }}
                      >
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Message us on WhatsApp
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 w-full border-0 text-base font-semibold"
                  style={{ backgroundColor: "var(--brand)", color: "var(--brand-foreground)" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Enquiry"
                  )}
                </Button>
                <FormPrivacyNote />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
