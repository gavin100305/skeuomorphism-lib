# Component independence

## Canonical source

`src/components/skeuomorphic/` contains the reusable implementations. Both the landing page and documentation import from this directory. The documentation shell remains in the website layer; `src/components/ui/sidebar.*` is its layout, not an installable component. The portable navigation component is `skeuo-section-dock.tsx`.

- Files: `skeuo-button.tsx`, `skeuo-slider.tsx`, and so on.
- Exports: `SkeuoButton`, `SkeuoSlider`, etc.
- Classes: `sk-*`; scoped baseline: `data-sk-root`. Internal state attributes are matched only beneath these component classes.
- Tokens and animations: `--sk-*` and `sk-*`.
- Dependencies: React, standard browser APIs, local component modules, and local CSS. No Next.js imports, website path aliases, global reset, Tailwind utilities, fonts downloaded by the library, or website asset URLs.

Each component imports `styles/skeuo-<component>.css`. That stylesheet imports the common `skeuo-base.css` and `skeuo-tokens.css`. Composite components import their smaller controls, which bring their own styles. Icons are provided by the local `skeuo-icons.tsx` module. There is no all-components barrel import that automatically loads the whole collection.

For example, the standalone button needs only:

```text
skeuo-button.tsx
styles/skeuo-button.css
styles/skeuo-base.css
styles/skeuo-tokens.css
```

These prefixed filenames can coexist with an application's existing shadcn `components/ui/button.tsx`. No installation command or registry endpoint is published in this phase.

## Themes and customization

The namespaced token defaults recognize `.dark`, `.light`, `data-theme="dark"`, and `data-theme="light"`. Without an explicit root theme they follow the browser's color preference. They do not write classes, storage, or a global `color-scheme` property.

The optional `SkeuoProvider` sets a local theme and font choices. Its `style` prop accepts typed `--sk-*` overrides. A provider is not required when the host already supplies its theme convention.

```tsx
<SkeuoProvider
  theme="dark"
  fontFamily="Inter, sans-serif"
  monoFontFamily="JetBrains Mono, monospace"
  style={{ "--sk-accent": "#365e50", "--sk-accent-bright": "#487b68" }}
>
  <SkeuoButton variant="primary">Save</SkeuoButton>
</SkeuoProvider>
```

Depth, colors, materials, and fonts can be changed through the prefixed tokens. State classes also use the namespace, such as `sk-primary` and `sk-square`. The scoped baseline applies only to component roots and their descendants; ordinary host buttons and inputs are not restyled.

`SkeuoThemeButton` is controlled:

```tsx
<SkeuoThemeButton theme={theme} onThemeChange={setTheme} />
```

The host's `setTheme` implementation owns persistence and theme application. It can come from next-themes or another application-specific theme controller. The website's `DemoThemeButton` adapter demonstrates its own existing transition; it is not a portable dependency. Custom light/dark icons are accepted.

## Optional sound

Every component is silent by itself. `SkeuoSoundProvider` is also disabled by default. To opt in, supply both `enabled` and an `onSound(phase, index)` callback. The callback receives press/release events from controls within that scope, including touch and keyboard activation. `data-sk-sound="off"` opts an individual control out.

```tsx
<SkeuoSoundProvider enabled={soundEnabled} onSound={playMyClick}>
  <SkeuoButton>Save</SkeuoButton>
</SkeuoSoundProvider>
```

The host owns playback, audio assets, and preferences. No document-wide sound listeners, audio fetches, storage keys, or fixed `/sounds/` paths are installed by the portable modules. The documentation website explicitly opts into its own sound callback and settings.

## Content and media

Photo and project cards accept image sources, alt text, and captions as data. The ID card takes any portrait ReactNode. Dock icons and tech-key icons are supplied by the caller. Demo photographs, the website's tech logos, and its click WAV stay in the website's `public/` directory and are not part of the reusable source tree.

The contact form takes an `onSend` callback; no email provider or credentials are included. Its labels and placeholders are replaceable. Timer labels, heading, and badge are replaceable. Calendar data, testimonials, experience records, and carousel entries are supplied through props.

## Next phase

Describe each component and its dependency closure in `registry.json`, starting with the standard button. Generate its shadcn registry item, then validate actual CLI installation in a clean consumer project. This source-separation phase does not claim published installation or Next.js/Vite consumer verification.
