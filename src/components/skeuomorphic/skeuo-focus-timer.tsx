"use client";
import "./styles/skeuo-focus-timer.css";

import { useEffect, useState } from "react";
import { SkeuoButton as Button } from "./skeuo-button";
import { SkeuoIcon as Icon } from "./skeuo-icons";
export type SkeuoFocusTimerProps = {
  duration?: number;
  heading?: string;
  badge?: string;
  labels?: Partial<{ idle: string; complete: string; start: string; pause: string; reset: string }>;
};
export function SkeuoFocusTimer({ duration = 1500, heading = "A MOMENT OF FOCUS", badge = "01", labels }: SkeuoFocusTimerProps) {
  const copy = { idle:"TAKE YOUR TIME",complete:"SESSION COMPLETE",start:"Start focus",pause:"Pause focus",reset:"Reset focus timer",...labels };
  const [seconds, setSeconds] = useState(duration);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [running]);
  return <article data-sk-root="" className="sk-focus-object sk-tactile-object"><div className="sk-object-overline"><span>{heading}</span><span>{badge}</span></div><div className={`sk-timer-dial ${running && seconds > 0 ? "sk-is-running" : ""}`}><div className="sk-timer-dial-face"><time aria-label={`${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`}>{String(Math.floor(seconds / 60)).padStart(2,"0")}<span>:</span>{String(seconds % 60).padStart(2,"0")}</time><span>{seconds === 0 ? copy.complete : copy.idle}</span></div></div><div className="sk-timer-actions"><Button variant="primary" onClick={() => setRunning(!running)} disabled={seconds === 0}><Icon name={running ? "pause" : "play"} size={13} />{running ? copy.pause : copy.start}</Button><Button square aria-label={copy.reset} onClick={() => { setRunning(false); setSeconds(duration); }}><Icon name="reset" size={16} /></Button></div></article>;
}
