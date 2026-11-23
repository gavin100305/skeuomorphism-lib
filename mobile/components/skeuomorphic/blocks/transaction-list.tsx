import React from "react";
import { Text, View } from "react-native";
import { useSkeuo } from "../theme";
import { SkeuoGlyph } from "../icons";
export type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: string;
  income?: boolean;
};
export const sampleTransactions: Transaction[] = [
  { id: "1", name: "Corner coffee", category: "Food · Today", amount: "−₹180" },
  {
    id: "2",
    name: "Monthly salary",
    category: "Bank · Today",
    amount: "+₹48,000",
    income: true,
  },
  {
    id: "3",
    name: "Sunday groceries",
    category: "Shopping · Yesterday",
    amount: "−₹1,240",
  },
  {
    id: "4",
    name: "Metro pass",
    category: "Transport · Yesterday",
    amount: "−₹450",
  },
];
export function TransactionList({
  items = sampleTransactions,
}: {
  items?: Transaction[];
}) {
  const { colors: c } = useSkeuo();
  return (
    <View>
      {items.length === 0 ? (
        <Text style={{ color: c.muted, paddingVertical: 24 }}>
          No transactions match your search.
        </Text>
      ) : (
        items.map((item, i) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              gap: 12,
              paddingVertical: 15,
              borderTopWidth: i ? 1 : 0,
              borderColor: c.edge,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: c.edge,
                backgroundColor: c.well,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SkeuoGlyph
                name={item.income ? "arrow" : "transactions"}
                color={c.muted}
              />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ color: c.ink, fontSize: 14, fontWeight: "600" }}>
                {item.name}
              </Text>
              <Text style={{ color: c.muted, fontSize: 11 }}>
                {item.category}
              </Text>
            </View>
            <Text
              style={{
                color: item.income ? c.accent : c.ink,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {item.amount}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}
