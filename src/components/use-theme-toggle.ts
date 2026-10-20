"use client";

import { useEffect, useRef } from "react";

export function useThemeToggle() {
  const changing = useRef(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function sync() {
      let stored: string | null = null;
      try { stored = localStorage.getItem("skeuomorphism-theme"); } catch {}
      const next = stored === "dark" || stored === "light" ? stored === "dark" : media.matches;
      document.documentElement.dataset.theme = next ? "dark" : "light";
    }
    sync(); media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return async function toggleTheme() {
    if (changing.current) return;
    const next = document.documentElement.dataset.theme !== "dark";
    function apply() {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      try { localStorage.setItem("skeuomorphism-theme", next ? "dark" : "light"); } catch {}
    }
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }
    changing.current = true;
    try { await document.startViewTransition(apply).finished; }
    catch { apply(); }
    finally { changing.current = false; }
  };
}
