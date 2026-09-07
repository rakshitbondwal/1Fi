import React, { createContext, useContext, useMemo, useState } from "react";

interface Selection {
  productId: string;
  variantId: string;
  emiPlanId: string;
}

interface MarketplaceSelectionContextValue {
  selection: Selection | null;
  setSelection: (selection: Selection) => void;
  clearSelection: () => void;
}

const MarketplaceSelectionContext = createContext<MarketplaceSelectionContextValue | undefined>(
  undefined
);

// Carries the user's chosen product/variant/EMI plan from ProductDetail to
// Checkout without threading large objects through route params — only
// ids are passed, screens re-fetch/derive details from the ids they need.
export function MarketplaceSelectionProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelectionState] = useState<Selection | null>(null);

  const value = useMemo(
    () => ({
      selection,
      setSelection: (s: Selection) => setSelectionState(s),
      clearSelection: () => setSelectionState(null),
    }),
    [selection]
  );

  return (
    <MarketplaceSelectionContext.Provider value={value}>
      {children}
    </MarketplaceSelectionContext.Provider>
  );
}

export function useMarketplaceSelection() {
  const ctx = useContext(MarketplaceSelectionContext);
  if (!ctx) {
    throw new Error("useMarketplaceSelection must be used within MarketplaceSelectionProvider");
  }
  return ctx;
}
