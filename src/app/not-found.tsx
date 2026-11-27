import Link from "next/link";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="missing-page">
      <div className="missing-page-panel">
        <div className="missing-page-keys" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
        <h1><span className="sr-only">404. </span>Page not found</h1>
        <p>This page may have moved, or the link may be out of date.</p>
        <nav className="missing-page-actions" aria-label="Find your way back">
          <Link className="tactile primary" href="/docs#components">
            Browse components <Icon name="arrow" size={16} />
          </Link>
          <Link className="text-link" href="/">Back home</Link>
        </nav>
      </div>
    </main>
  );
}
