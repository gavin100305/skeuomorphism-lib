import React from "react";
import { Text, TextInput, View, TextInputProps } from "react-native";
import { useSkeuo } from "./theme";
import { styles } from "./styles";
import { SkeuoText } from "./skeuo-text";
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
