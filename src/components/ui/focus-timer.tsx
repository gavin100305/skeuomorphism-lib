"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { Icon } from "../icons";
export function FocusTimer({ duration = 1500 }: { duration?: number }) {
  const [seconds, setSeconds] = useState(duration);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000);
    return () => clearInterval(timer);
  }, [running]);
  return <article className="focus-object tactile-object"><div className="object-overline"><span>A MOMENT OF FOCUS</span><span>01</span></div><div className={`timer-dial ${running && seconds > 0 ? "is-running" : ""}`}><div className="timer-dial-face"><time aria-label={`${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`}>{String(Math.floor(seconds / 60)).padStart(2,"0")}<span>:</span>{String(seconds % 60).padStart(2,"0")}</time><span>{seconds === 0 ? "SESSION COMPLETE" : "TAKE YOUR TIME"}</span></div></div><div className="timer-actions"><Button variant="primary" onClick={() => setRunning(!running)} disabled={seconds === 0}><Icon name={running ? "pause" : "play"} size={13} />{running ? "Pause focus" : "Start focus"}</Button><Button square aria-label="Reset focus timer" onClick={() => { setRunning(false); setSeconds(duration); }}><Icon name="reset" size={16} /></Button></div></article>;
}
