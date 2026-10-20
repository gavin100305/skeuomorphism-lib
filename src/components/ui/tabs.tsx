"use client";
import { useId } from "react";
import type { ReactNode } from "react";
export type TabItem = { value: string; label: string; content: ReactNode; disabled?: boolean };
export function Tabs({ items, value, onValueChange, label = "Tabs" }: { items: TabItem[]; value: string; onValueChange: (value: string) => void; label?: string }) {
  const id = useId();
  const active = items.find(item => item.value === value);
  return <div className="sk-tabs"><div className="segmented" role="tablist" aria-label={label}>{items.map((item, index) => <button type="button" id={`${id}-tab-${index}`} key={item.value} role="tab" aria-selected={value === item.value} aria-controls={`${id}-panel-${index}`} tabIndex={value === item.value ? 0 : -1} disabled={item.disabled} onClick={() => onValueChange(item.value)} onKeyDown={e => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const available = items.map((tab, i) => ({ ...tab, index: i })).filter(tab => !tab.disabled);
    if (!available.length) return;
    const current = available.findIndex(tab => tab.value === value);
    const next = e.key === "Home" ? 0 : e.key === "End" ? available.length - 1 : (current + (e.key === "ArrowRight" ? 1 : available.length - 1)) % available.length;
    onValueChange(available[next].value);
    document.getElementById(`${id}-tab-${available[next].index}`)?.focus();
  }}>{item.label}</button>)}</div>{active && <div role="tabpanel" tabIndex={0} id={`${id}-panel-${items.indexOf(active)}`} aria-labelledby={`${id}-tab-${items.indexOf(active)}`} className="sk-tab-panel">{active.content}</div>}</div>;
}
