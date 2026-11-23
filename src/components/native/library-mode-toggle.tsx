"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./native.css";
export function LibraryModeToggle() {
  const pathname = usePathname();
  const mobile = pathname.includes("/mobile");
  const templates = pathname.startsWith("/templates");
  return (
    <div
      className="library-mode-toggle"
      role="group"
      aria-label="Library platform"
    >
      <Link
        href={templates ? "/templates" : "/docs"}
        aria-current={!mobile ? "page" : undefined}
      >
        Web
      </Link>
      <Link
        href={templates ? "/templates/mobile" : "/docs/mobile"}
        aria-current={mobile ? "page" : undefined}
      >
        Mobile
      </Link>
    </div>
  );
}
