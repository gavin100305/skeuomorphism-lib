# Verification

Run with a Node version supported by Expo SDK 58:

```sh
cd mobile
npm ci
npm run typecheck
npm run export:check
```

From the repository root, `npm run lint` includes the mobile TypeScript source and `npm run build` rebuilds both registries and the Next.js website.

Before shipping an app, repeat these checks on actual target devices:

- Empty the display name. Save must be disabled. Enter a name, save, and dismiss the confirmation.
- Disable notifications. The checkbox, frequency radios and volume slider must disable. Re-enable and change each value.
- Switch to Appearance. Select Light, Dark and Match device. Toggle touch feedback on real hardware.
- Open the information panel. Dismiss via Close, backdrop and Android back. Check large text and screen-reader containment.
- Check safe-area layout and keyboard behavior on small and tablet displays.

23 Nov 2026 checks: TypeScript passed; Metro exported iOS, Android and web bundles. The exported web showcase was exercised in Chromium for profile validation/save/dialog, notification-dependent disabling, appearance selection, bottom sheet dismissal and overflow at 320, 768 and 1280 pixels. Both themes were visually inspected. The Next.js production build and lint passed with seven existing web image warnings. Mobile docs rendered at 390px without horizontal overflow. The download endpoint produced a ZIP containing component source, exact dependency versions and the MIT license.

No simulator or physical device was available. Native keyboard, hardware haptics, VoiceOver/TalkBack and native modal focus behavior remain unverified. Web rendering is not native device proof. The existing Next.js version emits a security upgrade advisory during builds; this change does not upgrade the web framework.
