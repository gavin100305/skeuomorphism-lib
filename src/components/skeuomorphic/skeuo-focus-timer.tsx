"use client";
import "./styles/skeuo-focus-timer.css";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { SkeuoButton as Button } from "./skeuo-button";
import { SkeuoIcon as Icon } from "./skeuo-icons";

export type SkeuoFocusTimerProps = {
  /** Initial duration in seconds, clamped to 1–60 minutes. */
  duration?: number;
  heading?: string;
  badge?: string;
  labels?: Partial<{
    idle: string; complete: string; start: string; pause: string; reset: string;
    adjust: string; hint: string;
  }>;
};

const clampDuration = (value: number) => Math.min(3600, Math.max(60, value));
const initialDuration = (value: number) => Number.isFinite(value) ? clampDuration(Math.round(value)) : 1500;

export function SkeuoFocusTimer({ duration = 1500, heading = "A MOMENT OF FOCUS", badge = "01", labels }: SkeuoFocusTimerProps) {
  const copy = {
    idle: "TAKE YOUR TIME", complete: "SESSION COMPLETE", start: "Start focus",
    pause: "Pause focus", reset: "Reset focus timer", adjust: "Focus duration",
    hint: "Drag the rim to set · 1–60 min", ...labels,
  };
  const hintId = useId();
  const [selectedDuration, setSelectedDuration] = useState(() => initialDuration(duration));
  const [seconds, setSeconds] = useState(() => initialDuration(duration));
  const [running, setRunning] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ pointerId: number; angle: number; value: number } | null>(null);

  useEffect(() => {
    if (!running || seconds === 0) return;
    const timer = setTimeout(() => setSeconds(value => Math.max(0, value - 1)), 1000);
    return () => clearTimeout(timer);
  }, [running, seconds]);

  function selectDuration(value: number) {
    const next = clampDuration(Math.round(value / 60) * 60);
    setSelectedDuration(next);
    setSeconds(next);
    setRunning(false);
  }

  function pointerAngle(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return Math.atan2(event.clientY - rect.top - rect.height / 2, event.clientX - rect.left - rect.width / 2) * 180 / Math.PI;
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const radius = Math.hypot(event.clientX - rect.left - rect.width / 2, event.clientY - rect.top - rect.height / 2);
    // Only the rim is draggable; the recessed clock face stays a readout.
    if (radius < Math.min(rect.width, rect.height) / 2 - 24) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointerId: event.pointerId, angle: pointerAngle(event), value: selectedDuration };
    setRunning(false);
    setDragging(true);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    // Ignore the unstable angle near the centre if a captured pointer crosses it.
    if (Math.hypot(event.clientX - rect.left - rect.width / 2, event.clientY - rect.top - rect.height / 2) < 12) return;
    const angle = pointerAngle(event);
    const delta = ((angle - current.angle + 540) % 360) - 180;
    current.angle = angle;
    current.value = clampDuration(current.value + delta * 10);
    selectDuration(current.value);
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function adjustWithKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    const changes: Record<string, number> = { ArrowRight: 60, ArrowUp: 60, ArrowLeft: -60, ArrowDown: -60, PageUp: 300, PageDown: -300 };
    if (!(event.key in changes) && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    selectDuration(event.key === "Home" ? 60 : event.key === "End" ? 3600 : selectedDuration + changes[event.key]);
  }

  const active = running && seconds > 0;
  return (
    <article data-sk-root="" className="sk-focus-object sk-tactile-object">
      <div className="sk-object-overline"><span>{heading}</span><span>{badge}</span></div>
      <div
        className={`sk-timer-dial ${active ? "sk-is-running" : ""} ${dragging ? "sk-is-adjusting" : ""}`}
        role="slider" tabIndex={0} aria-label={copy.adjust} aria-describedby={hintId}
        aria-valuemin={1} aria-valuemax={60} aria-valuenow={selectedDuration / 60}
        aria-valuetext={`${Math.floor(selectedDuration / 60)} minutes${selectedDuration % 60 ? ` ${selectedDuration % 60} seconds` : ""}`}
        onPointerDown={startDrag} onPointerMove={moveDrag}
        onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag}
        onKeyDown={adjustWithKeyboard}
      >
        <div className="sk-timer-rim" aria-hidden="true" style={{ transform: `rotate(${selectedDuration / 3600 * 360}deg)` }} />
        <div className="sk-timer-dial-face">
          <time aria-label={`${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`}>
            {String(Math.floor(seconds / 60)).padStart(2, "0")}<span>:</span>{String(seconds % 60).padStart(2, "0")}
          </time>
          <span>{seconds === 0 ? copy.complete : copy.idle}</span>
        </div>
      </div>
      <p className="sk-timer-hint" id={hintId}>{copy.hint}</p>
      <div className="sk-timer-actions">
        <Button variant="primary" onClick={() => setRunning(!active)} disabled={seconds === 0 || dragging}>
          <Icon name={active ? "pause" : "play"} size={13} />{active ? copy.pause : copy.start}
        </Button>
        <Button square aria-label={copy.reset} disabled={dragging} onClick={() => { setRunning(false); setSeconds(selectedDuration); }}>
          <Icon name="reset" size={16} />
        </Button>
      </div>
    </article>
  );
}
