"use client";

import { useEffect } from "react";

import { runThemeTransition } from "./skeuomorphic/templates/theme-transition";

export function useThemeToggle() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function sync() {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("skeuomorphism-theme");
      } catch {}
      const next =
        stored === "dark" || stored === "light"
          ? stored === "dark"
          : media.matches;
      document.documentElement.dataset.theme = next ? "dark" : "light";
    }
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return async function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "dark";
    function apply() {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      try {
        localStorage.setItem("skeuomorphism-theme", next ? "dark" : "light");
      } catch {}
    }
    await runThemeTransition(apply);
  };
}
