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
  BRANCHES,
  COMPANY,
  PRODUCTS,
} from "@/lib/constants";
import { whatsappUrl } from "@/lib/email";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations";

const WORKING_HOURS = "Mon–Sat, 9:00 AM – 6:00 PM";
const SUBMIT_TIMEOUT_MS = 10_000;

export function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [waLink, setWaLink] = useState<string | null>(null);

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

    const fallbackWa = whatsappUrl(
      COMPANY.whatsapp,
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
      if (!res.ok) throw new Error(data.error ?? "Failed");
      setWaLink(data.whatsappUrl ?? fallbackWa);
      setStatus("success");
      form.reset();
    } catch {
      setWaLink(fallbackWa);
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`;
  const whatsappDisplay = `+91 ${COMPANY.phone.replace(/^\+91\s?/, "")}`;

  return (
    <div
      className="section-padding pt-28 md:pt-32"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <h1
            className="text-4xl font-black tracking-tight sm:text-5xl"
            style={{ color: "#FFFFFF" }}
          >
            Contact Perforated Sheet Manufacturers — Pune & Mumbai
          </h1>
          <p className="mt-4 text-lg" style={{ color: "#A0A0A0" }}>
            Have a requirement? Our team responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6">
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
            >
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <Phone className="size-5" style={{ color: "#E8521A" }} />
                <span className="text-base" style={{ color: "#FFFFFF" }}>
                  {COMPANY.phone}
                </span>
              </a>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
            >
              <a
                href={whatsappUrl(COMPANY.whatsapp, "Hi, I have an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <span className="text-lg">💬</span>
                <span className="text-base" style={{ color: "#FFFFFF" }}>
                  WhatsApp: {whatsappDisplay}
                </span>
              </a>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
            >
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <Mail className="size-5" style={{ color: "#E8521A" }} />
                <span className="text-base" style={{ color: "#FFFFFF" }}>
                  {COMPANY.email}
                </span>
              </a>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
            >
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-opacity hover:opacity-80"
              >
                <MapPin
                  className="mt-0.5 size-5 shrink-0"
                  style={{ color: "#E8521A" }}
                />
                <span className="text-base leading-relaxed" style={{ color: "#A0A0A0" }}>
                  {COMPANY.address}
                </span>
              </a>
            </div>

            <div
              className="flex items-center gap-3 rounded-xl border p-5"
              style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
            >
              <Clock className="size-5" style={{ color: "#E8521A" }} />
              <span className="text-base" style={{ color: "#A0A0A0" }}>
                {WORKING_HOURS}
              </span>
            </div>

            <div>
              <h3
                className="mb-3 text-lg font-bold"
                style={{ color: "#E8521A" }}
              >
                Our Branches
              </h3>
              <ul className="space-y-4">
                {BRANCHES.map((b) => (
                  <li
                    key={b.slug}
                    className="text-base leading-relaxed"
                    style={{ color: "#A0A0A0" }}
                  >
                    <p className="font-semibold" style={{ color: "#FFFFFF" }}>
                      {b.name}
                    </p>
                    <p>
                      {b.area}, {b.city}
                    </p>
                    <p>{b.address}</p>
                    <a
                      href={`tel:${b.phone.replace(/\s/g, "")}`}
                      className="block transition-opacity hover:opacity-80"
                      style={{ color: "#E8521A" }}
                    >
                      {b.phone}
                    </a>
                    <a
                      href={`mailto:${b.email}`}
                      className="block transition-opacity hover:opacity-80"
                      style={{ color: "#E8521A" }}
                    >
                      {b.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="rounded-xl border p-6 lg:p-8"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
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
                  style={{ color: "#FFFFFF" }}
                >
                  Enquiry Sent!
                </h2>
                <p className="mt-2 text-base" style={{ color: "#A0A0A0" }}>
                  We&apos;ll get back to you within 24 hours.
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
                  className="mt-4"
                  onClick={() => {
                    setStatus("idle");
                    setWaLink(null);
                  }}
                  style={{ backgroundColor: "#E8521A", color: "#FFF" }}
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
                  <Label style={{ color: "#A0A0A0" }}>Name *</Label>
                  <Input
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
                  <Label style={{ color: "#A0A0A0" }}>Company Name</Label>
                  <Input
                    className="mt-1.5 h-10 border-[#2A2A2A] bg-[#1A1A1A] text-white"
                    {...form.register("companyName")}
                  />
                </div>

                <div>
                  <Label style={{ color: "#A0A0A0" }}>Phone *</Label>
                  <Input
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
                  <Label style={{ color: "#A0A0A0" }}>Email *</Label>
                  <Input
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
                  <Label style={{ color: "#A0A0A0" }}>Product Interest *</Label>
                  <Select
                    value={form.watch("productInterest")}
                    onValueChange={(v) =>
                      form.setValue("productInterest", v, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="mt-1.5 h-10 w-full border-[#2A2A2A] bg-[#1A1A1A] text-white">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCTS.map((p) => (
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
                  <Label style={{ color: "#A0A0A0" }}>
                    Message / Requirements *
                  </Label>
                  <Textarea
                    rows={5}
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
                  <div className="space-y-3">
                    <p className="text-sm text-red-400">
                      Failed to send — request timed out or server error. Please
                      call us or use WhatsApp.
                    </p>
                    {waLink && (
                      <Button
                        asChild
                        className="h-11 w-full border-0"
                        style={{ backgroundColor: "#25D366", color: "#FFF" }}
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
                  style={{ backgroundColor: "#E8521A", color: "#FFFFFF" }}
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
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
