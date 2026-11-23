import React, { useState } from "react";
import { Text, View } from "react-native";
import { TemplateShell, SectionHeading } from "./template-shell";
import { useSkeuo } from "../theme";
import { SkeuoTimer } from "../skeuo-timer";
import { SkeuoCard } from "../skeuo-card";
import { SkeuoInput } from "../skeuo-input";
import { SkeuoSwitch } from "../skeuo-switch";
import { HabitList } from "../blocks/habit-list";
import { ActivityChart } from "../blocks/activity-chart";
const items = [
  { value: "focus", label: "Focus" },
  { value: "habits", label: "Habits" },
  { value: "journal", label: "Journal" },
  { value: "settings", label: "Settings" },
];
export function StillTemplate() {
  const { colors: c } = useSkeuo();
  const [tab, setTab] = useState("focus");
  const [note, setNote] = useState("");
  const [gentle, setGentle] = useState(true);
  const [done,setDone] = useState(["A little movement"]);
  return (
    <TemplateShell
      name="still"
      subtitle="LESS RUSH. MORE ROOM."
      items={items}
      value={tab}
      onValueChange={setTab}
      variant="keys"
    >
      <View style={{display:tab === "focus" ? "flex" : "none",gap:24}}>
          <SectionHeading
            title="Just this one thing."
            detail="Give your attention somewhere to settle."
          />
          <SkeuoCard style={{ paddingVertical: 30 }}>
            <SkeuoTimer />
          </SkeuoCard>
          <Text style={{ color: c.muted, fontSize: 12, lineHeight: 20 }}>
            Put your phone down. Pick up where you left off.
          </Text>
          <Text style={{ color: c.ink, fontSize: 16, fontWeight: "600" }}>
            Small steps, today
          </Text>
          <HabitList value={done} onValueChange={setDone}/>
      </View>
      {tab === "focus" ? null : tab === "habits" ? (
        <>
          <SectionHeading
            title="A little, every day."
            detail="Progress without the pressure."
          />
          <SkeuoCard>
            <HabitList value={done} onValueChange={setDone}/>
          </SkeuoCard>
          <SkeuoCard>
            <Text style={{ color: c.ink }}>Your week, so far</Text>
            <ActivityChart />
          </SkeuoCard>
        </>
      ) : tab === "journal" ? (
        <>
          <SectionHeading
            title="Leave a thought here."
            detail="It doesn't need to be a big one."
          />
          <SkeuoInput
            label="Today's note"
            placeholder="What made today feel different?"
            multiline
            numberOfLines={8}
            value={note}
            onChangeText={setNote}
          />
          <Text style={{ color: c.muted, fontSize: 12 }}>
            Private to this demo session. Nothing is uploaded.
          </Text>
        </>
      ) : (
        <>
          <SectionHeading title="At your own pace." />
          <SkeuoCard>
            <SkeuoSwitch
              label="Gentle reminders"
              checked={gentle}
              onCheckedChange={setGentle}
            />
            <Text style={{ color: c.muted, lineHeight: 20 }}>
              A sample preference. This template does not schedule system
              notifications.
            </Text>
          </SkeuoCard>
        </>
      )}
    </TemplateShell>
  );
}
