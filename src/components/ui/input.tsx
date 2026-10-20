import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`sk-input ${className}`} {...props} />;
}
export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`sk-input sk-textarea ${className}`} {...props} />;
}
