import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TemplateShell, SectionHeading } from "./template-shell";
import { useSkeuo } from "../theme";
import { SkeuoCard } from "../skeuo-card";
import { SkeuoButton } from "../skeuo-button";
import { SkeuoInput } from "../skeuo-input";
import { SkeuoDialog } from "../skeuo-dialog";
import { SkeuoSwitch } from "../skeuo-switch";
import { SummaryCard } from "../blocks/summary-card";
import {
  TransactionList,
  sampleTransactions,
} from "../blocks/transaction-list";
import { ActivityChart } from "../blocks/activity-chart";
const items = [
  { value: "home", label: "Home" },
  { value: "transactions", label: "Transactions" },
  { value: "analysis", label: "Analysis" },
  { value: "profile", label: "Profile" },
];
export function PocketTemplate() {
  const { colors: c } = useSkeuo();
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [privateBalance, setPrivateBalance] = useState(false);
  const [income, setIncome] = useState(false);
  const [name, setName] = useState("Alex Morgan");
  const [cash, setCash] = useState(4260);
  return (
    <TemplateShell
      name="pocket"
      items={items}
      value={tab}
      onValueChange={setTab}
    >
      {tab === "home" ? (
        <>
          <SectionHeading title={`Good morning, ${name.trim().split(/\s+/)[0] || "there"}.`} />
          <LinearGradient
            colors={["#31584b", "#182f28"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 18,
              borderWidth: 1,
              borderColor: "#577365",
              padding: 18,
              gap: 15,
            }}
          >
            <View style={{ gap: 6 }}>
              <Text style={{ color: "#d6e3d9", fontSize: 13 }}>Total balance</Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  color: "#fcf9ef",
                  fontSize: 44,
                  fontWeight: "500",
                  letterSpacing: -2,
                  fontVariant: ["tabular-nums"],
                }}
              >
                {privateBalance ? "••••••" : `₹${(38600 + cash).toLocaleString("en-IN")}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                borderTopWidth: 1,
                borderColor: "#648073",
                paddingTop: 12,
              }}
            >
              {[
                ["Bank", "₹32,400"],
                ["Cash", `₹${cash.toLocaleString("en-IN")}`],
                ["Shared", "₹6,200"],
              ].map(([label, value]) => (
                <View key={label} style={{ flex: 1, gap: 4 }}>
                  <Text style={{ color: "#d6e3d9", fontSize: 11 }}>{label}</Text>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={{ color: "#fcf9ef", fontSize: 15, fontWeight: "600" }}
                  >
                    {privateBalance ? "••••" : value}
                  </Text>
                </View>
              ))}
            </View>
          </LinearGradient>
          <SkeuoButton variant="accent" onPress={() => setAdding(true)}>
            + Add a transaction
          </SkeuoButton>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <Text style={{ color: c.ink, fontWeight: "600", fontSize: 16 }}>
                Recent activity
              </Text>
              <Pressable accessibilityRole="button" hitSlop={10} onPress={() => setTab("transactions")}>
                <Text style={{ color: c.accent, fontWeight: "600", fontSize: 13 }}>View all</Text>
              </Pressable>
            </View>
            <TransactionList items={transactions.slice(0, 2)} />
          </View>
        </>
      ) : tab === "transactions" ? (
        <>
          <SectionHeading
            title="Transactions"
          />
          <SkeuoInput
            label="Search transactions"
            placeholder="Coffee, groceries…"
            value={search}
            onChangeText={setSearch}
          />
          <SkeuoButton onPress={() => setAdding(true)}>
            + Add transaction
          </SkeuoButton>
          <TransactionList
            items={transactions.filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            )}
          />
        </>
      ) : tab === "analysis" ? (
        <>
          <SectionHeading
            title="Spending overview"
            detail="Sample month"
          />
          <SummaryCard
            label="Spent this month"
            value="₹12,840"
            detail="₹2,160 under your monthly plan"
          />
          <SkeuoCard>
            <Text style={{ color: c.ink, fontWeight: "600" }}>
              Daily spending
            </Text>
            <ActivityChart label="Illustrative daily spending" />
            {[
              ["Food & drink", "42%"],
              ["Shopping", "31%"],
              ["Transport", "27%"],
            ].map(([label, value]) => (
              <View
                key={label}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: c.muted }}>{label}</Text>
                <Text style={{ color: c.ink }}>{value}</Text>
              </View>
            ))}
          </SkeuoCard>
        </>
      ) : (
        <>
          <SectionHeading
            title="Profile"
          />
          <SkeuoCard>
            <SkeuoInput
              label="Display name"
              value={name}
              onChangeText={setName}
            />
            <SkeuoSwitch
              label="Hide balances"
              checked={privateBalance}
              onCheckedChange={setPrivateBalance}
            />
            <Text style={{ color: c.muted, fontSize: 12, lineHeight: 19 }}>
              Fictional sample data. Changes stay in this session. No bank
              connection or account required.
            </Text>
          </SkeuoCard>
        </>
      )}
      <SkeuoDialog
        open={adding}
        onOpenChange={setAdding}
        title="A new transaction"
      >
        <SkeuoInput
          label="Description"
          value={description}
          onChangeText={setDescription}
        />
        <SkeuoInput
          label="Amount in rupees"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
        <SkeuoSwitch
          label="This is income"
          checked={income}
          onCheckedChange={setIncome}
        />
        <SkeuoButton
          variant="accent"
          disabled={
            !description.trim() ||
            !Number.isFinite(Number(amount)) ||
            Number(amount) <= 0
          }
          onPress={() => {
            setCash(previous => previous + (income ? 1 : -1) * Number(amount));
            setTransactions((previous) => [
              {
                id: String(Date.now()),
                name: description.trim(),
                category: "Cash · Added just now",
                amount: `${income ? "+" : "−"}₹${Number(amount).toLocaleString("en-IN")}`,
                income,
              },
              ...previous,
            ]);
            setDescription("");
            setAmount("");
            setAdding(false);
            setTab("transactions");
          }}
        >
          Add transaction
        </SkeuoButton>
      </SkeuoDialog>
    </TemplateShell>
  );
}
