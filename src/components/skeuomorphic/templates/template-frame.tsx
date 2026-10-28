"use client";

import { useEffect, useState, type ReactNode } from "react";
import { TemplateCustomizer } from "./template-customizer";
import {
  themePresets,
  themeStyle,
  type TemplateMode,
  type TemplatePalette,
} from "./theme-presets";
import "./template-system.css";

export type TemplateOptions = {
  initialPalette?: TemplatePalette;
  initialMode?: TemplateMode;
  templatesHref?: string;
  soundControl?: ReactNode;
  syncPageBackground?: boolean;
};

export type TemplateState = {
  palette: TemplatePalette;
  mode: TemplateMode;
  setMode: (mode: TemplateMode) => void;
  language: "en" | "hi";
  setLanguage: (language: "en" | "hi") => void;
};

export function TemplateFrame({
  id,
  initialPalette = "ember",
  initialMode = "dark",
  syncPageBackground = false,
  templatesHref,
  children,
}: TemplateOptions & {
  id: string;
  children: (state: TemplateState) => ReactNode;
}) {
  const [palette, setPalette] = useState(initialPalette);
  const [mode, setMode] = useState(initialMode);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const saved = JSON.parse(
          localStorage.getItem(`skeuo-template-v3-${id}`) ?? "null",
        );
        if (saved?.palette && saved.palette in themePresets)
          setPalette(saved.palette);
        if (saved?.mode === "light" || saved?.mode === "dark")
          setMode(saved.mode);
        if (saved?.language === "hi") setLanguage("hi");
      } catch {
        /* Storage is optional for the preview. */
      }
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, [id]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        `skeuo-template-v3-${id}`,
        JSON.stringify({ palette, mode, language }),
      );
    } catch {
      /* Private browsing can disable persistence. */
    }
  }, [id, palette, mode, language, ready]);
  useEffect(() => {
    if (!syncPageBackground) return;
    const html = document.documentElement;
    const body = document.body;
    const previous = [
      html.style.backgroundColor,
      body.style.backgroundColor,
      html.style.colorScheme,
    ];
    html.style.backgroundColor = body.style.backgroundColor =
      themePresets[palette][mode].background;
    html.style.colorScheme = mode;
    return () => {
      [
        html.style.backgroundColor,
        body.style.backgroundColor,
        html.style.colorScheme,
      ] = previous;
    };
  }, [palette, mode, syncPageBackground]);

  return (
    <div
      className={`sk-template sk-template-${id}`}
      data-sk-root=""
      data-theme={mode}
      data-palette={palette}
      style={themeStyle(palette, mode)}
    >
      <a className="sk-t-skip" href="#sk-template-main">
        Skip to content
      </a>
      <TemplateCustomizer
        templatesHref={templatesHref}
        palette={palette}
        mode={mode}
        onPaletteChange={setPalette}
        onModeChange={setMode}
        onReset={() => {
          setPalette(initialPalette);
          setMode(initialMode);
        }}
      />
      {children({ palette, mode, setMode, language, setLanguage })}
    </div>
  );
}
