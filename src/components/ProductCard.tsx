import React, { useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Product } from "@/types/marketplace";
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";
import { formatRupees } from "@/utils/formatCurrency";

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const lowestPrice = Math.min(...product.variants.map((v) => v.priceInPaise));
  const anyInStock = product.variants.some((v) => v.inStock);
  const cheapestNoCostEmi = product.emiPlans.find((p) => p.isNoCost);

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${product.name} by ${product.brand}`}
        onPress={() => onPress(product)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Product Image Container */}
        <View style={styles.imageBox}>
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          {product.badge ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{product.badge}</Text>
            </View>
          ) : !anyInStock ? (
            <View style={[styles.badge, styles.badgeOos]}>
              <Text style={styles.badgeTextOos}>Out of Stock</Text>
            </View>
          ) : null}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.brand}>{product.brand.toUpperCase()}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              {anyInStock ? formatRupees(lowestPrice) : "Out of stock"}
            </Text>
          </View>

          {/* 1Fi Signature No-Cost EMI Tag */}
          {anyInStock && cheapestNoCostEmi ? (
            <View style={styles.emiPill}>
              <Text style={styles.emiText} numberOfLines={1}>
                No-cost EMI from {formatRupees(cheapestNoCostEmi.monthlyInstallmentInPaise)}/mo
              </Text>
            </View>
          ) : (
            <View style={styles.mfPill}>
              <Text style={styles.mfText}>Pledge MF · ₹0 Down</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.card,
  },
  imageBox: {
    position: "relative",
    width: "100%",
    aspectRatio: 1.05,
    backgroundColor: colors.surfaceSecondary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: colors.brandPrimary,
    borderRadius: radius.pill,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeText: {
    ...typography.tag,
    fontSize: 10,
    color: colors.white,
    fontWeight: "700",
  },
  badgeOos: {
    backgroundColor: colors.textMuted,
  },
  badgeTextOos: {
    ...typography.tag,
    fontSize: 10,
    color: colors.white,
  },
  content: {
    padding: spacing.md,
    gap: 3,
  },
  brand: {
    ...typography.tag,
    fontSize: 10,
    color: colors.brandPrimary,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  name: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 13.5,
    lineHeight: 18,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 2,
  },
  price: {
    ...typography.h3,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  emiPill: {
    backgroundColor: colors.brandLilac,
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.brandBorder,
  },
  emiText: {
    ...typography.tag,
    fontSize: 10.5,
    color: colors.brandPrimary,
    fontWeight: "700",
  },
  mfPill: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: spacing.xs,
  },
  mfText: {
    ...typography.tag,
    fontSize: 10.5,
    color: colors.textSecondary,
  },
});
