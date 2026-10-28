# Four tactile starting points

The template collection has two landing pages and two dashboards. Each is a separate React component, with native CSS, three complete palettes, light/dark appearance, and subtle Framer Motion reveals.

## The collection

| Template | Preview route | Export | Registry item |
| --- | --- | --- | --- |
| Forma | `/templates/landing/daymark` | `SkeuoFormaLanding` | `skeuo-forma-landing` |
| Glide | `/templates/landing/glide` | `SkeuoGlideLanding` | `skeuo-glide-landing` |
| Daymark | `/templates/dashboard/activity` | `SkeuoActivityDashboard` | `skeuo-activity-dashboard` |
| Formwork | `/templates/dashboard/workspace` | `SkeuoWorkspaceDashboard` | `skeuo-workspace-dashboard` |

Forma keeps the existing Daymark preview URL so the original local review link still works. Its brand and content are now generic. Reel, Stillroom, Signal, Ledger and Orbit were removed from the active collection.

## Install from this fork

Run one of these commands from an already configured shadcn consumer project. These URLs use the generated JSON files published on this fork's `main` branch:

```sh
npx shadcn@4.22.1 add https://raw.githubusercontent.com/wrestle-R/skeuomorphism-lib/main/public/r/skeuo-forma-landing.json
npx shadcn@4.22.1 add https://raw.githubusercontent.com/wrestle-R/skeuomorphism-lib/main/public/r/skeuo-glide-landing.json
npx shadcn@4.22.1 add https://raw.githubusercontent.com/wrestle-R/skeuomorphism-lib/main/public/r/skeuo-activity-dashboard.json
npx shadcn@4.22.1 add https://raw.githubusercontent.com/wrestle-R/skeuomorphism-lib/main/public/r/skeuo-workspace-dashboard.json
```

The gallery copies these same public HTTPS commands. They do not depend on Gavin's repository or deployment. Do not advertise the original `skeuomorphismui.vercel.app` origin for these new items until that deployment actually serves them.

For local registry development, start this repository and substitute `http://localhost:3113/r/` for the raw GitHub prefix.

Each item includes its local TSX/CSS dependency closure and declares `framer-motion`. It copies only the original library controls used by that template. The template source has no Next.js imports, website aliases, Tailwind requirement, external image requests, backend connections, or fixed sound asset paths.

## Use the source

The following assumes the consumer's UI alias resolves to `@/components/ui`:

```tsx
import { SkeuoFormaLanding } from "@/components/ui/templates/forma-landing";

export default function Page() {
  return (
    <SkeuoFormaLanding
      initialPalette="ember"
      initialMode="dark"
      templatesHref="/templates"
      syncPageBackground
    />
  );
}
```

For Glide, import `SkeuoGlideLanding` from `templates/glide-landing`. For the dashboards, use the corresponding export and filename from the table above. Next.js hosts should place interactive composition behind a client boundary.

### Shared options

| Prop | Type | Behavior |
| --- | --- | --- |
| `initialPalette` | `"ember" \| "cobalt" \| "lime"` | Sets the initial coordinated color system. |
| `initialMode` | `"light" \| "dark"` | Sets the initial appearance. |
| `templatesHref` | `string` | Destination for collection links. Supply a route that exists in the host. |
| `soundControl` | `ReactNode` | Optional host-owned sound preference control. |
| `syncPageBackground` | `boolean` | For a full page, synchronizes the document canvas with the selected palette. Defaults to false and restores previous styles on unmount. |

Selections persist in localStorage when it is available, using a separate versioned key for each template. Stored choices take precedence over initial props. Customize offers exactly three palettes and the library's `SkeuoThemeButton`. It changes the canvas, panels, raised surfaces, inset wells, ink, muted text, borders, highlights, shadows and accents together.

## What each one includes

### Forma

A warm editorial landing with large sans headings, italic serif accents, thin dividers and a circular overview illustration. Generic product copy replaces the tracking product from the reference. It includes a static dashboard still with illustrative data, selectable feature explanations, a live example of the library switch and surface, a native FAQ, and the supplied Pushpin Tear Footer with its pin-and-tear reveal.

### Glide

A separate product landing with a subtle grid, lime palette and a code-drawn chrome loop. The loop replaces the reference's cursor arrow. Feature rows lead into a dense three-panel Bento composition, short setup steps, an FAQ, two rows of sample testimonial stories, and an oversized wordmark footer. The Bento pointer glow stays within its cards. The story marquee pauses on hover, has an explicit pause control, and stops for reduced motion. Quotes are visibly illustrative examples, not claims from real customers.

### Daymark dashboard

A personal activity workspace with a flush sidebar and top bar, joined metric strip, full-width activity chart, top applications, focus details and CSV export. Today, 7-day and 30-day controls select illustrative data. It uses a quieter version of the HyprTrack dashboard's hierarchy, with the library's physical control states.

### Formwork dashboard

An inset team workspace with grouped navigation, optional pinned project links, KPI cards, a local chart-period control, a goal dial, searchable/filterable sample orders, project progress and a member list. Search and status filters work together. Export downloads the filtered sample rows as CSV.

Both dashboards support an expanded sidebar, icon rail and mobile drawer. The profile control stays at the bottom. Opening it from the icon rail expands the sidebar, and its language/appearance panel stays inside the rail. The mobile drawer supports Escape, focus containment and returning focus to its trigger. Navigation and key headings have English/Hindi variants; sample names and descriptive fixture text remain English.

## Sound and motion

The website previews reuse its existing sound provider, assets and mute preference. Portable installs stay silent unless the host supplies its own optional sound provider/callbacks. The templates do not request microphone access or implement recording.

Framer Motion handles short, one-time section reveals. CSS handles small physical hover/press states, the chrome object's slow float and the testimonial marquee. Nonessential motion is disabled when reduced motion is requested. The tear footer keeps its supplied animation and reduced-motion behavior.

## References reviewed

- [HyprTrack website](https://hyprtrack-delta.vercel.app/) and the supplied local Next.js/Tauri code: editorial proportions, warm colors, dashboard hierarchy and sidebar spacing.
- User-supplied Handsfree screenshot: grid, lime direction, feature-row rhythm and wordmark scale. Product behavior and hero object are different.
- [MoneyCouncil Testimonials](https://github.com/wrestle-R/MoneyCouncil/blob/main/frontend/src/components/Landing/Testimonials.jsx) and its imported `testimonials-with-marquee.jsx`: two-row story presentation.
- [MoneyCouncil MagicBento](https://github.com/wrestle-R/MoneyCouncil/blob/main/frontend/src/components/ui/MagicBento.jsx): coordinated card materials and restrained pointer glow. The adaptation avoids its document-wide theme mutation and particle layer.
- Local MajorProject sidebars: grouped navigation and profile preferences.
- Supplied admincn archive: dashboard hierarchy, grouped navigation and data presentation. No admincn source was copied into these templates.

The original 19 library components, shared styles and original site landing remain unchanged by this rebuild. Registry additions are appended separately.

## Validation

- Registry generation passed for all four items.
- shadcn 4.22.1 installed all four into a separate configured React/Vite consumer.
- The consumer's TypeScript check and production build passed without website CSS.
- Repository production build passed.
- Repository lint passed with zero errors and the seven existing image warnings in original files.
- Browser verification and screenshots are recorded in the private local progress document. A build is not a claim of full accessibility certification or backend functionality.
