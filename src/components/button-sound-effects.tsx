"use client";
import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { playButtonSound, preloadButtonSound } from "@/lib/button-sound";

export const SOUND_KEY = "skeumorphism-sound";
export function ButtonSoundEffects() {
  useEffect(() => {
    let enabled = true;
    let index = 0;
    const down = new Map<number, number>();
    const recent = new WeakMap<Element, number>();
    function sync() { try { enabled = localStorage.getItem(SOUND_KEY) !== "off"; } catch {} }
    sync();
    if (enabled) preloadButtonSound();
    function control(target: EventTarget | null) {
      if (!(target instanceof Element)) return null;
      const element = target.closest("button,[role='button'],a.tactile,a.folio-raised-control");
      return element && !element.matches(":disabled,[aria-disabled='true'],[data-sound='off']") ? element : null;
    }
    function press(event: PointerEvent) {
      const button = control(event.target);
      if (!enabled || !button || !event.isPrimary || event.button !== 0 || event.pointerType === "touch") return;
      const next = index++; recent.set(button, performance.now()); down.set(event.pointerId, next); playButtonSound("down", next);
    }
    function release(event: PointerEvent) { const next = down.get(event.pointerId); if (next !== undefined) { down.delete(event.pointerId); const button = control(event.target); if (button) recent.set(button, performance.now()); if (enabled) playButtonSound("up", next); } }
    function click(event: MouseEvent) {
      const button = control(event.target);
      if (!enabled || !button || performance.now() - (recent.get(button) ?? -Infinity) < 600) return;
      const next = index++; playButtonSound("down", next); window.setTimeout(() => { if (enabled) playButtonSound("up", next); }, 45);
    }
    document.addEventListener("pointerdown", press, true); document.addEventListener("pointerup", release, true); document.addEventListener("pointercancel", release, true); document.addEventListener("click", click, true);
    window.addEventListener("storage", sync); window.addEventListener("skeumorphism-sound-change", sync);
    return () => { document.removeEventListener("pointerdown", press, true); document.removeEventListener("pointerup", release, true); document.removeEventListener("pointercancel", release, true); document.removeEventListener("click", click, true); window.removeEventListener("storage", sync); window.removeEventListener("skeumorphism-sound-change", sync); };
  }, []);
  return null;
}
export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => { try { setEnabled(localStorage.getItem(SOUND_KEY) !== "off"); } catch {} }, []);
  return <button type="button" className="docs-theme-toggle" data-sound="off" aria-label={enabled ? "Mute button sounds" : "Enable button sounds"} aria-pressed={enabled} onClick={() => { const next = !enabled; setEnabled(next); try { localStorage.setItem(SOUND_KEY, next ? "on" : "off"); } catch {} window.dispatchEvent(new Event("skeumorphism-sound-change")); }}><Icon name={enabled ? "volume" : "muted"} size={17} /></button>;
}
