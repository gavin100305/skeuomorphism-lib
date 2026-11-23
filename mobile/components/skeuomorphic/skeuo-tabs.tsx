import { ScrollView } from "react-native";
import { styles } from "./styles";
import type { OptionsProps } from "./types";
import { Tab } from "./tab";
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
