"use client";
import { useEffect, useRef, type ReactNode } from "react";
export type SkeuoSoundPhase = "down" | "up";
export type SkeuoSoundProviderProps = {
  children: ReactNode;
  enabled?: boolean;
  onSound?: (phase: SkeuoSoundPhase, index: number) => void;
};
/** Optional and silent by default. The host owns audio assets, playback, and preferences. */
export function SkeuoSoundProvider({ children, enabled = false, onSound }: SkeuoSoundProviderProps) {
  const counter = useRef(0);
  const down = useRef(new Map<number,number>());
  const recent = useRef(new WeakMap<Element,number>());
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const current = useRef({enabled,onSound});
  useEffect(() => { current.current = {enabled,onSound}; }, [enabled,onSound]);
  useEffect(() => { const pending=timers.current; return () => {pending.forEach(clearTimeout);}; }, []);
  function play(phase: SkeuoSoundPhase, index: number) { if (current.current.enabled) { try {current.current.onSound?.(phase,index);} catch { /* Sound never prevents a control action. */ } } }
  function control(target: EventTarget | null) {
    if (!(target instanceof Element)) return null;
    const button=target.closest("button,[role='button'],a[data-sk-sound]");
    return button && !button.matches(":disabled,[aria-disabled='true'],[data-sound='off'],[data-sk-sound='off']") ? button : null;
  }
  return <div style={{display:"contents"}} onPointerDownCapture={event => {
    const button=control(event.target);
    if(!enabled || !button || !event.isPrimary || event.button !== 0 || event.pointerType === "touch") return;
    const index=counter.current++;down.current.set(event.pointerId,index);recent.current.set(button,performance.now());play("down",index);
  }} onPointerUpCapture={event => {
    const index=down.current.get(event.pointerId);if(index === undefined) return;
    down.current.delete(event.pointerId);const button=control(event.target);if(button)recent.current.set(button,performance.now());play("up",index);
  }} onPointerCancelCapture={event => {const index=down.current.get(event.pointerId);if(index !== undefined){down.current.delete(event.pointerId);play("up",index);}}} onClickCapture={event => {
    const button=control(event.target);
    if(!enabled || !button || performance.now()-(recent.current.get(button) ?? -Infinity)<600) return;
    const index=counter.current++;play("down",index);
    const timer=setTimeout(() => {timers.current.delete(timer);play("up",index);},45);timers.current.add(timer);
  }}>{children}</div>;
}
