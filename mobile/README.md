# Skeuomorphism for React Native

The web library's raised controls and recessed fields, translated into native components. This folder is an independent Expo app and a copyable component collection. It does not change the web components.

Use Node 22.22.2+ supported by Expo SDK 58.

```sh
cd mobile
npm ci
npm start
```

Open in a compatible Expo Go client or development build. iOS builds require macOS and Xcode; Android builds require the Android SDK. Haptics depend on hardware and default to off. Showcase settings are in memory only.

To use the library, copy `components/skeuomorphic/` into your Expo app. Install the dependencies listed in this folder's package.json for `expo-linear-gradient`, `expo-haptics`, `@react-native-community/slider`, `@rn-primitives/checkbox`, and `@rn-primitives/switch`. Use `npx expo install` for the Expo/native packages. RN Primitives are the same foundations used by React Native Reusables; no NativeWind setup is required here.

Wrap the app in `SkeuoProvider`. Its `appearance` is `system`, `light`, or `dark`; `haptics` defaults to false. `useSkeuo()` exposes `colors` and `dark` for matching screen backgrounds. The showcase uses `react-native-safe-area-context` for screen insets.

See [the settings example](App.tsx) for every component and [the prop guide](API.md) for contracts. The website has a Mobile entry under Docs and a downloadable source archive at `/api/mobile/download`.

```sh
npm run typecheck
npm run export:check
```

Metro exports verify bundling, not native interaction. Test on your target devices with large text, VoiceOver/TalkBack, the keyboard, Android back, and your own navigation. Bottom sheets are modal panels with explicit dismissal, without drag gestures. No account, notification scheduling, persistence, or sound playback is bundled.

MIT, see [LICENSE](LICENSE). Original web library by Gavin. React Native Primitives remain under their respective licenses.
