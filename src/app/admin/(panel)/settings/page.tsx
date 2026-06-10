export const metadata = {
  title: "Settings | Admin | Jai Shree Group",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Settings</h2>
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
      >
        <h3 className="font-bold">Environment</h3>
        <ul className="mt-4 space-y-2 text-sm" style={{ color: "#A0A0A0" }}>
          <li>
            Supabase URL:{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Configured" : "Not set"}
          </li>
          <li>
            Resend API:{" "}
            {process.env.RESEND_API_KEY ? "Configured" : "Not set"}
          </li>
          <li>
            Contact Email:{" "}
            {process.env.CONTACT_EMAIL ?? process.env.RESEND_TO ?? "Using default"}
          </li>
        </ul>
        <p className="mt-6 text-sm" style={{ color: "#666666" }}>
          Manage Supabase project settings in the Supabase Dashboard. Create
          admin users under Authentication → Users.
        </p>
      </div>
    </div>
  );
}
