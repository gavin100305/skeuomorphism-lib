"use client";
import "./styles/skeuo-key-button.css";

import type { ButtonHTMLAttributes, ReactNode } from "react";
/** The portfolio tech-stack key: a recessed face inside a thick key base. */
export function SkeuoKeyButton({ children, icon, tone = "neutral", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode; tone?: "neutral" | "accent" | "cobalt" }) {
  return <span data-sk-root="" className={`sk-tech-key ${className}`} data-tone={tone}><button {...props} type={props.type ?? "button"} className="sk-tech-key-face">{icon && <span className="sk-tech-socket">{icon}</span>}{children}</button></span>;
}
