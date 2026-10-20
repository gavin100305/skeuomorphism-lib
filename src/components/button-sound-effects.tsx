"use client";
import { useEffect, useState, type ReactNode } from "react";
import { SkeuoSoundProvider } from "./skeuomorphic/skeuo-sound-provider";
import { Icon } from "./icons";
import { playButtonSound, preloadButtonSound } from "@/lib/button-sound";

export const SOUND_KEY = "skeuomorphism-sound";
export function ButtonSoundEffects({ children }: {children: ReactNode}) {
  const [enabled,setEnabled]=useState(false);
  useEffect(() => {
    function sync() {try {const next=localStorage.getItem(SOUND_KEY) !== "off";setEnabled(next);if(next)preloadButtonSound();}catch{setEnabled(true);}}
    sync();window.addEventListener("storage",sync);window.addEventListener("skeuomorphism-sound-change",sync);
    return()=>{window.removeEventListener("storage",sync);window.removeEventListener("skeuomorphism-sound-change",sync);};
  },[]);
  return <SkeuoSoundProvider enabled={enabled} onSound={playButtonSound}>{children}</SkeuoSoundProvider>;
}
export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => { try { setEnabled(localStorage.getItem(SOUND_KEY) !== "off"); } catch {} }, []);
  return <button type="button" className="docs-theme-toggle" data-sound="off" aria-label={enabled ? "Mute button sounds" : "Enable button sounds"} aria-pressed={enabled} onClick={() => { const next = !enabled; setEnabled(next); try { localStorage.setItem(SOUND_KEY, next ? "on" : "off"); } catch {} window.dispatchEvent(new Event("skeuomorphism-sound-change")); }}><Icon name={enabled ? "volume" : "muted"} size={17} /></button>;
}
