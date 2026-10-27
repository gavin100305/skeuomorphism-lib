"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { components, componentSections } from "@/data/components";
import { SoundToggle } from "./button-sound-effects";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "./ui/sidebar";
import { useThemeToggle } from "./use-theme-toggle";

const groupNames = ["Getting started", "Buttons", "Actions", "Forms", "Surfaces", "Navigation", "Cards", "Signature", "Utilities"];
const groups = groupNames.map(title => ({ title, items: title === "Getting started" ? [{ name: "Introduction", slug: "" }, { name: "Skills", slug: "skills" }] : components.filter(component => component.group === title) }));

function SidebarNavigation({ selected, query, onQueryChange }: { selected: string; query: string; onQueryChange: (query: string) => void }) {
  const { closeMobile } = useSidebar();
  const normalized = query.trim().toLowerCase();
  const filtered = groups.map(group => ({ ...group, items: group.items.filter(item => item.name.toLowerCase().includes(normalized) || group.title.toLowerCase().includes(normalized)) })).filter(group => group.items.length > 0);
  return <>
    <label className="docs-sidebar-search"><Icon name="search" size={15} /><input type="search" placeholder="Find a component…" aria-label="Filter documentation navigation" value={query} onChange={e => onQueryChange(e.target.value)} onKeyDown={e => { if (e.key === "Escape" && query) { e.preventDefault(); e.stopPropagation(); onQueryChange(""); } }} /><kbd>⌘ K</kbd></label>
    <nav className="docs-navigation" aria-label="Documentation sections">
      {filtered.length === 0 ? <p className="docs-search-empty" role="status">No matches for “{query}”.</p> : filtered.map(group => <section className="docs-nav-group" key={group.title}><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item.slug}><Link href={item.slug ? `/docs/${item.slug}` : "/docs"} aria-current={selected === item.slug ? "page" : undefined} onClick={closeMobile}>{item.name}{selected === item.slug && <span className="docs-selected-mark" aria-hidden="true"><Icon name="chevron" size={13} /></span>}</Link></li>)}</ul></section>)}
    </nav>
    <div className="docs-sidebar-footer"><span>Component documentation</span><a href="https://github.com/gavin100305/skeuomorphism-lib" target="_blank" rel="noreferrer" aria-label="Open GitHub repository"><Icon name="github" size={16} /></a></div>
  </>;
}

const introSections = [{ id: "overview", label: "Overview" },{ id: "components", label: "Components" },{ id: "blocks", label: "Composed components" },{ id: "getting-started", label: "Installation" }];
const skillsSections = [{ id: "overview", label: "Overview" }, { id: "install", label: "Install" }, { id: "start", label: "Start using it" }];
function PageContents({ sections, route }: { sections: { id: string; label: string }[]; route: string }) {
  const pageSections = sections;
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
  }, [pageSections, route]);
  useEffect(() => {
    const item = list.current?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (item) setIndicator({ top: item.offsetTop, height: item.offsetHeight });
  }, [active]);
  return <aside className="docs-page-contents" aria-label="Page contents">
    <div className="docs-toc-heading"><Icon name="align" size={15} /><span>On this page</span></div>
    <nav aria-label="On this page" className="docs-toc-nav"><div className="docs-toc-track"><span className="docs-toc-indicator" aria-hidden="true" style={{ transform: `translateY(${indicator.top}px)`, height: indicator.height }} /><ul ref={list} className="docs-toc-list">{pageSections.map(section => <li key={section.id} data-section={section.id}><a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} onClick={() => setActive(section.id)}>{section.label}</a></li>)}</ul></div></nav>
    <a className="docs-toc-source" href="https://github.com/gavin100305/skeuomorphism-lib" target="_blank" rel="noreferrer"><Icon name="github" size={13} /> View project <Icon name="diagonal" size={11} /></a>
  </aside>;
}

function DocsHeader() {
  const toggleTheme = useThemeToggle();
  return <header className="docs-header"><div className="docs-header-left"><span className="docs-mobile-trigger"><SidebarTrigger /></span><Link href="/" className="docs-header-brand"><Icon name="layers" size={23} /><span>skeuomorphism.</span></Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/docs" aria-current="page">Docs</Link><Link href="/docs#components">Components</Link><Link href="/templates">Templates</Link></nav></div><div className="docs-toolbar-actions"><SoundToggle /><a className="docs-github-link" href="https://github.com/gavin100305/skeuomorphism-lib" target="_blank" rel="noreferrer" aria-label="GitHub repository"><Icon name="github" size={18} /></a><button className="docs-theme-toggle" type="button" aria-label="Toggle color theme" onPointerDown={e => { if (e.button === 0) void toggleTheme(); }} onClick={e => { if (e.detail === 0) void toggleTheme(); }}><span className="theme-sun"><Icon name="sun" size={17} /></span><span className="theme-moon"><Icon name="moon" size={17} /></span></button></div></header>;
}

export default function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const slug = pathname === "/docs" ? "" : pathname.split("/").pop() ?? "";
  const [query, setQuery] = useState("");
  return <><a className="skip-link" href="#docs-workspace">Skip to content</a><SidebarProvider className="docs-shell docs-reference-layout" collapsible={false} width={240}><DocsHeader /><Sidebar><SidebarNavigation selected={slug} query={query} onQueryChange={setQuery} /></Sidebar><SidebarInset><div className="docs-reading-layout">{children}<PageContents sections={slug === "skills" ? skillsSections : slug ? componentSections : introSections} route={pathname} /></div></SidebarInset></SidebarProvider></>;
}
