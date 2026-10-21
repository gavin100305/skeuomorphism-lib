# Original registry components

These are the 19 items in the repository's original `registry.json`. Recheck the current manifest or installed source if the version differs. Input and textarea share one item; the decorative astronaut is not a separate installable item. Checkbox and Progress are not part of this collection.

| Item | Main export |
| --- | --- |
| skeuo-button | SkeuoButton |
| skeuo-key-button | SkeuoKeyButton |
| skeuo-theme-button | SkeuoThemeButton |
| skeuo-switch | SkeuoSwitch |
| skeuo-input | SkeuoInput, SkeuoTextarea |
| skeuo-slider | SkeuoSlider |
| skeuo-tabs | SkeuoTabs |
| skeuo-surface | SkeuoSurface |
| skeuo-section-dock | SkeuoSectionDock |
| skeuo-project-card | SkeuoProjectCard |
| skeuo-id-card | SkeuoIDCard |
| skeuo-contribution-calendar | SkeuoContributionCalendar |
| skeuo-contact-form | SkeuoContactForm |
| skeuo-experience-tabs | SkeuoExperienceTabs |
| skeuo-focus-timer | SkeuoFocusTimer |
| skeuo-photo-carousel | SkeuoPhotoCarousel |
| skeuo-testimonial-carousel | SkeuoTestimonialCarousel |
| skeuo-provider | SkeuoProvider |
| skeuo-sound-provider | SkeuoSoundProvider |

## Installation and imports

From a host already configured for shadcn, use its package runner. The repository pins CLI 4.22.1; match project constraints rather than upgrading unrelated tooling:

```sh
npx shadcn@4.22.1 add https://skeuomorphismui.vercel.app/r/skeuo-switch.json
npx shadcn@4.22.1 add https://skeuomorphismui.vercel.app/r/skeuo-slider.json
```

Confirm the item URLs first. Imports go to the consumer's configured UI directory, not the library website source folder. Prefixed filenames coexist with a host's `button.tsx`. Each item brings its own native CSS and complete local dependency closure; Tailwind and mandatory providers are not required for the copied component. The consumer bundler must support CSS imports.

## Caller contracts

- Button: `variant="default" | "primary"`, `size="sm" | "md" | "lg"`, optional `square`, `loading`, native button props. Loading disables the button. Set `type="submit"` deliberately inside forms.
- Switch: `checked`, `onCheckedChange`, accessible name. It uses a button with switch semantics; do not assume it submits a native form field.
- Slider: numeric `value`, `onValueChange`, optional native `min/max/step` and accessible name.
- Input/textarea: native props. Connect labels, helper text and validation in the host. Both are imported from `skeuo-input`.
- Tabs: `items` with unique value, label, content and optional disabled; controlled `value` and `onValueChange`; `appearance="segmented" | "keys"` and `colorMode="same" | "alternating"`. Choose a valid enabled initial value.
- Dock: caller supplies items with value, label and icon ReactNode. Controlled selection only reports a value; the host owns navigation/scrolling. Choose an initial value present in items.
- Theme button: `theme`, `onThemeChange`, optional `variant="key" | "round"`. The host applies and persists theme.
- Provider: optional local theme, font and typed token overrides. It renders with `display: contents` by default; use a separate wrapper or explicit display style when the scope needs its own background, padding or layout box.
- Contact form: supply async `onSend`; resolve only on success, throw on failure. No email backend is bundled.
- Cards/carousels/calendar: supply your own images, alt text and records. No account fetching or website demo assets installed.
- Sound provider: caller supplies `enabled` and `onSound(phase, index)`. Disabled by default. Do not copy the website's fixed WAV paths or document-wide listeners into consumer code.

## Controlled settings example

After installing the switch and slider, adapt both imports to the actual host UI alias:

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

This example only manages UI state. It does not play audio or persist settings. For signatures not listed here, inspect current source or component docs rather than inventing props from names.

## Themes

Defaults follow `.light`, `.dark`, `data-theme` or the browser preference when no theme is explicit. Modern semantic color values such as `--primary`, `--secondary`, `--card` and `--ring` flow through existing `--sk-*` aliases. Supply complete CSS colors, not bare HSL channels. Scope overrides to the consumer's composition; do not rewrite the library's shared tokens to create a one-off theme. Preserve readable foreground/background pairs.
