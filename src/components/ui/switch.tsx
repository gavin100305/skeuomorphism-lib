"use client";

import type { ButtonHTMLAttributes } from "react";

type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

/** Controlled switch; provide an accessible label or aria-labelledby. */
export function Switch({ checked, onCheckedChange, className = "", ...props }: SwitchProps) {
  return <button {...props} type="button" className={`physical-switch ${className}`} role="switch" aria-checked={checked} onClick={() => onCheckedChange(!checked)}><span><i /><i /><i /></span></button>;
}
