"use client";
import { Icon } from "../icons";
import { useThemeToggle } from "../use-theme-toggle";
export function ThemeButton({ variant = "key" }: { variant?: "key" | "round" }) {
  const toggle = useThemeToggle();
  return <button type="button" className={`sk-theme-key ${variant === "round" ? "is-round" : ""}`} aria-label="Toggle light and dark theme" onPointerDown={event => { if(event.button === 0) void toggle(); }} onClick={event => { if(event.detail === 0) void toggle(); }}><span className="theme-sun"><Icon name="sun" size={20}/></span><span className="theme-moon"><Icon name="moon" size={20}/></span></button>;
}
