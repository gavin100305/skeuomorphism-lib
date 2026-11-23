import React, { useState } from "react";
import { View, Text } from "react-native";
import { SkeuoCheckbox } from "../skeuo-checkbox";
import { useSkeuo } from "../theme";
export function HabitList({ value, onValueChange }: {value?:string[];onValueChange?:(value:string[])=>void}) {
  const { colors: c } = useSkeuo();
  const [localDone, setLocalDone] = useState<string[]>(["A little movement"]);
  const done = value ?? localDone;
  const setDone = (next:string[]) => { setLocalDone(next); onValueChange?.(next); };
  const labels = [
    "A little movement",
    "Read ten pages",
    "Make something",
    "Get outside",
  ];
  return (
    <View style={{ gap: 12 }}>
      <Text
        accessibilityLiveRegion="polite"
        style={{ color: c.muted, fontSize: 12 }}
      >
        {done.length} of {labels.length} complete today
      </Text>
      {labels.map((label) => (
        <SkeuoCheckbox
          key={label}
          label={label}
          checked={done.includes(label)}
          onCheckedChange={(checked) =>
            setDone(checked ? [...done,label] : done.filter(item=>item!==label))
          }
        />
      ))}
    </View>
  );
}
