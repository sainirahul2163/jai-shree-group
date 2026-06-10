import type { LeadStatus } from "@/types/database";

const STATUS_STYLES: Record<LeadStatus, { bg: string; color: string }> = {
  new: { bg: "rgba(232, 82, 26, 0.15)", color: "#E8521A" },
  contacted: { bg: "rgba(59, 130, 246, 0.15)", color: "#3B82F6" },
  quoted: { bg: "rgba(234, 179, 8, 0.15)", color: "#EAB308" },
  converted: { bg: "rgba(34, 197, 94, 0.15)", color: "#22C55E" },
  lost: { bg: "rgba(239, 68, 68, 0.15)", color: "#EF4444" },
};

export function StatusBadge({ status }: { status: LeadStatus | string }) {
  const styles = STATUS_STYLES[status as LeadStatus] ?? STATUS_STYLES.new;
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize"
      style={{ backgroundColor: styles.bg, color: styles.color }}
    >
      {status}
    </span>
  );
}
