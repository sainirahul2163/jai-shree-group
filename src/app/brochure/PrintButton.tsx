"use client";

export function PrintButton() {
  return (
    <div className="b-toolbar">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full border border-[#3a2a24] bg-[#160e0a] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-[#ff9a70] shadow-lg transition-colors hover:bg-[#e8521a] hover:text-white"
      >
        Print / Save PDF
      </button>
    </div>
  );
}
