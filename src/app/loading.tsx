export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="size-10 animate-spin rounded-full border-2 border-transparent"
        style={{
          borderTopColor: "#E8521A",
          borderRightColor: "#E8521A",
        }}
      />
      <p className="text-sm" style={{ color: "#666666" }}>
        Loading...
      </p>
    </div>
  );
}
