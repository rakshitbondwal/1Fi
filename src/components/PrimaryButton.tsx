import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from "react-native";
import { colors, radius, spacing, typography } from "@/theme/theme";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "filled" | "outline" | "secondary";
  sublabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}


export function PrimaryButton({
  label,
  onPress,
  disabled,
  loading,
  variant = "filled",
  sublabel,
  style,
  textStyle,
}: PrimaryButtonProps) {
  const isOutline = variant === "outline";
  const isSecondary = variant === "secondary";
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        isOutline
          ? styles.outline
          : isSecondary
          ? styles.secondary
          : styles.filled,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isOutline ? colors.brandPrimary : colors.white}
          size="small"
        />
      ) : (
        <View style={styles.content}>
          <Text
            style={[
              styles.label,
              isOutline
                ? styles.labelOutline
                : isSecondary
                ? styles.labelSecondary
                : styles.labelFilled,
              textStyle,
            ]}
          >
            {label}
          </Text>
          {sublabel ? (
            <Text
              style={[
                styles.sublabel,
                isOutline ? styles.sublabelOutline : styles.sublabelFilled,
              ]}
            >
              {sublabel}
            </Text>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  filled: {
    backgroundColor: colors.brandPrimary,
  },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.brandPrimary,
  },
  secondary: {
    backgroundColor: colors.brandMuted,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  content: {
    alignItems: "center",
    gap: 2,
  },
  label: {
    ...typography.bodyStrong,
    fontSize: 16,
  },
  labelFilled: {
    color: colors.white,
  },
  labelOutline: {
    color: colors.brandPrimary,
  },
  labelSecondary: {
    color: colors.brandPrimary,
  },
  sublabel: {
    ...typography.tag,
  },
  sublabelFilled: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  sublabelOutline: {
    color: colors.textSecondary,
  },
});
