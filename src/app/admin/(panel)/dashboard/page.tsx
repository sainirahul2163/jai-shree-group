import Link from "next/link";
import {
  AlertTriangle,
  ExternalLink,
  FileText,
  ImageIcon,
  Star,
} from "lucide-react";

import { LeadQuickContact } from "@/components/admin/LeadQuickContact";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { daysSince } from "@/lib/phone";
import {
  getContentCounts,
  getLeadProductStats,
  getLeadsStats,
  getPageViewStats,
  getRecentLeads,
  getStaleLeads,
} from "@/lib/supabase/queries";

export const metadata = {
  title: "Dashboard | Admin | Jai Shree Group",
};

const CARD = { backgroundColor: "#111111", borderColor: "#2A2A2A" };

export default async function AdminDashboardPage() {
  const [stats, recentLeads, productStats, pageStats, staleLeads, content] =
    await Promise.all([
      getLeadsStats(),
      getRecentLeads(10),
      getLeadProductStats(),
      getPageViewStats(),
      getStaleLeads(3),
      getContentCounts(),
    ]);

  const maxProductCount = Math.max(...productStats.items.map((p) => p.count), 1);
  const oldestWaiting = staleLeads.length
    ? daysSince(staleLeads[0].created_at)
    : 0;

  const statCards = [
    { label: "Total Leads", value: stats.total, href: "/admin/leads" },
    {
      label: "Awaiting Reply",
      value: stats.newCount,
      href: "/admin/leads",
      alert: stats.newCount > 0,
    },
    { label: "This Month", value: stats.monthCount, href: "/admin/leads" },
    { label: "Converted", value: stats.converted, href: "/admin/leads" },
  ];

  const contentCards = [
    {
      label: "Gallery Photos",
      icon: ImageIcon,
      href: "/admin/gallery",
      ...content.gallery,
    },
    {
      label: "Blog Posts",
      icon: FileText,
      href: "/admin/blog",
      ...content.blog,
    },
    {
      label: "Testimonials",
      icon: Star,
      href: "/admin/testimonials",
      ...content.testimonials,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-black">Dashboard</h2>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="border-[#2A2A2A]">
            <Link href="/admin/gallery">
              <ImageIcon className="mr-1.5 size-4" />
              Add Photo
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-[#2A2A2A]">
            <Link href="/admin/blog/new">
              <FileText className="mr-1.5 size-4" />
              New Post
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-[#2A2A2A]">
            <Link href="/" target="_blank">
              <ExternalLink className="mr-1.5 size-4" />
              View Site
            </Link>
          </Button>
        </div>
      </div>

      {/* Lead stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border p-6 transition-colors hover:border-[#E8521A]"
            style={{
              backgroundColor: "#111111",
              borderColor: card.alert ? "rgba(232,82,26,0.5)" : "#2A2A2A",
            }}
          >
            <p className="text-sm" style={{ color: "#A0A0A0" }}>
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-black" style={{ color: "#E8521A" }}>
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      {/* The headline: enquiries nobody has answered yet. */}
      {staleLeads.length > 0 && (
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: "rgba(232,82,26,0.06)",
            borderColor: "rgba(232,82,26,0.5)",
          }}
        >
          <div
            className="flex flex-wrap items-center gap-2 border-b px-6 py-4"
            style={{ borderColor: "rgba(232,82,26,0.3)" }}
          >
            <AlertTriangle className="size-5" style={{ color: "#E8521A" }} />
            <h3 className="font-bold" style={{ color: "#E8521A" }}>
              {staleLeads.length} enquir
              {staleLeads.length === 1 ? "y is" : "ies are"} waiting for a reply
            </h3>
            <span className="text-sm" style={{ color: "#A0A0A0" }}>
              · oldest has been waiting {oldestWaiting} day
              {oldestWaiting === 1 ? "" : "s"}
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: "#2A2A2A" }}>
            {staleLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-3 px-6 py-3"
              >
                <div className="min-w-0">
                  <p className="font-semibold">{lead.name}</p>
                  <p className="truncate text-xs" style={{ color: "#A0A0A0" }}>
                    {lead.product_interest ??
                      lead.products_selected?.join(", ") ??
                      "General enquiry"}
                    {lead.city ? ` · ${lead.city}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="whitespace-nowrap text-xs font-semibold"
                    style={{ color: "#E8521A" }}
                  >
                    {daysSince(lead.created_at)}d waiting
                  </span>
                  <LeadQuickContact phone={lead.phone} name={lead.name} />
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-[#2A2A2A]"
                  >
                    <Link href={`/admin/leads/${lead.id}`}>Open</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div
          className="xl:col-span-2 rounded-xl border overflow-hidden"
          style={CARD}
        >
          <div
            className="flex items-center justify-between border-b px-6 py-4"
            style={{ borderColor: "#2A2A2A" }}
          >
            <h3 className="font-bold">Recent Leads</h3>
            <Link
              href="/admin/leads"
              className="text-xs underline"
              style={{ color: "#A0A0A0" }}
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ color: "#666666" }}>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center"
                      style={{ color: "#666666" }}
                    >
                      No leads yet
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-t"
                      style={{ borderColor: "#2A2A2A" }}
                    >
                      <td className="px-6 py-3">
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-xs" style={{ color: "#666666" }}>
                          {lead.phone}
                        </p>
                      </td>
                      <td className="px-6 py-3">
                        {lead.product_interest ??
                          lead.products_selected?.join(", ") ??
                          "—"}
                      </td>
                      <td className="px-6 py-3 capitalize">
                        {lead.source.replace("_", " ")}
                      </td>
                      <td className="px-6 py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-3" style={{ color: "#A0A0A0" }}>
                        {new Date(lead.created_at).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-3">
                        <LeadQuickContact
                          phone={lead.phone}
                          name={lead.name}
                        />
                      </td>
                      <td className="px-6 py-3">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-[#2A2A2A]"
                        >
                          <Link href={`/admin/leads/${lead.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          {/* What's on the site right now */}
          <div className="rounded-xl border p-6" style={CARD}>
            <h3 className="font-bold">Site Content</h3>
            <div className="mt-4 space-y-3">
              {contentCards.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors hover:border-[#E8521A]"
                  style={{ borderColor: "#2A2A2A" }}
                >
                  <span
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "#A0A0A0" }}
                  >
                    <c.icon className="size-4" />
                    {c.label}
                  </span>
                  <span className="text-sm">
                    <span className="font-bold text-white">{c.published}</span>
                    <span style={{ color: "#666666" }}> live</span>
                    {c.total > c.published && (
                      <span style={{ color: "#666666" }}>
                        {" "}
                        · {c.total - c.published} hidden
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-6" style={CARD}>
            <h3 className="font-bold">Page Views Today</h3>
            <p className="mt-2 text-3xl font-black" style={{ color: "#E8521A" }}>
              {pageStats.today}
            </p>
            <div className="mt-4 space-y-2">
              <p
                className="text-xs uppercase tracking-wider"
                style={{ color: "#666666" }}
              >
                Top Pages This Week
              </p>
              {pageStats.topPages.length === 0 ? (
                <p className="text-sm" style={{ color: "#666666" }}>
                  No visits recorded yet
                </p>
              ) : (
                pageStats.topPages.map((item) => (
                  <div key={item.page} className="flex justify-between text-sm">
                    <span style={{ color: "#A0A0A0" }}>{item.page}</span>
                    <span style={{ color: "#FFFFFF" }}>{item.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl border p-6" style={CARD}>
            <h3 className="font-bold">
              Enquiries by Product
              <span
                className="ml-1.5 text-xs font-normal"
                style={{ color: "#666666" }}
              >
                ({productStats.window})
              </span>
            </h3>
            <div className="mt-4 space-y-3">
              {productStats.items.length === 0 ? (
                <p className="text-sm" style={{ color: "#666666" }}>
                  No enquiries recorded yet
                </p>
              ) : (
                productStats.items.map((item) => (
                  <div key={item.product}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span style={{ color: "#A0A0A0" }}>{item.product}</span>
                      <span>{item.count}</span>
                    </div>
                    <div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: "#2A2A2A" }}
                    >
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(item.count / maxProductCount) * 100}%`,
                          backgroundColor: "#E8521A",
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
