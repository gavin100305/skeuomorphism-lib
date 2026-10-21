# Separate component additions

Use this reference only when asked to develop a component in skeuomorphism-lib. Read the repository's AGENTS.md and current package scripts first. Follow installed Next.js documentation if a separately authorized task involves website routes.

## Preserve original files

Default to separate new TSX/CSS files. Do not change Gavin's existing components, shared CSS, landing, docs shell or navigation. Keep reviewable additions separate from the collection until the user explicitly permits integration. If integration is outside scope, report which registration steps remain rather than silently performing them or repeatedly asking for permission.

Canonical component location: `src/components/skeuomorphic/skeuo-NAME.tsx`; stylesheet: `styles/skeuo-NAME.css`, importing the existing `skeuo-base.css`. Shared base imports tokens. Follow the repository's naming/export conventions. Do not introduce mandatory providers, Next.js imports, website aliases, Tailwind dependencies or fixed demo-asset URLs into portable code.

## Integration map, only when authorized

- `registry.json`: source manifest, with complete TSX/CSS/local dependency closure and stable `@ui/` destinations. Declare any new runtime packages.
- `public/r/`: generated outputs. The original build uses `npm run registry:build`; inspect resulting diffs, and never patch generated JSON by hand.
- `src/data/components.ts`: docs slug, group, description, files, props and accessibility contract.
- `src/data/component-guides.ts`: full usage example and caller responsibilities.
- `src/components/component-demos.tsx`: website-only demo state and fixtures.

The docs route maps a slug to `skeuo-${slug}`, with keyboard-button → skeuo-key-button and textarea → skeuo-input. Do not create a public install command unless the corresponding item is actually served at that origin. A new file alone is not automatic registration in the original catalog.

## Verification

Choose checks for the actual change. For an implemented portable component, compile it with relevant props, install the generated item into a disposable consumer when installation is in scope, and render it without website CSS. Check meaningful interactions, labels, focus, disabled state, narrow layouts and reduced motion as applicable. Preserve existing consumer files and report any unverified browsers or assistive technology.

For skill-only edits, validate the skill, references and examples; do not create UI demos or change the app to exercise a prose instruction. Preserve original attribution and license. No publishing, push or deployment is implied by skill or component work.
