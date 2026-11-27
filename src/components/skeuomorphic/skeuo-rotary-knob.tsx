"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { useSkeuoTurnSound } from "./skeuo-sound-provider";
import { valueRange } from "./skeuo-value-range";
import "./styles/skeuo-rotary-knob.css";

export type SkeuoRotaryKnobProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  formatValue?: (value: number) => string;
};

const sweep = 270;
const ticks = Array.from({ length: 13 }, (_, index) => -sweep / 2 + index * sweep / 12);

function coordinates(event: PointerEvent<HTMLDivElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  return { x: event.clientX - bounds.left - bounds.width / 2, y: event.clientY - bounds.top - bounds.height / 2 };
}

export function SkeuoRotaryKnob({
  label, value, onValueChange, min = 0, max = 100, step = 1,
  disabled = false, formatValue = String,
}: SkeuoRotaryKnobProps) {
  const id = useId();
  const playTick = useSkeuoTurnSound("knob");
  const range = valueRange(min, max, step);
  const current = range.clamp(value);
  const span = range.max - range.min;
  const unavailable = disabled || span <= 0;
  const [turning, setTurning] = useState(false);
  const drag = useRef<{ pointerId: number; angle: number | null; value: number; emitted: number } | null>(null);

  function startTurn(event: PointerEvent<HTMLDivElement>) {
    if (unavailable || !event.isPrimary || event.button !== 0) return;
    const { x, y } = coordinates(event);
    drag.current = {
      pointerId: event.pointerId,
      angle: Math.hypot(x, y) < 10 ? null : Math.atan2(y, x),
      value: current,
      emitted: current,
    };
    event.currentTarget.dataset.pointerFocus = "";
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    setTurning(true);
  }

  function turn(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (unavailable || !gesture || gesture.pointerId !== event.pointerId) return;
    const { x, y } = coordinates(event);
    if (Math.hypot(x, y) < 10) {
      gesture.angle = null;
      return;
    }
    const angle = Math.atan2(y, x);
    const previous = gesture.angle;
    gesture.angle = angle;
    if (previous === null) return;
    const delta = Math.atan2(Math.sin(angle - previous), Math.cos(angle - previous));
    gesture.value = range.clamp(gesture.value + delta * span / (sweep * Math.PI / 180));
    const next = range.nearest(gesture.value);
    if (next !== gesture.emitted) {
      const direction = next > gesture.emitted ? "clockwise" : "anticlockwise";
      gesture.emitted = next;
      onValueChange(next);
      playTick(direction);
    }
  }

  function endTurn(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    setTurning(false);
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (unavailable) return;
    const offsets: Record<string, number> = {
      ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 10, PageDown: -10,
    };
    const offset = Object.hasOwn(offsets, event.key) ? offsets[event.key] : 0;
    if (!offset && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    delete event.currentTarget.dataset.pointerFocus;
    const next = offset ? range.move(current, offset) : event.key === "Home" ? range.min : range.max;
    if (next !== current) {
      onValueChange(next);
      playTick(next > current ? "clockwise" : "anticlockwise");
    }
  }

  return (
    <div className="sk-rotary" data-sk-root="" data-disabled={unavailable || undefined}>
      <span className="sk-rotary-label" id={id}>{label}</span>
      <div className="sk-rotary-scale">
        <div className="sk-rotary-ticks" aria-hidden="true">
          {ticks.map((angle, index) => <i key={angle} data-major={index % 3 === 0 || undefined} style={{ "--sk-tick": `${angle}deg` } as CSSProperties} />)}
        </div>
        <span className="sk-rotary-min" aria-hidden="true">{range.min}</span>
        <span className="sk-rotary-max" aria-hidden="true">{range.max}</span>
        <div
          className="sk-rotary-control"
          role="slider"
          tabIndex={unavailable ? -1 : 0}
          aria-labelledby={id}
          aria-disabled={unavailable || undefined}
          aria-valuemin={range.min}
          aria-valuemax={range.max}
          aria-valuenow={current}
          aria-valuetext={formatValue(current)}
          data-turning={turning || undefined}
          onPointerDown={startTurn}
          onPointerMove={turn}
          onPointerUp={endTurn}
          onPointerCancel={endTurn}
          onLostPointerCapture={endTurn}
          onKeyDown={handleKey}
          onBlur={(event) => { delete event.currentTarget.dataset.pointerFocus; }}
        >
          <div className="sk-rotary-disc" aria-hidden="true" style={{ "--sk-angle": `${(span ? (current - range.min) / span : 0) * sweep - sweep / 2}deg` } as CSSProperties}>
            <div className="sk-rotary-face"><i /></div>
          </div>
        </div>
      </div>
      <span className="sk-rotary-readout" aria-hidden="true">{formatValue(current)}</span>
    </div>
  );
}
