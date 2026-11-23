import React, { useState } from "react";
import { Text, View } from "react-native";
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
      subtitle="YOUR MONEY, A LITTLE CLEARER"
      items={items}
      value={tab}
      onValueChange={setTab}
    >
      {tab === "home" ? (
        <>
          <SectionHeading
            title={`Good morning, ${name.split(" ")[0]}.`}
            detail="A quiet look at where things stand."
          />
          <SummaryCard value={privateBalance ? "••••••" : `₹${(38600 + cash).toLocaleString("en-IN")}`} />
          <View style={{ flexDirection: "row", gap: 10 }}>
            {[
              ["Bank", "₹32,400"],
              ["Cash", `₹${cash.toLocaleString("en-IN")}`],
              ["Shared", "₹6,200"],
            ].map(([label, value]) => (
              <View
                key={label}
                style={{
                  flex: 1,
                  gap: 7,
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderColor: c.edge,
                }}
              >
                <Text style={{ color: c.muted, fontSize: 11 }}>{label}</Text>
                <Text style={{ color: c.ink, fontSize: 16, fontWeight: "500" }}>
                  {privateBalance ? "••••" : value}
                </Text>
              </View>
            ))}
          </View>
          <SkeuoButton variant="accent" onPress={() => setAdding(true)}>
            + Add a transaction
          </SkeuoButton>
          <View>
            <Text
              style={{
                color: c.ink,
                fontWeight: "600",
                fontSize: 16,
                marginBottom: 4,
              }}
            >
              Recent activity
            </Text>
            <TransactionList items={transactions.slice(0, 3)} />
          </View>
        </>
      ) : tab === "transactions" ? (
        <>
          <SectionHeading
            title="Every little thing."
            detail="Your income and expenses, together."
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
            title="See the bigger picture."
            detail="A sample month in review."
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
            title="Your corner."
            detail="Make pocket feel like you."
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
