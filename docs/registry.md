# Component registry

The registry currently includes `skeuo-button`, `skeuo-switch`, `skeuo-input`
(input and textarea), `skeuo-slider`, `skeuo-surface`, `skeuo-theme-button`, `skeuo-key-button`,
`skeuo-tabs`, `skeuo-section-dock`, and the composite and optional-provider
items listed below. The canonical source stays in
`src/components/skeuomorphic`; `registry.json` describes what the shadcn CLI
copies into a consumer application.

## Build and serve

```sh
npm run registry:build
npm run dev
```

The build writes one JSON file per item under `public/r/`, plus the
`public/r/registry.json` catalog.
These generated files are committed so development can serve them immediately.
`npm run build` regenerates them through `prebuild` before the website build.
Never edit generated JSON directly: edit the canonical source or manifest and
run the registry build again.

Local installation, from a consumer project initialized for shadcn:

```sh
npx shadcn@4.22.1 add http://localhost:3000/r/skeuo-button.json
```

After deployment, replace the localhost origin with the deployed website origin.
There is no published `@skeuomorphism` namespace yet.

## Available items

| Item | Exports |
| --- | --- |
| `skeuo-button` | `SkeuoButton` |
| `skeuo-switch` | `SkeuoSwitch` |
| `skeuo-input` | `SkeuoInput`, `SkeuoTextarea` |
| `skeuo-slider` | `SkeuoSlider` |
| `skeuo-surface` | `SkeuoSurface` |
| `skeuo-theme-button` | `SkeuoThemeButton` (includes local icons) |
| `skeuo-key-button` | `SkeuoKeyButton` |
| `skeuo-tabs` | `SkeuoTabs`, `TabItem` type |
| `skeuo-section-dock` | `SkeuoSectionDock`, `DockItem` type |
| `skeuo-project-card` | `SkeuoProjectCard` |
| `skeuo-id-card` | `SkeuoIDCard` |
| `skeuo-contact-form` | `SkeuoContactForm`, `ContactValues` type |
| `skeuo-contribution-calendar` | `SkeuoContributionCalendar`, `ContributionDay` type |
| `skeuo-focus-timer` | `SkeuoFocusTimer` |
| `skeuo-experience-tabs` | `SkeuoExperienceTabs`, `Experience` type |
| `skeuo-testimonial-carousel` | `SkeuoTestimonialCarousel`, `Testimonial` type |
| `skeuo-photo-carousel` | `SkeuoPhotoCarousel`, `PhotoCarouselItem` type |
| `skeuo-provider` | `SkeuoProvider`, theme/style prop types |
| `skeuo-sound-provider` | `SkeuoSoundProvider`, sound event/prop types |

Use the corresponding item URL with `shadcn add`, for example:

```sh
npx shadcn@4.22.1 add http://localhost:3000/r/skeuo-slider.json
```

Each item includes its own TSX and stylesheet plus the shared base and token
styles. The theme button also includes `skeuo-icons.tsx` and its stylesheet. No dependency on the button item is needed. Input and textarea install
together because their implementation is shared.

## Files and destinations

| Source under `src/components/skeuomorphic/` | Consumer destination |
| --- | --- |
| `skeuo-button.tsx` | `@ui/skeuo-button.tsx` |
| `styles/skeuo-button.css` | `@ui/styles/skeuo-button.css` |
| `styles/skeuo-base.css` | `@ui/styles/skeuo-base.css` |
| `styles/skeuo-tokens.css` | `@ui/styles/skeuo-tokens.css` |

`@ui` is resolved by shadcn using the consumer's configured UI alias, including
projects that use a `src` directory. Relative CSS imports remain intact. No
existing `button.tsx`, global CSS, theme provider, audio setup, or website asset
is installed or changed. React is the only runtime dependency; the consumer's
bundler must support CSS imports. Tailwind utilities are not needed by this item.

Example (adjust the alias to your application):

```tsx
import { SkeuoButton } from "@/components/ui/skeuo-button";

export function SaveButton() {
  return <SkeuoButton variant="primary">Save</SkeuoButton>;
}
```

For event handlers in Next.js, use the button inside a client component.
Themes follow the host's `.dark`, `.light`, or `data-theme` convention.
Buttons remain silent unless a sound integration is separately provided.

## Validation performed

- Built the registry with shadcn CLI 4.22.1.
- Installed the local HTTP item with the actual CLI into a clean React/Vite
  consumer configured with `@/components/ui`.
- Confirmed all four files were created, CSS matched the canonical source, and a
  pre-existing `components/ui/button.tsx` was unchanged.
- Built that consumer with TypeScript and Vite, including primary, loading, dark
  scope, and an event-handler usage. No website styles or providers were imported.
- Type-checked the library website and checked diff whitespace.

The local consumer is an ignored development artifact at
`artifacts/registry-consumer`. This verifies installation and compilation, not
browser interaction, every theme combination, or production hosting.

## Controlled controls

Switch and slider require state and accessible labels in the host application:

```tsx
"use client";
import { useState } from "react";
import { SkeuoSwitch } from "@/components/ui/skeuo-switch";
import { SkeuoSlider } from "@/components/ui/skeuo-slider";

export function Controls() {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(35);
  return <>
    <SkeuoSwitch aria-label="Notifications" checked={enabled} onCheckedChange={setEnabled} />
    <SkeuoSlider aria-label="Volume" value={volume} onValueChange={setVolume} />
  </>;
}
```

The four additional items were installed together into the same clean consumer.
The CLI created eight new files and reused the identical base/token files.
The combined TypeScript/Vite build passed, and all installed CSS matched the
canonical source. Vite reports that the Next.js `use client` directives may be
dropped during bundling; this consumer is entirely client-rendered.
The library website also passed TypeScript checking.

## Theme, keyboard buttons, tabs, and dock

```sh
npx shadcn@4.22.1 add http://localhost:3000/r/skeuo-theme-button.json
npx shadcn@4.22.1 add http://localhost:3000/r/skeuo-key-button.json
npx shadcn@4.22.1 add http://localhost:3000/r/skeuo-tabs.json
npx shadcn@4.22.1 add http://localhost:3000/r/skeuo-section-dock.json
```

- Theme button takes `theme` and `onThemeChange`, with `key` or `round` variants.
  The host callback must apply the selected theme to its own document or scope;
  the button does not manage storage or change the document itself.
- Keyboard button accepts an optional `icon` ReactNode, children, native button
  props, and `tone="neutral"`, `"accent"`, or `"cobalt"`.
- Tabs take `items` with value, label, content, and optional disabled state;
  `value` and `onValueChange` are controlled. Choose `appearance="segmented"`
  or `"keys"`, with `colorMode="same"` or `"alternating"`.
- Section dock takes items with value, label, and caller-provided icon;
  `value` and `onValueChange` are controlled. Use `orientation="vertical"`
  or `"horizontal"`. The host owns scrolling or route navigation.

These four items were installed through the actual CLI alongside the previous
five. Ten files were created; identical shared CSS was reused. The consumer's
TypeScript/Vite build passed with both theme-button variants, keyboard tabs,
and both dock orientations. All nine item dependency closures and installed
CSS were checked, and the existing host button remained unchanged. The website
also passed TypeScript checking. This is compilation validation, not browser
interaction or accessibility testing.

## Composite components and optional providers

Each composite item includes the complete local dependency closure. For example,
`skeuo-contact-form` installs the form, button, input/textarea, icons, and their
styles. No other item needs to be installed first. Identical files shared with
previously installed items are reused by the CLI; review any prompt about changed
files before overwriting local customizations.

```sh
npx shadcn@4.22.1 add http://localhost:3000/r/skeuo-photo-carousel.json
```

Consumer responsibilities:

- Project and ID cards: supply text, image/portrait, and callbacks.
- Contact form: provide `onSend(values): Promise<void>` connected to your backend.
  No mail service, credentials, or endpoint is included.
- Calendar: provide `ContributionDay[]`; no GitHub fetching or credentials.
- Experience tabs: supply records, selected value, and selection callback.
- Photo carousel: supply image URLs, alt text, titles, and details. Demo photos
  are not bundled; `autoPlay={false}` disables automatic advancement.
- Testimonials: supply quotes and attribution. No sample endorsements are installed.
- Focus timer: optionally customize duration, heading, badge, and labels.
- Theme provider: optional local theme/font/token overrides; no font downloads.
- Sound provider: optional and disabled by default. Supply `enabled` and
  `onSound(phase, index)` to opt in. No WAV assets or playback dependency is installed.

These ten items were installed through the CLI into the consumer alongside the
previous nine. The combined TypeScript/Vite consumer build passed with sample
prop usage for each new export, without website styles or assets. The calendar's
ES2023 `findLast`/`findLastIndex` calls were replaced with ES2022-compatible
operations after the consumer compiler caught the mismatch. All 19 generated
items were checked against canonical source and their complete local dependency
closures; installed CSS matched and the host button was preserved.

These checks do not claim browser interaction testing or production deployment.

## Next steps

Add items incrementally, auditing their local dependency closures before exposing
installation commands. Next, connect install instructions to the documentation pages and validate a clean Next.js consumer before deployment. Shared base/token CSS uses
stable destinations, so upgrades should be reviewed before overwriting local
consumer customizations. Do not register the website's documentation sidebar.
