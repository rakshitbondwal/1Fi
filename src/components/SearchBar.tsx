import React from "react";
import { StyleSheet, TextInput, View, Pressable, Text } from "react-native";
import { colors, radius, spacing, typography } from "@/theme/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search online stores & products...",
  onClear,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        {value.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => {
              onChangeText("");
              onClear?.();
            }}
            style={styles.clearButton}
          >
            <Text style={styles.clearIcon}>✕</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: spacing.sm,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    paddingVertical: 0,
    fontSize: 14,
  },
  clearButton: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  clearIcon: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: "700",
  },
});
