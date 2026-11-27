"use client";

import { useId } from "react";
import { valueRange } from "./skeuo-value-range";
import "./styles/skeuo-stepper.css";

export type SkeuoStepperProps = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  formatValue?: (value: number) => string;
};

export function SkeuoStepper({
  label, value, onValueChange, min = 0, max = 99, step = 1,
  disabled = false, formatValue = (number) => String(number).padStart(number >= 0 ? 2 : 0, "0"),
}: SkeuoStepperProps) {
  const id = useId();
  const range = valueRange(min, max, step);
  const current = range.clamp(value);
  const previous = range.move(current, -1);
  const next = range.move(current, 1);

  return (
    <div className="sk-stepper" data-sk-root="" role="group" aria-labelledby={id} data-disabled={disabled || undefined}>
      <span className="sk-stepper-label" id={id}>{label}</span>
      <div className="sk-stepper-tray">
        <button type="button" aria-label={`Decrease ${label}`} disabled={disabled || previous >= current} onClick={() => onValueChange(previous)}><span aria-hidden="true">−</span></button>
        <output className="sk-stepper-readout" aria-labelledby={id}><span>{formatValue(current)}</span></output>
        <button type="button" aria-label={`Increase ${label}`} disabled={disabled || next <= current} onClick={() => onValueChange(next)}><span aria-hidden="true">+</span></button>
      </div>
    </div>
  );
}
