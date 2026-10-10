"use client";

export function PrintButton() {
  return (
    <div className="toolbar">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full bg-[#e8521a] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-[#c4400e]"
      >
        Print / Save PDF
      </button>
    </div>
  );
}
