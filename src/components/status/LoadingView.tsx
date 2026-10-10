export function LoadingView() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="size-10 animate-spin rounded-full border-2 border-transparent"
        style={{
          borderTopColor: "var(--brand)",
          borderRightColor: "var(--brand)",
        }}
      />
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Loading...
      </p>
    </div>
  );
}
