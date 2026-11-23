import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  SkeuoProvider,
  useSkeuo,
  SkeuoText,
  SkeuoCard,
  SkeuoButton,
  SkeuoIconButton,
  SkeuoInput,
  SkeuoSwitch,
  SkeuoCheckbox,
  SkeuoRadioGroup,
  SkeuoSlider,
  SkeuoTabs,
  SkeuoBadge,
  SkeuoDialog,
  SkeuoBottomSheet,
} from "../components/skeuomorphic";

export default function App() {
  const [appearance, setAppearance] = useState<"light" | "dark" | "system">(
    "system",
  );
  const [haptics, setHaptics] = useState(false);
  return (
    <SafeAreaProvider>
      <SkeuoProvider appearance={appearance} haptics={haptics}>
        <Settings
          appearance={appearance}
          setAppearance={setAppearance}
          haptics={haptics}
          setHaptics={setHaptics}
        />
      </SkeuoProvider>
    </SafeAreaProvider>
  );
}
function Settings({
  appearance,
  setAppearance,
  haptics,
  setHaptics,
}: {
  appearance: "light" | "dark" | "system";
  setAppearance: (value: "light" | "dark" | "system") => void;
  haptics: boolean;
  setHaptics: (value: boolean) => void;
}) {
  const { colors, dark } = useSkeuo();
  const [name, setName] = useState("Alex Morgan");
  const [notifications, setNotifications] = useState(true);
  const [digest, setDigest] = useState(false);
  const [volume, setVolume] = useState(60);
  const [tab, setTab] = useState("general");
  const [frequency, setFrequency] = useState("daily");
  const [dialog, setDialog] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={dark ? "light" : "dark"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 24,
            gap: 24,
            maxWidth: 620,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SkeuoBadge>Native collection</SkeuoBadge>
            <SkeuoIconButton
              label="About this collection"
              icon={<Text style={{ color: colors.ink, fontSize: 20 }}>ⓘ</Text>}
              onPress={() => setSheet(true)}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text
              accessibilityRole="header"
              style={{
                color: colors.ink,
                fontSize: 36,
                fontWeight: "700",
                letterSpacing: -1,
              }}
            >
              Make it yours.
            </Text>
            <SkeuoText muted>A little depth. A familiar touch.</SkeuoText>
          </View>
          <SkeuoTabs
            label="Settings section"
            value={tab}
            onValueChange={setTab}
            options={[
              { label: "General", value: "general" },
              { label: "Appearance", value: "appearance" },
            ]}
          />
          {tab === "general" ? (
            <>
              <SkeuoCard>
                <Text
                  accessibilityRole="header"
                  style={{ color: colors.ink, fontSize: 22, fontWeight: "600" }}
                >
                  Your profile
                </Text>
                <SkeuoInput
                  label="Display name"
                  value={name}
                  onChangeText={(value) => {
                    setName(value);
                    setSaved(false);
                  }}
                  autoComplete="name"
                  maxLength={80}
                  error={name.trim() ? undefined : "Enter a display name."}
                />
                <SkeuoButton
                  variant="accent"
                  disabled={!name.trim()}
                  onPress={() => {
                    setSaved(true);
                    setDialog(true);
                  }}
                >
                  Save profile
                </SkeuoButton>
                {saved && (
                  <SkeuoText>Profile updated for this session.</SkeuoText>
                )}
              </SkeuoCard>
              <SkeuoCard>
                <Text
                  accessibilityRole="header"
                  style={{ color: colors.ink, fontSize: 22, fontWeight: "600" }}
                >
                  Stay in the loop
                </Text>
                <SkeuoSwitch
                  label="Notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
                <SkeuoCheckbox
                  label="Include a weekly summary"
                  checked={digest}
                  onCheckedChange={setDigest}
                  disabled={!notifications}
                />
                <SkeuoRadioGroup
                  label="Notification frequency"
                  value={frequency}
                  onValueChange={setFrequency}
                  options={[
                    {
                      label: "Daily",
                      value: "daily",
                      disabled: !notifications,
                    },
                    {
                      label: "Only the important things",
                      value: "important",
                      disabled: !notifications,
                    },
                  ]}
                />
                <SkeuoSlider
                  label="Volume"
                  value={volume}
                  onValueChange={setVolume}
                  disabled={!notifications}
                />
              </SkeuoCard>
            </>
          ) : (
            <SkeuoCard>
              <Text
                accessibilityRole="header"
                style={{ color: colors.ink, fontSize: 22, fontWeight: "600" }}
              >
                How it feels
              </Text>
              <SkeuoRadioGroup
                label="Appearance"
                value={appearance}
                onValueChange={(value) =>
                  setAppearance(value as typeof appearance)
                }
                options={[
                  { label: "Match device", value: "system" },
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                ]}
              />
              <SkeuoSwitch
                label="Touch feedback"
                checked={haptics}
                onCheckedChange={setHaptics}
              />
              <SkeuoText muted>
                Haptics are optional and depend on your device.
              </SkeuoText>
            </SkeuoCard>
          )}
          <SkeuoButton onPress={() => setSheet(true)}>
            About the components
          </SkeuoButton>
          <SkeuoText muted>
            Demo settings stay in memory and reset when the app restarts.
          </SkeuoText>
        </ScrollView>
      </KeyboardAvoidingView>
      <SkeuoDialog
        open={dialog}
        onOpenChange={setDialog}
        title="Profile updated"
      >
        <SkeuoText>
          {name.trim()}, your display name is updated in this demo. No account
          or server was changed.
        </SkeuoText>
      </SkeuoDialog>
      <SkeuoBottomSheet
        open={sheet}
        onOpenChange={setSheet}
        title="Built for touch"
      >
        <SkeuoText>
          Twelve reusable React Native controls with light and dark materials.
          Copy the component folder into your Expo app and own the source.
        </SkeuoText>
        <SkeuoBadge>iOS + Android</SkeuoBadge>
      </SkeuoBottomSheet>
    </SafeAreaView>
  );
}
