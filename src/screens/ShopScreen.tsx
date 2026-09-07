import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopBrandsScreen } from "@/screens/TopBrandsScreen";
import { NearbyStoresScreen } from "@/screens/NearbyStoresScreen";
import { MarketplaceListScreen } from "@/screens/marketplace/MarketplaceListScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { EMIDuesScreen } from "@/screens/EMIDuesScreen";
import { LimitScreen } from "@/screens/LimitScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { FloatingBottomNav, NavTabId } from "@/components/FloatingBottomNav";
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";

type ShopSection = "Marketplace" | "TopBrands" | "NearbyStores";

interface TabOption {
  id: ShopSection;
  label: string;
}

const SHOP_TABS: TabOption[] = [
  { id: "TopBrands", label: "Top Brands" },
  { id: "NearbyStores", label: "Nearby Stores" },
  { id: "Marketplace", label: "1Fi Marketplace" },
];

export function ShopScreen() {
  const [activeSection, setActiveSection] = useState<ShopSection>("Marketplace");
  const [activeNavTab, setActiveNavTab] = useState<NavTabId>("Shop");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Dynamic View based on Active Bottom Navigation Tab */}
      {activeNavTab === "Home" ? (
        <HomeScreen onNavigateToShop={() => setActiveNavTab("Shop")} />
      ) : activeNavTab === "EMIDues" ? (
        <EMIDuesScreen
          onNavigateToShop={() => setActiveNavTab("Shop")}
          onNavigateToLimit={() => setActiveNavTab("Limit")}
        />
      ) : activeNavTab === "Limit" ? (
        <LimitScreen onNavigateToShop={() => setActiveNavTab("Shop")} />
      ) : activeNavTab === "Profile" ? (
        <ProfileScreen />
      ) : (

        /* SHOP TAB ACTIVE (Screenshots 3): Hero Banner + Segmented Switcher + Catalog */
        <View style={styles.shopContainer}>
          {/* 1. Midnight Purple Hero Banner (Matching Screenshot 3) */}
          <View style={styles.heroBanner}>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />

            <View style={styles.heroContentRow}>
              <View style={styles.heroTextCol}>
                <View style={styles.noCostBadge}>
                  <Text style={styles.noCostBadgeText}>✨ NO-COST EMIs</Text>
                </View>

                <Text style={styles.heroTitle}>Shop today,</Text>
                <Text style={styles.heroTitle}>Pay later using</Text>
                <Text style={styles.heroTitleHighlight}>Mutual funds.</Text>

                <Text style={styles.heroSubtitle}>
                  No credit score required. No interest.
                </Text>
                <Text style={styles.heroSubtitle}>
                  Backed by your investments.
                </Text>
              </View>

              <View style={styles.heroVisualCol}>
                <View style={styles.visualBadge}>
                  <Text style={styles.visualEmoji}>💻</Text>
                </View>
                <View style={[styles.visualBadge, styles.visualBadge2]}>
                  <Text style={styles.visualEmoji}>🛍️</Text>
                </View>
                <View style={[styles.visualBadge, styles.visualBadge3]}>
                  <Text style={styles.visualEmoji}>🚗</Text>
                </View>
                <Text style={styles.confettiSparkle}>✨ 0%</Text>
              </View>
            </View>
          </View>

          {/* 2. Floating Segmented Tab Switcher (Matching Screenshot 3) */}
          <View style={styles.switcherWrapper}>
            <View style={styles.switcherCard}>
              {SHOP_TABS.map((tab) => {
                const isActive = tab.id === activeSection;
                return (
                  <Pressable
                    key={tab.id}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                    onPress={() => setActiveSection(tab.id)}
                    style={styles.tabItem}
                  >
                    <Text
                      style={[
                        styles.tabLabel,
                        isActive ? styles.tabLabelActive : styles.tabLabelInactive,
                      ]}
                    >
                      {tab.label}
                    </Text>
                    {isActive ? (
                      <View style={styles.activeUnderline} />
                    ) : (
                      <View style={styles.underlineSpacer} />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* 3. Section Content */}
          <View style={styles.contentArea}>
            {activeSection === "Marketplace" ? (
              <MarketplaceListScreen />
            ) : activeSection === "TopBrands" ? (
              <TopBrandsScreen />
            ) : (
              <NearbyStoresScreen />
            )}
          </View>
        </View>
      )}

      {/* 4. Interactive Floating Bottom Navigation Bar across all tabs! */}
      <FloatingBottomNav
        activeTab={activeNavTab}
        onSelectTab={(tab) => {
          setActiveNavTab(tab);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  shopContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroBanner: {
    backgroundColor: colors.brandDark,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl + 6,
    position: "relative",
    overflow: "hidden",
  },
  decorCircle1: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(98, 44, 224, 0.25)",
  },
  decorCircle2: {
    position: "absolute",
    right: 60,
    bottom: -50,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(124, 58, 237, 0.15)",
  },
  heroContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroTextCol: {
    flex: 1,
    gap: 1,
  },
  noCostBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: spacing.xs,
  },
  noCostBadgeText: {
    ...typography.tag,
    fontSize: 10,
    color: colors.white,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  heroTitle: {
    ...typography.hero,
    color: colors.white,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  heroTitleHighlight: {
    ...typography.hero,
    color: colors.white,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    ...typography.caption,
    fontSize: 11.5,
    color: "rgba(255, 255, 255, 0.75)",
    lineHeight: 16,
  },
  heroVisualCol: {
    width: 90,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  visualBadge: {
    position: "absolute",
    top: 5,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: radius.md,
    padding: 6,
  },
  visualBadge2: {
    top: 40,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  visualBadge3: {
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  visualEmoji: {
    fontSize: 22,
  },
  confettiSparkle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FBBF24",
    position: "absolute",
    top: -5,
    left: 10,
  },
  switcherWrapper: {
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.md,
    zIndex: 10,
  },
  switcherCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xs,
  },
  tabLabel: {
    ...typography.captionStrong,
    fontSize: 13,
  },
  tabLabelInactive: {
    color: colors.textSecondary,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: colors.brandPrimary,
    fontWeight: "700",
  },
  activeUnderline: {
    width: 24,
    height: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
    marginTop: 4,
  },
  underlineSpacer: {
    width: 24,
    height: 3,
    marginTop: 4,
  },
  contentArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
