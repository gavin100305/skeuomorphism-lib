// The host supplies the theme change and transition CSS. Components stay controlled.
let changing = false;
export async function runThemeTransition(apply: () => void) {
  if (changing) return;
  if (
    typeof document === "undefined" ||
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply();
    return;
  }
  changing = true;
  try {
    await document.startViewTransition(apply).finished;
  } catch {
    apply();
  } finally {
    changing = false;
  }
}
