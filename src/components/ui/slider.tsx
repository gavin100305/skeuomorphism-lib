"use client";
import type { InputHTMLAttributes } from "react";
type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  value: number;
  onValueChange: (value: number) => void;
};
export function Slider({ value, onValueChange, min = 0, max = 100, className = "", ...props }: SliderProps) {
  const progress = Math.min(100, Math.max(0, (value - Number(min)) / (Number(max) - Number(min) || 1) * 100));
  return <div className={`slider-housing ${className}`} data-disabled={props.disabled || undefined}><span className="slider-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></span><input {...props} type="range" min={min} max={max} value={value} onChange={e => onValueChange(Number(e.target.value))} /><div className="slider-ticks" aria-hidden="true">{Array.from({ length: 21 }, (_, i) => <i key={i} />)}</div></div>;
}
