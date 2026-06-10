"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
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
  addFollowUp,
  updateLeadNotes,
  updateLeadStatus,
} from "@/lib/supabase/actions";
import type { FollowUp, FollowUpType, LeadStatus } from "@/types/database";

const STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "converted",
  "lost",
];

const FOLLOW_UP_TYPES: FollowUpType[] = [
  "whatsapp",
  "call",
  "email",
  "meeting",
];

export function LeadDetailClient({
  leadId,
  currentStatus,
  currentNotes,
  followUps,
}: {
  leadId: string;
  currentStatus: LeadStatus;
  currentNotes: string;
  followUps: FollowUp[];
}) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [followUpType, setFollowUpType] = useState<FollowUpType>("call");
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
      >
        <h3 className="mb-4 font-bold">Update Status</h3>
        <Select
          value={status}
          onValueChange={(val) => {
            setStatus(val as LeadStatus);
            startTransition(async () => {
              await updateLeadStatus(leadId, val as LeadStatus);
            });
          }}
        >
          <SelectTrigger className="border-[#2A2A2A] bg-[#0A0A0A]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="mt-4">
          <Label style={{ color: "#A0A0A0" }}>Notes</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1.5 border-[#2A2A2A] bg-[#0A0A0A]"
            rows={4}
          />
          <Button
            className="mt-3 glow-orange"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await updateLeadNotes(leadId, notes);
              })
            }
          >
            Save Notes
          </Button>
        </div>
      </div>

      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
      >
        <h3 className="mb-4 font-bold">Follow-up History</h3>
        {followUps.length === 0 ? (
          <p className="text-sm" style={{ color: "#666666" }}>
            No follow-ups yet
          </p>
        ) : (
          <ul className="mb-4 space-y-3">
            {followUps.map((fu) => (
              <li
                key={fu.id}
                className="rounded-lg border p-3 text-sm"
                style={{ borderColor: "#2A2A2A" }}
              >
                <div className="flex justify-between">
                  <span className="capitalize font-semibold" style={{ color: "#E8521A" }}>
                    {fu.type}
                  </span>
                  <span style={{ color: "#666666" }}>
                    {new Date(fu.followed_up_at).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-1" style={{ color: "#A0A0A0" }}>
                  {fu.notes}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-3 border-t pt-4" style={{ borderColor: "#2A2A2A" }}>
          <Label style={{ color: "#A0A0A0" }}>Add Follow-up</Label>
          <Select
            value={followUpType}
            onValueChange={(v) => setFollowUpType(v as FollowUpType)}
          >
            <SelectTrigger className="border-[#2A2A2A] bg-[#0A0A0A]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FOLLOW_UP_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            value={followUpNotes}
            onChange={(e) => setFollowUpNotes(e.target.value)}
            placeholder="Follow-up notes..."
            className="border-[#2A2A2A] bg-[#0A0A0A]"
            rows={3}
          />
          <Button
            variant="outline"
            className="border-[#2A2A2A]"
            disabled={!followUpNotes.trim() || isPending}
            onClick={() =>
              startTransition(async () => {
                await addFollowUp(leadId, followUpType, followUpNotes);
                setFollowUpNotes("");
              })
            }
          >
            Save Follow-up
          </Button>
        </div>
      </div>
    </div>
  );
}
