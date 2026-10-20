"use client";
import { Tabs } from "./tabs";
export type Experience = { id: string; label: string; role: string; period: string; description: string; technologies: string[] };
export function ExperienceTabs({ items, value, onValueChange }: { items: Experience[]; value: string; onValueChange: (value: string) => void }) {
  return <div className="sk-experience"><Tabs label="Experience" value={value} onValueChange={onValueChange} items={items.map(item => ({ value: item.id, label: item.label, content: <article className="sk-experience-page"><header><h3>{item.role}</h3><span>{item.period}</span></header><p>{item.description}</p><div>{item.technologies.map(technology => <span key={technology}>{technology}</span>)}</div><footer>{item.label}</footer></article> }))} /></div>;
}
