# Skeuomorphism for React Native

The web library's keys, recessed fields and paper cards, made for touch. The collection includes individual controls, four bottom bars, reusable blocks and three complete sample templates.

Preview everything through the website's Web / Mobile switch. Every preview renders the same React Native source distributed by the registry.

```sh
cd mobile
npm ci
npm start
```

The showcase uses Expo 54, React Native 0.81.5, React 19.1 and NativeWind 4.2.1, matching the Expenser reference app. Use a compatible Expo Go client or development build. A current Expo Go client may no longer support SDK 54, so use an SDK 54 development build when needed. No SDK upgrade is required to consume this collection in an existing Expo 54 / React Native Reusables app.

## Add a component

Start with an Expo app configured for React Native Reusables and NativeWind. Open a component preview on the website and copy its install commands. Expo selects its own native dependency versions; the Reusables-compatible registry adds source under `components/ui/skeuo-native/`. Existing `button` and `text` components are reused through official Reusables registry dependencies. Do not pass an overwrite flag for customized host controls.

The optional `skeuo-native` installer does both dependency and source installation steps. It is served as a small npm tarball by the website; npm configurations that reject URL packages can use the normal commands shown first.

Wrap your app in `SkeuoProvider` from `skeuo-native/theme` for explicit light/dark/system appearance, color overrides, optional `onSound` and opt-in `haptics`. Without a provider, components follow NativeWind's color scheme and remain silent. Templates expect your existing `SafeAreaProvider`.

Pocket uses Expenser's four-tab arrangement with fictional money data. Still has a focus clock, habit checklist and journal. Daybook combines personal activity and a photo collection. Demo changes stay in memory. No authentication, bank connection, SMS import or background notification service is bundled.

See [the component contracts](API.md) and [verification](VERIFICATION.md). Native haptics, keyboard and screen readers need real-device checks. The focus timer uses elapsed wall time while active; it does not schedule background notifications. The bottom sheet is an explicitly dismissed modal panel, without dragging.

MIT. Original library by Gavin. React Native Reusables and RN Primitives retain their respective licenses.
