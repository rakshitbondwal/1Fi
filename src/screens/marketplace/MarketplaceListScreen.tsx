import React, { useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchProducts } from "@/api/marketplaceApi";
import { useAsync } from "@/hooks/useAsync";
import { ProductCard } from "@/components/ProductCard";
import { LoadingView } from "@/components/LoadingView";
import { ErrorView } from "@/components/ErrorView";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PrimaryButton } from "@/components/PrimaryButton";
import { CATEGORIES } from "@/data/mockProducts";
import { Product } from "@/types/marketplace";
import { colors, radius, spacing, typography } from "@/theme/theme";
import { RootStackParamList } from "@/navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function MarketplaceListScreen() {
  const navigation = useNavigation<Nav>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: allProducts,
    state,
    errorMessage,
    retry,
  } = useAsync(fetchProducts, []);

  // Filter products by category and query
  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    let list = allProducts;

    if (selectedCategory !== "All") {
      list = list.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allProducts, selectedCategory, searchQuery]);

  if (state === "loading" && !allProducts) {
    return (
      <LoadingView
        label="Loading 1Fi Marketplace"
        subtext="Fetching latest gadgets, electronics & 0% EMI plans..."
      />
    );
  }


  if (state === "error" && !allProducts) {
    return (
      <ErrorView
        message={errorMessage ?? "Could not connect to marketplace catalog."}
        onRetry={retry}
      />
    );
  }

  const handleOpenProduct = (product: Product) => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={state === "loading"}
            onRefresh={retry}
            tintColor={colors.brandPrimary}
            colors={[colors.brandPrimary]}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            {/* Pill Search Bar matching Screenshot 3 */}
            <View style={styles.searchRow}>
              <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search products, brands..."
                onClear={() => setSearchQuery("")}
              />
            </View>

            {/* Category Filter Pills */}
            <View style={styles.categoryRow}>
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </View>

            {/* Section Header */}
            <View style={styles.titleRow}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === "All" ? "1Fi Marketplace" : selectedCategory}
              </Text>
              <Text style={styles.sectionCount}>
                {filteredProducts.length} devices available
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No matching products</Text>
            <Text style={styles.emptySubtitle}>
              We couldn't find anything for "{searchQuery}".
            </Text>
            <PrimaryButton
              label="Clear search"
              onPress={clearFilters}
              variant="outline"
              style={styles.emptyButton}
            />
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleOpenProduct} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl + 60, // Space for floating bottom nav
    gap: spacing.md,
  },
  row: {
    gap: spacing.md,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  searchRow: {
    width: "100%",
  },
  categoryRow: {
    marginHorizontal: -spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 18,
  },
  sectionCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
  emptyButton: {
    marginTop: spacing.sm,
  },
});
