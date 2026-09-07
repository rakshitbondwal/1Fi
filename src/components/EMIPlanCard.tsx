import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { EMIPlan } from "@/types/marketplace";
import { colors, radius, spacing, typography } from "@/theme/theme";
import { formatRupees } from "@/utils/formatCurrency";

interface EMIPlanCardProps {
  plan: EMIPlan;
  selected: boolean;
  onSelect: (plan: EMIPlan) => void;
}

export function EMIPlanCard({ plan, selected, onSelect }: EMIPlanCardProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${plan.tenureMonths} months EMI plan at ${formatRupees(
        plan.monthlyInstallmentInPaise
      )} per month`}
      onPress={() => onSelect(plan)}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
    >
      {/* Custom Radio Dot */}
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>

      {/* Plan Details */}
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={[styles.tenure, selected && styles.tenureSelected]}>
            {plan.tenureMonths} Months Plan
          </Text>
          {plan.isNoCost ? (
            <View style={styles.noCostBadge}>
              <Text style={styles.noCostBadgeText}>0% No-Cost EMI</Text>
            </View>
          ) : (
            <View style={styles.standardBadge}>
              <Text style={styles.standardBadgeText}>{plan.interestRatePct}% p.a.</Text>
            </View>
          )}
        </View>

        {/* Monthly Installment */}
        <View style={styles.installmentRow}>
          <Text style={styles.installmentAmount}>
            {formatRupees(plan.monthlyInstallmentInPaise)}
          </Text>
          <Text style={styles.installmentUnit}>/ month</Text>
        </View>

        {/* Total and Savings Metadata */}
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>
            Total payable:{" "}
            <Text style={styles.metaHighlight}>
              {formatRupees(plan.totalPayableInPaise)}
            </Text>
          </Text>
          {plan.savingsVsCreditCardInPaise ? (
            <Text style={styles.savingsText}>
              Save ~{formatRupees(plan.savingsVsCreditCardInPaise)} vs credit cards
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderColor: colors.brandPrimary,
    backgroundColor: colors.brandMuted,
  },
  cardPressed: {
    opacity: 0.9,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  radioOuterSelected: {
    borderColor: colors.brandPrimary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
  },
  info: {
    flex: 1,
    gap: spacing.xxs,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tenure: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 15,
  },
  tenureSelected: {
    color: colors.brandPrimary,
  },
  noCostBadge: {
    backgroundColor: colors.successMuted,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "rgba(5, 150, 105, 0.2)",
  },
  noCostBadgeText: {
    ...typography.tag,
    color: colors.success,
    fontWeight: "700",
  },
  standardBadge: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  standardBadgeText: {
    ...typography.tag,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  installmentRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 2,
  },
  installmentAmount: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "800",
  },
  installmentUnit: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  metaContainer: {
    marginTop: spacing.xxs,
    gap: 2,
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  metaHighlight: {
    fontWeight: "600",
    color: colors.textPrimary,
  },
  savingsText: {
    ...typography.tag,
    color: colors.brandSecondary,
    fontWeight: "600",
  },
});
