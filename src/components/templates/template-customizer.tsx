"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { TemplateMode, TemplatePalette } from "./theme-presets";
import { themePresets } from "./theme-presets";
import { SkeuoThemeButton } from "@/components/skeuomorphic/skeuo-theme-button";

export function TemplateCustomizer({
  palette,
  mode,
  onPaletteChange,
  onModeChange,
  onReset,
}: {
  palette: TemplatePalette;
  mode: TemplateMode;
  onPaletteChange: (value: TemplatePalette) => void;
  onModeChange: (value: TemplateMode) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div ref={panelRef} className={`tpl-customizer ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="tpl-customizer-trigger"
        aria-label="Customize template"
        aria-expanded={open}
        aria-controls="tpl-customizer-panel"
        onClick={() => setOpen(!open)}
      >
        <span className="tpl-customizer-trigger-art" aria-hidden="true"><i /><i /><i /></span>
        <span>Customize</span>
        <span aria-hidden="true">{open ? "×" : "+"}</span>
      </button>
      <div id="tpl-customizer-panel" className="tpl-customizer-panel" hidden={!open}>
        <div className="tpl-customizer-heading">
          <div>
            <span>MAKE IT YOURS</span>
            <h2>Choose a world.</h2>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close customization">×</button>
        </div>
        <p>Each palette changes the canvas, surfaces, wells, typography, and accents together.</p>
        <div className="tpl-customizer-palettes" role="group" aria-label="Color palette">
          {(Object.keys(themePresets) as TemplatePalette[]).map((key) => {
            const preset = themePresets[key];
            const colors = preset[mode];
            return (
              <button
                key={key}
                type="button"
                className="tpl-palette-option"
                aria-pressed={palette === key}
                onClick={() => onPaletteChange(key)}
              >
                <span
                  className="tpl-palette-specimen"
                  style={{ background: colors.background, borderColor: colors.line }}
                  aria-hidden="true"
                >
                  <i style={{ background: colors.panel, borderColor: colors.line }} />
                  <i style={{ background: colors.accent }} />
                  <i style={{ background: colors.secondary }} />
                </span>
                <span className="tpl-palette-copy"><strong>{preset.name}</strong><small>{preset.description}</small></span>
                <span className="tpl-palette-check" aria-hidden="true">{palette === key ? "✓" : ""}</span>
              </button>
            );
          })}
        </div>
        <div className="tpl-customizer-mode">
          <span>APPEARANCE</span>
          <div className="tpl-customizer-mode-control"><span>{mode === "light" ? "Light mode" : "Dark mode"}</span><SkeuoThemeButton theme={mode} onThemeChange={onModeChange} variant="round" /></div>
        </div>
        <div className="tpl-customizer-footer">
          <button type="button" onClick={onReset}>Reset this template</button>
          <Link href="/templates">All templates ↗</Link>
        </div>
      </div>
    </div>
  );
}
