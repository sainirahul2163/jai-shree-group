import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { LeadDetailClient } from "@/components/admin/LeadDetailClient";
import { SiteBadge } from "@/components/admin/SiteBadge";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { createClient as createServiceClient } from "@supabase/supabase-js";

import { DRAWINGS_BUCKET, type DrawingRef } from "@/lib/drawings";
import { toWhatsAppNumber } from "@/lib/phone";
import { isCurrentUserAdmin } from "@/lib/supabase/actions";
import { createServerClient } from "@/lib/supabase/server";
import type { FollowUp, Lead } from "@/types/database";

export const metadata = {
  title: "Lead Detail | Admin | Jai Shree Group",
};

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerClient();

  const { data: leadData } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const { data: followUpData } = await supabase
    .from("follow_ups")
    .select("*")
    .eq("lead_id", id)
    .order("followed_up_at", { ascending: false });

  const lead = leadData as Lead | null;
  const followUps = (followUpData ?? []) as FollowUp[];

  if (!lead) notFound();

  const waPhone = toWhatsAppNumber(lead.phone);
  const drawings = await signedDrawingLinks(lead);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" className="border-[#2A2A2A]">
          <Link href="/admin/leads">← Back to Leads</Link>
        </Button>
        <h2 className="text-2xl font-black">{lead.name}</h2>
        <StatusBadge status={lead.status} />
        <SiteBadge site={lead.site} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div
          className="lg:col-span-2 space-y-6 rounded-xl border p-6"
          style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
        >
          <h3 className="font-bold">Lead Information</h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
            {[
              ["Name", lead.name],
              ["Phone", lead.phone],
              ["Email", lead.email ?? "—"],
              ["Company", lead.company ?? "—"],
              [
                "Product",
                lead.product_interest ??
                  lead.products_selected?.join(", ") ??
                  "—",
              ],
              ["Material", lead.material ?? "—"],
              ["Thickness", lead.thickness ?? "—"],
              ["Quantity", lead.quantity ?? "—"],
              ["Deadline", lead.deadline ?? "—"],
              ["City", lead.city ?? "—"],
              ["Source", lead.source.replace(/_/g, " ")],
              ["Source Page", lead.source_page ?? "—"],
              [
                "Submitted",
                new Date(lead.created_at).toLocaleString("en-IN"),
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <dt style={{ color: "#666666" }}>{label}</dt>
                <dd className="mt-1" style={{ color: "#FFFFFF" }}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          {drawings.length > 0 && (
            <div>
              <p className="text-sm" style={{ color: "#666666" }}>
                Drawings (links open for 1 hour)
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {drawings.map((drawing) => (
                  <li key={drawing.path}>
                    {drawing.url ? (
                      <a
                        href={drawing.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E8521A] underline underline-offset-2"
                      >
                        {drawing.name}
                      </a>
                    ) : (
                      <span style={{ color: "#A0A0A0" }}>{drawing.name} (file not found)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {lead.message && (
            <div>
              <p className="text-sm" style={{ color: "#666666" }}>
                Message
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
                {lead.message}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <LeadDetailClient
            leadId={lead.id}
            currentStatus={lead.status}
            currentNotes={lead.notes ?? ""}
            followUps={followUps}
          />

          <div
            className="rounded-xl border p-6"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <h3 className="mb-4 font-bold">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button asChild className="bg-[#25D366] hover:bg-[#20bd5a]">
                <a
                  href={`https://wa.me/${waPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-4" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" className="border-[#2A2A2A]">
                <a href={`tel:${lead.phone}`}>
                  <Phone className="mr-2 size-4" />
                  Call
                </a>
              </Button>
              {lead.email && (
                <Button asChild variant="outline" className="border-[#2A2A2A]">
                  <a href={`mailto:${lead.email}`}>
                    <Mail className="mr-2 size-4" />
                    Email
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Short-lived download links for the lead's uploaded drawings (private bucket).
 * Made with the service role on the server, after the admin check.
 */
async function signedDrawingLinks(
  lead: Lead
): Promise<(DrawingRef & { url: string | null })[]> {
  const specs = (lead.specifications ?? {}) as { drawings?: DrawingRef[] };
  const drawings = Array.isArray(specs.drawings) ? specs.drawings : [];
  if (!drawings.length || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  if (!(await isCurrentUserAdmin())) return [];

  const storage = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ).storage.from(DRAWINGS_BUCKET);

  return Promise.all(
    drawings.map(async (drawing) => {
      const { data } = await storage.createSignedUrl(drawing.path, 3600, {
        download: drawing.name,
      });
      return { ...drawing, url: data?.signedUrl ?? null };
    })
  );
}
