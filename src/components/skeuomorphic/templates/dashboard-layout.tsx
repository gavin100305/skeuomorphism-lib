"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SkeuoThemeButton } from "../skeuo-theme-button";
import { Brand, Glyph } from "./template-ui";
import type { TemplateState } from "./template-frame";

const menus = {
  activity: [
    {
      group: "Your workspace",
      hi: "आपका कार्यस्थल",
      items: [
        ["overview", "home", "Overview", "अवलोकन"],
        ["rhythm", "chart", "Activity", "गतिविधि"],
        ["applications", "grid", "Applications", "ऐप्स"],
        ["focus", "clock", "Focus", "फ़ोकस"],
      ],
    },
  ],
  workspace: [
    {
      group: "Workspace",
      hi: "कार्यस्थल",
      items: [
        ["overview", "home", "Overview", "अवलोकन"],
        ["revenue", "chart", "Analytics", "विश्लेषण"],
        ["orders", "note", "Orders", "ऑर्डर"],
      ],
    },
    {
      group: "Team",
      hi: "टीम",
      items: [
        ["projects", "folder", "Projects", "प्रोजेक्ट"],
        ["team", "people", "Members", "सदस्य"],
      ],
    },
  ],
};

export function DashboardLayout({
  variant,
  state,
  controls,
  children,
  templatesHref = "#",
  soundControl,
}: {
  variant: "activity" | "workspace";
  state: TemplateState;
  controls: ReactNode;
  children: ReactNode;
  templatesHref?: string;
  soundControl?: ReactNode;
}) {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("overview");
  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState(false);
  const [projects, setProjects] = useState(false);
  const sidebar = useRef<HTMLElement>(null);
  const profileButton = useRef<HTMLButtonElement>(null);
  const { language, setLanguage, mode, setMode } = state;
  const hi = language === "hi";
  const name = variant === "activity" ? "daymark" : "formwork";
  useEffect(() => {
    if (!mobile) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sidebar.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobile(false);
        setProfile(false);
      }
      if (event.key !== "Tab") return;
      const nodes = Array.from(
        sidebar.current?.querySelectorAll<HTMLElement>(
          "a[href],button:not(:disabled),input,select",
        ) ?? [],
      ).filter((x) => x.getClientRects().length);
      if (!nodes.length) return;
      if (event.shiftKey && document.activeElement === nodes[0]) {
        event.preventDefault();
        nodes.at(-1)?.focus();
      }
      if (!event.shiftKey && document.activeElement === nodes.at(-1)) {
        event.preventDefault();
        nodes[0]?.focus();
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [mobile]);
  useEffect(() => {
    if (!profile) return;
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfile(false);
        profileButton.current?.focus();
      }
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [profile]);
  function close() {
    setMobile(false);
    setProfile(false);
  }

  return (
    <div
      className={`sk-t-dashboard sk-t-dashboard-${variant} ${compact ? "is-compact" : ""} ${mobile ? "is-mobile-open" : ""}`}
      lang={language}
    >
      {mobile && (
        <button
          className="sk-t-scrim"
          type="button"
          onClick={close}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className="sk-t-sidebar"
        ref={sidebar}
        role={mobile ? "dialog" : undefined}
        aria-modal={mobile || undefined}
        aria-label={hi ? "कार्यस्थल नेविगेशन" : "Workspace navigation"}
      >
        <div className="sk-t-sidebar-heading">
          <a href="#overview" onClick={close} aria-label={`${name} overview`}>
            <Brand name={name} compact={compact && !mobile} />
          </a>
          <button
            type="button"
            className="sk-t-icon-button"
            aria-label={
              mobile
                ? "Close sidebar"
                : compact
                  ? "Expand sidebar"
                  : "Collapse sidebar"
            }
            onClick={() => {
              if (mobile) close();
              else {
                setCompact(!compact);
                setProfile(false);
              }
            }}
          >
            <Glyph name={mobile ? "close" : "collapse"} />
          </button>
        </div>
        {variant === "workspace" && (
          <div className="sk-t-workspace-switch">
            <span className="sk-t-square-avatar">N</span>
            <div className="sk-t-sidebar-label">
              <strong>North studio</strong>
              <small>{hi ? "टीम कार्यस्थल" : "Team workspace"}</small>
            </div>
          </div>
        )}
        <nav className="sk-t-sidebar-nav" aria-label="Dashboard sections">
          {menus[variant].map((group) => (
            <div className="sk-t-nav-group" key={group.group}>
              <p className="sk-t-sidebar-label">
                {hi ? group.hi : group.group}
              </p>
              {group.items.map(([id, icon, label, hindi]) => (
                <a
                  href={`#${id}`}
                  key={id}
                  title={hi ? hindi : label}
                  aria-current={active === id ? "location" : undefined}
                  onClick={() => {
                    setActive(id);
                    close();
                  }}
                >
                  <Glyph name={icon} />
                  <span className="sk-t-sidebar-label">
                    {hi ? hindi : label}
                  </span>
                  {id === "orders" && (
                    <small className="sk-t-sidebar-label">5</small>
                  )}
                </a>
              ))}
            </div>
          ))}
        </nav>
        {variant === "workspace" && (
          <div className="sk-t-pinned-projects">
            <button
              type="button"
              aria-label={hi ? "पिन किए प्रोजेक्ट" : "Pinned projects"}
              aria-expanded={projects}
              onClick={() => {
                if (compact) setCompact(false);
                setProjects(!projects);
              }}
            >
              <Glyph name="folder" />
              <span className="sk-t-sidebar-label">
                {hi ? "पिन किए प्रोजेक्ट" : "Pinned projects"}
              </span>
              <span className="sk-t-sidebar-label">{projects ? "−" : "+"}</span>
            </button>
            {projects && (
              <div className="sk-t-sidebar-label">
                <a href="#projects" onClick={close}>
                  Website refresh
                </a>
                <a href="#projects" onClick={close}>
                  Autumn collection
                </a>
              </div>
            )}
          </div>
        )}
        <div className="sk-t-sidebar-bottom">
          <a className="sk-t-sidebar-help" href={templatesHref}>
            <Glyph name="grid" />
            <span className="sk-t-sidebar-label">
              {hi ? "सभी टेम्पलेट" : "Template collection"}
            </span>
          </a>
          {profile && (
            <div id="sk-t-profile-panel" className="sk-t-profile-panel">
              <strong>{hi ? "आपकी पसंद" : "Your preferences"}</strong>
              <label>
                {hi ? "भाषा" : "Language"}
                <select
                  aria-label={hi ? "भाषा" : "Language"}
                  value={language}
                  onChange={(event) =>
                    setLanguage(event.target.value as "en" | "hi")
                  }
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </label>
              <div>
                <span>{hi ? "रूप" : "Appearance"}</span>
                <SkeuoThemeButton
                  theme={mode}
                  onThemeChange={setMode}
                  variant="round"
                />
              </div>
              {soundControl && (
                <div>
                  <span>{hi ? "इंटरफ़ेस ध्वनि" : "Interface sounds"}</span>
                  {soundControl}
                </div>
              )}
            </div>
          )}
          <button
            ref={profileButton}
            type="button"
            className="sk-t-profile-button"
            aria-expanded={profile}
            aria-controls="sk-t-profile-panel"
            aria-label="Open profile and preferences"
            onClick={() => {
              setCompact(false);
              setProfile(!profile);
            }}
          >
            <span className="sk-t-avatar">JD</span>
            <span className="sk-t-sidebar-label">
              <strong>Jamie Demo</strong>
              <small>
                {hi ? "प्रोफ़ाइल और पसंद" : "Profile & preferences"}
              </small>
            </span>
            <span className="sk-t-sidebar-label">{profile ? "⌄" : "⌃"}</span>
          </button>
        </div>
      </aside>
      <div className="sk-t-workspace-body">
        <header className="sk-t-topbar">
          <div className="sk-t-topbar-heading">
            <button
              className="sk-t-mobile-trigger sk-t-icon-button"
              type="button"
              aria-label="Open sidebar"
              onClick={() => setMobile(true)}
            >
              <Glyph name="menu" />
            </button>
            <div>
              <span>{hi ? "आपका कार्यस्थल" : "Your workspace"}</span>
              <strong>
                {menus[variant]
                  .flatMap((x) => x.items)
                  .find((x) => x[0] === active)?.[hi ? 3 : 2] ??
                  (hi ? "अवलोकन" : "Overview")}
              </strong>
            </div>
          </div>
          <div className="sk-t-topbar-controls">
            {controls}
            <SkeuoThemeButton
              theme={mode}
              onThemeChange={setMode}
              variant="round"
            />
          </div>
        </header>
        <main id="sk-template-main" className="sk-t-dashboard-content">
          {children}
          <footer className="sk-t-dashboard-footer">
            <span>
              {hi
                ? "उदाहरण डेटा वाला टेम्पलेट।"
                : "Template preview, with sample data."}
            </span>
            <a href={templatesHref}>
              {hi ? "सभी टेम्पलेट" : "All templates"}
              <Glyph name="arrow" size={14} />
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
