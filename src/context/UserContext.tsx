import React, { createContext, useContext, useState } from "react";

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  pan: string;
  bankAccount: string;
  isLoggedIn: boolean;
  creditLimitInRupees: number;
  portfolioFetched: boolean;
}

interface UserContextValue {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  fetchPortfolio: () => Promise<void>;
  checkEligibility: (phone: string, pan: string) => Promise<void>;
  signIn: (phone: string) => Promise<void>;
  signOut: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Rakshit Sharma",
  phone: "+91 98765 43210",
  email: "rakshit.sharma@example.com",
  pan: "ABCDE1234F",
  bankAccount: "HDFC Bank •••• 4892",

  isLoggedIn: true,
  creditLimitInRupees: 250000,
  portfolioFetched: false,
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const signIn = async (phone: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setProfile((prev) => ({
      ...prev,
      phone: phone || prev.phone,
      isLoggedIn: true,
    }));
  };

  const signOut = () => {
    setProfile((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  const fetchPortfolio = async () => {
    // Simulate API fetch delay
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setProfile((prev) => ({
      ...prev,
      portfolioFetched: true,
      creditLimitInRupees: 250000,
    }));
  };

  const checkEligibility = async (phone: string, pan: string) => {
    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setProfile((prev) => ({
      ...prev,
      phone: phone || prev.phone,
      pan: pan || prev.pan,
      isLoggedIn: true,
      creditLimitInRupees: 250000,
      portfolioFetched: true,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        fetchPortfolio,
        checkEligibility,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}


export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
