# Material language from the original library

Read this for a **new component**. The source is the authority: compare `src/components/skeuomorphic/styles/skeuo-button.css`, `skeuo-key-button.css`, `skeuo-slider.css`, `skeuo-surface.css` and `skeuo-tokens.css` when the repository is available. The repository's `docs/images/component-docs.png` and `landing-light.png` show the materials in context. A consumer project need not copy those website images or its page texture.

## Physical structure

| Visual job | Original pattern | Useful tokens |
| --- | --- | --- |
| Raised face | Fine border, gentle top-left gradient and inner highlight | `--sk-surface-raised`, `--sk-surface`, `--sk-key`, `--sk-highlight`, `--sk-key-edge` |
| Solid base | Slightly darker shelf immediately below the face | `--sk-base`, `--sk-key-base`, `--sk-edge` |
| Contact shadow | Soft shadow beneath the base; keep it subordinate to the edge | `--sk-shadow` |
| Recessed well | Darker inset, inner shadow, slight lower reflection | `--sk-well`, `--sk-edge`, `--sk-shadow`, `--sk-highlight` |
| Active accent | Deep green by default in light mode, sage in dark mode | `--sk-accent`, `--sk-accent-bright`, `--sk-accent-base`, `--sk-accent-edge`, `--sk-accent-ink` |
| Focus | Clear outline independent of color, shadow or selected state | `--sk-ring` |

The button, key and slider CSS use **separate layers** for face, base and contact shadow. A single large blur loses the mechanical read. Pressing a raised key moves it down a few pixels and reduces the base shadow. Hover lift is small. The slider puts the thumb above a recessed channel. Keep highlights from the upper-left within a composition.

Control radii are modest; surfaces can be slightly softer. The exact radius and travel distance should follow the nearest sibling component, not a universal number. Use a clear silhouette before adding decorative texture or extra shadows.

## Color and type

The original light defaults use pale neutral surfaces, a dark ink color and deep green accent. Dark defaults use graphite, light ink and sage. Read `skeuo-tokens.css` for exact current values rather than copying hex colors into a new component. Host semantic colors such as `--primary`, `--secondary`, `--card` and `--ring` can feed these local tokens; use complete CSS colors. Check foreground contrast in both themes when overriding them.

Components inherit host typography. Small mono labels or tabular numbers can suggest equipment, while action labels and status text should remain plainly readable. One component should not download a font or impose page-wide typography.

## Composition and interaction

Leave quiet space around the control. The portable component should fit inside the host's layout; do not give every label, helper line and value its own raised card. The website's subtle grid is page atmosphere, not a dependency of the portable control.

Use native buttons, inputs, `details/summary`, `meter`, `output` or other suitable elements when they provide the needed semantics. Preserve keyboard operation, visible focus, disabled boundaries and long-label wrapping. A hidden native input must stay above its decorative face for pointer interaction, or the label must reliably activate it. The design review samples caught this exact layering error in a radio key.

Prefer state that is readable through shape, position and text as well as color. Disable a control at its real boundary. Avoid duplicate live announcements for one value. Honor reduced motion by removing nonessential transitions; do not make the physical state impossible to understand when animation stops. A 320px review should keep useful touch targets rather than merely hide overflow.

## Before calling it a match

Compare the new control beside a current button/key/slider in both themes. Check the light direction, face/base separation, pressed travel, token use, focus state, disabled state and narrow width. Adjust the new component rather than editing original styles. A screenshot shows the material relationship; interaction and accessibility checks still need to be run separately.
