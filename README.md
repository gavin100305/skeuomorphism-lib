<div align="center">

# Skeuomorphism UI

**Interfaces you can almost feel.**

The source code and shadcn registry behind Skeuomorphism UI.<br />
Tactile React components with raised keys, recessed fields, layered cards, and physical feedback.

[Documentation](https://skeuomorphismui.vercel.app/docs) · [Browse components](https://skeuomorphismui.vercel.app/docs#components) · [Report a bug](https://github.com/gavin100305/skeuomorphism-lib/issues) · [Contribute](#contributing)

[![MIT License](https://img.shields.io/badge/license-MIT-365e50)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-included-3178c6)](https://www.typescriptlang.org/)

</div>

## Start building

Install individual components into your React project using the shadcn CLI. You receive editable TypeScript and CSS files in your own codebase, including each component’s local dependencies.

### 1. Prepare your project

You need a React application that supports CSS imports and a configured shadcn `components.json`. Already using shadcn? Skip this step.

```bash
npx shadcn@4.22.1 init
```

### 2. Add a component

```bash
npx shadcn@4.22.1 add https://skeuomorphismui.vercel.app/r/skeuo-button.json
```

### 3. Use it

```tsx
import { SkeuoButton } from "@/components/ui/skeuo-button";

export function SaveButton() {
  return <SkeuoButton variant="primary">Save changes</SkeuoButton>;
}
```

The CLI uses your configured UI directory; adjust the import path to match your aliases. In Next.js, examples with state or event handlers belong in a client component.

Find the installation command, props, and examples for each component in the [documentation](https://skeuomorphismui.vercel.app/docs).

## What gets installed?

For the standard button, the registry copies:

```text
components/ui/
├── skeuo-button.tsx
└── styles/
    ├── skeuo-button.css
    ├── skeuo-base.css
    └── skeuo-tokens.css
```

Other items include their own required controls and local icons where needed.

- **Editable source.** Customize the installed files directly. There is no separate runtime library package to install.
- **Styles included.** Components bring their own CSS and do not require the website’s global styles or Tailwind setup.
- **Prefixed names.** Files use `skeuo-*`, classes use `sk-*`, and internal tokens use `--sk-*`. An existing shadcn `button.tsx` can coexist with `skeuo-button.tsx`.
- **Scoped defaults.** The component baseline stays within `data-sk-root`; it does not reset ordinary host buttons or inputs.
- **Your content.** Supply your own images, icons, text, and data. Website demo media is not part of an installation.

## Components

The registry contains **19 installable items**, including two optional providers. Input and textarea share one registry item.

| Area | Documentation |
| --- | --- |
| Buttons | [Standard](https://skeuomorphismui.vercel.app/docs/button) · [Theme](https://skeuomorphismui.vercel.app/docs/theme-button) · [Keyboard](https://skeuomorphismui.vercel.app/docs/keyboard-button) |
| Form controls | [Input](https://skeuomorphismui.vercel.app/docs/input) · [Textarea](https://skeuomorphismui.vercel.app/docs/textarea) · [Switch](https://skeuomorphismui.vercel.app/docs/switch) · [Slider](https://skeuomorphismui.vercel.app/docs/slider) |
| Structure | [Surface](https://skeuomorphismui.vercel.app/docs/surface) · [Tabs](https://skeuomorphismui.vercel.app/docs/tabs) · [Section Dock](https://skeuomorphismui.vercel.app/docs/section-dock) |
| Cards | [Project Card](https://skeuomorphismui.vercel.app/docs/project-card) · [ID Card](https://skeuomorphismui.vercel.app/docs/id-card) · [Contact Form](https://skeuomorphismui.vercel.app/docs/contact-form) · [Experience Tabs](https://skeuomorphismui.vercel.app/docs/experience-tabs) |
| Interactive pieces | [Contribution Calendar](https://skeuomorphismui.vercel.app/docs/contribution-calendar) · [Focus Timer](https://skeuomorphismui.vercel.app/docs/focus-timer) · [Photo Carousel](https://skeuomorphismui.vercel.app/docs/photo-carousel) · [Testimonial Carousel](https://skeuomorphismui.vercel.app/docs/testimonial-carousel) |
| Optional providers | [Theme Provider](https://skeuomorphismui.vercel.app/docs/provider) · [Sound Provider](https://skeuomorphismui.vercel.app/docs/sound-provider) |

## Make it fit your application

### Colors and themes

Components read familiar semantic CSS variables, including `--primary`, `--secondary`, `--card`, `--border`, and `--ring`. For example:

```css
:root {
  --primary: #365e50;
  --primary-foreground: #ffffff;
  --secondary: #eeeeeb;
  --secondary-foreground: #202020;
}

.dark {
  --primary: #9ab5a6;
  --primary-foreground: #14251c;
  --secondary: #292a29;
  --secondary-foreground: #efefeb;
}
```

Use complete CSS colors such as hex, `rgb()`, or `oklch()`, rather than bare HSL channels. Highlights and shaded bases derive from the palette; material defaults remain available when host tokens are absent.

Light and dark styles recognize `.light`, `.dark`, and `data-theme`. Without an explicit root theme, defaults follow the browser’s color preference. The library does not change your document classes or save theme preferences.

For local themes, fonts, or token overrides, use the optional [SkeuoProvider](https://skeuomorphismui.vercel.app/docs/provider). Detailed material customization is available through `--sk-*` tokens. See [theming and token precedence](docs/theming.md).

### Sound and motion

Installed components are **silent by default**. The optional [sound provider](https://skeuomorphismui.vercel.app/docs/sound-provider) connects your playback callback and user preference:

- `onSound(phase, index)` handles button press and release sounds.
- `onTurnSound(direction, index)` handles focus-timer rim ticks, with rapid changes throttled.

Your application owns the audio assets and mute setting. The website’s sound files and playback code are not installed. Motion-heavy components include reduced-motion handling; sound is never required to understand a control’s state.

### Content and behavior

| Component | Your application supplies |
| --- | --- |
| Contact Form | Submission callback and delivery backend |
| Contribution Calendar | Contribution data |
| Cards and carousels | Images, alt text, captions, and other content |
| Theme Button | Theme state, change handler, and persistence |
| Sound Provider | Audio playback and the user’s sound preference |

Each component’s docs describe its keyboard behavior, accessible labels, and customization points. When changing colors or content, retain readable contrast and meaningful labels.

## Working on this repository

This repository contains both the reusable component source and its Next.js documentation website. Installing a registry item does not install the website.

```bash
git clone https://github.com/gavin100305/skeuomorphism-lib.git
cd skeuomorphism-lib
npm ci
npm run registry:build
npm run dev
```

Open [localhost:3000](http://localhost:3000). For another port, use `npm run dev -- --port 3001`.

| Location | Purpose |
| --- | --- |
| `src/components/skeuomorphic/` | Canonical reusable components and scoped CSS |
| `src/components/` | Documentation UI, previews, and website adapters |
| `src/data/` | Component metadata and documentation examples |
| `src/app/` | Website routes and layouts |
| `registry.json` | Installation manifest and dependency lists |
| `public/r/` | Generated registry JSON served by the website |
| `docs/` | Architecture, registry, and theming guides |

The website uses Next.js, React, TypeScript, and Tailwind CSS. Portable components use React, local modules, and native CSS, with no Next.js imports.

## Contributing

Bug fixes, documentation improvements, and focused component refinements are welcome.

1. Open an [issue](https://github.com/gavin100305/skeuomorphism-lib/issues) for a substantial change before starting, so we can agree on scope.
2. Edit the canonical component source and its docs/example. Keep website-only assets and behavior out of portable modules.
3. Regenerate the registry with `npm run registry:build`. Update `registry.json` if the dependency list changes; do not edit generated JSON directly.
4. Check light/dark appearances, keyboard and touch behavior, disabled states, and reduced motion where relevant. Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` before opening a pull request.
5. Describe what changed and include reproduction steps or before/after images for visual changes.

For architectural details, read [component independence](docs/component-independence.md), [registry maintenance](docs/registry.md), and [theming](docs/theming.md).

### Reporting a problem

[Open an issue](https://github.com/gavin100305/skeuomorphism-lib/issues) with the component name, installation command if relevant, framework/browser versions, expected behavior, and a minimal reproduction. For appearance issues, include the active theme and any custom tokens.

## License

Project code is licensed under [MIT](LICENSE), allowing personal and commercial use, modification, and redistribution under its terms. Keep the copyright and license notice with copies or substantial portions of the code.

Third-party images, logos, audio, and dependencies retain their own licenses. Demo assets are not automatically included in the component registry; sound sources are documented in [public/sounds/README.md](public/sounds/README.md).

Built by [Gavin Soares](https://github.com/gavin100305). Explore the live components at [skeuomorphismui.vercel.app](https://skeuomorphismui.vercel.app/).
