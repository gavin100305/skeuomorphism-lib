# Native component contracts

Import the named components from `./components/skeuomorphic`. All state is caller owned. Options use `{ label: string; value: string; disabled?: boolean }`.

| Component | Props |
| --- | --- |
| SkeuoProvider | `children`, `appearance?: 'system' \| 'light' \| 'dark'`, `haptics?: boolean` |
| SkeuoButton | `children`, `onPress`, `disabled?`, `variant?: 'default' \| 'accent'`, `accessibilityLabel?` |
| SkeuoIconButton | Button props with `icon` and required `label`, instead of children |
| SkeuoInput | Native TextInput props plus required `label` and optional `error` |
| SkeuoSwitch | `label`, `checked`, `onCheckedChange`, `disabled?` |
| SkeuoCheckbox | `label`, `checked`, `onCheckedChange`, `disabled?` |
| SkeuoRadioGroup | `label`, `value`, `onValueChange`, `options` |
| SkeuoTabs | `label`, `value`, `onValueChange`, `options`; caller renders content |
| SkeuoSlider | `label`, `value`, `onValueChange`, `minimumValue?` default 0, `maximumValue?` default 100, `step?` default 1, `disabled?` |
| SkeuoCard | Native View props, including children and style |
| SkeuoBadge | String children |
| SkeuoDialog | `open`, `onOpenChange`, `title`, `children` |
| SkeuoBottomSheet | Same as dialog; bottom aligned, no swipe gesture |

`SkeuoText` is a helper for themed body text with optional `muted`. String button children receive themed text automatically; icon content owns its color. Use `useSkeuo().colors.ink`.

Keep slider values within the configured minimum/maximum. Use stable, unique option values. Give all icon actions meaningful labels. Native modals own presentation and Android back dismissal. Put keyboard-heavy forms on a keyboard-aware screen, as in the showcase, and test modal forms with your app's keyboard handling.

The component source has relative imports and does not depend on Expo Router, website CSS or a path alias. It requires React Native and the five runtime dependencies documented in the README. Native app consumers own safe-area layout, navigation, persistence, localization and backend actions.

## Added native pieces

- `SkeuoRotaryKnob`: controlled `label`, `value`, and `onValueChange`, with optional `min`, `max`, `step`, `disabled`, `formatValue`, and `onTurnSound`. Drag around the dial or use accessibility adjustment actions. A provider with `haptics` enabled gives selection feedback.

- `SkeuoKeyButton`: `label`, optional `symbol`, `onPress`, `disabled?`.
- `SkeuoPhotoCarousel`: `items: { uri, title, caption?, imageAlt?, label?, meta?, description? }[]`, optional `label`. Swipe or use the previous/next controls, which stop at the ends. Tap the active print or More info for the photo record. Hosts own image availability.
- `SkeuoProgressRings`: `items: { id, label, value, max, unit?, color? }[]`, optional `title` and `animate`. Tap a ring or legend row to select a goal. The entry sweep respects Reduce Motion.
- `SkeuoTimer`: initial `minutes` defaults to 25 and is clamped to 1–60 minutes. Drag the rim to set a new duration in one-minute steps. Turning the rim pauses the countdown, and reset restores the selected duration. The optional `onComplete` runs when the countdown finishes. Changing minutes after mounting does not reset the current session.
- `SkeuoBottomBar`: `items: { value, label, icon?, disabled? }[]`, `value`, `onValueChange`, `variant` dock/keys/rail/pill, `bottomInset?`. Use your actual safe-area bottom inset.
- `SkeuoDockBar`, `SkeuoKeysBar`, `SkeuoRailBar`, `SkeuoPillBar`: the same bar contract with a fixed design. The dock uses icon-only keys and keeps each item’s label for accessibility. Supply an icon for custom destinations.
- `SummaryCard`: optional `label`, `value`, `detail` strings.
- `TransactionList`: optional `items: { id, name, category, amount, income? }[]`; empty arrays render an empty state.
- `HabitList`: self-contained sample checklist with session state.
- `ActivityChart`: optional `values: number[]`, `label`; visual values are clamped to 0–100.
- `PocketTemplate`, `StillTemplate`, `DaybookTemplate`: self-contained sample compositions. Your app owns production routing, persistence and data integration.

The registry installs each component from a specific file rather than the showcase's barrel export. Imports resolve through your Reusables `components.json` aliases. For example, `SkeuoButton` is in `@/components/ui/skeuo-native/skeuo-button`; Pocket is in `@/components/ui/skeuo-native/templates/pocket`.

Provider additions: `colors?: Partial<typeof themes.light>` and `onSound?: () => void`. Sound playback is supplied by the host. Website previews reuse the existing library sound preference and sample.
