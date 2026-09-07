import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "@/theme/theme";
import { PrimaryButton } from "@/components/PrimaryButton";

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>!</Text>
      </View>
      <Text style={styles.title}>Unable to load marketplace</Text>
      <Text style={styles.message}>{message}</Text>
      <PrimaryButton
        label="Try again"
        onPress={onRetry}
        variant="filled"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.errorMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  iconText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.error,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: "center",
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 20,
  },
  button: {
    marginTop: spacing.md,
    minWidth: 160,
  },
});
