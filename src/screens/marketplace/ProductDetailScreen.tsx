import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchProductById } from "@/api/marketplaceApi";
import { useAsync } from "@/hooks/useAsync";
import { LoadingView } from "@/components/LoadingView";
import { ErrorView } from "@/components/ErrorView";
import { VariantSelector } from "@/components/VariantSelector";
import { EMIPlanCard } from "@/components/EMIPlanCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { generateEmiPlans } from "@/data/mockProducts";
import { formatRupees } from "@/utils/formatCurrency";
import { colors, radius, spacing, typography } from "@/theme/theme";
import { RootStackParamList } from "@/navigation/types";
import { useMarketplaceSelection } from "@/context/MarketplaceSelectionContext";
import { ProductVariant, EMIPlan } from "@/types/marketplace";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type DetailRoute = RouteProp<RootStackParamList, "ProductDetail">;

export function ProductDetailScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<DetailRoute>();
  const { setSelection } = useMarketplaceSelection();

  const {
    data: product,
    state,
    errorMessage,
    retry,
  } = useAsync(() => fetchProductById(params.productId), [params.productId]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string>("emi_6m");

  // Initialize selected variant when product loads
  useEffect(() => {
    if (!product) return;
    const defaultVariant =
      product.variants.find((v) => v.inStock) ?? product.variants[0];
    setSelectedVariant(defaultVariant);
  }, [product]);

  // Dynamically recalculate EMI plans based on the currently selected variant's price!
  const dynamicEmiPlans = useMemo<EMIPlan[]>(() => {
    if (!selectedVariant) return product?.emiPlans ?? [];
    return generateEmiPlans(selectedVariant.priceInPaise);
  }, [selectedVariant, product]);

  // Find the selected EMI plan object from dynamic plans
  const selectedPlan = useMemo(() => {
    return (
      dynamicEmiPlans.find((p) => p.id === selectedPlanId) ??
      dynamicEmiPlans[0] ??
      null
    );
  }, [dynamicEmiPlans, selectedPlanId]);

  if (state === "loading" || state === "idle") {
    return (
      <LoadingView
        label="Loading Product Details..."
        subtext="Calculating real-time 0% EMI plans & variant stock..."
      />
    );
  }


  if (state === "error" || !product) {
    return (
      <ErrorView
        message={errorMessage ?? "This product could not be loaded."}
        onRetry={retry}
      />
    );
  }

  const canProceed = Boolean(selectedVariant?.inStock && selectedPlan);

  const handleProceed = () => {
    if (!selectedVariant || !selectedPlan) return;
    setSelection({
      productId: product.id,
      variantId: selectedVariant.id,
      emiPlanId: selectedPlan.id,
    });
    navigation.navigate("Checkout", {
      productId: product.id,
      variantId: selectedVariant.id,
      emiPlanId: selectedPlan.id,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image Showcase */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          {product.badge ? (
            <View style={styles.floatingBadge}>
              <Text style={styles.floatingBadgeText}>{product.badge}</Text>
            </View>
          ) : null}
        </View>

        {/* Title, Brand and Dynamic Price */}
        <View style={styles.section}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>{product.brand.toUpperCase()}</Text>
            {product.rating ? (
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingText}>{product.rating.toFixed(1)} Rating</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.shortDescription}</Text>

          {selectedVariant ? (
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {formatRupees(selectedVariant.priceInPaise)}
              </Text>
              <Text style={styles.priceTaxHint}>inclusive of all taxes</Text>
            </View>
          ) : null}
        </View>

        {/* Features Checklist */}
        {product.features && product.features.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Key Highlights</Text>
            <View style={styles.featuresList}>
              {product.features.map((feature, idx) => (
                <View key={idx} style={styles.featureItem}>
                  <Text style={styles.featureBullet}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Variant & Storage Selector */}
        <View style={styles.section}>
          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariant?.id ?? ""}
            onSelect={(v) => setSelectedVariant(v)}
          />
        </View>

        {/* 1Fi LAMF Guarantee Card */}
        <View style={styles.lamfCard}>
          <View style={styles.lamfCardHeader}>
            <Text style={styles.lamfIcon}>🛡️</Text>
            <View style={styles.lamfHeaderTexts}>
              <Text style={styles.lamfTitle}>1Fi Smart Financing Guarantee</Text>
              <Text style={styles.lamfSubtitle}>
                Zero downpayment · Zero foreclosure charges · Keep earning returns
              </Text>
            </View>
          </View>
          <View style={styles.lamfDivider} />
          <Text style={styles.lamfBody}>
            Pledging your mutual funds creates a secure credit line without redeeming your portfolio. Your money continues compounding in the market.
          </Text>
        </View>

        {/* Dynamic EMI Plan Options */}
        <View style={styles.section}>
          <View style={styles.emiHeaderRow}>
            <Text style={styles.sectionLabel}>Select an EMI Plan</Text>
            <Text style={styles.emiRecalcHint}>Dynamic for selected variant</Text>
          </View>
          <View style={styles.emiList}>
            {dynamicEmiPlans.map((plan) => (
              <EMIPlanCard
                key={plan.id}
                plan={plan}
                selected={selectedPlan?.id === plan.id}
                onSelect={(p) => setSelectedPlanId(p.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Footer */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          {selectedPlan ? (
            <>
              <Text style={styles.footerPrice}>
                {formatRupees(selectedPlan.monthlyInstallmentInPaise)}
                <Text style={styles.footerPeriod}>/mo</Text>
              </Text>
              <Text style={styles.footerPlanName}>
                {selectedPlan.tenureMonths} Months ({selectedPlan.isNoCost ? "0% No-Cost" : `${selectedPlan.interestRatePct}% p.a.`})
              </Text>
            </>
          ) : (
            <Text style={styles.footerPrice}>Select a plan</Text>
          )}
        </View>

        <PrimaryButton
          label={
            selectedVariant?.inStock
              ? "Proceed with Plan →"
              : "Variant Out of Stock"
          }
          onPress={handleProceed}
          disabled={!canProceed}
          style={styles.footerButton}
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
  scrollContent: {
    paddingBottom: spacing.xxxl + 40,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 1.1,
    backgroundColor: colors.surfaceSecondary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  floatingBadge: {
    position: "absolute",
    bottom: spacing.md,
    left: spacing.lg,
    backgroundColor: colors.brandPrimary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  floatingBadgeText: {
    ...typography.tag,
    color: colors.white,
    fontWeight: "700",
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    ...typography.tag,
    color: colors.brandPrimary,
    letterSpacing: 0.8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    gap: 3,
  },
  ratingStar: {
    fontSize: 11,
    color: "#F59E0B",
  },
  ratingText: {
    ...typography.tag,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
    fontSize: 22,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  price: {
    ...typography.h1,
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "800",
  },
  priceTaxHint: {
    ...typography.tag,
    color: colors.textMuted,
  },
  sectionLabel: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 16,
  },
  featuresList: {
    gap: spacing.xs,
    marginTop: spacing.xxs,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  featureBullet: {
    fontSize: 13,
    color: colors.success,
    fontWeight: "800",
  },
  featureText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  lamfCard: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    backgroundColor: colors.brandMuted,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.brandLilac,
    gap: spacing.sm,
  },
  lamfCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  lamfIcon: {
    fontSize: 24,
  },
  lamfHeaderTexts: {
    flex: 1,
  },
  lamfTitle: {
    ...typography.bodyStrong,
    color: colors.brandPrimary,
    fontSize: 14,
  },
  lamfSubtitle: {
    ...typography.tag,
    color: colors.textSecondary,
    marginTop: 1,
  },
  lamfDivider: {
    height: 1,
    backgroundColor: colors.brandLilac,
  },
  lamfBody: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  emiHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emiRecalcHint: {
    ...typography.tag,
    color: colors.brandSecondary,
  },
  emiList: {
    gap: spacing.sm,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerInfo: {
    flex: 1,
  },
  footerPrice: {
    ...typography.h2,
    color: colors.brandPrimary,
    fontSize: 20,
    fontWeight: "800",
  },
  footerPeriod: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  footerPlanName: {
    ...typography.tag,
    color: colors.textSecondary,
    marginTop: 1,
  },
  footerButton: {
    flex: 1,
    maxWidth: 200,
  },
});
