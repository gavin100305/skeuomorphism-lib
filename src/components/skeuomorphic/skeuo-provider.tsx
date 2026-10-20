import type { CSSProperties, HTMLAttributes } from "react";
import "./styles/skeuo-base.css";
export type SkeuoStyle = CSSProperties & { [token: `--sk-${string}`]: string | number | undefined };
export type SkeuoProviderProps = HTMLAttributes<HTMLDivElement> & {
  theme?: "light" | "dark";
  fontFamily?: string;
  monoFontFamily?: string;
  style?: SkeuoStyle;
};
/** Optional local overrides. Components also work directly with .dark/.light or data-theme. */
export function SkeuoProvider({ theme, fontFamily, monoFontFamily, style, children, ...props }: SkeuoProviderProps) {
  const fonts: SkeuoStyle = {};
  if (fontFamily) fonts["--sk-font-sans"] = fontFamily;
  if (monoFontFamily) fonts["--sk-font-mono"] = monoFontFamily;
  return <div {...props} data-sk-root="" data-theme={theme} style={{ display:"contents", ...fonts, ...style }}>{children}</div>;
}
