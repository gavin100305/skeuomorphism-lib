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
