import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";

interface HomeScreenProps {
  onNavigateToShop: () => void;
}

export function HomeScreen({ onNavigateToShop }: HomeScreenProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Purple Hero Card (Matching Screenshot 4) */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Text style={styles.getStartedTag}>GET STARTED</Text>
        </View>

        <View style={styles.heroBody}>
          <View style={styles.heroTextCol}>
            <Text style={styles.heroTitle}>Shop on no-cost EMI</Text>
            <Text style={styles.heroSubtitle}>
              Backed by your mutual funds, No credit pull, No charges, & quick approval.
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={onNavigateToShop}
              style={styles.heroButton}
            >
              <Text style={styles.heroButtonText}>Check eligibility →</Text>
            </Pressable>
          </View>

          {/* 0% Interest graphic badge */}
          <View style={styles.zeroPercentBox}>
            <Text style={styles.zeroText}>0%</Text>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>INTEREST</Text>
            </View>
            <Text style={styles.sparkles}>✨</Text>
          </View>
        </View>
      </View>

      {/* 2. Offers Section (Matching Screenshot 4) */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionIndicator} />
          <Text style={styles.sectionTag}>OFFERS</Text>
        </View>

        <View style={styles.offerCard}>
          <Text style={styles.offerCategory}>FURNITURE | MATTRESS | HOME DECOR</Text>
          <Text style={styles.offerTitle}>Dream homes to sweet dreams</Text>
          <View style={styles.offerBadge}>
            <Text style={styles.offerBadgeCheck}>✓</Text>
            <Text style={styles.offerBadgeText}>Comfort on 12m no-cost EMIs</Text>
          </View>
          <Text style={styles.brandWakefit}>wakefit</Text>
        </View>

        {/* Carousel Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* 3. Shop using 1Fi at Top Brands (Matching Screenshot 4) */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionIndicator} />
          <Text style={styles.sectionTag}>SHOP USING 1FI AT TOP BRANDS</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.brandsRow}
        >
          <Pressable onPress={onNavigateToShop} style={styles.brandBox}>
            <Text style={styles.brandLogo}>✈️</Text>
            <Text style={styles.brandName}>Air India</Text>
          </Pressable>
          <Pressable onPress={onNavigateToShop} style={styles.brandBox}>
            <Text style={styles.brandLogo}>🌴</Text>
            <Text style={styles.brandName}>MakeMyTrip</Text>
          </Pressable>
          <Pressable onPress={onNavigateToShop} style={styles.brandBox}>
            <Text style={styles.brandLogo}></Text>
            <Text style={styles.brandName}>Apple</Text>
          </Pressable>
          <Pressable onPress={onNavigateToShop} style={styles.brandBox}>
            <Text style={styles.brandLogo}>💎</Text>
            <Text style={styles.brandName}>CaratLane</Text>
          </Pressable>
          <Pressable onPress={onNavigateToShop} style={styles.brandBox}>
            <Text style={styles.brandLogo}>📺</Text>
            <Text style={styles.brandName}>Vijay Sales</Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* 4. Why Pay with 1Fi (Matching Screenshot 4) */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionIndicator} />
          <Text style={styles.sectionTag}>WHY PAY WITH 1FI</Text>
        </View>

        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📈</Text>
            <Text style={styles.featureTitle}>Keep growing</Text>
            <Text style={styles.featureDesc}>MFs continue compounding</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>%</Text>
            <Text style={styles.featureTitle}>0% interest</Text>
            <Text style={styles.featureDesc}>True No-Cost EMI plans</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🛡️</Text>
            <Text style={styles.featureTitle}>Zero charges</Text>
            <Text style={styles.featureDesc}>No hidden foreclosure fees</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureTitle}>Instant approvals</Text>
            <Text style={styles.featureDesc}>Paperless digital setup</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl + 60,
    gap: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.brandPrimary,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadow.card,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  getStartedTag: {
    ...typography.tag,
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 1,
    fontWeight: "700",
  },
  heroBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTextCol: {
    flex: 1,
    gap: spacing.xs,
    paddingRight: spacing.sm,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.white,
    fontSize: 19,
    fontWeight: "800",
  },
  heroSubtitle: {
    ...typography.caption,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 17,
  },
  heroButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    marginTop: spacing.xs,
  },
  heroButtonText: {
    ...typography.tag,
    color: colors.textPrimary,
    fontWeight: "700",
  },
  zeroPercentBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  zeroText: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.white,
  },
  interestTag: {
    backgroundColor: "#FBBF24",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.xs,
  },
  interestText: {
    fontSize: 9,
    fontWeight: "900",
    color: colors.textPrimary,
  },
  sparkles: {
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    gap: spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionIndicator: {
    width: 3,
    height: 14,
    borderRadius: 2,
    backgroundColor: colors.brandPrimary,
  },
  sectionTag: {
    ...typography.tag,
    fontSize: 11,
    color: colors.brandPrimary,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  offerCard: {
    backgroundColor: "#2E1065",
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
    position: "relative",
  },
  offerCategory: {
    ...typography.tag,
    fontSize: 9.5,
    color: "#FBBF24",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  offerTitle: {
    ...typography.h2,
    color: colors.white,
    fontSize: 17,
    fontWeight: "800",
  },
  offerBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    gap: 4,
    marginTop: spacing.xs,
  },
  offerBadgeCheck: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "800",
  },
  offerBadgeText: {
    ...typography.tag,
    fontSize: 10.5,
    color: colors.white,
  },
  brandWakefit: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.md,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "700",
    fontSize: 16,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 18,
    backgroundColor: colors.brandPrimary,
  },
  brandsRow: {
    gap: spacing.md,
    paddingVertical: 2,
  },
  brandBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    width: 86,
    height: 86,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
    ...shadow.card,
  },
  brandLogo: {
    fontSize: 24,
  },
  brandName: {
    ...typography.tag,
    fontSize: 10.5,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  featureCard: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 2,
    ...shadow.card,
  },
  featureIcon: {
    fontSize: 20,
    color: colors.brandPrimary,
    fontWeight: "800",
    marginBottom: 2,
  },
  featureTitle: {
    ...typography.bodyStrong,
    fontSize: 13,
    color: colors.textPrimary,
  },
  featureDesc: {
    ...typography.tag,
    fontSize: 10.5,
    color: colors.textSecondary,
  },
});
