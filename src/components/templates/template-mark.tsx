export function TemplateMark({ variant = "default" }: { variant?: string }) {
  return <span className={`tpl-mark tpl-mark-${variant}`} aria-hidden="true"><i /><i /><i /><i /></span>;
}
