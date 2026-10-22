# Original component map and caller contracts

This reference maps the **19 original items** in `registry.json`. Recheck the repository manifest or installed source when versions differ. `SkeuoTextarea` shares the `skeuo-input` item. The decorative `SkeuoAstronaut` and local icon module are dependency files, not independent item names. Examples from a skill review are not published items.

| Need | Registry item | Export(s) | Host must supply or decide |
| --- | --- | --- | --- |
| Raised action | `skeuo-button` | `SkeuoButton` | Label, handler or form action; optional `variant`, `size`, `square`, `loading` |
| Mechanical key | `skeuo-key-button` | `SkeuoKeyButton` | Children, optional icon ReactNode, `tone` and button behavior |
| Theme control | `skeuo-theme-button` | `SkeuoThemeButton` | Current `theme` and `onThemeChange` that applies it; optional `key`/`round` variant |
| Binary switch | `skeuo-switch` | `SkeuoSwitch` | Controlled `checked`, `onCheckedChange`, accessible name |
| Text fields | `skeuo-input` | `SkeuoInput`, `SkeuoTextarea` | Native props, labels, helper/error association, validation |
| Range control | `skeuo-slider` | `SkeuoSlider` | Controlled numeric `value`, `onValueChange`, accessible name and optional `min/max/step` |
| Tabbed content | `skeuo-tabs` | `SkeuoTabs`, `TabItem` | Items, selected `value`, `onValueChange`, tablist label |
| Raised/inset container | `skeuo-surface` | `SkeuoSurface` | Contents and `raised` or `recessed` variant |
| Section navigation | `skeuo-section-dock` | `SkeuoSectionDock`, `DockItem` | Labeled icon items, selected value, navigation/scroll action |
| Project preview | `skeuo-project-card` | `SkeuoProjectCard` | Title, image/alt or children, optional open callback |
| Identity card | `skeuo-id-card` | `SkeuoIDCard` | Name, role, portrait ReactNode; optional heading and code |
| Activity calendar | `skeuo-contribution-calendar` | `SkeuoContributionCalendar`, `ContributionDay` | Normalized day data; optional compact `mobile` rendering |
| Contact panel | `skeuo-contact-form` | `SkeuoContactForm`, `ContactValues` | Async `onSend` connected to a real backend; optional copy labels |
| Work history | `skeuo-experience-tabs` | `SkeuoExperienceTabs`, `Experience` | Experience records, selected value and callback |
| Timed focus session | `skeuo-focus-timer` | `SkeuoFocusTimer` | Optional initial seconds, heading, badge and copy labels |
| Photographic carousel | `skeuo-photo-carousel` | `SkeuoPhotoCarousel`, `PhotoCarouselItem` | Images, alt text, captions; optional autoplay preference |
| Quote carousel | `skeuo-testimonial-carousel` | `SkeuoTestimonialCarousel`, `Testimonial` | Real quotes and attribution; no invented endorsements |
| Scoped theme | `skeuo-provider` | `SkeuoProvider` | Optional local theme, font and token overrides |
| Opt-in sounds | `skeuo-sound-provider` | `SkeuoSoundProvider` | Enabled preference plus caller-owned playback callbacks/assets |

## Install into a consumer

The original public origin is `https://skeuomorphismui.vercel.app`. The repo pins shadcn CLI 4.22.1; adapt to the host package manager and constraints. For an npm project already configured with `components.json`:

```sh
npx shadcn@4.22.1 add https://skeuomorphismui.vercel.app/r/skeuo-switch.json
npx shadcn@4.22.1 add https://skeuomorphismui.vercel.app/r/skeuo-slider.json
```

Confirm the requested item URL before use. The CLI resolves `@ui/` through the consumer's configuration. Each item includes its local TSX/CSS dependency closure, including shared base/token CSS; do not edit generated JSON directly or import the documentation website's source paths. A CSS-import-capable React bundler is required. Prefixed filenames allow coexistence with a host's existing `button.tsx`.

When updating a copied item, inspect the consumer's existing files and preview the diff before overwrite. The consumer owns modifications to that source. Theme and sound providers remain optional.

## Interaction and data details that are easy to miss

- **Buttons:** The default `type` is `button`; specify `type="submit"` for a form. `loading` disables the control and sets `aria-busy`. Icon-only controls need an accessible name. `SkeuoKeyButton` accepts `tone="neutral" | "accent" | "cobalt"` and a caller-supplied icon; no logo assets are installed.
- **Switch and slider:** Both are controlled. Switch has switch semantics but is implemented with a button, so it is not a native submitted form field. Slider uses an input range; use `aria-valuetext` when units need explanation. Supply labels in the host.
- **Tabs and dock:** Tabs items have unique `value`, `label`, `content`, optional `disabled`; `appearance="segmented" | "keys"` and `colorMode="same" | "alternating"`. Dock items have `value`, `label`, icon ReactNode; `orientation="vertical" | "horizontal"`. Start with a valid selected item. Dock reports selection; it does not navigate on its own.
- **Cards:** Project card is an article unless `onOpen` is provided, in which case it becomes a button. Provide meaningful `imageAlt`; use children for custom artwork. ID card accepts any portrait ReactNode rather than requiring its sample astronaut.
- **Calendar:** `ContributionDay` uses `date` as `YYYY-MM-DD`, nonnegative `count` and `level` from 0 to 4. Fetch and normalize GitHub or other data in the host; the item does not connect to an account.
- **Contact form:** `onSend(values)` must resolve only after actual delivery and reject on failure. The component reports success/error state and clears the form on success. Server credentials and endpoint stay in the host; the sample site does not send mail.
- **Carousels:** Supply genuine content and alt text. `SkeuoPhotoCarousel` has `autoPlay` defaulting to true; set false when the application needs manual advancement. The item does not install the website's example photos. Testimonials should come from actual users; sample quotes in docs are placeholders.
- **Timer:** `duration` is an initial duration in seconds, clamped to 1–60 minutes, not a controlled countdown prop. Labels, heading and badge can be replaced. Sound on rim turns requires the optional sound provider and a caller callback.
- **Providers:** `SkeuoProvider` scopes theme/fonts/tokens and renders with `display: contents` by default; use a separate box or explicit display style for background/padding/layout. `SkeuoSoundProvider` defaults to silent and only calls host playback when `enabled` is true. Never bundle a fixed website WAV path into a consumer.

## Controlled settings example

After installing switch and slider, replace the example alias with the consumer's actual UI alias:

```tsx
"use client";

import { useState } from "react";
import { SkeuoSwitch } from "@/components/ui/skeuo-switch";
import { SkeuoSlider } from "@/components/ui/skeuo-slider";

export function SettingsExample() {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(35);

  return (
    <section aria-label="Playback settings">
      <label>
        Enable playback
        <SkeuoSwitch checked={enabled} onCheckedChange={setEnabled}
          aria-label="Enable playback" />
      </label>
      <label>
        Volume: {volume}%
        <SkeuoSlider value={volume} onValueChange={setVolume}
          min={0} max={100} step={5} aria-label="Volume" />
      </label>
    </section>
  );
}
```

This only manages local UI state. It does not play audio, persist preferences or submit a form.

## Theme contract

The originals use `.light`, `.dark`, `data-theme="light|dark"` or the browser preference when no theme is explicit. Modern semantic tokens such as `--primary`, `--secondary`, `--card`, `--muted`, `--border` and `--ring` feed the existing `--sk-*` aliases. Supply complete CSS colors, not bare HSL channels. Keep foreground/background pairs readable. A scoped provider can override local tokens without rewriting the consumer's global palette or the library's shared stylesheet.
