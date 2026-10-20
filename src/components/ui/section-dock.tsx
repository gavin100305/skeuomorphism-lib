"use client";
import type { ReactNode, KeyboardEvent } from "react";
export type DockItem = { value: string; label: string; icon: ReactNode };
/** Portfolio section dock, controlled so it also works inside panels and apps. */
export function SectionDock({ items, value, onValueChange, orientation = "vertical", label = "Sections" }: { items: DockItem[]; value: string; onValueChange: (value: string) => void; orientation?: "vertical" | "horizontal"; label?: string }) {
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const previous = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const next = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    if (![previous, next, "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : (index + (event.key === next ? 1 : items.length - 1)) % items.length;
    onValueChange(items[target].value);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[target]?.focus();
  }
  return <nav className="sk-section-dock" data-orientation={orientation} aria-label={label}><div className="sk-dock-track">{items.map((item,index) => <button type="button" key={item.value} className="sk-dock-key" aria-label={item.label} aria-current={value === item.value ? "page" : undefined} tabIndex={value === item.value ? 0 : -1} onClick={() => onValueChange(item.value)} onKeyDown={event => navigate(event,index)}>{item.icon}<span className="sk-dock-tooltip">{item.label}</span></button>)}</div></nav>;
}
