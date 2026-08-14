import type { ReactNode } from "react";

/** One A4 sheet. `dark` flips to the statement-page palette. */
export function Sheet({
  dark = false,
  children,
  foot,
  page,
}: {
  dark?: boolean;
  children: ReactNode;
  /** running-foot section name; omit on cover/back to hide the foot entirely */
  foot?: string;
  page?: number;
}) {
  return (
    <section className={`sheet${dark ? " sheet--dark" : ""}`}>
      {children}
      {foot !== undefined && (
        <footer className="foot">
          <span>Jai Shree Group®</span>
          <span aria-hidden>·</span>
          <span>{foot}</span>
          <span className="foot__no">{String(page).padStart(2, "0")}</span>
        </footer>
      )}
    </section>
  );
}

/** Page masthead: section number, title, and the heavy rule beneath. */
export function Masthead({
  no,
  title,
  kicker,
}: {
  no: string;
  title: string;
  kicker?: string;
}) {
  return (
    <header className="masthead">
      <div className="masthead__top">
        <span className="secno">{no}</span>
        {kicker && <span className="label">{kicker}</span>}
      </div>
      <h2 className="h1">{title}</h2>
    </header>
  );
}

export function Spec({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="spec">
      <dt className="spec__k">{k}</dt>
      <dd className="spec__v">{children}</dd>
    </div>
  );
}

/** Numbered capability list. The number comes from the CSS counter (::before),
 *  so each item contributes exactly one further grid cell. */
export function Caps({ items, start = 0 }: { items: readonly string[]; start?: number }) {
  return (
    <ol className="caps" style={start ? { counterReset: `cap ${start}` } : undefined}>
      {items.map((t) => (
        <li key={t}>
          <span>{t}</span>
        </li>
      ))}
    </ol>
  );
}

export function Stat({ value, accent, label }: { value: string; accent?: string; label: string }) {
  return (
    <div>
      <div className="stat__v">
        {value}
        {accent && <em>{accent}</em>}
      </div>
      <div className="stat__k">{label}</div>
    </div>
  );
}

/* contact icons — hairline, matched to the type weight */

const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 1.4 } as const;

export function IconPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" {...ICON} className={className}>
      <path d="M8 14.4S3.1 10 3.1 6.5a4.9 4.9 0 0 1 9.8 0C12.9 10 8 14.4 8 14.4Z" />
      <circle cx="8" cy="6.5" r="1.8" />
    </svg>
  );
}

export function IconGlobe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" {...ICON} className={className}>
      <circle cx="8" cy="8" r="6.1" />
      <path d="M1.9 8h12.2M8 1.9c-4.3 4.1-4.3 8.1 0 12.2M8 1.9c4.3 4.1 4.3 8.1 0 12.2" />
    </svg>
  );
}

export function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" {...ICON} className={className}>
      <rect x="1.8" y="3.4" width="12.4" height="9.2" rx="1.2" />
      <path d="m2.4 4.4 5.6 4.4 5.6-4.4" />
    </svg>
  );
}

export function IconPhone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" {...ICON} className={className}>
      <path d="M3.3 2.3h2.5l1.2 3.1-1.7 1.3a9.3 9.3 0 0 0 3.9 3.9l1.3-1.7 3.1 1.2v2.5c0 .7-.6 1.3-1.3 1.2C6.8 13.3 2.7 9.2 2.1 3.6c-.1-.7.5-1.3 1.2-1.3Z" />
    </svg>
  );
}
