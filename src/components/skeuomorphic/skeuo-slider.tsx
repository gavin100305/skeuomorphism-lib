"use client";
import "./styles/skeuo-slider.css";

import type { InputHTMLAttributes } from "react";
export type SkeuoSliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  value: number;
  onValueChange: (value: number) => void;
};
export function SkeuoSlider({ value, onValueChange, min = 0, max = 100, className = "", ...props }: SkeuoSliderProps) {
  const progress = Math.min(100, Math.max(0, (value - Number(min)) / (Number(max) - Number(min) || 1) * 100));
  return <div data-sk-root="" className={`sk-slider-housing ${className}`} data-disabled={props.disabled || undefined}><span className="sk-slider-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></span><input {...props} type="range" min={min} max={max} value={value} onChange={e => onValueChange(Number(e.target.value))} /><div className="sk-slider-ticks" aria-hidden="true">{Array.from({ length: 21 }, (_, i) => <i key={i} />)}</div></div>;
}
