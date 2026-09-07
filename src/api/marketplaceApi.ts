import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { Product } from "@/types/marketplace";

const NETWORK_DELAY_MS = 450;

/**
 * Simulated network failure rate.
 * Kept at 0% for predictable local testing, can be increased to test ErrorView retry.
 */
const SIMULATED_FAILURE_RATE = 0;

class MarketplaceApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MarketplaceApiError";
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail(): void {
  if (Math.random() < SIMULATED_FAILURE_RATE) {
    throw new MarketplaceApiError("Could not reach the marketplace service. Please try again.");
  }
}

export interface ProductFilterOptions {
  category?: string;
  query?: string;
}

/**
 * Fetches the product catalog for the Marketplace listing,
 * supporting optional category and text search filters.
 */
export async function fetchProducts(options?: ProductFilterOptions): Promise<Product[]> {
  await delay(NETWORK_DELAY_MS);
  maybeFail();

  let products = [...MOCK_PRODUCTS];

  if (options?.category && options.category !== "All") {
    products = products.filter(
      (p) => p.category.toLowerCase() === options.category?.toLowerCase()
    );
  }

  if (options?.query && options.query.trim().length > 0) {
    const q = options.query.trim().toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  return products;
}

/**
 * Fetches a single product by id for the detail/EMI-selection screen.
 */
export async function fetchProductById(productId: string): Promise<Product | null> {
  await delay(NETWORK_DELAY_MS);
  maybeFail();
  return MOCK_PRODUCTS.find((p) => p.id === productId) ?? null;
}

export { MarketplaceApiError };
