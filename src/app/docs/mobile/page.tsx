import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import "@/components/component-documentation.css";
export const metadata: Metadata = {
  title: "Mobile | Skeuomorphism",
  description: "Tactile React Native components for Expo, iOS and Android.",
};
const controls = [
  [
    "SkeuoButton",
    "Raised face, physical press travel, accent and disabled states.",
  ],
  ["SkeuoIconButton", "Compact action with a required accessible label."],
  ["SkeuoInput", "Labeled recessed field with focus and error feedback."],
  ["SkeuoSwitch", "Controlled toggle using React Native Primitives."],
  [
    "SkeuoCheckbox",
    "Controlled checkbox with visible selection and disabled state.",
  ],
  ["SkeuoRadioGroup", "Single selection with labeled radio semantics."],
  [
    "SkeuoSlider",
    "Native community slider with bounds, steps and disabled state.",
  ],
  [
    "SkeuoTabs",
    "Scrollable selection strip. The caller renders the selected content.",
  ],
  ["SkeuoCard", "Bordered surface with a darker lower edge."],
  ["SkeuoBadge", "Small, noninteractive status label."],
  [
    "SkeuoDialog",
    "Controlled native modal with backdrop, Close and Android back dismissal.",
  ],
  [
    "SkeuoBottomSheet",
    "Bottom-aligned native modal. Dismiss with the backdrop or Close. No drag gesture.",
  ],
];
export default function MobilePage() {
  return (
    <main
      id="docs-workspace"
      className="docs-workspace component-documentation"
    >
      <header id="overview" className="doc-component-heading">
        <span className="docs-kicker">REACT NATIVE</span>
        <h1>A familiar touch.</h1>
        <p>
          The same pale surfaces, graphite wells and sage accents, made for iOS
          and Android. Twelve source-owned components, an Expo showcase, and
          optional touch feedback.
        </p>
      </header>
      <section id="installation" className="doc-section">
        <h2>Start with Expo</h2>
        <p>
          The showcase lives in <code>mobile/</code>, separate from the Next.js
          website. Use Node 22.22.2 or newer supported by Expo SDK 58.
        </p>
        <CodeBlock
          name="Run the showcase"
          code={"cd mobile\nnpm ci\nnpx expo start"}
        />
        <p>
          Open the QR code with a compatible Expo Go app, or use a development
          build. The settings example includes every component, appearance
          controls and disabled states. Demo values reset on restart.
        </p>
      </section>
      <section id="source" className="doc-section">
        <h2>Use in your app</h2>
        <p>
          <a href="/api/mobile/download">
            Download the native component source
          </a>
          , then copy the <code>components/skeuomorphic</code> folder into an
          Expo project. The archive includes exact dependency versions. These
          are React Native files with relative imports, separate from the
          website&apos;s shadcn registry.
        </p>
        <CodeBlock
          name="Dependencies"
          code={
            "npx expo install expo-linear-gradient expo-haptics @react-native-community/slider\nnpm install @rn-primitives/checkbox @rn-primitives/switch"
          }
        />
        <p>
          React Native Reusables uses RN Primitives underneath. This collection
          uses those checkbox and switch foundations directly, with native
          styles. NativeWind and Tailwind are not required.
        </p>
        <CodeBlock
          name="App.tsx"
          code={`import { useState } from 'react';
import { View } from 'react-native';
import {
  SkeuoProvider, SkeuoButton, SkeuoSwitch,
} from './components/skeuomorphic';

export default function App() {
  const [enabled, setEnabled] = useState(false);
  return (
    <SkeuoProvider appearance="system" haptics={false}>
      <View style={{ padding: 24, gap: 20 }}>
        <SkeuoSwitch label="Notifications" checked={enabled}
          onCheckedChange={setEnabled} />
        <SkeuoButton onPress={() => setEnabled(true)}>
          Enable notifications
        </SkeuoButton>
      </View>
    </SkeuoProvider>
  );
}`}
        />
      </section>
      <section id="components" className="doc-section">
        <h2>The native collection</h2>
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Behavior</th>
              </tr>
            </thead>
            <tbody>
              {controls.map(([name, description]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Every interactive component is controlled by the caller. Inputs accept
          native TextInput props. Cards accept View props. See{" "}
          <code>mobile/README.md</code> for the complete prop guide and the
          settings screen in <code>mobile/App.tsx</code> for composition.
        </p>
      </section>
      <section id="accessibility" className="doc-section">
        <h2>Theme and platform behavior</h2>
        <p>
          <code>SkeuoProvider</code> accepts light, dark or system appearance.
          Use <code>useSkeuo().colors</code> for screen backgrounds and text.
          Haptics default to off and safely do nothing on unsupported hardware.
          Controls have accessible labels and selection states; motion uses
          immediate press travel without looping animations.
        </p>
        <p>
          Keep screen content inside your app&apos;s safe-area and keyboard
          handling. Modal content scrolls for large text. Native screen-reader
          announcements, hardware haptics and device layouts should be verified
          on your target devices before release.
        </p>
      </section>
    </main>
  );
}
