import { NavigatorScreenParams } from "@react-navigation/native";

export type ShopTabParamList = {
  TopBrands: undefined;
  NearbyStores: undefined;
  Marketplace: undefined;
};

export type RootStackParamList = {
  Shop: NavigatorScreenParams<ShopTabParamList>;
  ProductDetail: { productId: string };
  Checkout: { productId: string; variantId: string; emiPlanId: string };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
