# New project template downloads

The Templates gallery and every full-page preview offer **Download template**. This flow creates a new project, rather than modifying an existing application.

1. Pick a template (the gallery offers all four; a preview uses its current template).
2. Choose Next.js, React, or Astro under **New Project**.
3. Under **Theme**, choose Ember, Cobalt, or Lime and light/dark appearance.
4. Download the ZIP, extract it, run `npm install`, then `npm run dev`.

A preview's top theme selector, the download dialog, and its bottom-right Customize panel use the same state. The selected color theme and appearance become `initialPalette` and `initialMode` in the generated `src/Template.tsx`. Later visitor choices persist in local storage.

## Included files

Each ZIP includes the chosen template's registry dependency closure, native CSS, framework entry points, TypeScript configuration, package scripts, a README, and the upstream MIT license. The generator reads bundled registry JSON; it does not fetch source at download time or accept arbitrary file paths.

| Framework | Entry | Runtime |
| --- | --- | --- |
| Next.js | `src/app/page.tsx` and `src/app/layout.tsx` | App Router, client template boundary |
| React | `src/main.tsx` and `index.html` | Vite, React, TypeScript |
| Astro | `src/pages/index.astro` | `@astrojs/react`, `client:load` island |

Use Node.js 20.19 or newer. The bundled dependency versions were tested together. All templates use illustrative data and require no environment credentials to start. Customize the copy and connect real data before publishing.

## Download endpoint

`GET /api/templates/download` accepts four required, allowlisted parameters:

| Parameter | Values |
| --- | --- |
| `template` | `skeuo-forma-landing`, `skeuo-glide-landing`, `skeuo-activity-dashboard`, `skeuo-workspace-dashboard` |
| `framework` | `next`, `react`, `astro` |
| `palette` | `ember`, `cobalt`, `lime` |
| `mode` | `light`, `dark` |

Success returns a ZIP attachment with private/no-store caching. Invalid combinations return HTTP 400. The dialog reports request failures and lets the user retry.

## Verification · 7 November 2026

- All twelve template/framework ZIP combinations passed integrity, dependency manifest, selected-default, and archive-path checks.
- A downloaded Forma starter for each of Next.js, React/Vite, and Astro installed in a separate clean directory and passed a production build. The other nine combinations received archive validation, not separate clean production builds.
- The browser downloaded a Next.js ZIP with Lime/light selected. The saved archive was inspected to confirm those props.
- Repository production build, registry regeneration and lint passed (zero errors; seven existing image warnings).
- Browser review covered desktop and narrow gallery layout, the shared mobile sidebar, theme synchronization, the modal's fit, Escape close and focus return. This is not full assistive-technology certification.
