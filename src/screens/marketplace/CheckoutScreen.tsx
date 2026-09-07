import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchProductById } from "@/api/marketplaceApi";
import { useAsync } from "@/hooks/useAsync";
import { LoadingView } from "@/components/LoadingView";
import { ErrorView } from "@/components/ErrorView";
import { PrimaryButton } from "@/components/PrimaryButton";
import { generateEmiPlans } from "@/data/mockProducts";
import { formatRupees } from "@/utils/formatCurrency";
import { colors, radius, spacing, typography } from "@/theme/theme";
import { RootStackParamList } from "@/navigation/types";
import { useMarketplaceSelection } from "@/context/MarketplaceSelectionContext";

type CheckoutRoute = RouteProp<RootStackParamList, "Checkout">;
type Nav = NativeStackNavigationProp<RootStackParamList>;

export function CheckoutScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<CheckoutRoute>();
  const { clearSelection } = useMarketplaceSelection();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isPledging, setIsPledging] = useState(false);

  const {
    data: product,
    state,
    errorMessage,
    retry,
  } = useAsync(() => fetchProductById(params.productId), [params.productId]);

  const handleConfirmPledge = async () => {
    setIsPledging(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setIsPledging(false);
    setIsConfirmed(true);
  };

  if (state === "loading" || state === "idle") {
    return (
      <LoadingView
        label="Preparing Your 1Fi Order..."
        subtext="Generating RBI-compliant LAMF pledge agreement..."
      />
    );
  }


  if (state === "error" || !product) {
    return (
      <ErrorView
        message={errorMessage ?? "Could not load order details."}
        onRetry={retry}
      />
    );
  }

  const variant = product.variants.find((v) => v.id === params.variantId);
  const variantPrice = variant?.priceInPaise ?? product.variants[0]?.priceInPaise ?? 0;
  const plans = generateEmiPlans(variantPrice);
  const plan =
    plans.find((p) => p.id === params.emiPlanId) ??
    product.emiPlans.find((p) => p.id === params.emiPlanId) ??
    plans[0];

  const handleReturnToShop = () => {
    clearSelection();
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Status Banner */}
        <View style={styles.statusCard}>
          <View style={styles.checkCircle}>
            <Text style={styles.checkIcon}>✓</Text>
          </View>
          <Text style={styles.statusTitle}>
            {isConfirmed ? "Application Submitted!" : "Review Your 1Fi Plan"}
          </Text>
          <Text style={styles.statusSubtitle}>
            {isConfirmed
              ? "Your mutual fund pledge request has been received. You will receive an SMS confirmation."
              : "Zero downpayment. Your mutual fund holdings will be pledged without selling."}
          </Text>
        </View>

        {/* Product & Variant Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Selected Device</Text>
          <View style={styles.productRow}>
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.brandTag}>{product.brand.toUpperCase()}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              {variant ? (
                <Text style={styles.variantLabel}>Variant: {variant.label}</Text>
              ) : null}
              <Text style={styles.productPrice}>
                {formatRupees(variantPrice)}
              </Text>
            </View>
          </View>
        </View>

        {/* EMI & Payment Breakdown */}
        {plan ? (
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Financing Breakdown</Text>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>EMI Tenure</Text>
              <Text style={styles.rowValue}>{plan.tenureMonths} Months</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Monthly Installment</Text>
              <Text style={styles.rowValueBold}>
                {formatRupees(plan.monthlyInstallmentInPaise)} / mo
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Interest Rate</Text>
              <Text style={styles.rowValueSuccess}>
                {plan.isNoCost ? "0% (No-Cost EMI)" : `${plan.interestRatePct}% p.a.`}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Upfront Downpayment</Text>
              <Text style={styles.rowValueSuccess}>₹0 (Zero)</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Processing / Foreclosure Fees</Text>
              <Text style={styles.rowValueSuccess}>₹0 (Free)</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Payable</Text>
              <Text style={styles.totalValue}>
                {formatRupees(plan.totalPayableInPaise)}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Mutual Fund Collateral & Pledge Security Card */}
        <View style={styles.pledgeCard}>
          <View style={styles.pledgeHeader}>
            <Text style={styles.shieldIcon}>📈</Text>
            <View style={styles.pledgeHeaderInfo}>
              <Text style={styles.pledgeTitle}>Loan Against Mutual Funds (LAMF)</Text>
              <Text style={styles.pledgeSubtitle}>Powered by CAMS & KFintech</Text>
            </View>
          </View>
          <Text style={styles.pledgeDescription}>
            Your mutual fund units remain invested in the market and continue generating compounding returns. No credit card debt, no high personal loan interest rates.
          </Text>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        {!isConfirmed ? (
          <PrimaryButton
            label="Confirm & Pledge Mutual Funds →"
            onPress={handleConfirmPledge}
            variant="filled"
          />
        ) : (
          <PrimaryButton
            label="Back to 1Fi Marketplace"
            onPress={handleReturnToShop}
            variant="outline"
          />
        )}
      </View>

      {/* Loading Overlay during mutual fund lien pledge */}
      {isPledging && (
        <LoadingView
          overlay={true}
          label="Creating Mutual Fund Lien..."
          subtext="Registering digital pledge with CAMS & KFintech securely..."
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl + 30,
    gap: spacing.md,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  checkCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.successMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  checkIcon: {
    fontSize: 22,
    color: colors.success,
    fontWeight: "900",
  },
  statusTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: "center",
  },
  statusSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    maxWidth: 290,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardHeader: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  productRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
  },
  productInfo: {
    flex: 1,
    gap: 2,
  },
  brandTag: {
    ...typography.tag,
    color: colors.brandPrimary,
    letterSpacing: 0.5,
  },
  productName: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 15,
  },
  variantLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  productPrice: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: "700",
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
  },
  rowLabel: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 14,
  },
  rowValue: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 14,
  },
  rowValueBold: {
    ...typography.bodyStrong,
    color: colors.brandPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  rowValueSuccess: {
    ...typography.bodyStrong,
    color: colors.success,
    fontSize: 14,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  totalLabel: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 16,
  },
  totalValue: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "800",
  },
  pledgeCard: {
    backgroundColor: colors.brandMuted,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.brandLilac,
    gap: spacing.xs,
  },
  pledgeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  shieldIcon: {
    fontSize: 22,
  },
  pledgeHeaderInfo: {
    flex: 1,
  },
  pledgeTitle: {
    ...typography.bodyStrong,
    color: colors.brandPrimary,
    fontSize: 14,
  },
  pledgeSubtitle: {
    ...typography.tag,
    color: colors.textSecondary,
  },
  pledgeDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
