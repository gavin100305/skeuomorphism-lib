"use client";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { SkeuoSoundProvider } from "./skeuomorphic/skeuo-sound-provider";
import { Icon } from "./icons";
import { playButtonSound, playRimTurnSound, preloadButtonSound, preloadRimSound } from "@/lib/button-sound";

export const SOUND_KEY = "skeuomorphism-sound";
let fallbackEnabled = true;
function soundSnapshot() {
  try { return localStorage.getItem(SOUND_KEY) !== "off"; } catch { return fallbackEnabled; }
}
function subscribeSound(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener("skeuomorphism-sound-change", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("skeuomorphism-sound-change", listener);
  };
}
const serverSoundSnapshot = () => false;
export function ButtonSoundEffects({ children }: {children: ReactNode}) {
  const enabled = useSyncExternalStore(subscribeSound, soundSnapshot, serverSoundSnapshot);
  useEffect(() => { if (enabled) { preloadButtonSound(); preloadRimSound(); } }, [enabled]);
  return <SkeuoSoundProvider enabled={enabled} onSound={playButtonSound} onTurnSound={playRimTurnSound}>{children}</SkeuoSoundProvider>;
}
export function SoundToggle() {
  const enabled = useSyncExternalStore(subscribeSound, soundSnapshot, serverSoundSnapshot);
  return <button type="button" className="docs-theme-toggle" data-sound="off" aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"} aria-pressed={enabled} onClick={() => { const next = !enabled; fallbackEnabled = next; try { localStorage.setItem(SOUND_KEY, next ? "on" : "off"); } catch {} window.dispatchEvent(new Event("skeuomorphism-sound-change")); }}><Icon name={enabled ? "volume" : "muted"} size={17} /></button>;
}
