import React from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type NavTabId = "Home" | "Shop" | "EMIDues" | "Limit" | "Profile";

interface FloatingBottomNavProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
}

interface NavItemConfig {
  id: NavTabId;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "Home", label: "Home", icon: "🏠" },
  { id: "Shop", label: "Shop", icon: "🛍️" },
  { id: "EMIDues", label: "EMI Dues", icon: "🧾" },
  { id: "Limit", label: "Limit", icon: "📈" },
  { id: "Profile", label: "Profile", icon: "👤" },
];

export function FloatingBottomNav({
  activeTab,
  onSelectTab,
}: FloatingBottomNavProps) {
  const handleTabPress = (tabId: NavTabId) => {
    if (tabId !== activeTab) {
      // Smooth Apple-style fluid layout animation for tab transitions
      LayoutAnimation.configureNext({
        duration: 220,
        update: { type: LayoutAnimation.Types.easeInEaseOut },
        create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
        delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      });
      onSelectTab(tabId);
    }
  };

  return (
    <View style={styles.outerContainer} pointerEvents="box-none">
      <View style={styles.dockShadowWrapper}>
        <BlurView
          intensity={Platform.OS === "ios" ? 85 : 95}
          tint="light"
          style={styles.blurBar}
        >
          <View style={styles.tabsRow}>
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={item.label}
                  onPress={() => handleTabPress(item.id)}
                  style={({ pressed }) => [
                    styles.tab,
                    isActive && styles.tabActive,
                    pressed && styles.tabPressed,
                  ]}
                >
                  <View style={styles.iconContainer}>
                    <Text
                      style={[
                        styles.icon,
                        isActive ? styles.iconActive : styles.iconInactive,
                      ]}
                    >
                      {item.icon}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.label,
                      isActive ? styles.labelActive : styles.labelInactive,
                    ]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                  {isActive && <View style={styles.activeDot} />}
                </Pressable>
              );
            })}
          </View>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 24 : 16,
    left: spacing.md,
    right: spacing.md,
    alignItems: "center",
    zIndex: 99,
  },
  dockShadowWrapper: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 36,
    overflow: "hidden",
    borderWidth: 1.2,
    borderColor: "rgba(255, 255, 255, 0.85)",
    backgroundColor: "rgba(255, 255, 255, 0.82)",
    ...shadow.bottomNav,
  },
  blurBar: {
    width: "100%",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderRadius: 24,
    marginHorizontal: 2,
    minHeight: 52,
    position: "relative",
  },
  tabActive: {
    backgroundColor: "rgba(98, 44, 224, 0.12)", // Apple-style soft lilac highlight pill
    borderWidth: 1,
    borderColor: "rgba(98, 44, 224, 0.22)",
  },
  tabPressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 24,
  },
  icon: {
    fontSize: 18,
  },
  iconInactive: {
    opacity: 0.5,
  },
  iconActive: {
    transform: [{ scale: 1.15 }],
    opacity: 1,
  },
  label: {
    ...typography.tag,
    fontSize: 11,
    marginTop: 2,
    letterSpacing: -0.1,
  },
  labelInactive: {
    color: colors.textSecondary,
    fontWeight: "500",
  },
  labelActive: {
    color: colors.brandPrimary,
    fontWeight: "800",
  },
  activeDot: {
    position: "absolute",
    bottom: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.brandPrimary,
  },
});

