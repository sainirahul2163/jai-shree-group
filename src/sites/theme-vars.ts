import type { ThemeTokens } from "@/sites/types";

/**
 * CSS for a site's theme: the token variables plus the shadcn aliases that
 * globals.css sets to fixed hex values. Set on :root (not a wrapper element)
 * so portals (dialogs, selects, toasts) and the page background follow the
 * site too. Aliases written as var(--brand) in globals.css follow on their own.
 */
export function themeCss(theme: ThemeTokens): string {
  const vars: Record<string, string> = {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--surface": theme.surface,
    "--surface-2": theme.surface2,
    "--border": theme.border,
    "--text-secondary": theme.textSecondary,
    "--text-muted": theme.textMuted,
    "--brand": theme.brand,
    "--brand-hover": theme.brandHover,
    "--brand-foreground": theme.brandForeground,
    "--brand-text": theme.brandText,
    "--label-accent": theme.labelAccent ?? theme.brandText,
    "--card": theme.surface,
    "--card-foreground": theme.foreground,
    "--popover": theme.surface,
    "--popover-foreground": theme.foreground,
    "--secondary": theme.surface2,
    "--secondary-foreground": theme.foreground,
    "--muted": theme.surface2,
    "--muted-foreground": theme.textSecondary,
    "--accent": theme.surface2,
    "--accent-foreground": theme.foreground,
    "--input": theme.border,
  };
  const body = Object.entries(vars)
    .map(([name, value]) => `${name}:${value}`)
    .join(";");
  return `:root{${body}}`;
}
