"use client";
import { useEffect, useState } from "react";
export function InstallCommand({ name }: { name: string }) {
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setOrigin(window.location.origin));
  }, []);
  const command = `npx shadcn@4.22.1 add ${origin}/r/${name}.json`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="template-install-command">
      <code>{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy install command for ${name}`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" className="template-command-status">
        {copied ? "Install command copied" : ""}
      </span>
    </div>
  );
}
