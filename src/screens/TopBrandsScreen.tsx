import React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";

interface BrandItem {
  id: string;
  name: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  iconText: string;
}

const BRANDS: BrandItem[] = [
  {
    id: "air_india",
    name: "Air India",
    subtitle: "No-cost EMIs upto 18 months",
    bgColor: "#E51922",
    textColor: "#FFFFFF",
    iconText: "✈️ AI",
  },
  {
    id: "apple",
    name: "Apple Premium Reseller",
    subtitle: "No-cost EMIs upto 24 months",
    bgColor: "#111111",
    textColor: "#FFFFFF",
    iconText: " APR",
  },
  {
    id: "caratlane",
    name: "CaratLane",
    subtitle: "No-cost EMIs upto 6 months",
    bgColor: "#620078",
    textColor: "#FFFFFF",
    iconText: "💎 CL",
  },
  {
    id: "wakefit",
    name: "Wakefit",
    subtitle: "No-cost EMIs upto 12 months",
    bgColor: "#0F2042",
    textColor: "#FFFFFF",
    iconText: "🛏️ WF",
  },
  {
    id: "makemytrip",
    name: "MakeMyTrip",
    subtitle: "No-cost EMIs upto 18 months",
    bgColor: "#E23744",
    textColor: "#FFFFFF",
    iconText: "🌴 MMT",
  },
];

export function TopBrandsScreen() {
  return (
    <FlatList
      data={BRANDS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Top Brands</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={[styles.logoBox, { backgroundColor: item.bgColor }]}>
            <Text style={[styles.logoText, { color: item.textColor }]}>
              {item.iconText}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.brandName}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl + 60,
    gap: spacing.md,
  },
  header: {
    paddingVertical: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadow.card,
  },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    ...typography.captionStrong,
    fontSize: 13,
    fontWeight: "800",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  brandName: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 16,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
  },
});
