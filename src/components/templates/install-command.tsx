"use client";
import { useState } from "react";

const registry =
  "https://skeuomorphismui.vercel.app/r";
export function InstallCommand({
  name,
  packageManagers = false,
}: {
  name: string;
  packageManagers?: boolean;
}) {
  const [manager, setManager] = useState("npm");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const runners: Record<string, string> = {
    npm: "npx",
    pnpm: "pnpm dlx",
    yarn: "yarn dlx",
    bun: "bunx",
  };
  const command = `${runners[manager]} shadcn@4.22.1 add ${registry}/${name}.json`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
    }
  }
  return (
    <div
      className={`template-install-command ${packageManagers ? "with-package-managers" : ""}`}
    >
      {packageManagers && (
        <div
          className="template-cli-managers"
          role="group"
          aria-label="Package manager"
        >
          {Object.keys(runners).map((key) => (
            <button
              key={key}
              aria-pressed={manager === key}
              onClick={() => {
                setManager(key);
                setCopied(false);
                setFailed(false);
              }}
            >
              {key}
            </button>
          ))}
        </div>
      )}
      <div className="template-cli-code">
        <code>{command}</code>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy install command for ${name}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {packageManagers && (
        <button className="template-cli-copy" type="button" onClick={copy}>
          {copied ? "Copied" : "Copy Command"}
        </button>
      )}
      <span
        role="status"
        className={failed ? "template-cli-error" : "template-command-status"}
      >
        {failed
          ? "Copy failed. Select and copy the command above."
          : copied
            ? "Install command copied"
            : ""}
      </span>
    </div>
  );
}
