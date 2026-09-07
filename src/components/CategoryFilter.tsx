import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@/theme/theme";

interface CategoryFilterProps {
  categories: readonly string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories as unknown as string[]}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isSelected = item === selectedCategory;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelectCategory(item)}
              style={({ pressed }) => [
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipUnselected,
                pressed && styles.chipPressed,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  chipUnselected: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.brandPrimary,
    borderColor: colors.brandPrimary,
  },
  chipPressed: {
    opacity: 0.85,
  },
  chipText: {
    ...typography.captionStrong,
    fontSize: 13,
  },
  chipTextUnselected: {
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.textOnBrand,
    fontWeight: "700",
  },
});
