# Semantic theming

Skeuomorphic components read modern shadcn-style CSS color tokens. The library
does not define or overwrite these public tokens. Without host tokens it uses
its exact original light/dark material defaults, including their individual
highlights, inset shades, and layered bases. Existing `--sk-*` overrides remain supported.

## Global palette

Define complete CSS colors in your application's CSS, not bare HSL channels:

```css
:root {
  --background: #ffffff;
  --foreground: #202020;
  --primary: #365e50;
  --primary-foreground: #ffffff;
  --secondary: #eeeeeb;
  --secondary-foreground: #202020;
  --card: #fafaf8;
  --card-foreground: #202020;
  --muted: #e9e9e5;
  --muted-foreground: #686863;
  --border: #d1d1cb;
  --input: #b8b8b1;
  --ring: #365e50;
}
.dark {
  --background: #090909;
  --foreground: #efefeb;
  --primary: #9ab5a6;
  --primary-foreground: #14251c;
  --secondary: #292a29;
  --secondary-foreground: #efefeb;
  --card: #191919;
  --card-foreground: #efefeb;
  --muted: #111111;
  --muted-foreground: #a5a59f;
  --border: #484946;
  --input: #565752;
  --ring: #bbcec2;
}
```

Existing modern shadcn palettes can be used directly. Legacy channel values such
as `--primary: 150 25% 30%` must become complete colors like
`--primary: hsl(150 25% 30%)`. `oklch()` values work directly.

| Host token | Role |
| --- | --- |
| `--primary`, `--primary-foreground` | Primary controls and text |
| `--secondary`, `--secondary-foreground` | Neutral buttons and keyboard keys |
| `--background`, `--foreground` | Base background and text tokens |
| `--card`, `--card-foreground` | Card materials and text |
| `--muted`, `--muted-foreground` | Inset materials and subdued text |
| `--border` | Material edges and separators |
| `--input` | Text-field borders |
| `--ring` | Keyboard focus outlines |

Only when a corresponding host color is supplied are highlights and shaded bases
derived using `color-mix()`. This keeps physical
depth when the palette changes. Fonts, layout, and optional sound are independent
of color. Decorative artwork and the calendar's intentionally off-white keyboard
bed retain their material details; not every illustrative pixel is a theme token.
The library does not apply a background color to your body or reset host elements.

## Scoped palette

Install the optional `skeuo-provider` item to override a local group without
changing the application's global palette:

```tsx
<SkeuoProvider style={{
  "--primary": "#6d3546",
  "--primary-foreground": "#ffffff",
  "--secondary": "#eae5e6",
  "--secondary-foreground": "#302127",
}}>
  <SkeuoButton variant="primary">Save</SkeuoButton>
  <SkeuoButton>Cancel</SkeuoButton>
</SkeuoProvider>
```

The typed style prop re-resolves local aliases and their derived shades. Use this
API for scoped color changes; arbitrary unmarked ancestor color overrides may
not re-resolve aliases inherited from `:root`. Global palettes on `:root`,
`.light`, `.dark`, and `data-theme="light|dark"` scopes are recognized directly.

## Fine control and precedence

Explicit `--sk-*` values take precedence over the semantic defaults. Supply them
on the provider's style alongside semantic values, or in normal overriding CSS.
For example, `--sk-accent-bright` customizes only the primary face highlight.
When changing only `--sk-accent` directly, also override its related derived tokens
if they were already computed in an ancestor scope; semantic provider overrides
do this automatically.

Keep foreground/background pairs together and choose readable contrast for normal,
hover, disabled, and focus states. The library does not automatically calculate
an accessible foreground for an arbitrary custom palette.
