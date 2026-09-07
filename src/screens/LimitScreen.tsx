import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PrimaryButton } from "@/components/PrimaryButton";
import { LoadingView } from "@/components/LoadingView";
import { useUser } from "@/context/UserContext";
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";

interface LimitScreenProps {
  onNavigateToShop: () => void;
}

interface SchemeItem {
  id: string;
  name: string;
  folio: string;
  value: string;
  eligibleLimit: string;
  category: string;
}

const DETECTED_SCHEMES: SchemeItem[] = [
  {
    id: "ppfc",
    name: "Parag Parikh Flexi Cap Fund - Direct (G)",
    folio: "Folio: •••• 8421",
    value: "₹1,42,000",
    eligibleLimit: "₹99,400 Limit",
    category: "Equity · CAMS",
  },
  {
    id: "hdfc_mc",
    name: "HDFC Mid-Cap Opportunities Fund (G)",
    folio: "Folio: •••• 4123",
    value: "₹1,18,500",
    eligibleLimit: "₹82,950 Limit",
    category: "Equity · KFintech",
  },
  {
    id: "mirae_lc",
    name: "Mirae Asset Large Cap Fund (G)",
    folio: "Folio: •••• 9920",
    value: "₹1,24,500",
    eligibleLimit: "₹87,150 Limit",
    category: "Equity · CAMS",
  },
];

export function LimitScreen({ onNavigateToShop }: LimitScreenProps) {
  const { profile, fetchPortfolio } = useUser();
  const [loading, setLoading] = useState(false);
  const isFetched = profile.portfolioFetched;

  const handleFetch = async () => {
    setLoading(true);
    await fetchPortfolio();
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingView
          label="Fetching Mutual Fund Portfolio..."
          subtext="Connecting securely to CAMS & KFintech via MFCentral..."
        />
      </View>
    );
  }


  // If portfolio is already fetched, show the full Portfolio & Credit Limit Dashboard!
  if (isFetched) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.portfolioScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Unlocked Credit Limit Card */}
        <View style={styles.limitCard}>
          <View style={styles.limitHeader}>
            <Text style={styles.limitBadge}>✨ PRE-APPROVED & ACTIVE</Text>
            <Pressable onPress={handleFetch} style={styles.refreshBtn}>
              <Text style={styles.refreshText}>↻ Refresh</Text>
            </Pressable>
          </View>

          <Text style={styles.limitLabel}>Available 0% EMI Credit Limit</Text>
          <Text style={styles.limitAmount}>₹2,50,000</Text>

          <View style={styles.limitMetricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Total Portfolio Value</Text>
              <Text style={styles.metricValue}>₹3,85,000</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Eligible LTV</Text>
              <Text style={styles.metricValue}>Up to 70%</Text>
            </View>
          </View>
        </View>

        {/* Benefits Strip */}
        <View style={styles.benefitsStrip}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🛡️</Text>
            <Text style={styles.benefitText}>No mutual funds sold</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>📈</Text>
            <Text style={styles.benefitText}>Returns continue compounding</Text>
          </View>
        </View>

        {/* Detected Schemes Section */}
        <View style={styles.schemesSection}>
          <View style={styles.schemesHeader}>
            <Text style={styles.schemesTitle}>Detected Mutual Fund Schemes</Text>
            <Text style={styles.schemesSubtitle}>
              3 eligible schemes found via CAMS & KFintech
            </Text>
          </View>

          <View style={styles.schemesList}>
            {DETECTED_SCHEMES.map((scheme) => (
              <View key={scheme.id} style={styles.schemeCard}>
                <View style={styles.schemeTop}>
                  <Text style={styles.schemeName}>{scheme.name}</Text>
                  <Text style={styles.schemeValue}>{scheme.value}</Text>
                </View>

                <View style={styles.schemeBottom}>
                  <Text style={styles.schemeCategory}>{scheme.category} · {scheme.folio}</Text>
                  <View style={styles.schemeLimitBadge}>
                    <Text style={styles.schemeLimitText}>{scheme.eligibleLimit}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Button */}
        <PrimaryButton
          label="Shop on 1Fi Marketplace with Limit →"
          onPress={onNavigateToShop}
          variant="filled"
          style={styles.shopActionBtn}
        />
      </ScrollView>
    );
  }

  // Initial State: 3D Purple Padlock matching Screenshot 1
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.padlockContainer}>
          <View style={styles.shackle} />
          <View style={styles.padlockBody}>
            <View style={styles.keyhole} />
          </View>
          <Text style={styles.sparkle1}>✨</Text>
          <Text style={styles.sparkle2}>✦</Text>
        </View>

        <Text style={styles.tagline}>CHECK ELIGIBILITY</Text>
        <Text style={styles.title}>
          Shop on 0% interest backed by{"\n"}your Mutual Funds
        </Text>

        <PrimaryButton
          label="Fetch my portfolio"
          onPress={handleFetch}
          variant="filled"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl + 40,
    maxWidth: 320,
    alignSelf: "center",
    gap: spacing.md,
  },
  padlockContainer: {
    position: "relative",
    width: 140,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  shackle: {
    width: 64,
    height: 54,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 9,
    borderColor: "#A78BFA",
    marginBottom: -14,
    zIndex: 1,
  },
  padlockBody: {
    width: 96,
    height: 84,
    backgroundColor: colors.brandPrimary,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    borderWidth: 2,
    borderColor: "#4C1D95",
  },
  keyhole: {
    width: 14,
    height: 24,
    borderRadius: 7,
    backgroundColor: "#1E1045",
  },
  sparkle1: {
    position: "absolute",
    top: 25,
    right: 15,
    fontSize: 16,
    color: "#FBBF24",
  },
  sparkle2: {
    position: "absolute",
    top: 30,
    left: 10,
    fontSize: 14,
    color: colors.brandPrimary,
  },
  tagline: {
    ...typography.tag,
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 1.5,
    fontWeight: "700",
  },
  title: {
    ...typography.h1,
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: "center",
    lineHeight: 26,
  },
  button: {
    width: "100%",
    marginTop: spacing.sm,
  },

  /* Portfolio Dashboard Styles */
  portfolioScroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl + 60,
    gap: spacing.lg,
  },
  limitCard: {
    backgroundColor: colors.brandPrimary,
    borderRadius: radius.xl,
    padding: spacing.lg,
    gap: spacing.xs,
    ...shadow.card,
  },
  limitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  limitBadge: {
    ...typography.tag,
    fontSize: 10,
    color: "#6EE7B7",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  refreshBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  refreshText: {
    ...typography.tag,
    color: colors.white,
    fontSize: 10,
  },
  limitLabel: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.8)",
  },
  limitAmount: {
    ...typography.hero,
    fontSize: 34,
    color: colors.white,
    fontWeight: "900",
  },
  limitMetricsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  metricItem: {
    flex: 1,
    gap: 2,
  },
  metricLabel: {
    ...typography.tag,
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.75)",
  },
  metricValue: {
    ...typography.bodyStrong,
    color: colors.white,
    fontSize: 14,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: spacing.sm,
  },
  benefitsStrip: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  benefitItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  benefitIcon: {
    fontSize: 16,
  },
  benefitText: {
    ...typography.tag,
    color: colors.textPrimary,
    fontSize: 11,
    flex: 1,
  },
  schemesSection: {
    gap: spacing.sm,
  },
  schemesHeader: {
    gap: 2,
  },
  schemesTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 17,
  },
  schemesSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12.5,
  },
  schemesList: {
    gap: spacing.sm,
  },
  schemeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    ...shadow.card,
  },
  schemeTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  schemeName: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 13.5,
    flex: 1,
  },
  schemeValue: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "800",
  },
  schemeBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  schemeCategory: {
    ...typography.tag,
    color: colors.textMuted,
    fontSize: 10.5,
  },
  schemeLimitBadge: {
    backgroundColor: colors.brandMuted,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  schemeLimitText: {
    ...typography.tag,
    fontSize: 10,
    color: colors.brandPrimary,
    fontWeight: "700",
  },
  shopActionBtn: {
    marginTop: spacing.xs,
  },
});
