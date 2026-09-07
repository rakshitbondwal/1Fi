import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";

interface StoreItem {
  id: string;
  name: string;
  distance: string;
  location: string;
  badge: string;
  icon: string;
}

const STORES: StoreItem[] = [
  {
    id: "croma_s29",
    name: "Croma Store",
    distance: "1.2 km away",
    location: "Sector 29, Cyber Hub Road",
    badge: "0% EMI on Electronics",
    icon: "🔌",
  },
  {
    id: "reliance_digi",
    name: "Reliance Digital",
    distance: "2.4 km away",
    location: "Ambience Mall, Ground Floor",
    badge: "No-cost EMIs upto 24m",
    icon: "📱",
  },
  {
    id: "vijay_sales",
    name: "Vijay Sales",
    distance: "3.1 km away",
    location: "MG Road Metro Station",
    badge: "Instant 1Fi QR Pay",
    icon: "📺",
  },
];

export function NearbyStoresScreen() {
  return (
    <FlatList
      data={STORES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Partner Stores Near You</Text>
          <Text style={styles.subtitle}>
            Walk in and swipe your 1Fi limit for instant zero-downpayment purchases.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>{item.icon}</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.titleRow}>
              <Text style={styles.storeName}>{item.name}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
            <Text style={styles.location}>{item.location}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
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
    gap: 2,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
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
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.brandMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storeName: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 15,
  },
  distance: {
    ...typography.tag,
    color: colors.brandPrimary,
    fontWeight: "600",
  },
  location: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.brandLilac,
    borderRadius: radius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 2,
  },
  badgeText: {
    ...typography.tag,
    fontSize: 10.5,
    color: colors.brandPrimary,
    fontWeight: "700",
  },
});
