# 1Fi Marketplace — 0% No-Cost EMI Shopping Experience

> **1Fi SDE Intern Assignment**: Implementation of the **1Fi Marketplace** section within the **Shop** screen, powered by Loan Against Mutual Funds (LAMF).

---

## 📱 Project Overview

**1Fi** enables smart shoppers in India to buy electronics, gadgets, and lifestyle products on **0% No-Cost EMI** without liquidating their mutual fund investments. By creating a digital lien via CAMS / KFintech, users unlock a credit line while their portfolio continues compounding in the market.

This repository implements the complete end-to-end **1Fi Marketplace** experience within the 1Fi mobile application, closely matching the production app's visual identity, typography, navigation, and fintech architecture.

---

## ✨ Key Features & Highlights

### 1. The Shop Experience & Segmented Navigation
* **Midnight Purple Hero Banner**: Deep indigo-to-purple background (`#180D58`) with 3D gadgets, gold confetti, and `✨ NO-COST EMIs` badge.
* **Three-Way Segmented Switcher**:
  * `Top Brands`: Curated partner brand store cards (*Air India*, *Apple*, *CaratLane*).
  * `Nearby Stores`: Local offline verified partner stores.
  * `1Fi Marketplace`: Complete digital shopping catalog with real-time LAMF financing.

### 2. 1Fi Marketplace Catalog
* **Dynamic 2-Column Product Grid**: High-resolution product images, brand tags, 0% EMI badges, and pricing formatted in Indian Rupees (`₹...`).
* **Real-Time Search & Category Filters**: Search across products, brands, and categories (`All`, `Smartphones`, `Laptops`, `Audio`, `Appliances`) with instant empty state handling and search reset.
* **Pull-to-Refresh & Error Handling**: Asynchronous data layer with network retry capabilities.

### 3. Product Details & Real-Time Dynamic EMI Calculator
* **Variant & Storage Selector**: Switch between storage options and color variants with live stock indicators.
* **Dynamic EMI Recalculation**: Selecting a different variant dynamically updates all 0% EMI plans (3, 6, 9, 12, 24 months) per variant price.
* **1Fi LAMF Guarantee Card**: Highlights zero downpayment, zero foreclosure fees, and continuous investment compounding.
* **Sticky Checkout Footer**: Live monthly installment indicator and *"Proceed with plan →"* CTA.

### 4. Order Review & Mutual Fund Pledge
* **Lien Pledge Summary**: Transparent breakdown showing 0% interest rate, ₹0 processing fee, zero downpayment, and digital CAMS / KFintech pledge details.
* **Interactive Confirmation**: Digital authorization flow with order status tracking.

### 5. Apple-Style Floating Dock
* **Frosted Glassmorphism**: Built using `expo-blur` (`BlurView`) with a translucent backdrop and ambient drop shadow.
* **Active Tab Pill Highlight**: Soft lilac highlight pill (`rgba(98, 44, 224, 0.12)`), scaled active icon (`1.15x`), and bold electric purple label.
* **Smooth Transitions**: Fluid `LayoutAnimation` easing when switching between tabs (*Home*, *Shop*, *EMI Dues*, *Limit*, *Profile*).

### 6. Limit & Portfolio Dashboard
* **Lock Screen & Portfolio Fetching**: Padlock state with interactive *"Fetch my portfolio"* action.
* **Real Portfolio Breakdown**: Fetches and renders the user's unlocked credit line (`₹2,50,000`) and 3 detected mutual fund schemes:
  1. *Parag Parikh Flexi Cap Fund - Direct (G)*: ₹1,42,000 value · ₹99,400 limit (CAMS)
  2. *HDFC Mid-Cap Opportunities Fund (G)*: ₹1,18,500 value · ₹82,950 limit (KFintech)
  3. *Mirae Asset Large Cap Fund (G)*: ₹1,24,500 value · ₹87,150 limit (CAMS)

### 7. Interactive Profile & KYC Management
* **Direct Detail Editing**: In-app editing for Full Name, Mobile, Email, and PAN with live persistence.
* **Interactive Quick Action Modals**: Modals for *Purchases*, *Pledge History*, *Invite Friends (Earn ₹500)*, *Support & FAQs* (accordion), and *Privacy Policy*.
* **Authentication Controls**: Session switcher to test logged-in vs. logged-out eligibility flows.

### 8. Universal Loading Component (`LoadingView`)
* Branded fintech activity indicator with custom label, contextual subtext, and modal overlay support across all asynchronous touchpoints.

---

## 🏗️ Architecture & Technology Stack

* **Core**: React Native (Expo SDK 52)
* **Language**: TypeScript (100% strict type safety, 0 compiler errors)
* **Navigation**: React Navigation Native Stack
* **Styling**: Vanilla React Native `StyleSheet` with centralized design tokens (`src/theme/theme.ts`)
* **Blur & Glassmorphism**: `expo-blur`
* **State Management**:
  * `MarketplaceSelectionContext`: Handles product, variant, and EMI plan selection across navigation stacks.
  * `UserContext`: Manages profile, KYC, authentication, and credit limit state.
* **API Layer**: `marketplaceApi.ts` provides clean asynchronous API abstractions with simulated network latency.
* **Financial Calculations**: Pure mathematical utility in `emiCalculator.ts` computing tenures, monthly installments, and LTV ratios.

---

## 📁 Project Structure

```
1fi-marketplace/
├── src/
│   ├── api/
│   │   └── marketplaceApi.ts          # Async API layer for catalog & products
│   ├── components/
│   │   ├── CategoryFilter.tsx         # Pill-based category filter bar
│   │   ├── EMIPlanCard.tsx            # Radio selector card for 0% EMI plans
│   │   ├── ErrorView.tsx              # Error fallback with retry CTA
│   │   ├── FloatingBottomNav.tsx      # Apple-style frosted glass dock
│   │   ├── LoadingView.tsx            # Unified fintech loading component
│   │   ├── PrimaryButton.tsx          # 1Fi electric purple pill CTA button
│   │   ├── ProductCard.tsx            # 2-column catalog product card
│   │   ├── SearchBar.tsx              # Rounded pill search bar
│   │   └── VariantSelector.tsx        # Storage and variant selector chips
│   ├── context/
│   │   ├── MarketplaceSelectionContext.tsx # Checkout selection state
│   │   └── UserContext.tsx            # User profile, KYC & limit state
│   ├── data/
│   │   └── mockProducts.ts            # High-fidelity mock catalog data
│   ├── hooks/
│   │   └── useAsync.ts                # Asynchronous state management hook
│   ├── navigation/
│   │   └── types.ts                   # Type definitions for navigation
│   ├── screens/
│   │   ├── marketplace/
│   │   │   ├── MarketplaceListScreen.tsx # 1Fi Marketplace catalog
│   │   │   ├── ProductDetailScreen.tsx   # Product specs, variants & EMI plans
│   │   │   └── CheckoutScreen.tsx        # Order summary & LAMF pledge review
│   │   ├── EMIDuesScreen.tsx          # EMI dues & eligibility check flow
│   │   ├── HomeScreen.tsx             # 1Fi home screen with hero card
│   │   ├── LimitScreen.tsx            # Mutual fund portfolio & limit dashboard
│   │   ├── NearbyStoresScreen.tsx     # Partner stores screen
│   │   ├── ProfileScreen.tsx          # User profile with inline editing
│   │   ├── ShopScreen.tsx             # Main shop screen with 3-way segmented switcher
│   │   └── TopBrandsScreen.tsx        # Curated top brands screen
│   ├── theme/
│   │   └── theme.ts                   # 1Fi design tokens (colors, typography, shadow)
│   ├── types/
│   │   └── marketplace.ts             # TypeScript interfaces for products & EMIs
│   └── utils/
│       ├── emiCalculator.ts           # Pure EMI calculations
│       └── formatters.ts              # Currency (₹) and text formatters
├── App.tsx                            # App root with providers & navigation
├── app.json                           # Expo app configuration
├── tsconfig.json                      # Strict TypeScript configuration
└── package.json                       # Dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* **Expo Go** app on your physical iOS or Android device (optional, for device preview)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd 1fi-marketplace
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Expo development server**:
   ```bash
   npx expo start
   ```

4. **Run on Device / Simulator**:
   * Press `a` for Android Emulator.
   * Press `i` for iOS Simulator.
   * Scan the QR code in your terminal using **Expo Go** (Android) or the **Camera app** (iOS).

### Code Quality & Validation

* **Typecheck**:
  ```bash
  npm run typecheck
  ```
* **Production Bundle Export**:
  ```bash
  npx expo export
  ```
