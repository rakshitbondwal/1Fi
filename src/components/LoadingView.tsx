import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";

export interface LoadingViewProps {
  label?: string;
  subtext?: string;
  overlay?: boolean;
}

export function LoadingView({
  label = "Loading...",
  subtext = "Please wait a moment",
  overlay = false,
}: LoadingViewProps) {
  const content = (
    <View style={styles.card}>
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size="large" color={colors.brandPrimary} />
      </View>
      <Text style={styles.label}>{label}</Text>
      {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
    </View>
  );

  if (overlay) {
    return <View style={styles.overlay}>{content}</View>;
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    backgroundColor: "transparent",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(24, 13, 88, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    padding: spacing.xl,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 320,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(98, 44, 224, 0.12)",
    ...shadow.modal,
    gap: spacing.xs,
  },
  spinnerWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(98, 44, 224, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  subtext: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 2,
    lineHeight: 18,
  },
});

