import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ShopScreen } from "@/screens/ShopScreen";
import { ProductDetailScreen } from "@/screens/marketplace/ProductDetailScreen";
import { CheckoutScreen } from "@/screens/marketplace/CheckoutScreen";
import { MarketplaceSelectionProvider } from "@/context/MarketplaceSelectionContext";
import { UserProvider } from "@/context/UserContext";
import { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <MarketplaceSelectionProvider>
          <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerTintColor: colors.brandPrimary,
              headerStyle: { backgroundColor: colors.surface },
              headerTitleStyle: { fontWeight: "700", color: colors.textPrimary },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen
              name="Shop"
              component={ShopScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: "Product Details" }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{ title: "Order Summary" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MarketplaceSelectionProvider>
    </UserProvider>
  </SafeAreaProvider>
);
}
