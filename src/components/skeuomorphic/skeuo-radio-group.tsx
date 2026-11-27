"use client";

import { useId, useLayoutEffect, useRef } from "react";
import type { FieldsetHTMLAttributes, ReactNode } from "react";
import "./styles/skeuo-radio-group.css";

export type SkeuoRadioOption = { value: string; label: ReactNode; disabled?: boolean };

export type SkeuoRadioGroupProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "children" | "onChange"
> & {
  label: string;
  value: string;
  options: readonly SkeuoRadioOption[];
  onValueChange: (value: string) => void;
  required?: boolean;
};

export function SkeuoRadioGroup({
  label, value, options, onValueChange, required, name, form, className = "", ...props
}: SkeuoRadioGroupProps) {
  const id = useId();
  const scroll = useRef<HTMLDivElement>(null);
  const rows = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const viewport = scroll.current;
    const list = rows.current;
    const indicator = marker.current;
    if (!viewport || !list || !indicator) return;

    const selected = list.querySelector("input:checked")?.closest<HTMLElement>(".sk-radio-option");
    if (!selected) {
      delete indicator.dataset.ready;
      return;
    }

    function update(keepSelectionVisible: boolean) {
      if (!viewport || !list || !indicator || !selected) return;
      const top = selected.offsetTop;
      const height = selected.offsetHeight;
      const center = top + height / 2;
      const previous = parseFloat(indicator.style.getPropertyValue("--sk-radio-marker-y"));
      const outside = top < viewport.scrollTop || top + height > viewport.scrollTop + viewport.clientHeight;
      if (keepSelectionVisible && outside && center !== previous) {
        viewport.scrollTop = Math.max(0, top - (viewport.clientHeight - height) / 2);
      }
      if (center === previous && indicator.dataset.ready) return;
      indicator.dataset.animate = String(!!indicator.dataset.ready && !outside && Math.abs(center - previous) <= 156);
      indicator.style.setProperty("--sk-radio-marker-y", `${center}px`);
      indicator.dataset.ready = "true";
    }

    update(true);
    const observer = new ResizeObserver(() => update(false));
    observer.observe(list);
    for (const row of list.querySelectorAll(".sk-radio-option")) observer.observe(row);
    return () => observer.disconnect();
  }, [value, options]);

  if (!options.length) return null;

  return (
    <fieldset {...props} form={form} data-sk-root="" className={`sk-radio-group ${className}`.trim()}>
      <legend className="sk-radio-legend">{label}</legend>
      <div ref={scroll} className="sk-radio-scroll">
        <div ref={rows} className="sk-radio-rows">
          <span className="sk-radio-rail" aria-hidden="true" />
          {options.map((option) => (
            <label className="sk-radio-option" key={option.value}>
              <input
                type="radio"
                data-sk-selection-sound="radio"
                name={name ?? id}
                form={form}
                value={option.value}
                checked={option.value === value}
                disabled={option.disabled}
                required={required}
                onChange={() => onValueChange(option.value)}
              />
              <span className="sk-radio-notch" aria-hidden="true" />
              <span className="sk-radio-label">{option.label}</span>
            </label>
          ))}
          <span ref={marker} className="sk-radio-marker" aria-hidden="true" />
        </div>
      </div>
    </fieldset>
  );
}
