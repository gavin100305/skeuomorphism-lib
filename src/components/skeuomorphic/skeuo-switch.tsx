"use client";
import "./styles/skeuo-switch.css";


import type { ButtonHTMLAttributes } from "react";

export type SkeuoSwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

/** Controlled switch; provide an accessible label or aria-labelledby. */
export function SkeuoSwitch({ checked, onCheckedChange, className = "", onClick, ...props }: SkeuoSwitchProps) {
  return <button data-sk-root="" {...props} type="button" className={`sk-switch ${className}`} role="switch" aria-checked={checked} onClick={event => { onClick?.(event); if (!event.defaultPrevented) onCheckedChange(!checked); }}><span><i /><i /><i /></span></button>;
}
