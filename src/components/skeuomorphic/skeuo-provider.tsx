import type { CSSProperties, HTMLAttributes } from "react";
import "./styles/skeuo-base.css";
export type SkeuoSemanticToken = "--primary" | "--primary-foreground" | "--secondary" | "--secondary-foreground" | "--background" | "--foreground" | "--card" | "--card-foreground" | "--muted" | "--muted-foreground" | "--border" | "--input" | "--ring";
export type SkeuoStyle = CSSProperties & Partial<Record<SkeuoSemanticToken, string>> & { [token: `--sk-${string}`]: string | number | undefined };
const semanticAliases: Record<SkeuoSemanticToken, string[]> = {
  "--primary": ["--sk-accent"], "--primary-foreground": ["--sk-accent-ink"],
  "--secondary": ["--sk-secondary", "--sk-key"], "--secondary-foreground": ["--sk-secondary-ink"],
  "--background": ["--sk-bg"], "--foreground": ["--sk-ink"],
  "--card": ["--sk-surface", "--sk-album-paper"], "--card-foreground": ["--sk-card-ink", "--sk-album-ink"],
  "--muted": ["--sk-well"], "--muted-foreground": ["--sk-muted"],
  "--border": ["--sk-edge", "--sk-line", "--sk-key-edge", "--sk-album-edge"],
  "--input": ["--sk-input-edge"], "--ring": ["--sk-ring"],
};
export type SkeuoProviderProps = HTMLAttributes<HTMLDivElement> & {
  theme?: "light" | "dark";
  fontFamily?: string;
  monoFontFamily?: string;
  style?: SkeuoStyle;
};
/** Optional local overrides. Components also work directly with .dark/.light or data-theme. */
export function SkeuoProvider({ theme, fontFamily, monoFontFamily, style, children, ...props }: SkeuoProviderProps) {
  const fonts: SkeuoStyle = {};
  // Re-resolve scoped semantic overrides here: inherited CSS variables have
  // already been computed at their ancestor's scope.
  for (const token of Object.keys(semanticAliases) as SkeuoSemanticToken[]) {
    if (style?.[token] !== undefined) {
      for (const alias of semanticAliases[token]) fonts[alias as `--sk-${string}`] = `var(${token})`;
    }
  }
  const derived: Record<string, Record<string, string>> = {
    "--primary": { "--sk-accent-bright": "color-mix(in srgb,var(--sk-accent) 84%,white)", "--sk-accent-base": "color-mix(in srgb,var(--sk-accent) 65%,black)", "--sk-accent-edge": "color-mix(in srgb,var(--sk-accent) 78%,black)", "--sk-ring": "var(--ring,var(--sk-accent))" },
    "--secondary": { "--sk-secondary-raised": "color-mix(in srgb,var(--sk-secondary) 96%,white)", "--sk-secondary-base": "color-mix(in srgb,var(--sk-secondary) 83%,black)", "--sk-key-base": "color-mix(in srgb,var(--sk-key) 83%,black)" },
    "--card": { "--sk-base": "color-mix(in srgb,var(--sk-surface) 85%,black)", "--sk-surface-raised": "color-mix(in srgb,var(--sk-surface) 96%,white)", "--sk-album-base": "color-mix(in srgb,var(--sk-album-paper) 83%,black)" },
    "--border": { "--sk-input-edge": "var(--input,var(--sk-edge))" },
  };
  for (const token of Object.keys(derived)) {
    if (style?.[token as SkeuoSemanticToken] !== undefined) Object.assign(fonts, derived[token]);
  }
  // An explicit ring and all caller-supplied --sk-* values take precedence.
  if (style?.["--ring"] !== undefined) fonts["--sk-ring"] = "var(--ring)";
  if (fontFamily) fonts["--sk-font-sans"] = fontFamily;
  if (monoFontFamily) fonts["--sk-font-mono"] = monoFontFamily;
  return <div {...props} data-sk-root="" data-theme={theme} style={{ display:"contents", ...fonts, ...style }}>{children}</div>;
}
