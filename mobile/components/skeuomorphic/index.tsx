import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import * as Checkbox from "@rn-primitives/checkbox";
import * as Switch from "@rn-primitives/switch";
import { useFeedback, useSkeuo } from "./theme";
export { SkeuoProvider, useSkeuo, themes } from "./theme";

export function SkeuoText({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  const { colors } = useSkeuo();
  return (
    <Text
      style={{
        color: muted ? colors.muted : colors.ink,
        fontSize: 16,
        lineHeight: 24,
      }}
    >
      {children}
    </Text>
  );
}
export function SkeuoCard({ style, ...props }: ViewProps) {
  const { colors } = useSkeuo();
  return (
    <View
      {...props}
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.edge },
        style,
      ]}
    />
  );
}
type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  variant?: "default" | "accent";
  accessibilityLabel?: string;
};
export function SkeuoButton({
  children,
  onPress,
  disabled = false,
  variant = "default",
  accessibilityLabel,
}: ButtonProps) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  const accent = variant === "accent";
  const [focused, setFocused] = React.useState(false);
  return (
    <Pressable
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => {
        feedback();
        onPress();
      }}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: disabled ? 0.45 : 1,
          borderColor: focused ? colors.accent : colors.edge,
          backgroundColor: colors.base,
          borderBottomWidth: pressed ? 1 : 4,
          transform: [{ translateY: pressed ? 3 : 0 }],
        },
      ]}
    >
      <LinearGradient
        colors={
          accent
            ? [colors.accent, colors.accent]
            : [colors.raised, colors.surface]
        }
        style={styles.face}
      >
        {typeof children === "string" ? (
          <Text
            style={{
              color: accent ? colors.accentInk : colors.ink,
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </LinearGradient>
    </Pressable>
  );
}
export function SkeuoIconButton({
  icon,
  label,
  ...props
}: Omit<ButtonProps, "children" | "accessibilityLabel"> & {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <SkeuoButton {...props} accessibilityLabel={label}>
      {icon}
    </SkeuoButton>
  );
}
export function SkeuoInput({
  label,
  error,
  style,
  ...props
}: TextInputProps & { label: string; error?: string }) {
  const { colors } = useSkeuo();
  const [focused, setFocused] = React.useState(false);
  return (
    <View style={styles.stack}>
      <SkeuoText>{label}</SkeuoText>
      <TextInput
        {...props}
        accessibilityLabel={props.accessibilityLabel ?? label}
        placeholderTextColor={colors.muted}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        style={[
          styles.input,
          {
            color: colors.ink,
            backgroundColor: colors.well,
            borderColor: focused ? colors.accent : colors.edge,
          },
          style,
        ]}
      />
      {error && (
        <Text accessibilityRole="alert" style={{ color: colors.ink }}>
          Error: {error}
        </Text>
      )}
    </View>
  );
}
type ToggleProps = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};
export function SkeuoSwitch({
  label,
  checked,
  onCheckedChange,
  disabled,
}: ToggleProps) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  return (
    <View style={styles.row}>
      <View style={styles.label}>
        <SkeuoText>{label}</SkeuoText>
      </View>
      <Switch.Root
        accessibilityLabel={label}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(v) => {
          feedback();
          onCheckedChange(v);
        }}
        style={StyleSheet.flatten([
          styles.track,
          {
            backgroundColor: checked ? colors.accent : colors.well,
            borderColor: colors.edge,
            opacity: disabled ? 0.45 : 1,
          },
        ])}
      >
        <Switch.Thumb
          style={StyleSheet.flatten([
            styles.thumb,
            {
              backgroundColor: colors.raised,
              transform: [{ translateX: checked ? 20 : 0 }],
            },
          ])}
        />
      </Switch.Root>
    </View>
  );
}
export function SkeuoCheckbox({
  label,
  checked,
  onCheckedChange,
  disabled,
}: ToggleProps) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  return (
    <Checkbox.Root
      accessibilityLabel={label}
      checked={checked}
      disabled={disabled}
      onCheckedChange={(v) => {
        feedback();
        onCheckedChange(v);
      }}
      style={StyleSheet.flatten([styles.row, styles.touch, { opacity: disabled ? 0.45 : 1 }])}
    >
      <View
        style={[
          styles.check,
          {
            backgroundColor: checked ? colors.accent : colors.well,
            borderColor: colors.edge,
          },
        ]}
      >
        <Checkbox.Indicator>
          <Text style={{ color: colors.accentInk, fontWeight: "700" }}>✓</Text>
        </Checkbox.Indicator>
      </View>
      <View style={styles.label}>
        <SkeuoText>{label}</SkeuoText>
      </View>
    </Checkbox.Root>
  );
}
type OptionsProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
};
export function SkeuoRadioGroup({
  label,
  value,
  onValueChange,
  options,
}: OptionsProps) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={label}
      style={styles.stack}
    >
      {options.map((option) => (
        <Pressable
          key={option.value}
          accessibilityRole="radio"
          accessibilityLabel={option.label}
          accessibilityState={{
            checked: value === option.value,
            disabled: !!option.disabled,
          }}
          disabled={option.disabled}
          onPress={() => {
            feedback();
            onValueChange(option.value);
          }}
          style={[
            styles.row,
            styles.touch,
            { opacity: option.disabled ? 0.45 : 1 },
          ]}
        >
          <View
            style={[
              styles.check,
              {
                borderRadius: 20,
                borderColor: colors.edge,
                backgroundColor: colors.well,
              },
            ]}
          >
            {value === option.value && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.accent,
                }}
              />
            )}
          </View>
          <SkeuoText>{option.label}</SkeuoText>
        </Pressable>
      ))}
    </View>
  );
}
export function SkeuoTabs({
  label,
  value,
  onValueChange,
  options,
}: OptionsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      accessibilityLabel={label}
      contentContainerStyle={styles.row}
    >
      {options.map((option) => (
        <Tab
          key={option.value}
          option={option}
          selected={value === option.value}
          onPress={() => onValueChange(option.value)}
        />
      ))}
    </ScrollView>
  );
}
function Tab({
  option,
  selected,
  onPress,
}: {
  option: OptionsProps["options"][number];
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected, disabled: !!option.disabled }}
      disabled={option.disabled}
      onPress={() => {
        feedback();
        onPress();
      }}
      style={[
        styles.tab,
        {
          backgroundColor: selected ? colors.raised : colors.well,
          borderColor: selected ? colors.accent : colors.edge,
          opacity: option.disabled ? 0.45 : 1,
        },
      ]}
    >
      <SkeuoText>{option.label}</SkeuoText>
    </Pressable>
  );
}
export function SkeuoSlider({
  label,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  disabled = false,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
}) {
  const { colors } = useSkeuo();
  const feedback = useFeedback();
  return (
    <View style={styles.stack}>
      <SkeuoText>
        {label}: {value}
      </SkeuoText>
      <Slider
        accessibilityLabel={label}
        value={value}
        onValueChange={onValueChange}
        onSlidingComplete={feedback}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        disabled={disabled}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor={colors.edge}
        thumbTintColor={colors.accent}
        style={{ height: 48, width: "100%" }}
      />
    </View>
  );
}
export function SkeuoBadge({ children }: { children: string }) {
  const { colors } = useSkeuo();
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: colors.well, borderColor: colors.edge },
      ]}
    >
      <Text style={{ color: colors.ink, fontSize: 13, fontWeight: "600" }}>
        {children}
      </Text>
    </View>
  );
}
type OverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
};
function Overlay({
  open,
  onOpenChange,
  title,
  children,
  sheet = false,
}: OverlayProps & { sheet?: boolean }) {
  const { colors } = useSkeuo();
  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <View
        style={[
          styles.overlay,
          { justifyContent: sheet ? "flex-end" : "center" },
        ]}
      >
        <Pressable
          accessibilityLabel="Dismiss"
          accessibilityRole="button"
          style={StyleSheet.absoluteFill}
          onPress={() => onOpenChange(false)}
        />
        <View
          accessibilityViewIsModal
          style={[
            styles.panel,
            {
              backgroundColor: colors.surface,
              borderColor: colors.edge,
              borderBottomLeftRadius: sheet ? 0 : 20,
              borderBottomRightRadius: sheet ? 0 : 20,
            },
          ]}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.stack}
          >
            <Text
              accessibilityRole="header"
              style={{ color: colors.ink, fontSize: 24, fontWeight: "600" }}
            >
              {title}
            </Text>
            {children}
            <SkeuoButton onPress={() => onOpenChange(false)}>Close</SkeuoButton>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
export function SkeuoDialog(props: OverlayProps) {
  return <Overlay {...props} />;
}
export function SkeuoBottomSheet(props: OverlayProps) {
  return <Overlay {...props} sheet />;
}
const styles = StyleSheet.create({
  stack: { gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  label: { flex: 1 },
  card: {
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
  button: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 48,
  },
  face: {
    minHeight: 44,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    minHeight: 52,
    fontSize: 16,
  },
  track: {
    width: 56,
    height: 36,
    borderWidth: 1,
    borderRadius: 20,
    padding: 3,
    marginVertical: 6,
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#88888855",
  },
  touch: { minHeight: 48 },
  check: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    minHeight: 48,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRadius: 10,
    padding: 12,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
  },
  overlay: { flex: 1, backgroundColor: "#00000088", padding: 20 },
  panel: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    maxHeight: "85%",
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
});
