import "./styles/skeuo-button.css";
import type { ButtonHTMLAttributes } from "react";

export type SkeuoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
  square?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

/** A raised control with a physical pressed state. */
export function SkeuoButton({ variant = "default", square = false, size = "md", loading = false, disabled, children, className = "", type = "button", ...props }: SkeuoButtonProps) {
  return <button data-sk-root="" type={type} disabled={disabled || loading} aria-busy={loading || undefined} data-size={size} className={`sk-button ${variant === "primary" ? "sk-primary" : ""} ${square ? "sk-square" : ""} ${className}`} {...props}>{loading && <span className="sk-spinner" aria-hidden="true" />}{children}</button>;
}
