import { Pressable } from "react-native";
import { useSkeuo, useFeedback } from "./theme";
import { styles } from "./styles";
import type { OptionsProps } from "./types";
import { SkeuoText } from "./skeuo-text";
export function Tab({
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
      aria-selected={selected}
      aria-disabled={!!option.disabled}
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
