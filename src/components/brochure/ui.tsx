import type { ReactNode } from "react";

/** One A4 sheet. Pages with `page` get the footer rail; cover/back omit it. */
export function Sheet({
  page,
  children,
  className = "",
}: {
  page?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`b-sheet ${className}`}>
      {children}
      {page !== undefined && (
        <footer className="b-footer">
          <span className="b-footer-brand">
            <b>Jai Shree Group®</b>&ensp;·&ensp;Accept Challenges · Develop · Achieve
          </span>
          <span className="flex items-center gap-[4mm]">
            <span className="b-footer-site">www.jaishreegroup.com</span>
            <span className="b-pageno">{String(page).padStart(2, "0")}</span>
          </span>
        </footer>
      )}
    </section>
  );
}

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <div className="b-tag-rail">
      <h2 className="b-tag">{children}</h2>
    </div>
  );
}

export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`b-field ${className}`}>
      <div className="b-field-label">{label}</div>
      <div className="b-body">{children}</div>
    </div>
  );
}

export function NumList({ items }: { items: readonly string[] }) {
  return (
    <ol className="b-numlist">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

export function QuoteBanner({ children }: { children: ReactNode }) {
  return <div className="b-quote">{children}</div>;
}

/* Contact icons — thin, geometric, brand-consistent */
export function IconGlobe() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className="b-unit-icon">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M1.8 8h12.4M8 1.8c-4.4 4.1-4.4 8.3 0 12.4M8 1.8c4.4 4.1 4.4 8.3 0 12.4" />
    </svg>
  );
}

export function IconMail() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className="b-unit-icon">
      <rect x="1.8" y="3.2" width="12.4" height="9.6" rx="1.4" />
      <path d="m2.4 4.2 5.6 4.6 5.6-4.6" />
    </svg>
  );
}

export function IconPhone() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className="b-unit-icon">
      <path d="M3.2 2.2h2.6l1.2 3.2-1.7 1.3a9.4 9.4 0 0 0 4 4l1.3-1.7 3.2 1.2v2.6c0 .7-.6 1.3-1.3 1.2C6.9 13.4 2.6 9.1 2 3.5c-.1-.7.5-1.3 1.2-1.3Z" />
    </svg>
  );
}

export function IconPin() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className="b-unit-icon">
      <path d="M8 14.2S3 9.9 3 6.4a5 5 0 0 1 10 0c0 3.5-5 7.8-5 7.8Z" />
      <circle cx="8" cy="6.4" r="1.8" />
    </svg>
  );
}
