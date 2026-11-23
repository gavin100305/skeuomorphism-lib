import React, { useState } from "react";
import { Text, View } from "react-native";
import { TemplateShell, SectionHeading } from "./template-shell";
import { useSkeuo } from "../theme";
import { SkeuoCard } from "../skeuo-card";
import { SkeuoInput } from "../skeuo-input";
import { SkeuoButton } from "../skeuo-button";
import { SummaryCard } from "../blocks/summary-card";
import { ActivityChart } from "../blocks/activity-chart";
import { HabitList } from "../blocks/habit-list";
import { SkeuoPhotoCarousel } from "../skeuo-photo-carousel";
const items = [
  { value: "home", label: "Today" },
  { value: "activity", label: "Activity" },
  { value: "goals", label: "Goals" },
  { value: "profile", label: "Profile" },
];
export function DaybookTemplate() {
  const { colors: c } = useSkeuo();
  const [tab, setTab] = useState("home");
  const [name, setName] = useState("Alex");
  const [period, setPeriod] = useState(false);
  const [done,setDone] = useState(["A little movement"]);
  return (
    <TemplateShell
      name="daybook"
      subtitle="A RECORD OF THE EVERYDAY"
      items={items}
      value={tab}
      onValueChange={setTab}
      variant="pill"
    >
      {tab === "home" ? (
        <>
          <SectionHeading
            title={`A good day, ${name}.`}
            detail="Make a little space for the things you love."
          />
          <SummaryCard
            label="Time well spent"
            value="24.5 hrs"
            detail="4.5 hours more than last week"
          />
          <SkeuoCard>
            <Text style={{ color: c.ink, fontSize: 16, fontWeight: "600" }}>
              This week&apos;s rhythm
            </Text>
            <ActivityChart />
          </SkeuoCard>
          <SkeuoPhotoCarousel
            items={[
              {
                uri: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=640&q=80",
                title: "Somewhere quiet",
                caption: "A small collection of places worth remembering.",
              },
              {
                uri: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=640&q=80",
                title: "Take the long way home",
              },
            ]}
          />
        </>
      ) : tab === "activity" ? (
        <>
          <SectionHeading
            title="Look how far."
            detail="Illustrative activity, at your own pace."
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <SkeuoButton onPress={() => setPeriod(false)}>
              This week
            </SkeuoButton>
            <SkeuoButton onPress={() => setPeriod(true)}>Last week</SkeuoButton>
          </View>
          <SummaryCard
            label={period ? "Last week" : "This week"}
            value={period ? "20.0 hrs" : "24.5 hrs"}
            detail="Reading, walking and making"
          />
          <SkeuoCard>
            <ActivityChart
              values={period ? [20, 40, 25, 66, 35, 55, 30] : undefined}
            />
          </SkeuoCard>
        </>
      ) : tab === "goals" ? (
        <>
          <SectionHeading
            title="Things worth doing."
            detail="One small promise at a time."
          />
          <SkeuoCard>
            <HabitList value={done} onValueChange={setDone}/>
          </SkeuoCard>
        </>
      ) : (
        <>
          <SectionHeading title="Hello, you." />
          <SkeuoCard>
            <SkeuoInput label="Your name" value={name} onChangeText={setName} />
            <Text style={{ color: c.muted, lineHeight: 20 }}>
              Your personal activity starter. All sample data is fictional and
              changes reset when the demo restarts.
            </Text>
          </SkeuoCard>
        </>
      )}
    </TemplateShell>
  );
}
