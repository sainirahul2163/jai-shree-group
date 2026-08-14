"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { deleteLead } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lead } from "@/types/database";

const STATUSES = ["all", "new", "contacted", "quoted", "converted", "lost"];

export function LeadsTable({
  leads,
  query,
  status,
  page,
  totalPages,
}: {
  leads: Lead[];
  query: string;
  status: string;
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    setConfirmId(null);
    setError("");
    startTransition(async () => {
      try {
        await deleteLead(id);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not delete that lead");
      }
    });
  }

  const csvData = useMemo(() => {
    const headers = [
      "Name",
      "Phone",
      "Email",
      "Company",
      "Product",
      "Source",
      "Status",
      "Date",
    ];
    const rows = leads.map((l) => [
      l.name,
      l.phone,
      l.email ?? "",
      l.company ?? "",
      l.product_interest ?? l.products_selected?.join("; ") ?? "",
      l.source,
      l.status,
      l.created_at,
    ]);
    return [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
  }, [leads]);

  function exportCsv() {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Search name, phone, email..."
          defaultValue={query}
          className="max-w-sm border-[#2A2A2A] bg-[#111111]"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = (e.target as HTMLInputElement).value;
              router.push(`/admin/leads?q=${encodeURIComponent(val)}&status=${status}`);
            }
          }}
        />
        <Select
          value={status}
          onValueChange={(val) =>
            router.push(`/admin/leads?q=${encodeURIComponent(query)}&status=${val}`)
          }
        >
          <SelectTrigger className="w-40 border-[#2A2A2A] bg-[#111111]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="border-[#2A2A2A] sm:ml-auto"
          onClick={exportCsv}
        >
          Export CSV
        </Button>
      </div>

      {error && (
        <p
          className="rounded-lg border px-4 py-2.5 text-sm"
          style={{
            borderColor: "rgba(248,113,113,0.4)",
            backgroundColor: "rgba(248,113,113,0.08)",
            color: "#F87171",
          }}
        >
          {error}
        </p>
      )}

      <div
        className="overflow-x-auto rounded-xl border"
        style={{ borderColor: "#2A2A2A" }}
      >
        <table className="w-full text-left text-sm">
          <thead style={{ backgroundColor: "#111111", color: "#666666" }}>
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center" style={{ color: "#666666" }}>
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-t" style={{ borderColor: "#2A2A2A" }}>
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.company ?? "—"}</td>
                  <td className="px-4 py-3">
                    {lead.product_interest ??
                      lead.products_selected?.join(", ") ??
                      "—"}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {lead.source.replace(/_/g, " ")}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3" style={{ color: "#A0A0A0" }}>
                    {new Date(lead.created_at).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    {confirmId === lead.id ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="whitespace-nowrap border-red-900/50 text-red-400"
                          disabled={isPending}
                          onClick={() => handleDelete(lead.id)}
                        >
                          Delete permanently
                        </Button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="text-xs underline"
                          style={{ color: "#666666" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-[#2A2A2A]"
                        >
                          <Link href={`/admin/leads/${lead.id}`}>View</Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#2A2A2A] text-red-400"
                          disabled={isPending}
                          onClick={() => setConfirmId(lead.id)}
                          aria-label={`Delete lead ${lead.name}`}
                          title={`Delete ${lead.name}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {page > 1 && (
            <Button asChild variant="outline" className="border-[#2A2A2A]">
              <Link
                href={`/admin/leads?q=${encodeURIComponent(query)}&status=${status}&page=${page - 1}`}
              >
                Previous
              </Link>
            </Button>
          )}
          <span className="flex items-center px-3 text-sm" style={{ color: "#A0A0A0" }}>
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Button asChild variant="outline" className="border-[#2A2A2A]">
              <Link
                href={`/admin/leads?q=${encodeURIComponent(query)}&status=${status}&page=${page + 1}`}
              >
                Next
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
