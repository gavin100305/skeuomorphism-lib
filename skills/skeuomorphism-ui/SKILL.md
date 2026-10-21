---
name: skeuomorphism-ui
description: Install and compose Skeuomorphism UI React components from the skeuomorphism-lib shadcn registry, or design separate tactile additions when requested. Use for this library's component APIs, native CSS materials and theme tokens, not generic skeuomorphic graphics.
---

# Skeuomorphism UI

First identify the work: **consume an existing item**, **design a separate new component**, or **maintain this skill**. Inspect the current repository or consumer project before choosing imports, registry URLs or file destinations. Existing source and the user's latest instructions outrank this skill if they differ.

## Consume existing items

Read [component selection and contracts](references/components.md) for the 19 original registry items. Pick the smallest combination that fulfills the request; do not install the whole collection. Check the host's `components.json` aliases, framework, CSS-import support, existing component files and package runner. For a public item, verify that `https://skeuomorphismui.vercel.app/r/<item>.json` is reachable before recommending or running the CLI. A locally changed or fork-only item requires its own verified origin.

The shadcn CLI copies source and native CSS into the consumer project. The host owns that copy. Review differences before overwriting customizations. There is no npm library package, required provider, global reset or mandatory Tailwind setup for the portable components. Match the consumer's UI import alias; examples in the references use `@/components/ui` only as a placeholder.

In Next.js, put state and event handlers behind a client boundary. The host owns application state, persistence, navigation, submission, data fetching, media and sound playback. Never present a demo callback as a working backend or sound that is enabled automatically.

## Design a new component

Read [material language](references/material-language.md) and inspect the closest original component source before choosing geometry, tokens or interaction. Read [separate additions](references/contributing.md) for file and verification boundaries. Preserve Gavin's original components, shared styles, landing, docs shell, navigation and catalog in this fork. Build requested additions in separate files. Change original files only when the user explicitly requests or permits that integration. A request to plan or improve this skill does not authorize app UI changes.

A portable addition should import its local CSS and the existing base/tokens, use `sk-*` classes and `data-sk-root`, respect the host palette, and avoid website-only dependencies. Prefer native semantics, maintain keyboard/focus/disabled behavior, and check light/dark plus narrow widths. Follow the current source when its API or implementation differs from a reference here.

## Report evidence

Name the actual checks performed: source inspection, type/build check, generated registry check, CLI installation into a clean consumer, browser interaction, visual theme review, or assistive technology testing. These are different levels of evidence. State any unverified behavior plainly. Do not claim that a new item is published, that a preview is a production component, or that a successful build proves accessibility.
