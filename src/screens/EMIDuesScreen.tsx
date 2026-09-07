import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PrimaryButton } from "@/components/PrimaryButton";
import { LoadingView } from "@/components/LoadingView";
import { useUser } from "@/context/UserContext";
import { colors, radius, spacing, typography } from "@/theme/theme";

interface EMIDuesScreenProps {
  onNavigateToShop: () => void;
  onNavigateToLimit?: () => void;
}

type EligibilityStep = "signin" | "details" | "success";

export function EMIDuesScreen({
  onNavigateToShop,
  onNavigateToLimit,
}: EMIDuesScreenProps) {
  const { profile, checkEligibility, signIn } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState<EligibilityStep>("details");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [loadingSubtext, setLoadingSubtext] = useState("");

  // Sign In inputs
  const [signInPhone, setSignInPhone] = useState(profile.phone);
  const [otp, setOtp] = useState("1234");
  const [otpSent, setOtpSent] = useState(false);

  // Details inputs
  const [phone, setPhone] = useState(profile.phone);
  const [pan, setPan] = useState(profile.pan);

  const handleStartEligibility = () => {
    // If user is not logged in, prompt sign-in first; otherwise ask for details!
    if (!profile.isLoggedIn) {
      setStep("signin");
      setOtpSent(false);
    } else {
      setStep("details");
    }
    setModalVisible(true);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setLoadingMessage("Signing in to 1Fi...");
    setLoadingSubtext("Authenticating your credentials securely");
    await signIn(signInPhone);
    setLoading(false);
    // Move to details step after successful sign-in
    setStep("details");
  };

  const handleVerifyDetails = async () => {
    setLoading(true);
    setLoadingMessage("Verifying Mutual Funds via CAMS & KFintech...");
    setLoadingSubtext("Checking eligible equity schemes for 0% EMI limit calculation");
    await checkEligibility(phone, pan);
    setLoading(false);
    setStep("success");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Receipt / Dues Illustration */}
        <View style={styles.receiptBox}>
          <View style={styles.receiptPaper}>
            <View style={styles.receiptTopBar} />
            <View style={styles.receiptLine1} />
            <View style={styles.receiptLine2} />
            <View style={styles.receiptTag}>
              <Text style={styles.rupeeSymbol}>₹</Text>
            </View>
            <View style={styles.receiptZigzag}>
              <Text style={styles.zigzagPattern}>▲▲▲▲▲▲</Text>
            </View>
          </View>
          <Text style={styles.sparkle1}>✨</Text>
          <Text style={styles.sparkle2}>✦</Text>
        </View>

        <Text style={styles.tagline}>NOTHING DUE YET</Text>
        <Text style={styles.title}>
          Looks like you haven't{"\n"}shopped yet with 1Fi
        </Text>

        <PrimaryButton
          label="Check eligibility"
          onPress={handleStartEligibility}
          variant="filled"
          style={styles.button}
        />
      </View>

      {/* Interactive Eligibility Check Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {step === "signin"
                  ? "Sign In to 1Fi"
                  : step === "details"
                  ? "Check 0% EMI Eligibility"
                  : "Pre-Approved Limit Ready!"}
              </Text>
              <Pressable onPress={closeModal} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            {loading ? (
              <View style={styles.loadingWrapper}>
                <LoadingView label={loadingMessage} subtext={loadingSubtext} />
              </View>
            ) : step === "signin" ? (
              /* STEP A: Sign In Flow */
              <ScrollView contentContainerStyle={styles.formContent}>
                <Text style={styles.formHint}>
                  Please sign in with your registered mobile number to check your loan eligibility against mutual funds.
                </Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mobile Number</Text>
                  <TextInput
                    value={signInPhone}
                    onChangeText={setSignInPhone}
                    keyboardType="phone-pad"
                    placeholder="+91 98765 43210"
                    placeholderTextColor={colors.textMuted}
                    style={styles.input}
                  />
                </View>

                {otpSent ? (
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Enter 4-digit OTP</Text>
                    <TextInput
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                      maxLength={4}
                      placeholder="1234"
                      placeholderTextColor={colors.textMuted}
                      style={[styles.input, styles.otpInput]}
                    />
                    <Text style={styles.inputSubhint}>Demo OTP is pre-filled: 1234</Text>
                  </View>
                ) : null}

                {otpSent ? (
                  <PrimaryButton
                    label="Verify OTP & Continue →"
                    onPress={handleSignIn}
                    variant="filled"
                    style={styles.modalBtn}
                  />
                ) : (
                  <PrimaryButton
                    label="Send OTP"
                    onPress={handleSendOtp}
                    variant="filled"
                    style={styles.modalBtn}
                  />
                )}
              </ScrollView>
            ) : step === "details" ? (
              /* STEP B: Enter Details Flow (User is logged in) */
              <ScrollView contentContainerStyle={styles.formContent}>
                <Text style={styles.formHint}>
                  Signed in as <Text style={{ fontWeight: "700", color: colors.brandPrimary }}>{profile.name}</Text>. Enter your PAN to discover your pre-approved 1Fi credit limit. Zero impact on credit score.
                </Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Registered Mobile Number</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="+91 XXXXX XXXXX"
                    placeholderTextColor={colors.textMuted}
                    style={styles.input}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Permanent Account Number (PAN)</Text>
                  <TextInput
                    value={pan}
                    onChangeText={(t) => setPan(t.toUpperCase())}
                    autoCapitalize="characters"
                    placeholder="ABCDE1234F"
                    placeholderTextColor={colors.textMuted}
                    style={styles.input}
                  />
                </View>

                <View style={styles.securityNote}>
                  <Text style={styles.securityShield}>🛡️</Text>
                  <Text style={styles.securityText}>
                    1Fi uses bank-grade 256-bit encryption. We only check eligible portfolio value to create a credit line without selling your mutual funds.
                  </Text>
                </View>

                <PrimaryButton
                  label="Check My 0% EMI Limit →"
                  onPress={handleVerifyDetails}
                  variant="filled"
                  style={styles.modalBtn}
                />
              </ScrollView>
            ) : (
              /* STEP C: Success / Pre-Approved Limit */
              <View style={styles.resultBox}>
                <View style={styles.congratsCircle}>
                  <Text style={styles.congratsEmoji}>🎉</Text>
                </View>
                <Text style={styles.resultTitle}>You Are Pre-Approved!</Text>
                <Text style={styles.resultSubtitle}>
                  Based on your mutual fund portfolio, your 0% EMI credit limit is ready for shopping.
                </Text>

                <View style={styles.approvedLimitCard}>
                  <Text style={styles.approvedLimitLabel}>Approved 0% EMI Limit</Text>
                  <Text style={styles.approvedLimitAmount}>₹2,50,000</Text>
                  <Text style={styles.approvedLimitSub}>0% Interest · ₹0 Downpayment · Zero Liquidation</Text>
                </View>

                <PrimaryButton
                  label="Shop on 1Fi Marketplace →"
                  onPress={() => {
                    closeModal();
                    onNavigateToShop();
                  }}
                  variant="filled"
                  style={styles.modalBtn}
                />

                {onNavigateToLimit ? (
                  <PrimaryButton
                    label="View Portfolio & Schemes 📈"
                    onPress={() => {
                      closeModal();
                      onNavigateToLimit();
                    }}
                    variant="outline"
                    style={[styles.modalBtn, { marginTop: spacing.sm }]}
                  />
                ) : null}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl + 40,
  },
  content: {
    alignItems: "center",
    maxWidth: 320,
    gap: spacing.md,
  },
  receiptBox: {
    position: "relative",
    width: 140,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  receiptPaper: {
    width: 100,
    height: 130,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: "center",
    padding: spacing.sm,
    gap: 8,
    position: "relative",
    overflow: "hidden",
  },
  receiptTopBar: {
    width: 50,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.brandPrimary,
    marginTop: 4,
  },
  receiptLine1: {
    width: 70,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceSecondary,
  },
  receiptLine2: {
    width: 70,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceSecondary,
  },
  receiptTag: {
    width: 32,
    height: 12,
    borderRadius: 4,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  rupeeSymbol: {
    fontSize: 9,
    fontWeight: "800",
    color: "#D97706",
  },
  receiptZigzag: {
    position: "absolute",
    bottom: -4,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  zigzagPattern: {
    fontSize: 10,
    color: colors.borderStrong,
    letterSpacing: 2,
  },
  sparkle1: {
    position: "absolute",
    top: 20,
    right: 5,
    fontSize: 14,
    color: "#FBBF24",
  },
  sparkle2: {
    position: "absolute",
    bottom: 30,
    left: 5,
    fontSize: 14,
    color: colors.brandPrimary,
  },
  tagline: {
    ...typography.tag,
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 1.5,
    fontWeight: "700",
  },
  title: {
    ...typography.h1,
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: "center",
    lineHeight: 26,
  },
  button: {
    width: "100%",
    marginTop: spacing.sm,
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    maxHeight: "85%",
    gap: spacing.md,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 18,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "700",
  },
  loadingWrapper: {
    paddingVertical: spacing.xxl,
  },
  formContent: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  formHint: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    ...typography.tag,
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  otpInput: {
    letterSpacing: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  inputSubhint: {
    ...typography.caption,
    color: colors.brandPrimary,
    fontSize: 11,
    marginTop: 2,
  },

  securityNote: {
    flexDirection: "row",
    backgroundColor: colors.brandLilac,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: "center",
  },
  securityShield: {
    fontSize: 20,
  },
  securityText: {
    ...typography.caption,
    fontSize: 11.5,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
  modalBtn: {
    marginTop: spacing.xs,
  },
  resultBox: {
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  congratsCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.brandMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  congratsEmoji: {
    fontSize: 30,
  },
  resultTitle: {
    ...typography.hero,
    fontSize: 22,
    color: colors.textPrimary,
  },
  resultSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
  approvedLimitCard: {
    width: "100%",
    backgroundColor: colors.brandPrimary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: 4,
  },
  approvedLimitLabel: {
    ...typography.tag,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "700",
  },
  approvedLimitAmount: {
    ...typography.hero,
    fontSize: 32,
    color: colors.white,
    fontWeight: "900",
  },
  approvedLimitSub: {
    ...typography.tag,
    color: "#6EE7B7",
    fontWeight: "700",
  },
});
