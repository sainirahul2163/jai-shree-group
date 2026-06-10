"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteTestimonial,
  saveTestimonial,
  updateTestimonial,
} from "@/lib/supabase/actions";
import type { Testimonial } from "@/types/database";

export function TestimonialsAdminClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isPending, startTransition] = useTransition();

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await saveTestimonial({
        client_name: name,
        company_name: company,
        industry,
        message,
        rating,
        is_featured: false,
        is_published: true,
      });
      setName("");
      setCompany("");
      setIndustry("");
      setMessage("");
      setRating(5);
    });
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black">Testimonials</h2>

      <form
        onSubmit={handleAdd}
        className="rounded-xl border p-6"
        style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
      >
        <h3 className="mb-4 font-bold">Add New Testimonial</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Client Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
            />
          </div>
          <div>
            <Label>Company</Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
            />
          </div>
          <div>
            <Label>Industry</Label>
            <Input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
            />
          </div>
          <div>
            <Label>Rating (1-5)</Label>
            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
              rows={3}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4 glow-orange" disabled={isPending}>
          Add Testimonial
        </Button>
      </form>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border p-6"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold">{t.client_name}</p>
                <p className="text-sm" style={{ color: "#A0A0A0" }}>
                  {t.company_name} · {t.industry}
                </p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-[#E8521A] text-[#E8521A]"
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
                  {t.message}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#2A2A2A]"
                  onClick={() =>
                    startTransition(async () => {
                      await updateTestimonial(t.id, {
                        is_featured: !t.is_featured,
                      });
                    })
                  }
                >
                  {t.is_featured ? "Unfeature" : "Feature"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#2A2A2A]"
                  onClick={() =>
                    startTransition(async () => {
                      await updateTestimonial(t.id, {
                        is_published: !t.is_published,
                      });
                    })
                  }
                >
                  {t.is_published ? "Unpublish" : "Publish"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-900/50 text-red-400"
                  onClick={() =>
                    startTransition(async () => {
                      await deleteTestimonial(t.id);
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
  );
}
