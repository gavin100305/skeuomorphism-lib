import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
  square?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

/** A raised control with a physical pressed state. */
export function Button({ variant = "default", square = false, size = "md", loading = false, disabled, children, className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} data-size={size} className={`tactile ${variant === "primary" ? "primary" : ""} ${square ? "square" : ""} ${className}`} {...props}>{loading && <span className="sk-spinner" aria-hidden="true" />}{children}</button>;
}
