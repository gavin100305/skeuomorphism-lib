"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { SkeuoThemeButton } from "@/components/skeuomorphic/skeuo-theme-button";
import { TemplateMark } from "./template-mark";
import type { TemplateMode } from "./theme-presets";

export type DashboardLanguage = "en" | "hi";

const navigation = {
  signal: [
    { id: "overview", icon: "◫", en: "Overview", hi: "अवलोकन" },
    { id: "signal-report", icon: "▥", en: "Performance", hi: "प्रदर्शन" },
    { id: "signal-sources", icon: "◉", en: "Sources", hi: "स्रोत" },
    { id: "signal-activity", icon: "◷", en: "Activity", hi: "गतिविधि" },
  ],
  ledger: [
    { id: "overview", icon: "▧", en: "Overview", hi: "अवलोकन" },
    { id: "ledger-spend", icon: "◉", en: "Spending", hi: "खर्च" },
    { id: "ledger-goals", icon: "▤", en: "Goals", hi: "लक्ष्य" },
    { id: "ledger-activity", icon: "◷", en: "Activity", hi: "गतिविधि" },
  ],
  orbit: [
    { id: "overview", icon: "✳", en: "Overview", hi: "अवलोकन" },
    { id: "orbit-board", icon: "▦", en: "Board", hi: "बोर्ड" },
    { id: "orbit-team", icon: "♧", en: "Team", hi: "टीम" },
    { id: "orbit-timeline", icon: "◷", en: "Timeline", hi: "समयरेखा" },
  ],
} as const;

const names: Record<string, { en: string; hi: string }> = {
  signal: { en: "Northstar studio", hi: "नॉर्थस्टार स्टूडियो" },
  ledger: { en: "Personal space", hi: "निजी स्थान" },
  orbit: { en: "Studio north", hi: "स्टूडियो नॉर्थ" },
};

export function DashboardShell({
  name,
  children,
  compact,
  setCompact,
  active,
  setActive,
  language,
  setLanguage,
  mode,
  setMode,
}: {
  name: string;
  children: ReactNode;
  compact: boolean;
  setCompact: (value: boolean) => void;
  active: string;
  setActive: (value: string) => void;
  language: DashboardLanguage;
  setLanguage: (value: DashboardLanguage) => void;
  mode: TemplateMode;
  setMode: (value: TemplateMode) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const items = navigation[name as keyof typeof navigation] ?? navigation.signal;
  const selected = items.find((item) => item.id === active) ?? items[0];

  useEffect(() => {
    if (!profileOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [profileOpen]);

  function navigate(id: string) {
    setActive(id);
    setMobileOpen(false);
    setProfileOpen(false);
    if (id === "overview") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div lang={language} className={`tpl-dashboard tpl-${name} ${compact ? "is-compact" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <aside className="tpl-dash-sidebar" aria-label={`${name} sidebar`}>
        <div className="tpl-sidebar-brand">
          <div className="tpl-sidebar-logo"><TemplateMark variant={name} /><strong className="tpl-sidebar-label">{name}<span>.</span></strong></div>
          <button
            type="button"
            onClick={() => {
              setProfileOpen(false);
              if (mobileOpen) setMobileOpen(false);
              else setCompact(!compact);
            }}
            aria-label={mobileOpen ? "Close sidebar" : compact ? "Expand sidebar" : "Collapse sidebar"}
            title={mobileOpen ? "Close sidebar" : compact ? "Expand sidebar" : "Collapse sidebar"}
          >{mobileOpen ? "×" : compact ? "→" : "←"}</button>
        </div>
        <div className="tpl-menu-caption tpl-sidebar-label">{language === "hi" ? "कार्यस्थल" : "WORKSPACE"}</div>
        <nav className="tpl-side-menu" aria-label={language === "hi" ? "कार्यस्थल अनुभाग" : "Workspace sections"}>
          {items.map((item) => <button type="button" key={item.id} aria-current={active === item.id ? "location" : undefined} aria-label={item[language]} title={item[language]} onClick={() => navigate(item.id)}><span aria-hidden="true">{item.icon}</span><span className="tpl-sidebar-label">{item[language]}</span></button>)}
        </nav>
        <div className="tpl-sidebar-bottom">
          <div className="tpl-workspace-name"><span className="tpl-workspace-avatar">{name[0].toUpperCase()}</span><span className="tpl-sidebar-label"><strong>{names[name]?.[language]}</strong><small>{language === "hi" ? "डेमो कार्यक्षेत्र" : "Demo workspace"}</small></span></div>
          <div className="tpl-profile-wrap">
            {profileOpen && <div id="tpl-profile-panel" className="tpl-profile-panel" aria-label={language === "hi" ? "प्रोफ़ाइल और पसंद" : "Profile and preferences"}>
              <div className="tpl-profile-panel-heading"><span className="tpl-profile-avatar">RD</span><div><strong>Riley Demo</strong><small>{language === "hi" ? "टेम्पलेट पूर्वावलोकन" : "Template preview"}</small></div></div>
              <div className="tpl-profile-setting"><span>{language === "hi" ? "भाषा" : "Language"}</span><div role="group" aria-label="Language"><button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button><button type="button" aria-pressed={language === "hi"} onClick={() => setLanguage("hi")}>हिन्दी</button></div></div>
              <div className="tpl-profile-setting"><span>{language === "hi" ? "रूप" : "Appearance"}</span><div className="tpl-profile-theme-control"><span>{language === "hi" ? (mode === "light" ? "उजला रूप" : "गहरा रूप") : `${mode === "light" ? "Light" : "Dark"} mode`}</span><SkeuoThemeButton theme={mode} onThemeChange={setMode} variant="round" /></div></div>
              <Link href="/templates">{language === "hi" ? "सभी टेम्पलेट" : "All templates"} ↗</Link>
            </div>}
            <button type="button" className="tpl-sidebar-profile" aria-expanded={profileOpen} onClick={() => { if (compact && !mobileOpen) setCompact(false); setProfileOpen(!profileOpen); }} aria-label={language === "hi" ? "प्रोफ़ाइल खोलें" : "Open profile and preferences"}><span>RD</span><span className="tpl-sidebar-label">Riley Demo <small>{language === "hi" ? "प्रोफ़ाइल और पसंद" : "Profile & preferences"}</small></span><span className="tpl-sidebar-label">{profileOpen ? "⌃" : "···"}</span></button>
          </div>
        </div>
      </aside>
      {mobileOpen && <button type="button" className="tpl-mobile-scrim" aria-label="Close navigation" onClick={() => { setMobileOpen(false); setProfileOpen(false); }} />}
      <div className="tpl-dash-workspace">
        <header className="tpl-dash-topbar">
          <div><button type="button" className="tpl-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open sidebar">☰</button><span className="tpl-topbar-crumb">{language === "hi" ? "कार्यस्थल" : "Workspace"}</span><span className="tpl-topbar-slash">/</span><strong>{selected[language]}</strong></div>
          <div className="tpl-topbar-actions"><span className="tpl-preview-label">{language === "hi" ? "कल्पित पूर्वावलोकन" : "CONCEPT PREVIEW"}</span><Link href="/templates" className="tpl-topbar-back">{language === "hi" ? "टेम्पलेट" : "Templates"} ↗</Link><span className="tpl-topbar-avatar" aria-hidden="true">RD</span></div>
        </header>
        {children}
      </div>
    </div>
  );
}
