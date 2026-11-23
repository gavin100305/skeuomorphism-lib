# Native installer

The website builds this dependency-free command into an npm tarball. `skeuo-native add <item-url>` reads native package names from registry metadata, runs `expo install` to choose SDK-compatible versions, then delegates source installation to the shadcn registry engine used by React Native Reusables. Run inside a project already configured for Reusables / NativeWind.

The installer never requests overwrite or changes your Expo SDK. It stops if dependency installation fails. `--yes` accepts the source install; omit it for prompts. Normal per-item Expo + registry commands are also shown on the website, for npm configurations that disallow URL packages.
