import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ProductVariant } from "@/types/marketplace";
import { colors, radius, spacing, typography } from "@/theme/theme";
import { formatRupees } from "@/utils/formatCurrency";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variant: ProductVariant) => void;
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionLabel}>Select Model / Storage</Text>
        <Text style={styles.variantCount}>
          {variants.filter((v) => v.inStock).length} in stock
        </Text>
      </View>

      <View style={styles.grid}>
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          return (
            <Pressable
              key={variant.id}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected, disabled: !variant.inStock }}
              accessibilityLabel={`${variant.label}, ${formatRupees(variant.priceInPaise)}${
                !variant.inStock ? ", Out of stock" : ""
              }`}
              disabled={!variant.inStock}
              onPress={() => onSelect(variant)}
              style={({ pressed }) => [
                styles.chip,
                isSelected && styles.chipSelected,
                !variant.inStock && styles.chipDisabled,
                pressed && variant.inStock && styles.chipPressed,
              ]}
            >
              <View style={styles.chipContent}>
                <Text
                  style={[
                    styles.chipLabel,
                    isSelected && styles.chipLabelSelected,
                    !variant.inStock && styles.chipLabelDisabled,
                  ]}
                >
                  {variant.label}
                </Text>
                <Text
                  style={[
                    styles.chipPrice,
                    isSelected && styles.chipPriceSelected,
                    !variant.inStock && styles.chipPriceDisabled,
                  ]}
                >
                  {variant.inStock ? formatRupees(variant.priceInPaise) : "Sold Out"}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLabel: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  variantCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    flexGrow: 1,
    minWidth: "47%",
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    borderColor: colors.brandPrimary,
    backgroundColor: colors.brandMuted,
  },
  chipDisabled: {
    backgroundColor: colors.surfaceSecondary,
    borderColor: colors.border,
    opacity: 0.6,
  },
  chipPressed: {
    opacity: 0.85,
  },
  chipContent: {
    gap: 2,
  },
  chipLabel: {
    ...typography.captionStrong,
    color: colors.textPrimary,
  },
  chipLabelSelected: {
    color: colors.brandPrimary,
    fontWeight: "700",
  },
  chipLabelDisabled: {
    color: colors.textMuted,
  },
  chipPrice: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chipPriceSelected: {
    color: colors.brandSecondary,
    fontWeight: "600",
  },
  chipPriceDisabled: {
    color: colors.error,
    fontWeight: "500",
  },
});
