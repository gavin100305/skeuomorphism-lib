---
name: skeuomorphism-ui
description: Install and compose Skeuomorphism UI React components from the skeuomorphism-lib shadcn registry, or develop separate additions when requested. Use for this library's tactile controls and material tokens, not generic skeuomorphic graphics.
---

# Skeuomorphism UI

Determine whether the task consumes this library or requests a new component in its source repository. Inspect the project before choosing aliases, package commands or a registry origin.

## Use existing components

Read [the component map](references/components.md) for real item names, exports and caller contracts. Inspect the host's shadcn configuration, existing files and CSS-import support. Use its package runner and configured UI alias. Do not assume an npm package or an `@skeuomorphism` registry namespace exists.

The original registry origin is `https://skeuomorphismui.vercel.app`, with items under `/r/ITEM.json`. Confirm the requested item is reachable before installation. For local or fork-only work, use the verified server/deployment origin; do not advertise an unserved item. Review differences before replacing customized consumer files. Do not initialize or reconfigure an existing app merely to install one control.

State and event handlers require a client boundary in Next.js. The host owns controlled values, theme persistence, user data, backend submission and media assets. Providers are optional. Sound stays disabled unless explicitly enabled with a caller-provided playback callback.

## Preserve the source project

In the skeuomorphism-lib fork, preserve Gavin's existing component implementations, shared styles and landing page. Build requested additions in separate files. A request to add a component does not by itself authorize redesigning the landing, refactoring the collection or changing its navigation/catalog. Modify original files only when the user explicitly requests or permits that integration.

For a requested addition, read [the contributor reference](references/contributing.md). When planning only, return the plan without creating components, routes or registry outputs. Skill maintenance likewise does not authorize UI work.

## Material and behavior

Follow the existing material language unless the brief changes it: raised faces, recessed wells, top-left highlights and physical pressed feedback. Use semantic host colors through existing `--sk-*` tokens. Scope new styles under `sk-*` and `data-sk-root`; do not reset the host app or change shared tokens to style one addition.

Keep portable code independent of Next.js, website aliases, Tailwind, demo assets and document-wide side effects. Preserve labels, keyboard behavior, visible focus, disabled states and reduced-motion handling. Verify narrow layouts and long labels where relevant.

Distinguish source inspection, compilation, actual CLI installation and browser verification in the result. Report what was checked. Do not claim deployment, persistence, backend delivery or a complete accessibility audit from a local demonstration.
