"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TemplateEntry } from "@/data/templates";
import { TemplateCustomizer } from "./template-customizer";
import { DashboardShell } from "./dashboard-shell";
import { DashboardOverview } from "./dashboard-pages";
import type { DashboardLanguage } from "./dashboard-shell";
import { DaymarkLanding, ReelLanding, StillroomLanding } from "./landing-pages";
import { themePresets, themeStyle } from "./theme-presets";
import type { TemplateMode, TemplatePalette } from "./theme-presets";
import "./templates.css";
import "./refined.css";

export function TemplatePreview({ item }: { item: TemplateEntry }) {
  const initialPalette = item.accent as TemplatePalette;
  const initialMode: TemplateMode = ["daymark", "reel", "signal"].includes(item.slug) ? "dark" : "light";
  const [palette, setPalette] = useState<TemplatePalette>(initialPalette);
  const [mode, setMode] = useState<TemplateMode>(initialMode);
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("overview");
  const [language, setLanguage] = useState<DashboardLanguage>("en");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const saved = JSON.parse(localStorage.getItem(`skeuo-template-${item.slug}`) ?? "null");
        setPalette(saved?.palette in themePresets ? saved.palette : initialPalette);
        setMode(saved?.mode === "dark" || saved?.mode === "light" ? saved.mode : initialMode);
        setLanguage(saved?.language === "hi" ? "hi" : "en");
        setCompact(saved?.compact === true);
      } catch {
        setPalette(initialPalette);
        setMode(initialMode);
      }
      setReady(true);
    });
    return () => { cancelled = true; };
  }, [item.slug, initialPalette, initialMode]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(`skeuo-template-${item.slug}`, JSON.stringify({ palette, mode, language, compact }));
    } catch {
      // The live preview still works when storage is unavailable.
    }
  }, [item.slug, mode, palette, language, compact, ready]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previous = {
      root: root.style.backgroundColor,
      body: body.style.backgroundColor,
      colorScheme: root.style.colorScheme,
    };
    const background = themePresets[palette][mode].background;
    root.style.backgroundColor = background;
    body.style.backgroundColor = background;
    root.style.colorScheme = mode;
    return () => {
      root.style.backgroundColor = previous.root;
      body.style.backgroundColor = previous.body;
      root.style.colorScheme = previous.colorScheme;
    };
  }, [palette, mode]);

  function resetTheme() {
    setPalette(initialPalette);
    setMode(initialMode);
  }

  return (
    <div className={`template-preview template-preview-${item.slug}`} data-theme={mode} data-palette={palette} style={themeStyle(palette, mode)}>
      <a className="tpl-skip" href="#template-content">Skip to template content</a>
      <TemplateCustomizer palette={palette} mode={mode} onPaletteChange={setPalette} onModeChange={setMode} onReset={resetTheme} />
      <div id="template-content">
        {item.kind === "landing" ? (
          item.slug === "daymark" ? <DaymarkLanding palette={palette} mode={mode} /> : item.slug === "reel" ? <ReelLanding palette={palette} mode={mode} /> : <StillroomLanding palette={palette} mode={mode} />
        ) : (
          <DashboardShell name={item.slug} compact={compact} setCompact={setCompact} active={active} setActive={setActive} language={language} setLanguage={setLanguage} mode={mode} setMode={setMode}>
            <main className="tpl-dash-main">
              <DashboardOverview name={item.slug} language={language} />
              <footer className="tpl-dash-footer">
                <span>{language === "hi" ? `${item.name} एक कल्पित डैशबोर्ड है। सभी आँकड़े उदाहरण हैं।` : `${item.name} is a hypothetical dashboard. All values are illustrative.`}</span>
                <Link href="/templates">{language === "hi" ? "टेम्पलेट देखें" : "Browse templates"} ↗</Link>
              </footer>
            </main>
          </DashboardShell>
        )}
      </div>
    </div>
  );
}
