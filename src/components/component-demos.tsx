"use client";
import { SkeuoProvider } from "./skeuomorphic/skeuo-provider";
import { SkeuoSoundProvider } from "./skeuomorphic/skeuo-sound-provider";
import { useState } from "react";
import { SkeuoPhotoCarousel as PhotoCarousel } from "./skeuomorphic/skeuo-photo-carousel";
import { SkeuoKeyButton as KeyButton } from "./skeuomorphic/skeuo-key-button";
import { DemoThemeButton as ThemeButton } from "./demo-theme-button";
import { SkeuoSectionDock as SectionDock } from "./skeuomorphic/skeuo-section-dock";
import { SkeuoButton as Button } from "./skeuomorphic/skeuo-button";
import { SkeuoSwitch as Switch } from "./skeuomorphic/skeuo-switch";
import { SkeuoInput as Input, SkeuoTextarea as Textarea } from "./skeuomorphic/skeuo-input";
import { SkeuoSlider as Slider } from "./skeuomorphic/skeuo-slider";
import { SkeuoTabs as Tabs } from "./skeuomorphic/skeuo-tabs";
import { SkeuoSurface as Surface } from "./skeuomorphic/skeuo-surface";
import { SkeuoProjectCard as ProjectCard } from "./skeuomorphic/skeuo-project-card";
import { SkeuoIDCard as IDCard } from "./skeuomorphic/skeuo-id-card";
import { SkeuoAstronaut as Astronaut } from "./skeuomorphic/skeuo-astronaut";
import { SkeuoContributionCalendar as ContributionCalendar, type ContributionDay } from "./skeuomorphic/skeuo-contribution-calendar";
import { SkeuoContactForm as ContactForm } from "./skeuomorphic/skeuo-contact-form";
import { SkeuoExperienceTabs as ExperienceTabs } from "./skeuomorphic/skeuo-experience-tabs";
import { SkeuoFocusTimer as FocusTimer } from "./skeuomorphic/skeuo-focus-timer";
import { SkeuoTestimonialCarousel as TestimonialCarousel } from "./skeuomorphic/skeuo-testimonial-carousel";
import { Icon } from "./icons";

const contributionDays: ContributionDay[] = Array.from({ length: 730 }, (_, index) => {
  const seed = (index * 17 + Math.floor(index / 7) * 3) % 29;
  const count = seed < 16 ? 0 : seed - 15;
  return { date: new Date(Date.UTC(2024,9,21 + index)).toISOString().slice(0,10), count, level: (count === 0 ? 0 : count < 4 ? 1 : count < 7 ? 2 : count < 11 ? 3 : 4) as ContributionDay["level"] };
});
const experiences = [
  { id: "studio", label: "Studio", role: "Frontend Developer", period: "2025 — Present", description: "Building thoughtful interfaces, reusable components, and the small interactions that connect them.", technologies: ["React","TypeScript","CSS"] },
  { id: "product", label: "Product", role: "Product Designer", period: "2024 — 2025", description: "Taking early ideas through prototypes and into working products, with a focus on clarity and accessibility.", technologies: ["Figma","Prototyping","Design systems"] },
  { id: "independent", label: "Independent", role: "Independent Maker", period: "2023 — 2024", description: "A selection of experiments, small projects, and things made out of curiosity.", technologies: ["Next.js","Web APIs","SVG"] },
];
export function ComponentDemo({ slug }: { slug: string }) {
  const [colorMode, setColorMode] = useState<"same" | "alternating">("same");
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");
  const [dock, setDock] = useState("home");
  const [mobile, setMobile] = useState(false);
  const [count, setCount] = useState(0);
  const [on, setOn] = useState(true);
  const [value, setValue] = useState(65);
  const [tab, setTab] = useState("design");
  const [experience, setExperience] = useState("studio");
  if (slug === "photo-carousel") return <div className="demo-full"><PhotoCarousel label="Collected moments" items={[
    {id:"lake",image:"/examples/lake.jpg",imageAlt:"Mountain peaks reflected in a still lake",title:"A moment of stillness",label:"Quiet mornings",meta:"01",eyebrow:"FIELD NOTES",subtitle:"A small collection of places and perspectives.",description:"A stock photograph used to demonstrate the original portfolio’s printed photo frame and details view."},
    {id:"architecture",image:"/examples/architecture-light.jpg",imageAlt:"Pale geometric architecture viewed from below",title:"Looking up",label:"Architecture",meta:"02",eyebrow:"BUILT FORMS",subtitle:"Light, structure, and a different point of view."},
    {id:"sand",image:"/examples/texture-dark.jpg",imageAlt:"Fine ripples across dark sand",title:"Patterns in the quiet",label:"Texture study",meta:"03",eyebrow:"SURFACE STUDIES",subtitle:"Small details found in ordinary places."},
    {id:"geometry",image:"/examples/geometry.jpg",imageAlt:"Geometric lines of a modern building",title:"Lines and light",label:"City notes",meta:"04",eyebrow:"URBAN JOURNAL",subtitle:"A collection of shapes against the sky."},
    {id:"facade",image:"/examples/facade.jpg",imageAlt:"Modern glass facade against a clear sky",title:"Glass and sky",label:"Perspectives",meta:"05",eyebrow:"ANOTHER ANGLE",subtitle:"A different view of the familiar."},
  ]}/><p className="demo-feedback photo-demo-note">Sample stock photography · swipe, use arrow keys, or select a print.</p></div>;
  if (slug === "section-dock") return <div className="demo-stack"><div className="demo-controls"><Button size="sm" aria-pressed={orientation === "vertical"} onClick={() => setOrientation("vertical")}>Vertical</Button><Button size="sm" aria-pressed={orientation === "horizontal"} onClick={() => setOrientation("horizontal")}>Horizontal</Button></div><SectionDock orientation={orientation} value={dock} onValueChange={setDock} items={[{value:"home",label:"Home",icon:<Icon name="home"/>},{value:"projects",label:"Projects",icon:<Icon name="folder"/>},{value:"experience",label:"Experience",icon:<Icon name="briefcase"/>},{value:"achievements",label:"Achievements",icon:<Icon name="trophy"/>},{value:"contact",label:"Contact",icon:<Icon name="mail"/>}]} /><p className="demo-feedback" role="status">{dock.charAt(0).toUpperCase() + dock.slice(1)} selected</p></div>;
  if (slug === "theme-button") return <div className="demo-stack"><div className="demo-controls"><div className="demo-button-variant"><ThemeButton /><span>Raised key</span></div><div className="demo-button-variant"><ThemeButton variant="round" /><span>Round</span></div></div><p className="demo-feedback">Switch themes to try both appearances. Your choice is remembered.</p></div>;
  if (slug === "keyboard-button") return <div className="demo-stack"><div className="demo-controls"><KeyButton icon={<img src="/tech-icons/react.svg" alt="" width={21} height={21} />} onClick={() => setCount(count + 1)}>React</KeyButton><KeyButton tone="accent" icon={<img src="/tech-icons/razorpay.svg" alt="" width={21} height={21} />} onClick={() => setCount(count + 1)}>Razorpay</KeyButton></div><div className="demo-controls"><KeyButton onClick={() => setCount(count + 1)}>Without icon</KeyButton><KeyButton disabled>Disabled key</KeyButton></div><p className="demo-feedback" role="status">{count ? `Key pressed ${count} ${count === 1 ? "time" : "times"}.` : "Press a key to feel its travel and hear the click."}</p></div>;
  if (slug === "button") return <div className="demo-stack"><div className="demo-controls"><Button variant="primary" onClick={() => setCount(count + 1)}>Save changes <Icon name="arrow" size={16} /></Button><Button onClick={() => setCount(count + 1)}>Secondary</Button><Button square aria-label="Add item" onClick={() => setCount(count + 1)}><Icon name="plus" size={17} /></Button></div><div className="demo-controls"><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button></div><div className="demo-controls"><Button disabled>Disabled</Button><Button loading>Saving…</Button></div><p className="demo-feedback" role="status">{count ? `Button pressed ${count} ${count === 1 ? "time" : "times"}.` : "Press a button to try the sound and physical state."}</p></div>;
  if (slug === "switch") return <div className="demo-stack demo-narrow"><label className="demo-labeled-control"><span>Notifications</span><Switch checked={on} onCheckedChange={setOn} aria-label="Enable notifications" /></label><label className="demo-labeled-control"><span>Disabled</span><Switch checked={false} disabled onCheckedChange={() => {}} aria-label="Disabled switch" /></label><p className="demo-feedback">Notifications are {on ? "on" : "off"}.</p></div>;
  if (slug === "input") return <div className="demo-stack demo-narrow"><label className="demo-field">Email address<Input type="email" placeholder="you@example.com" /></label><label className="demo-field">Disabled field<Input disabled placeholder="Unavailable" /></label></div>;
  if (slug === "textarea") return <label className="demo-field demo-narrow">Your message<Textarea placeholder="A little room for your next idea…" rows={4} /></label>;
  if (slug === "slider") return <div className="demo-stack demo-narrow"><div className="slider-heading"><span>Surface depth</span><output>{value}%</output></div><Slider value={value} onValueChange={setValue} aria-label="Surface depth" /><Surface variant="raised" className="demo-depth-surface" style={{ boxShadow: `inset 0 1px 0 var(--highlight), 0 ${value / 8}px 0 var(--base), 0 ${value / 8 + 1}px 0 var(--edge), 0 16px 18px var(--shadow)` }}><Icon name="layers" size={25} /></Surface></div>;
  if (slug === "tabs") return <div className="demo-narrow"><Tabs value={tab} onValueChange={setTab} label="Workflow" items={[{ value: "design", label: "Design", content: "Start with how it feels." },{ value: "develop", label: "Develop", content: "Make the details work." },{ value: "ship", label: "Ship", content: "Put it out into the world." }]} /></div>;
  if (slug === "surface") return <div className="demo-surface-grid"><Surface><Icon name="layers" size={25} /><h3>Raised</h3><p>Layered edges and a grounded shadow.</p></Surface><Surface variant="recessed"><Icon name="layers" size={25} /><h3>Recessed</h3><p>An inset well with soft inner depth.</p></Surface></div>;
  if (slug === "project-card") return <div className="demo-stack"><ProjectCard title="Perspectives" number="01" onOpen={() => setCount(count + 1)}><img className="stock-light" src="/examples/architecture-light.jpg" alt="Pale geometric architecture viewed from below" draggable={false} /><img className="stock-dark" src="/examples/texture-dark.jpg" alt="Dark sculpted sand with fine ripples" draggable={false} /></ProjectCard><p className="demo-feedback" role="status">{count ? `Open callback triggered ${count} times.` : "Original portfolio card. Select it to trigger onOpen."}</p></div>;
  if (slug === "id-card") return <IDCard name="Gavin Soares" role="Explorer" heading="STATION ACCESS" code="GS / 01" portrait={<Astronaut />} />;
  if (slug === "contribution-calendar") return <div className="demo-full"><div className="calendar-preview-tools"><Button size="sm" aria-pressed={mobile} onClick={() => setMobile(!mobile)}>{mobile ? "View desktop mode" : "View mobile mode"}</Button></div><ContributionCalendar days={contributionDays} mobile={mobile} /><p className="demo-feedback">Sample data · no GitHub account connection</p></div>;
  if (slug === "contact-form") return <div className="demo-full"><ContactForm onSend={() => new Promise(resolve => setTimeout(resolve,650))} /><p className="demo-feedback">Local demonstration only. No message or personal data is sent.</p></div>;
  if (slug === "experience-tabs") return <div className="demo-full"><div className="demo-controls experience-options"><Button size="sm" aria-pressed={colorMode === "same"} onClick={() => setColorMode("same")}>Same color</Button><Button size="sm" aria-pressed={colorMode === "alternating"} onClick={() => setColorMode("alternating")}>Alternating colors</Button></div><ExperienceTabs items={experiences} value={experience} onValueChange={setExperience} colorMode={colorMode} /><p className="demo-feedback">Example roles and dates.</p></div>;
  if (slug === "focus-timer") return <div className="demo-timer"><FocusTimer /></div>;
  if (slug === "testimonial-carousel") return <div className="demo-full demo-testimonials"><TestimonialCarousel items={[{ id: "1", quote: "The difference is in the details you notice after the first click.", author: "Designer’s perspective", role: "Sample testimonial", initials: "01" },{ id: "2", quote: "Familiar controls. Just enough character to make them feel like yours.", author: "Developer’s perspective", role: "Sample testimonial", initials: "02" },{ id: "3", quote: "The kind of button you find yourself pressing one more time.", author: "A small interaction", role: "Sample testimonial", initials: "03" }]} /></div>;
  if (slug === "provider") return <div className="demo-controls"><SkeuoProvider theme="light"><Button>Light scope</Button></SkeuoProvider><SkeuoProvider theme="dark"><Button>Dark scope</Button></SkeuoProvider></div>;
  if (slug === "sound-provider") return <SkeuoSoundProvider><div className="demo-stack"><Button data-sk-sound="off">Silent by default</Button><p className="demo-feedback">Connect your own playback callback to opt in.</p></div></SkeuoSoundProvider>;
  return null;
}
