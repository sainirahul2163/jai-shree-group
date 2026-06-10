import Link from "next/link";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  getLeadProductStats,
  getLeadsStats,
  getPageViewStats,
  getRecentLeads,
} from "@/lib/supabase/queries";

export const metadata = {
  title: "Dashboard | Admin | Jai Shree Group",
};

export default async function AdminDashboardPage() {
  const [stats, recentLeads, productStats, pageStats] = await Promise.all([
    getLeadsStats(),
    getRecentLeads(10),
    getLeadProductStats(),
    getPageViewStats(),
  ]);

  const maxProductCount = Math.max(...productStats.map((p) => p.count), 1);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black">Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Leads", value: stats.total },
          { label: "New Leads", value: stats.newCount },
          { label: "This Month", value: stats.monthCount },
          { label: "Converted", value: stats.converted },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border p-6"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <p className="text-sm" style={{ color: "#A0A0A0" }}>
              {card.label}
            </p>
            <p
              className="mt-2 text-3xl font-black"
              style={{ color: "#E8521A" }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div
          className="xl:col-span-2 rounded-xl border overflow-hidden"
          style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
        >
          <div className="border-b px-6 py-4" style={{ borderColor: "#2A2A2A" }}>
            <h3 className="font-bold">Recent Leads</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ color: "#666666" }}>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Source</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center" style={{ color: "#666666" }}>
                      No leads yet
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-t" style={{ borderColor: "#2A2A2A" }}>
                      <td className="px-6 py-3">{lead.name}</td>
                      <td className="px-6 py-3">{lead.phone}</td>
                      <td className="px-6 py-3">
                        {lead.product_interest ??
                          lead.products_selected?.join(", ") ??
                          "—"}
                      </td>
                      <td className="px-6 py-3 capitalize">{lead.source.replace("_", " ")}</td>
                      <td className="px-6 py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-6 py-3" style={{ color: "#A0A0A0" }}>
                        {new Date(lead.created_at).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-3">
                        <Button asChild size="sm" variant="outline" className="border-[#2A2A2A]">
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
          <div
            className="rounded-xl border p-6"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <h3 className="font-bold">Page Views Today</h3>
            <p className="mt-2 text-3xl font-black" style={{ color: "#E8521A" }}>
              {pageStats.today}
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-xs uppercase tracking-wider" style={{ color: "#666666" }}>
                Top Pages This Week
              </p>
              {pageStats.topPages.length === 0 ? (
                <p className="text-sm" style={{ color: "#666666" }}>No data yet</p>
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

          <div
            className="rounded-xl border p-6"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <h3 className="font-bold">Enquiries by Product (30 days)</h3>
            <div className="mt-4 space-y-3">
              {productStats.length === 0 ? (
                <p className="text-sm" style={{ color: "#666666" }}>No data yet</p>
              ) : (
                productStats.map((item) => (
                  <div key={item.product}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span style={{ color: "#A0A0A0" }}>{item.product}</span>
                      <span>{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ backgroundColor: "#2A2A2A" }}>
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
