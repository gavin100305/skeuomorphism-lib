export function RouteSkeleton({ template = false }: { template?: boolean }) {
  return (
    <main
      id={template ? undefined : "docs-workspace"}
      className={template ? "route-skeleton route-skeleton-template" : "route-skeleton"}
    >
      <p className="sr-only" role="status">
        {template ? "Opening template…" : "Loading component…"}
      </p>
      <div className="route-skeleton-content" aria-hidden="true">
        <div className="route-skeleton-heading">
          <span />
          <span />
          <span />
        </div>
        <div className="route-skeleton-preview">
          <div className="route-skeleton-toolbar">
            <span />
            <span />
          </div>
          <div className="route-skeleton-well">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </main>
  );
}
