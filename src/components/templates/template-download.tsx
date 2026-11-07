"use client";

import { useRef, useState } from "react";
import { templates, type TemplateEntry } from "@/data/templates";
import {
  themePresets,
  type TemplatePalette,
  type TemplateMode,
} from "@/components/skeuomorphic/templates/theme-presets";
import { InstallCommand } from "./install-command";
import { SkeuoThemeButton } from "@/components/skeuomorphic/skeuo-theme-button";
import "./template-download.css";

type Props = {
  item?: TemplateEntry;
  palette?: TemplatePalette;
  mode?: TemplateMode;
  onPaletteChange?: (value: TemplatePalette) => void;
  onModeChange?: (value: TemplateMode) => void;
};
export function TemplateDownload({
  item,
  palette,
  mode,
  onPaletteChange,
  onModeChange,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(
    item?.registry ?? templates[0].registry,
  );
  const [framework, setFramework] = useState("next");
  const [tab, setTab] = useState("new");
  const [color, setColor] = useState<TemplatePalette>(
    (item?.accent as TemplatePalette) ?? "ember",
  );
  const [appearance, setAppearance] = useState<TemplateMode>("dark");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const active = item ?? templates.find((t) => t.registry === selected)!;
  const currentPalette = palette ?? color;
  const currentMode = mode ?? appearance;
  const changePalette = (v: TemplatePalette) => {
    setColor(v);
    onPaletteChange?.(v);
  };
  const changeMode = (v: TemplateMode) => {
    setAppearance(v);
    onModeChange?.(v);
  };
  async function download() {
    setBusy(true);
    setError("");
    try {
      const query = new URLSearchParams({
        template: active.registry,
        framework,
        palette: currentPalette,
        mode: currentMode,
      });
      const response = await fetch(`/api/templates/download?${query}`);
      if (!response.ok)
        throw new Error(
          "The download could not be prepared. Please try again.",
        );
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = `${active.name.toLowerCase()}-${framework}.zip`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Download failed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="template-download" data-theme={mode}>
      {item && (
        <label className="template-top-palette">
          <span>Theme</span>
          <select
            aria-label="Template color theme"
            value={currentPalette}
            onChange={(e) => changePalette(e.target.value as TemplatePalette)}
          >
            {Object.entries(themePresets).map(([key, p]) => (
              <option key={key} value={key}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <button
        className="template-download-trigger"
        onClick={() => {
          setError("");
          if (!mode)
            setAppearance(
              document.documentElement.dataset.theme === "dark"
                ? "dark"
                : "light",
            );
          dialog.current?.showModal();
        }}
      >
        Download template <span aria-hidden="true">↓</span>
      </button>
      <dialog
        ref={dialog}
        className="template-download-dialog"
        aria-labelledby="template-download-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="template-download-sheet">
          <header>
            <h2 id="template-download-title">Make it yours.</h2>
            <button
              aria-label="Close download options"
              onClick={() => dialog.current?.close()}
            >
              ×
            </button>
          </header>
          <div
            className="template-download-tabs"
            role="group"
            aria-label="Setup options"
          >
            {[
              ["new", "New Project"],
              ["theme", "Theme"],
            ].map(([key, label]) => (
              <button
                key={key}
                aria-pressed={tab === key}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="template-download-body">
            {!item && (
              <label className="template-download-label">
                Template
                <select
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    const entry = templates.find(
                      (t) => t.registry === e.target.value,
                    )!;
                    setColor(entry.accent as TemplatePalette);
                  }}
                >
                  {templates.map((t) => (
                    <option value={t.registry} key={t.registry}>
                      {t.name} · {t.category}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {tab === "new" && (
              <>
                <fieldset>
                  <legend>Framework</legend>
                  <div className="template-frameworks">
                    {[
                      ["next", "Next.js", "App Router"],
                      ["react", "React", "Vite + TypeScript"],
                      ["astro", "Astro", "React integration"],
                    ].map(([key, label, detail]) => (
                      <button
                        key={key}
                        aria-pressed={framework === key}
                        onClick={() => setFramework(key)}
                      >
                        <strong>{label}</strong>
                        <small>{detail}</small>
                        <span aria-hidden="true">
                          {framework === key ? "✓" : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <p className="template-download-hint">
                  A complete starter with source files, sample data, and your
                  selected theme. Extract it, then run <code>npm install</code>{" "}
                  and <code>npm run dev</code>.
                </p>
              </>
            )}
            {tab === "theme" && (
              <>
                <fieldset>
                  <legend>Color theme</legend>
                  <div className="template-download-colors">
                    {Object.entries(themePresets).map(([key, p]) => (
                      <button
                        key={key}
                        aria-pressed={currentPalette === key}
                        onClick={() => changePalette(key as TemplatePalette)}
                      >
                        <span style={{ background: p[currentMode].background }}>
                          <i style={{ background: p[currentMode].panel }} />
                          <i style={{ background: p[currentMode].accent }} />
                        </span>
                        {p.name}
                        <b aria-hidden="true">
                          {currentPalette === key ? "✓" : ""}
                        </b>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Appearance</legend>
                  <div className="template-download-appearance">
                    <span>
                      {currentMode === "light" ? "Light mode" : "Dark mode"}
                    </span>
                    <SkeuoThemeButton
                      theme={currentMode}
                      onThemeChange={changeMode}
                      variant="round"
                    />
                  </div>
                </fieldset>
              </>
            )}
            <div className="template-dialog-cli">
              <p>Install the component source</p>
              <span>
                Run in your initialized project. Astro requires React
                integration. Theme defaults are set with component props.
              </span>
              <InstallCommand
                key={active.registry}
                name={active.registry}
                packageManagers
              />
            </div>
          </div>
          <footer>
            <span>
              {active.name} / {themePresets[currentPalette].name} /{" "}
              {currentMode}
            </span>
            {error && <p role="alert">{error}</p>}
            <button disabled={busy} onClick={download}>
              {busy
                ? "Preparing…"
                : `Download ${framework === "next" ? "Next.js" : framework === "react" ? "React" : "Astro"} starter`}
            </button>
          </footer>
        </div>
      </dialog>
    </div>
  );
}
