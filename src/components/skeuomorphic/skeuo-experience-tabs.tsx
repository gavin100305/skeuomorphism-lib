"use client";
import "./styles/skeuo-experience-tabs.css";

import { SkeuoTabs as Tabs } from "./skeuo-tabs";
export type Experience = { id: string; label: string; role: string; period: string; description: string; technologies: string[] };
export function SkeuoExperienceTabs({ items, value, onValueChange, colorMode = "same" }: { items: Experience[]; value: string; onValueChange: (value: string) => void; colorMode?: "same" | "alternating" }) {
  return <div data-sk-root="" className="sk-experience"><Tabs appearance="keys" colorMode={colorMode} label="Experience" value={value} onValueChange={onValueChange} items={items.map(item => ({ value: item.id, label: item.label, content: <article className="sk-experience-page"><header><h3>{item.role}</h3><span>{item.period}</span></header><p>{item.description}</p><div>{item.technologies.map(technology => <span key={technology}>{technology}</span>)}</div><footer>{item.label}</footer></article> }))} /></div>;
}
