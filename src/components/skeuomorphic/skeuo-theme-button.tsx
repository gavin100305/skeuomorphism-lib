"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SkeuoIcon as Icon } from "./skeuo-icons";
import "./styles/skeuo-theme-button.css";
export type SkeuoThemeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
  variant?: "key" | "round";
  lightIcon?: ReactNode;
  darkIcon?: ReactNode;
};
/** Controlled by the host app: no document mutations, storage, or theme-provider dependency. */
export function SkeuoThemeButton({ theme, onThemeChange, variant = "key", lightIcon, darkIcon, className = "", onClick, ...props }: SkeuoThemeButtonProps) {
  return <button {...props} data-sk-root="" type={props.type ?? "button"} className={`sk-theme-key ${variant === "round" ? "sk-is-round" : ""} ${className}`} aria-label={props["aria-label"] ?? `Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={event => { onClick?.(event); if (!event.defaultPrevented) onThemeChange(theme === "dark" ? "light" : "dark"); }}>{theme === "dark" ? (lightIcon ?? <Icon name="sun" size={20} />) : (darkIcon ?? <Icon name="moon" size={20} />)}</button>;
}
