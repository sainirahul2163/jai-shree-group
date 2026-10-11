import Link from "next/link";

import { cn } from "@/lib/utils";

export function FormPrivacyNote({ className }: { className?: string }) {
  return (
    <p
      className={cn("text-center text-xs", className)}
      style={{ color: "var(--text-muted)" }}
    >
      By sending this form you agree to our{" "}
      <Link
        href="/privacy"
        className="underline underline-offset-2 transition-colors hover:text-brand-text"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
}
