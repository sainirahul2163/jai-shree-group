import Link from "next/link";

import { LeadsTable } from "@/components/admin/LeadsTable";
import { createServerClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/types/database";

export const metadata = {
  title: "Leads | Admin | Jai Shree Group",
};

type SearchParams = Promise<{
  q?: string;
  status?: string;
  page?: string;
}>;

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const status = params.status ?? "all";
  const page = Number(params.page ?? "1");
  const perPage = 20;
  const offset = (page - 1) * perPage;

  const supabase = await createServerClient();
  let dbQuery = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + perPage - 1);

  if (status !== "all") {
    dbQuery = dbQuery.eq("status", status as LeadStatus);
  }
  if (query) {
    dbQuery = dbQuery.or(
      `name.ilike.%${query}%,phone.ilike.%${query}%,email.ilike.%${query}%`
    );
  }

  const { data: leads, count } = await dbQuery;
  const totalPages = Math.ceil((count ?? 0) / perPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Leads</h2>
        <p className="text-sm" style={{ color: "#A0A0A0" }}>
          {count ?? 0} total
        </p>
      </div>

      <LeadsTable
        leads={leads ?? []}
        query={query}
        status={status}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
