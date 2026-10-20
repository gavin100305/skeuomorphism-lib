"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { SoundToggle } from "./button-sound-effects";
import { SkeuoSlider as Slider } from "./skeuomorphic/skeuo-slider";
import { SkeuoInput as Input } from "./skeuomorphic/skeuo-input";
import { SkeuoTabs as Tabs } from "./skeuomorphic/skeuo-tabs";
import { useThemeToggle } from "./use-theme-toggle";
import { SkeuoButton as Button } from "./skeuomorphic/skeuo-button";
import { ObjectShowcase, ComponentCarousel, ProjectPreview } from "./landing-showcase";
import { CodeExample } from "./landing-code";
import { Testimonials } from "./landing-testimonials";
import { useScrollReveal } from "./landing-motion";
import { SkeuoSwitch as TactileSwitch } from "./skeuomorphic/skeuo-switch";

const repo = "https://github.com/gavin100305/skeuomorphism-lib";
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
  const [tab, setTab] = useState("design");
  return <div className="tabs-demo"><Tabs value={tab} onValueChange={setTab} label="Preview discipline" items={[{ value: "design", label: "Design", content: "Start with how it feels." },{ value: "develop", label: "Develop", content: "Make the details work." },{ value: "ship", label: "Ship", content: "Put it out into the world." }]} /></div>;
}
function SliderDemo() {
  const [depth, setDepth] = useState(65);
  return <div className="slider-demo"><div className="slider-heading"><span>Surface depth</span><output>{String(depth).padStart(2, "0")}</output></div><Slider value={depth} onValueChange={setDepth} aria-label="Surface depth demo" /><div className="slider-scale"><span>FLAT</span><span>RAISED</span></div><div className="depth-sample" style={{ "--sample-depth": `${depth / 7}px` } as CSSProperties}><Icon name="layers" size={26} /></div></div>;
}
function InputDemo() {
  const [saved, setSaved] = useState(false);
  return <form className="input-demo" onSubmit={e => { e.preventDefault(); setSaved(true); }}><label htmlFor="demo-email">Email address</label><div className="input-well"><Icon name="mail" /><Input id="demo-email" type="email" placeholder="you@example.com" required onChange={() => setSaved(false)} /><button type="submit" className="tactile square" aria-label="Try email input"><Icon name={saved ? "check" : "arrow"} /></button></div><p aria-live="polite">{saved ? "Looks good. This is just a demo—nothing was sent." : "Recessed, right down to the details."}</p></form>;
}
function ComponentCard({ title, number, slug, children, wide = false }: { title: string; number: string; slug: string; children: React.ReactNode; wide?: boolean }) {
  return <article className={`component-card ${wide ? "wide" : ""}`}><div className="component-stage">{children}</div><div className="component-caption"><h3><Link href={`/docs/${slug}`} aria-label={`${title} documentation`}>{title}<Icon name="diagonal" size={13} /></Link></h3><span>{number}</span></div></article>;
}
export default function Landing() {
  const [menu, setMenu] = useState(false);
  const toggleTheme = useThemeToggle();
  const [messageSent, setMessageSent] = useState(false);
  useScrollReveal();
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header id="top" className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand"><Mark /><span>skeuomorphism<span className="brand-period">.</span></span></Link>
        <nav id="primary-nav" className={menu ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <Link href="/docs#components" onClick={() => setMenu(false)}>Components</Link>
          <Link href="/docs#blocks" onClick={() => setMenu(false)}>Blocks</Link>
          <Link href="/docs" onClick={() => setMenu(false)}>Docs</Link>
          <Link className="mobile-start" href="/docs#getting-started" onClick={() => setMenu(false)}>Get started <Icon name="arrow" size={14} /></Link>
        </nav>
        <div className="header-actions">
          <Link className="nav-start" href="/docs#getting-started">Get started <Icon name="arrow" size={14} /></Link>
          <a href={repo} target="_blank" rel="noreferrer" className="github-link" aria-label="GitHub repository"><Icon name="github" size={18} /></a>
          <SoundToggle />
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
        <div className="hero-actions"><Link className="tactile primary" href="/docs#components">Explore components <Icon name="arrow" /></Link><Link className="text-link" href="/docs#getting-started">Get started <Icon name="diagonal" size={15} /></Link></div>
        <div className="hero-footnote"><span>React</span><span>TypeScript</span><span>Tailwind CSS</span></div>
        <ObjectShowcase />
      </section>
      <section id="components" className="components-section section-shell">
        <div className="section-intro" data-reveal><div><span className="eyebrow">THE BUILDING BLOCKS</span><h2>Small details.<br />A tangible difference.</h2></div><p>Familiar components, with a little more character.<br />Press, toggle, slide. Feel the difference yourself.</p></div>
        <ComponentCarousel>
          <ComponentCard slug="button" title="Buttons" number="01"><ButtonDemo /></ComponentCard>
          <ComponentCard slug="switch" title="Switches" number="02"><SwitchDemo /></ComponentCard>
          <ComponentCard slug="tabs" title="Tabs" number="03"><TabsDemo /></ComponentCard>
          <ComponentCard slug="input" title="Inputs" number="04"><InputDemo /></ComponentCard>
          <ComponentCard slug="slider" title="Sliders" number="05"><SliderDemo /></ComponentCard>
          <ComponentCard slug="surface" title="Surfaces" number="06"><SurfaceDemo /></ComponentCard>
        </ComponentCarousel>
        <p className="collection-note">The first collection. More pieces are taking shape.</p>
      </section>
      <section id="getting-started" className="getting-started section-shell">
        <div className="start-copy" data-reveal><span className="eyebrow">FROM PREVIEW TO PROJECT</span><h2>Your code.<br />Your finishing touch.</h2><p>Choose a component. Make it your own.<br />The details should be yours to change.</p><Link href="/docs#getting-started" className="text-link">Installation guide <Icon name="diagonal" size={16} /></Link><span className="availability">Install components through the shadcn CLI. Source and usage examples are ready in the docs.</span></div>
        <CodeExample />
      </section>
      <section id="blocks" className="blocks-section section-shell"><div className="section-intro" data-reveal><div><span className="eyebrow">PIECES THAT BELONG TOGETHER</span><h2>Beyond the button.</h2></div><p>Building towards complete sections.<br />The same attention, at a bigger scale.</p></div><div className="block-grid"><article className="block-card" data-reveal><ProjectPreview /><div className="block-caption"><h3><Link href="/docs/photo-carousel">Photo carousel <Icon name="diagonal" size={13} /></Link></h3><span>VIEW COMPONENT</span></div></article><article className="block-card" data-reveal><form className="contact-mini" onSubmit={e => { e.preventDefault(); setMessageSent(true); }}><span className="contact-mini-title">Start a conversation.</span><label htmlFor="block-message">Your message</label><textarea id="block-message" placeholder="I have something in mind…" rows={2} required onChange={() => setMessageSent(false)} /><button className="tactile primary" type="submit">{messageSent ? "Demo complete" : "Try the form"} <Icon name={messageSent ? "check" : "arrow"} size={16} /></button><span className="demo-notice" aria-live="polite">{messageSent ? "Nothing sent. Just a little interaction." : "Interactive preview · no email is sent"}</span></form><div className="block-caption"><h3><Link href="/docs/contact-form">Contact form <Icon name="diagonal" size={13} /></Link></h3><span>VIEW COMPONENT</span></div></article></div></section>
      <Testimonials />
      <section className="closing section-shell" data-reveal>
        <div className="closing-panel">
          <div className="closing-copy"><span className="eyebrow">YOUR NEXT LITTLE DETAIL</span><h2>Make something<br />worth feeling.</h2></div>
          <div className="closing-actions"><Link className="tactile primary" href="/docs#components">Explore the components <Icon name="arrow" /></Link><a className="text-link" href={repo} target="_blank" rel="noreferrer">Follow the build <Icon name="diagonal" size={14} /></a></div>
        </div>
      </section>
    </main>
    <footer className="site-footer section-shell">
      <div className="footer-top"><div className="footer-brand"><Link href="/" className="brand"><Mark /><span>skeuomorphism.</span></Link><p>Made with depth. Built for the web.</p></div><nav aria-label="Footer navigation"><Link href="/docs#components">Components <Icon name="arrow" size={13} /></Link><Link href="/docs#blocks">Blocks <Icon name="arrow" size={13} /></Link><a href={repo} target="_blank" rel="noreferrer">GitHub <Icon name="diagonal" size={13} /></a></nav></div>
      <div className="footer-bottom"><span>A work in progress by Gavin Soares.</span><a href="#top">Back to top <Icon name="up" size={13} /></a></div>
    </footer>
  </>;
}
