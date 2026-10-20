# Portable component source

This directory is the canonical implementation used by the website previews. Files use the `skeuo-` prefix so installation can coexist with an existing shadcn `button.tsx` or `input.tsx`.

Each component imports its own CSS from `styles/`, which imports the shared namespaced defaults. No Next.js imports, website aliases, global reset, demo images, or website audio paths belong here.

See [the component independence guide](../../../docs/component-independence.md) for themes, optional sound, customization, and the next registry phase.
