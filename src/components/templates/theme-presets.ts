import type { CSSProperties } from "react";

export type TemplatePalette = "ember" | "cobalt" | "sage";
export type TemplateMode = "light" | "dark";

type Colorway = {
  background: string;
  panel: string;
  raised: string;
  well: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentInk: string;
  atmosphere: string;
  secondary: string;
  shadow: string;
  highlight: string;
};

export const themePresets: Record<TemplatePalette, { name: string; description: string; light: Colorway; dark: Colorway }> = {
  ember: {
    name: "Ember",
    description: "Smoked ink, warm paper, fired clay",
    light: { background: "#f5efe6", panel: "#e9ddce", raised: "#fffaf2", well: "#ded0be", ink: "#252019", muted: "#6c6258", line: "#cdbba7", accent: "#9c4828", accentInk: "#fffaf5", atmosphere: "#e9a475", secondary: "#899a7d", shadow: "#50351e26", highlight: "#ffffffd9" },
    dark: { background: "#151a16", panel: "#222a23", raised: "#30382e", well: "#0f1510", ink: "#f7f2e8", muted: "#b1b4a7", line: "#3b483d", accent: "#f18b5d", accentInk: "#24160f", atmosphere: "#ad533a", secondary: "#91a487", shadow: "#000000a1", highlight: "#ffffff24" },
  },
  cobalt: {
    name: "Cobalt",
    description: "Midnight blue, frost, electric glass",
    light: { background: "#eaf1f5", panel: "#d9e7ee", raised: "#fbfdff", well: "#c9dbe7", ink: "#142939", muted: "#536d7c", line: "#aec5d4", accent: "#2a5d9b", accentInk: "#ffffff", atmosphere: "#81aee0", secondary: "#768ea9", shadow: "#17364a25", highlight: "#ffffffec" },
    dark: { background: "#0b1423", panel: "#17253c", raised: "#253754", well: "#091120", ink: "#f2f6ff", muted: "#adbed6", line: "#3c5270", accent: "#97bdff", accentInk: "#102441", atmosphere: "#4879bb", secondary: "#b0c5df", shadow: "#000000a3", highlight: "#ffffff29" },
  },
  sage: {
    name: "Sage",
    description: "Mineral ivory, soft moss, deep green",
    light: { background: "#f0f2e9", panel: "#dfe8da", raised: "#fbfcf6", well: "#d0dece", ink: "#1e3225", muted: "#596f5d", line: "#b9cbb8", accent: "#487653", accentInk: "#ffffff", atmosphere: "#a7bda0", secondary: "#b19b7d", shadow: "#25402b22", highlight: "#ffffffed" },
    dark: { background: "#101c17", panel: "#1e3126", raised: "#2b4031", well: "#0c1710", ink: "#f1f5e9", muted: "#a8bba9", line: "#3b5743", accent: "#b4d0a1", accentInk: "#142719", atmosphere: "#668c69", secondary: "#d0b796", shadow: "#0000009e", highlight: "#ffffff25" },
  },
};

export function themeStyle(palette: TemplatePalette, mode: TemplateMode): CSSProperties {
  const colors = themePresets[palette][mode];
  return {
    "--tpl-bg": colors.background,
    "--tpl-panel": colors.panel,
    "--tpl-raised": colors.raised,
    "--tpl-well": colors.well,
    "--tpl-ink": colors.ink,
    "--tpl-muted": colors.muted,
    "--tpl-line": colors.line,
    "--tpl-accent": colors.accent,
    "--tpl-accent-ink": colors.accentInk,
    "--tpl-atmosphere": colors.atmosphere,
    "--tpl-secondary": colors.secondary,
    "--tpl-shadow": colors.shadow,
    "--tpl-highlight": colors.highlight,
    "--background": colors.background,
    "--foreground": colors.ink,
    "--card": colors.panel,
    "--card-foreground": colors.ink,
    "--secondary": colors.raised,
    "--secondary-foreground": colors.ink,
    "--muted": colors.well,
    "--muted-foreground": colors.muted,
    "--border": colors.line,
    "--input": colors.line,
    "--primary": colors.accent,
    "--primary-foreground": colors.accentInk,
    "--ring": colors.accent,
    "--sk-bg": colors.background,
    "--sk-ink": colors.ink,
    "--sk-muted": colors.muted,
    "--sk-surface": colors.panel,
    "--sk-well": colors.well,
    "--sk-highlight": colors.highlight,
    "--sk-shadow": colors.shadow,
    "--sk-key": colors.raised,
    "--sk-key-edge": colors.line,
    "--sk-key-base": colors.well,
    "--sk-ring": colors.accent,
  } as CSSProperties;
}
