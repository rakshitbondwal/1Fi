/**
 * Design tokens extracted directly from 1Fi production app screenshots.
 */

export const colors = {
  // 1Fi Signature Brand Colors
  brandPrimary: "#622CE0", // Electric purple used in CTA buttons and active tabs
  brandSecondary: "#5B21B6",
  brandDark: "#180D58", // Hero banner deep midnight purple
  brandDarkEnd: "#281082", // Hero banner gradient end
  brandLight: "#7C3AED",
  brandMuted: "#EDE9FE", // Soft lavender used in badges and icons
  brandLilac: "#F5F3FF",
  brandBorder: "#DDD6FE",

  // Core Backgrounds & Surfaces
  background: "#F8F9FD",
  surface: "#FFFFFF",
  surfaceSecondary: "#F3F4F6",
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",
  borderLight: "#F3F4F6",

  // Typography
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  textOnBrand: "#FFFFFF",

  // Legacy mappings
  accent: "#622CE0",
  accentMuted: "#EDE9FE",

  // Semantics
  success: "#10B981",
  successMuted: "#ECFDF5",
  warning: "#F59E0B",
  error: "#EF4444",
  errorMuted: "#FEF2F2",
  white: "#FFFFFF",
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36,
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
} as const;

export const typography = {
  hero: { fontSize: 24, fontWeight: "800" as const, lineHeight: 30 },
  h1: { fontSize: 20, fontWeight: "700" as const, lineHeight: 26 },
  h2: { fontSize: 17, fontWeight: "700" as const, lineHeight: 23 },
  h3: { fontSize: 15, fontWeight: "600" as const, lineHeight: 20 },
  body: { fontSize: 14, fontWeight: "400" as const, lineHeight: 20 },
  bodyStrong: { fontSize: 14, fontWeight: "600" as const, lineHeight: 20 },
  caption: { fontSize: 13, fontWeight: "400" as const, lineHeight: 18 },
  captionStrong: { fontSize: 13, fontWeight: "600" as const, lineHeight: 18 },
  label: { fontSize: 12, fontWeight: "500" as const, lineHeight: 16 },
  tag: { fontSize: 11, fontWeight: "600" as const, lineHeight: 15 },
} as const;

export const shadow = {
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  bottomNav: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  modal: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;
