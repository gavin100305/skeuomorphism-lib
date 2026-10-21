# Developing separate additions in skeuomorphism-lib

Read this only when asked to create or assess a new component. Read the repository's current AGENTS.md, package scripts and adjacent component source first. Follow the installed Next.js documentation if a separately authorized task involves website routes. This skill does not itself authorize a redesign, release or repository integration.

## Keep the source boundary

Preserve Gavin's existing components, shared styles, landing page, docs shell, navigation and original registry catalog unless the user explicitly requests or permits changes there. Put a requested standalone component in a new `src/components/skeuomorphic/skeuo-NAME.tsx` and a new `styles/skeuo-NAME.css`. Import the existing `skeuo-base.css` in its stylesheet; base imports tokens. Name exports and classes consistently (`SkeuoName`, `sk-name`) and mark the root `data-sk-root`.

Do not introduce Next.js imports, website aliases, Tailwind requirements, demo asset URLs, fixed audio paths or document-wide effects into portable source. The component should accept host content and callbacks instead of hiding app data or backend work inside itself. When the user asks only for a plan, make a plan and stop before creating UI files.

## Decide the contract before styling

Record the useful states for the control: default, hover, focus, pressed, selected/checked, disabled, invalid and loading only where they apply. Decide whether state is controlled, initial-only, or native. Pick actual HTML semantics and keyboard behavior. Define the smallest meaningful props, including limits and labels. Check an existing sibling before inventing a new option name.

For instance, a quantity control needs min/max behavior and accessible action names; a meter needs a value and units but no fake upload; a radio group should preserve native selection and arrow keys. Keep state ownership in the host when app behavior is involved.

Apply [the material reference](material-language.md) after the semantic contract is clear. Use local tokens for both themes and give pressed/selected/focus states visible differences. Test a 320px layout with long content; do not shrink actionable targets merely to fit.

## Registration map, only when integration is authorized

A new source file is not automatically an installable registry item or documentation route. When the user explicitly permits registration, update the relevant originals as a separate reviewable change:

1. `registry.json`: add an item with all TSX/CSS/local dependency files at stable `@ui/` destinations. Declare runtime package dependencies if any.
2. `src/data/components.ts`: add slug, group, description, props and accessibility notes. Only expand sidebar group wiring if the chosen group does not exist.
3. `src/data/component-guides.ts`: include a copyable usage example and clear caller responsibilities.
4. `src/components/component-demos.tsx`: use website-only fixtures and local demo state, keeping portable source free of them.
5. Run `npm run registry:build` to generate `public/r/`; inspect the diff. Do not edit generated JSON manually.

The docs route derives `skeuo-${slug}` except keyboard-button → `skeuo-key-button` and textarea → `skeuo-input`. Never advertise a public install URL until that item is served at the stated origin. If registration is outside the task scope, report it as a remaining step without changing originals.

## Meaningful checks

- For a new component: TypeScript/React compile with realistic props; verify state transitions, keyboard focus, disabled boundaries, semantics and label association. Render light/dark and a narrow viewport. Honor reduced motion and check long text where relevant.
- For authorized registry work: run registry generation, install the actual item URL with the pinned shadcn CLI in a disposable configured React consumer, compile it without website CSS, and confirm existing host files remain unchanged. Generated JSON alone does not prove a usable installation.
- For website integration: run relevant repository lint/type/build checks and inspect original routes. Match the check set to the actual change rather than automatically exercising every component.
- For skill-only work: validate the skill, links, item map and examples. Do not create UI demos or modify the app just to test prose.

State the browser, viewport, interaction and remaining gaps in the report. A build does not prove full accessibility. Preserve the original license and attribution. No push, PR, publication or deployment follows merely from adding or reviewing a component; perform those only when the user requests them.
