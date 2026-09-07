/**
 * All prices in the data layer are stored in paise (smallest INR unit)
 * to avoid floating-point rounding issues, matching how most payments/
 * EMI backends represent money. This is the single place that converts
 * to a display string.
 */
export function formatRupees(paise: number): string {
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
