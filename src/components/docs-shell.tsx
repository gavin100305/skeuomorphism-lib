"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "./ui/sidebar";
import { useThemeToggle } from "./use-theme-toggle";

const groups = [
  { title: "Getting started", items: ["Introduction", "Installation", "Theming", "Accessibility"] },
  { title: "Actions", items: ["Button", "Switch"] },
  { title: "Forms", items: ["Input", "Textarea", "Checkbox", "Slider"] },
  { title: "Surfaces", items: ["Card", "Dialog"] },
  { title: "Navigation", items: ["Tabs", "Tooltip"] },
];

function SidebarNavigation({ selected, onSelect, query, onQueryChange }: { selected: string; onSelect: (item: string) => void; query: string; onQueryChange: (query: string) => void }) {
  const { closeMobile } = useSidebar();
  const normalized = query.trim().toLowerCase();
  const filtered = groups.map(group => ({ ...group, items: group.items.filter(item => item.toLowerCase().includes(normalized) || group.title.toLowerCase().includes(normalized)) })).filter(group => group.items.length > 0);
  return <>
    <label className="docs-sidebar-search"><Icon name="search" size={15} /><input type="search" placeholder="Find a component…" aria-label="Filter documentation navigation" value={query} onChange={e => onQueryChange(e.target.value)} onKeyDown={e => { if (e.key === "Escape" && query) { e.preventDefault(); e.stopPropagation(); onQueryChange(""); } }} /><kbd>⌘ K</kbd></label>
    <nav className="docs-navigation" aria-label="Documentation sections">
      {filtered.length === 0 ? <p className="docs-search-empty" role="status">No matches for “{query}”.</p> : filtered.map(group => <section className="docs-nav-group" key={group.title}><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item}><button type="button" aria-current={selected === item ? "true" : undefined} onClick={() => { onSelect(item); closeMobile(); }}>{item}{selected === item && <span className="docs-selected-mark" aria-hidden="true"><Icon name="chevron" size={13} /></span>}</button></li>)}</ul></section>)}
    </nav>
    <div className="docs-sidebar-footer"><span>Documentation preview</span><a href="https://github.com/gavin100305/skeumorphism-lib" target="_blank" rel="noreferrer" aria-label="Open GitHub repository"><Icon name="github" size={16} /></a></div>
  </>;
}

function Workspace({ selected }: { selected: string }) {
  return <main id="docs-workspace" className="docs-workspace">
    <div id="overview" className="docs-workspace-heading"><div><span className="docs-kicker">DOCUMENTATION</span><h1>{selected}</h1><p>Sidebar and documentation layout preview.</p></div><span className="docs-preview-badge">Layout only</span></div>
    <div id="workspace" className="docs-empty-workspace"><div className="docs-workspace-message"><Icon name="layers" size={28} /><h2>Space for the documentation.</h2><p>The navigation and page layout are ready. Component documentation will be added here next.</p></div></div>
  </main>;
}

const pageSections = [
  { id: "overview", label: "Overview" },
  { id: "workspace", label: "Workspace" },
];
function PageContents() {
  const [active, setActive] = useState("overview");
  const list = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ top: 0, height: 32 });
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      let current = pageSections[0].id;
      for (const section of pageSections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= Math.min(180, window.innerHeight * .3)) current = section.id;
      }
      setActive(current);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update(); window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const item = list.current?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (item) setIndicator({ top: item.offsetTop, height: item.offsetHeight });
  }, [active]);
  return <aside className="docs-page-contents" aria-label="Page contents">
    <div className="docs-toc-heading"><Icon name="align" size={15} /><span>On this page</span></div>
    <nav aria-label="On this page" className="docs-toc-nav"><div className="docs-toc-track"><span className="docs-toc-indicator" aria-hidden="true" style={{ transform: `translateY(${indicator.top}px)`, height: indicator.height }} /><ul ref={list} className="docs-toc-list">{pageSections.map(section => <li key={section.id} data-section={section.id}><a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} onClick={() => setActive(section.id)}>{section.label}</a></li>)}</ul></div></nav>
    <a className="docs-toc-source" href="https://github.com/gavin100305/skeumorphism-lib" target="_blank" rel="noreferrer"><Icon name="github" size={13} /> View project <Icon name="diagonal" size={11} /></a>
  </aside>;
}

function DocsHeader() {
  const toggleTheme = useThemeToggle();
  return <header className="docs-header"><div className="docs-header-left"><span className="docs-mobile-trigger"><SidebarTrigger /></span><Link href="/" className="docs-header-brand"><Icon name="layers" size={23} /><span>skeumorphism.</span></Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/docs" aria-current="page">Docs</Link><Link href="/#components">Components</Link><Link href="/#blocks">Blocks</Link></nav></div><div className="docs-toolbar-actions"><a className="docs-github-link" href="https://github.com/gavin100305/skeumorphism-lib" target="_blank" rel="noreferrer" aria-label="GitHub repository"><Icon name="github" size={18} /></a><button className="docs-theme-toggle" type="button" aria-label="Toggle color theme" onPointerDown={e => { if (e.button === 0) void toggleTheme(); }} onClick={e => { if (e.detail === 0) void toggleTheme(); }}><span className="theme-sun"><Icon name="sun" size={17} /></span><span className="theme-moon"><Icon name="moon" size={17} /></span></button></div></header>;
}

export default function DocsShell() {
  const [selected, setSelected] = useState("Introduction");
  const [query, setQuery] = useState("");
  return <><a className="skip-link" href="#docs-workspace">Skip to content</a><SidebarProvider className="docs-shell docs-reference-layout" collapsible={false} width={240}><DocsHeader /><Sidebar><SidebarNavigation selected={selected} onSelect={setSelected} query={query} onQueryChange={setQuery} /></Sidebar><SidebarInset><div className="docs-reading-layout"><Workspace selected={selected} /><PageContents /></div></SidebarInset></SidebarProvider></>;
}
