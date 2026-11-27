"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import "./styles/skeuo-checkbox.css";

export type SkeuoCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "defaultChecked" | "onChange"
> & {
  label: ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function SkeuoCheckbox({
  label, checked, onCheckedChange, className = "", ...props
}: SkeuoCheckboxProps) {
  return (
    <label data-sk-root="" className={`sk-checkbox ${className}`.trim()}>
      <input
        {...props}
        type="checkbox"
        data-sk-selection-sound="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.currentTarget.checked)}
      />
      <span className="sk-checkbox-housing" aria-hidden="true">
        <span className="sk-checkbox-well" />
        <span className="sk-checkbox-axle" />
        <span className="sk-checkbox-tile">
          <span className="sk-checkbox-face"><span className="sk-checkbox-dash" /></span>
          <span className="sk-checkbox-face sk-checkbox-checked-face">
            <svg viewBox="0 0 16 16" fill="none" focusable="false">
              <path d="m3.5 8 3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </span>
      <span className="sk-checkbox-label">{label}</span>
    </label>
  );
}
