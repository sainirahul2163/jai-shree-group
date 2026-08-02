/**
 * Admin allow-list.
 *
 * Only emails listed in the server-only `ADMIN_EMAILS` env var
 * (comma-separated) are treated as admins and allowed into `/admin`.
 * This is intentionally NOT `NEXT_PUBLIC_` — it must never reach the browser.
 *
 * Fail closed: if the list is empty/unset, no one is an admin. Set
 * `ADMIN_EMAILS` (in Vercel + .env.local) before relying on the panel.
 */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const allowlist = getAdminEmails();
  if (allowlist.length === 0) return false;
  return allowlist.includes(email.trim().toLowerCase());
}
