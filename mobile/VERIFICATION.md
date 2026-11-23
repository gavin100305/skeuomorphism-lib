# Verification

The showcase and clean-consumer baseline is Expo 54 / React Native 0.81.5 / React 19.1 / NativeWind 4.2.1, matching Expenser. It does not require Expo 58.

```sh
# Repository root
npm ci
npm run build
npm run lint
npm run start -- --port 3201

# Another terminal, after installing Playwright Chromium
npx playwright install chromium
NATIVE_TEST_URL=http://localhost:3201 npm run check:native

# Native source / Metro exports
cd mobile
npm run typecheck
npm run export:check
```

The root build installs the locked mobile dependencies, exports the actual React Native source to isolated web previews, builds the optional CLI tarball, generates all web/native registry items and builds Next.js. Generated preview JS and tarballs are ignored and recreated during builds. Run the native build task before using `next dev` for previews.

24 Nov 2026 validation:

- Root lint passed with seven existing web image warnings. Native TypeScript passed. Native iOS/Android/web Metro exports passed.
- Installed all 26 registry items into a separate Expo 54 consumer using the pinned shadcn engine supported by React Native Reusables. That consumer passed TypeScript and iOS/Android/web Metro exports. Existing RNR Button/Text files were reused without an overwrite flag.
- The optional installer selected SDK 54 native dependencies with `expo install`, then successfully invoked the pinned registry engine. Re-running it skipped unchanged source files.
- Chromium smoke checks cover every native preview, Web/Mobile switching, four bar selection states, expense add/balance updates, theme synchronization, habit state across tabs, focus timer retention across tabs, activity period changes and carousel bounds. Native and original web routes were checked for document overflow at 320/390/768/1280px.
- Light/dark and narrow layouts were visually inspected. The browser preview uses the portable source, not HTML replicas. Website sounds reuse the existing sound setting and playback path; hardware sound/haptics were not independently listened to on a native device.

RNR CLI 0.7.1 failed in this environment while invoking its nested `npx shadcn@latest` command, so displayed commands use the explicitly pinned, documented shadcn-compatible registry engine directly. The npm configuration here rejects remote npm tarball packages; the optional CLI was tested from the locally packed artifact, while its HTTP registry and source installation were tested end to end. Standard per-item commands do not need remote npm tarball packages.

No simulator or physical device was available. iOS requires macOS/Xcode; the Android SDK is absent. Native keyboard, hardware haptics, VoiceOver/TalkBack and native modal focus remain unverified. Test those on target devices before shipping an app. Demo data and edits are in memory only.

The existing Next.js 16.4.2 installation reports a security-upgrade advisory. Its retry path allows a production build; the web framework was not upgraded as part of this collection.
