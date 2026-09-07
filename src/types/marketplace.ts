export interface ProductVariant {
  id: string;
  label: string; // e.g. "128GB · Natural Titanium"
  priceInPaise: number;
  inStock: boolean;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyInstallmentInPaise: number;
  interestRatePct: number; // 0 for no-cost EMI
  totalPayableInPaise: number;
  isNoCost: boolean;
  savingsVsCreditCardInPaise?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  category: string;
  shortDescription: string;
  rating?: number;
  badge?: string; // e.g. "0% Interest", "Best Seller", "New Launch"
  features?: string[];
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
}

export type LoadState = "idle" | "loading" | "success" | "error";
