"use client";

import { useEffect, useState, useId, useRef } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./icons";
import { Button } from "./ui/button";
import { ObjectShowcase, ComponentCarousel, ProjectPreview } from "./landing-showcase";
import { CodeExample } from "./landing-code";
import { Testimonials } from "./landing-testimonials";
import { useScrollReveal } from "./landing-motion";
import { Switch as TactileSwitch } from "./ui/switch";

const repo = "https://github.com/gavin100305/skeumorphism-lib";
function Mark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>;
}
function Switch({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <TactileSwitch checked={checked} onCheckedChange={onChange} aria-label={label} />;
}
function SurfaceDemo() {
  const [recessed, setRecessed] = useState(false);
  return <button className={`surface-demo ${recessed ? "is-recessed" : ""}`} aria-pressed={recessed} onClick={() => setRecessed(!recessed)} aria-label="Toggle raised and recessed surface"><span className="surface-demo-face"><Icon name="layers" size={30} /></span><span>{recessed ? "Recessed" : "Raised"} <Icon name="arrow" size={13} /></span></button>;
}
function ButtonDemo() {
  const [count, setCount] = useState(0);
  return <div className="button-demo"><Button variant="primary" onClick={() => setCount(count + 1)}>{count ? `Pressed ${count} ${count === 1 ? "time" : "times"}` : "Go on, press it"}<Icon name="arrow" /></Button><Button square aria-label="Reset button counter" onClick={() => setCount(0)}><Icon name="reset" /></Button></div>;
}
function SwitchDemo() {
  const [on, setOn] = useState(true);
  const [quiet, setQuiet] = useState(false);
  return <div className="switch-demo"><div><span><b>Focus mode</b><small>A little less distraction.</small></span><Switch checked={on} onChange={() => setOn(!on)} label="Focus mode" /></div><div><span><b>Notifications</b><small>Only when it matters.</small></span><Switch checked={quiet} onChange={() => setQuiet(!quiet)} label="Notifications demo" /></div></div>;
}
function TabsDemo() {
  const [tab, setTab] = useState("Design");
  const id = useId();
  return <div className="tabs-demo"><div className="segmented" role="tablist" aria-label="Preview discipline">{["Design", "Develop", "Ship"].map(t => <button key={t} role="tab" id={`${id}-${t}`} aria-controls={`${id}-panel`} aria-selected={tab === t} tabIndex={tab === t ? 0 : -1} onKeyDown={e => {
    const names = ["Design", "Develop", "Ship"];
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const index = e.key === "Home" ? 0 : e.key === "End" ? 2 : (names.indexOf(tab) + (e.key === "ArrowRight" ? 1 : 2)) % 3;
    setTab(names[index]); document.getElementById(`${id}-${names[index]}`)?.focus();
  }} onClick={() => setTab(t)}>{t}</button>)}</div><p role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${tab}`}>{tab === "Design" ? "Start with how it feels." : tab === "Develop" ? "Make the details work." : "Put it out into the world."}</p></div>;
}
function SliderDemo() {
  const [depth, setDepth] = useState(65);
  return <div className="slider-demo"><div className="slider-heading"><span>Surface depth</span><output>{String(depth).padStart(2, "0")}</output></div><div className="slider-housing"><span className="slider-track" aria-hidden="true"><i style={{ width: `${depth}%` }} /></span><input type="range" min="0" max="100" value={depth} aria-label="Surface depth demo" onChange={e => setDepth(Number(e.target.value))} /><div className="slider-ticks" aria-hidden="true">{Array.from({ length: 21 }, (_, i) => <i key={i} />)}</div></div><div className="slider-scale"><span>FLAT</span><span>RAISED</span></div><div className="depth-sample" style={{ "--sample-depth": `${depth / 7}px` } as CSSProperties}><Icon name="layers" size={26} /></div></div>;
}
function InputDemo() {
  const [saved, setSaved] = useState(false);
  return <form className="input-demo" onSubmit={e => { e.preventDefault(); setSaved(true); }}><label htmlFor="demo-email">Email address</label><div className="input-well"><Icon name="mail" /><input id="demo-email" type="email" placeholder="you@example.com" required onChange={() => setSaved(false)} /><button type="submit" className="tactile square" aria-label="Try email input"><Icon name={saved ? "check" : "arrow"} /></button></div><p aria-live="polite">{saved ? "Looks good. This is just a demo—nothing was sent." : "Recessed, right down to the details."}</p></form>;
}
function ComponentCard({ title, number, children, wide = false }: { title: string; number: string; children: React.ReactNode; wide?: boolean }) {
  return <article className={`component-card ${wide ? "wide" : ""}`}><div className="component-stage">{children}</div><div className="component-caption"><h3>{title}</h3><span>{number}</span></div></article>;
}
export default function Landing() {
  const [menu, setMenu] = useState(false);
  const themeChanging = useRef(false);
  const [messageSent, setMessageSent] = useState(false);
  useScrollReveal();
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function sync() {
      let stored: string | null = null;
      try { stored = localStorage.getItem("skeumorphism-theme"); } catch {}
      const next = stored === "dark" || stored === "light" ? stored === "dark" : media.matches;
      document.documentElement.dataset.theme = next ? "dark" : "light";
    }
    sync(); media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  async function toggleTheme() {
    if (themeChanging.current) return;
    const next = document.documentElement.dataset.theme !== "dark";
    function applyTheme() {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      try { localStorage.setItem("skeumorphism-theme", next ? "dark" : "light"); } catch {}
    }
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme(); return;
    }
    themeChanging.current = true;
    try {
      const transition = document.startViewTransition(applyTheme);
      await transition.finished;
    } catch {
      // A skipped snapshot still leaves the chosen theme applied.
    } finally { themeChanging.current = false; }
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="header-inner">
        <a href="#" className="brand"><Mark /><span>skeumorphism<span className="brand-period">.</span></span></a>
        <nav id="primary-nav" className={menu ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a href="#components" onClick={() => setMenu(false)}>Components</a>
          <a href="#blocks" onClick={() => setMenu(false)}>Blocks</a>
          <button className="nav-docs" aria-disabled="true" title="Documentation is coming soon">Docs</button>
          <a className="mobile-start" href="#getting-started" onClick={() => setMenu(false)}>Get started <Icon name="arrow" size={14} /></a>
        </nav>
        <div className="header-actions">
          <a className="nav-start" href="#getting-started">Get started <Icon name="arrow" size={14} /></a>
          <a href={repo} target="_blank" rel="noreferrer" className="github-link" aria-label="GitHub repository"><Icon name="github" size={18} /></a>
          <button className="theme-button" aria-label="Toggle color theme" onPointerDown={e => { if (e.button === 0) void toggleTheme(); }} onClick={e => { if (e.detail === 0) void toggleTheme(); }}><span className="theme-sun"><Icon name="sun" size={18} /></span><span className="theme-moon"><Icon name="moon" size={18} /></span></button>
          <button className="mobile-menu" aria-label="Toggle navigation" aria-controls="primary-nav" aria-expanded={menu} onClick={() => setMenu(!menu)}><Icon name={menu ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
    <main id="main">
      <section className="hero section-shell">
        <div className="hero-woven-disc" aria-hidden="true" />
        <div className="hero-note">Tactile components for the web</div>
        <h1>Interfaces you can<br />almost <span>feel.</span></h1>
        <p className="hero-description">A little depth goes a long way. Tactile components for the web,<br className="desktop-break" /> crafted with the details that make an interface feel real.</p>
        <div className="hero-actions"><a className="tactile primary" href="#components">Explore components <Icon name="arrow" /></a><a className="text-link" href="#getting-started">Get started <Icon name="diagonal" size={15} /></a></div>
        <div className="hero-footnote"><span>React</span><span>TypeScript</span><span>Tailwind CSS</span></div>
        <ObjectShowcase />
      </section>
      <section id="components" className="components-section section-shell">
        <div className="section-intro" data-reveal><div><span className="eyebrow">THE BUILDING BLOCKS</span><h2>Small details.<br />A tangible difference.</h2></div><p>Familiar components, with a little more character.<br />Press, toggle, slide. Feel the difference yourself.</p></div>
        <ComponentCarousel>
          <ComponentCard title="Buttons" number="01"><ButtonDemo /></ComponentCard>
          <ComponentCard title="Switches" number="02"><SwitchDemo /></ComponentCard>
          <ComponentCard title="Tabs" number="03"><TabsDemo /></ComponentCard>
          <ComponentCard title="Inputs" number="04"><InputDemo /></ComponentCard>
          <ComponentCard title="Sliders" number="05"><SliderDemo /></ComponentCard>
          <ComponentCard title="Surfaces" number="06"><SurfaceDemo /></ComponentCard>
        </ComponentCarousel>
        <p className="collection-note">The first collection. More pieces are taking shape.</p>
      </section>
      <section id="getting-started" className="getting-started section-shell">
        <div className="start-copy" data-reveal><span className="eyebrow">FROM PREVIEW TO PROJECT</span><h2>Your code.<br />Your finishing touch.</h2><p>Choose a component. Make it your own.<br />The details should be yours to change.</p><a href={repo} target="_blank" rel="noreferrer" className="text-link">Follow the build on GitHub <Icon name="diagonal" size={16} /></a><span className="availability">The registry is in the making. Explore the live demos for now.</span></div>
        <CodeExample />
      </section>
      <section id="blocks" className="blocks-section section-shell"><div className="section-intro" data-reveal><div><span className="eyebrow">PIECES THAT BELONG TOGETHER</span><h2>Beyond the button.</h2></div><p>Building towards complete sections.<br />The same attention, at a bigger scale.</p></div><div className="block-grid"><article className="block-card" data-reveal><ProjectPreview /><div className="block-caption"><h3>Project gallery</h3><span>IN DEVELOPMENT</span></div></article><article className="block-card" data-reveal><form className="contact-mini" onSubmit={e => { e.preventDefault(); setMessageSent(true); }}><span className="contact-mini-title">Start a conversation.</span><label htmlFor="block-message">Your message</label><textarea id="block-message" placeholder="I have something in mind…" rows={2} required onChange={() => setMessageSent(false)} /><button className="tactile primary" type="submit">{messageSent ? "Demo complete" : "Try the form"} <Icon name={messageSent ? "check" : "arrow"} size={16} /></button><span className="demo-notice" aria-live="polite">{messageSent ? "Nothing sent. Just a little interaction." : "Interactive preview · no email is sent"}</span></form><div className="block-caption"><h3>Contact section</h3><span>IN DEVELOPMENT</span></div></article></div></section>
      <Testimonials />
      <section className="closing section-shell" data-reveal>
        <div className="closing-panel">
          <div className="closing-copy"><span className="eyebrow">YOUR NEXT LITTLE DETAIL</span><h2>Make something<br />worth feeling.</h2></div>
          <div className="closing-actions"><a className="tactile primary" href="#components">Explore the components <Icon name="arrow" /></a><a className="text-link" href={repo} target="_blank" rel="noreferrer">Follow the build <Icon name="diagonal" size={14} /></a></div>
        </div>
      </section>
    </main>
    <footer className="site-footer section-shell">
      <div className="footer-top"><div className="footer-brand"><a href="#" className="brand"><Mark /><span>skeumorphism.</span></a><p>Made with depth. Built for the web.</p></div><nav aria-label="Footer navigation"><a href="#components">Components <Icon name="arrow" size={13} /></a><a href="#blocks">Blocks <Icon name="arrow" size={13} /></a><a href={repo} target="_blank" rel="noreferrer">GitHub <Icon name="diagonal" size={13} /></a></nav></div>
      <div className="footer-bottom"><span>A work in progress by Gavin Soares.</span><a href="#">Back to top <Icon name="up" size={13} /></a></div>
    </footer>
  </>;
}
