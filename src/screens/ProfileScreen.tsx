import React, { useState } from "react";
import {
  Alert,
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
import { colors, radius, shadow, spacing, typography } from "@/theme/theme";

type ModalType =
  | null
  | "profile_details"
  | "purchases"
  | "pledge_history"
  | "invite"
  | "support"
  | "privacy";

interface ActionItem {
  id: NonNullable<ModalType>;
  icon: string;
  title: string;
  subtitle: string;
  badge?: string;
}

const ACTIONS: ActionItem[] = [
  {
    id: "profile_details",
    icon: "👤",
    title: "Profile details",
    subtitle: "Name, contact and KYC info",
  },
  {
    id: "purchases",
    icon: "📦",
    title: "Purchases",
    subtitle: "Orders, invoices and loan status",
  },
  {
    id: "pledge_history",
    icon: "🐷",
    title: "Pledge history",
    subtitle: "Funds you pledged or released",
  },
  {
    id: "invite",
    icon: "👥",
    title: "Invite friends",
    subtitle: "Share the app, earn rewards",
    badge: "EARN ₹500",
  },
  {
    id: "support",
    icon: "❓",
    title: "Support & FAQs",
    subtitle: "Find answers or contact us",
  },
  {
    id: "privacy",
    icon: "🛡️",
    title: "Privacy policy",
    subtitle: "How we handle your data",
  },
];

export function ProfileScreen() {
  const { profile, updateProfile } = useUser();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editPan, setEditPan] = useState(profile.pan);

  const { signOut, signIn } = useUser();

  const handleOpenEdit = () => {
    setEditName(profile.name);
    setEditPhone(profile.phone);
    setEditEmail(profile.email);
    setEditPan(profile.pan);
    setIsEditing(true);
    setActiveModal("profile_details");
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate brief save delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateProfile({
      name: editName.trim() || profile.name,
      phone: editPhone.trim() || profile.phone,
      email: editEmail.trim() || profile.email,
      pan: editPan.trim() || profile.pan,
    });
    setIsSaving(false);
    setIsEditing(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleCopyReferral = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsEditing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          Manage your account settings and personal preferences.
        </Text>
      </View>

      {/* Success Notification Banner */}
      {showSaveSuccess && (
        <View style={styles.successBanner}>
          <Text style={styles.successBannerText}>
            ✓ Profile details updated successfully!
          </Text>
        </View>
      )}

      {/* User Card - Features prominent Edit button */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{profile.name}</Text>
            <View style={styles.kycVerifiedBadge}>
              <Text style={styles.kycVerifiedText}>
                {profile.isLoggedIn ? "KYC VERIFIED ✓" : "LOGGED OUT"}
              </Text>
            </View>
          </View>
          <Text style={styles.userPhone}>{profile.phone}</Text>
        </View>

        {/* Dedicated prominent Edit button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit profile details"
          onPress={handleOpenEdit}
          style={({ pressed }) => [
            styles.editPillBtn,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.editPillText}>Edit ✏️</Text>
        </Pressable>
      </View>


      {/* Quick Actions Header */}
      <Text style={styles.sectionHeader}>QUICK ACTIONS</Text>

      {/* Actions List */}
      <View style={styles.actionsList}>
        {ACTIONS.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={item.title}
            onPress={() => {
              if (item.id === "profile_details") {
                setEditName(profile.name);
                setEditPhone(profile.phone);
                setEditEmail(profile.email);
                setEditPan(profile.pan);
              }
              setActiveModal(item.id);
            }}
            style={({ pressed }) => [
              styles.actionCard,
              pressed && styles.actionCardPressed,
            ]}
          >
            <View style={styles.iconBox}>
              <Text style={styles.actionIcon}>{item.icon}</Text>
            </View>

            <View style={styles.actionTexts}>
              <Text style={styles.actionTitle}>{item.title}</Text>
              <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
            </View>

            {item.badge ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            ) : null}

            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>

      {/* Account Session & Authentication Control */}
      <Text style={styles.sectionHeader}>ACCOUNT & AUTH</Text>
      <View style={styles.sessionCard}>
        <View style={styles.sessionTexts}>
          <Text style={styles.sessionTitle}>
            {profile.isLoggedIn ? `Signed in as ${profile.name}` : "Currently Signed Out"}
          </Text>
          <Text style={styles.sessionSubtitle}>
            {profile.isLoggedIn
              ? "Sign out to test EMI dues sign-in & eligibility prompts"
              : "Sign in to access 0% EMI limits and saved portfolio"}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            if (profile.isLoggedIn) {
              signOut();
            } else {
              signIn(profile.phone);
            }
          }}
          style={({ pressed }) => [
            styles.authBtn,
            profile.isLoggedIn ? styles.authBtnSignOut : styles.authBtnSignIn,
            pressed && styles.cardPressed,
          ]}
        >
          <Text
            style={[
              styles.authBtnText,
              profile.isLoggedIn ? styles.authBtnTextSignOut : styles.authBtnTextSignIn,
            ]}
          >
            {profile.isLoggedIn ? "Sign Out" : "Sign In"}
          </Text>
        </Pressable>
      </View>

      {/* ================= MODALS FOR EVERY ACTION ================= */}

      {/* 1. Profile Details Modal (WITH EDITING CAPABILITY) */}
      <Modal
        visible={activeModal === "profile_details"}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEditing ? "Edit Profile Details" : "Profile Details"}
              </Text>
              <Pressable onPress={closeModal} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            {isSaving ? (
              <View style={styles.loadingWrapper}>
                <LoadingView
                  label="Saving Profile Changes..."
                  subtext="Updating your personal and KYC credentials securely"
                />
              </View>
            ) : isEditing ? (

              <ScrollView contentContainerStyle={styles.modalBody}>
                <View style={styles.editField}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <TextInput
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Enter your name"
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.editField}>
                  <Text style={styles.fieldLabel}>Mobile Number</Text>
                  <TextInput
                    value={editPhone}
                    onChangeText={setEditPhone}
                    keyboardType="phone-pad"
                    placeholder="Mobile number"
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.editField}>
                  <Text style={styles.fieldLabel}>Email Address</Text>
                  <TextInput
                    value={editEmail}
                    onChangeText={setEditEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Email address"
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.editField}>
                  <Text style={styles.fieldLabel}>PAN Number</Text>
                  <TextInput
                    value={editPan}
                    onChangeText={(t) => setEditPan(t.toUpperCase())}
                    autoCapitalize="characters"
                    placeholder="PAN number"
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.editActionsRow}>
                  <PrimaryButton
                    label="Cancel"
                    onPress={() => setIsEditing(false)}
                    variant="outline"
                    style={styles.cancelBtn}
                  />
                  <PrimaryButton
                    label="Save Changes"
                    onPress={handleSaveProfile}
                    variant="filled"
                    style={styles.saveBtn}
                  />
                </View>
              </ScrollView>
            ) : (
              <ScrollView contentContainerStyle={styles.modalBody}>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Full Name</Text>
                  <Text style={styles.fieldValue}>{profile.name}</Text>
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Mobile Number</Text>
                  <Text style={styles.fieldValue}>{profile.phone} (Verified ✓)</Text>
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Email Address</Text>
                  <Text style={styles.fieldValue}>{profile.email} (Verified ✓)</Text>
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>PAN Number</Text>
                  <Text style={styles.fieldValue}>{profile.pan} (Linked via DigiLocker)</Text>
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Linked Bank Account</Text>
                  <Text style={styles.fieldValue}>{profile.bankAccount} (e-NACH Active)</Text>
                </View>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Approved Credit Limit</Text>
                  <Text style={styles.fieldValueHighlight}>
                    ₹{profile.creditLimitInRupees.toLocaleString("en-IN")} (0% Interest)
                  </Text>
                </View>

                <View style={styles.editTriggerRow}>
                  <PrimaryButton
                    label="Edit Details ✏️"
                    onPress={() => setIsEditing(true)}
                    variant="secondary"
                    style={styles.modalActionBtn}
                  />
                  <PrimaryButton
                    label="Done"
                    onPress={closeModal}
                    variant="filled"
                    style={styles.modalActionBtn}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* 2. Purchases Modal */}
      <Modal
        visible={activeModal === "purchases"}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Purchases & Orders</Text>
              <Pressable onPress={closeModal} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <View style={styles.orderCard}>
                <View style={styles.orderTopRow}>
                  <Text style={styles.orderTitle}>iPhone 16 Pro (128GB)</Text>
                  <View style={styles.orderBadge}>
                    <Text style={styles.orderBadgeText}>Confirmed</Text>
                  </View>
                </View>
                <Text style={styles.orderMeta}>Order ID: #1FI-89412 · Today</Text>
                <Text style={styles.orderEmi}>6 Months No-cost EMI · ₹19,983/mo</Text>
                <Text style={styles.orderStatus}>Status: Mutual Funds Pledged · Dispatching</Text>
              </View>

              <View style={styles.orderCard}>
                <View style={styles.orderTopRow}>
                  <Text style={styles.orderTitle}>Sony WH-1000XM5</Text>
                  <View style={[styles.orderBadge, styles.orderBadgeDelivered]}>
                    <Text style={styles.orderBadgeTextDelivered}>Delivered</Text>
                  </View>
                </View>
                <Text style={styles.orderMeta}>Order ID: #1FI-67210 · Aug 2026</Text>
                <Text style={styles.orderEmi}>3 Months No-cost EMI · ₹9,996/mo</Text>
                <Text style={styles.orderStatus}>Status: Active EMI (1 of 3 Paid)</Text>
              </View>
            </ScrollView>

            <PrimaryButton label="Close" onPress={closeModal} style={styles.modalActionBtn} />
          </View>
        </View>
      </Modal>

      {/* 3. Pledge History Modal */}
      <Modal
        visible={activeModal === "pledge_history"}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Mutual Fund Pledge History</Text>
              <Pressable onPress={closeModal} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <View style={styles.pledgeSummaryCard}>
                <Text style={styles.pledgeSummaryLabel}>Total Pledged Portfolio Value</Text>
                <Text style={styles.pledgeSummaryAmount}>₹2,84,500</Text>
                <Text style={styles.pledgeSummarySub}>
                  Powered by CAMS & KFintech via MFCentral
                </Text>
              </View>

              <Text style={styles.sheetSubheader}>ACTIVE PLEDGED SCHEMES</Text>

              <View style={styles.schemeCard}>
                <Text style={styles.schemeName}>Parag Parikh Flexi Cap Fund - Direct (G)</Text>
                <Text style={styles.schemeDetail}>Pledged Units: 842.15 · Value: ₹65,400</Text>
                <Text style={styles.schemeNote}>Units continue generating market compounding returns</Text>
              </View>

              <View style={styles.schemeCard}>
                <Text style={styles.schemeName}>HDFC Mid-Cap Opportunities Fund (G)</Text>
                <Text style={styles.schemeDetail}>Pledged Units: 412.30 · Value: ₹54,500</Text>
                <Text style={styles.schemeNote}>Lien auto-released upon final EMI repayment</Text>
              </View>
            </ScrollView>

            <PrimaryButton label="Close" onPress={closeModal} style={styles.modalActionBtn} />
          </View>
        </View>
      </Modal>

      {/* 4. Invite Friends Modal */}
      <Modal
        visible={activeModal === "invite"}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Invite & Earn ₹500</Text>
              <Pressable onPress={closeModal} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <View style={styles.referralBanner}>
                <Text style={styles.referralEmoji}>🎁</Text>
                <Text style={styles.referralHeadline}>Give ₹500, Get ₹500</Text>
                <Text style={styles.referralDesc}>
                  Share your link. When your friend checks their 1Fi limit, you both earn ₹500 cash reward!
                </Text>
              </View>

              <View style={styles.codeBox}>
                <View>
                  <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
                  <Text style={styles.codeText}>1FI500</Text>
                </View>
                <Pressable onPress={handleCopyReferral} style={styles.copyBtn}>
                  <Text style={styles.copyBtnText}>
                    {copiedCode ? "Copied! ✓" : "Copy Code"}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.referralStats}>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>Invited</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statNumber}>₹1,500</Text>
                  <Text style={styles.statLabel}>Total Earned</Text>
                </View>
              </View>
            </ScrollView>

            <PrimaryButton
              label="Share Link on WhatsApp"
              onPress={() => {
                handleCopyReferral();
                Alert.alert("Link Copied", "Referral link copied to clipboard: https://1fi.in/invite/1FI500");
              }}
              style={styles.modalActionBtn}
            />

          </View>
        </View>
      </Modal>

      {/* 5. Support & FAQs Modal */}
      <Modal
        visible={activeModal === "support"}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Support & FAQs</Text>
              <Pressable onPress={closeModal} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              {[
                {
                  q: "How does 1Fi shop using mutual funds work?",
                  a: "1Fi allows you to pledge your existing mutual fund units as collateral. You get a 0% interest credit line to buy gadgets, while your mutual funds remain invested and keep earning market returns.",
                },
                {
                  q: "Will my mutual funds be sold?",
                  a: "No! Your mutual funds are never redeemed. A lien is created via CAMS or KFintech. You continue to be the rightful owner and benefit from any compounding growth.",
                },
                {
                  q: "Are there any foreclosure charges?",
                  a: "Zero! You can prepay or close your loan anytime with absolutely zero penalty or foreclosure fees.",
                },
                {
                  q: "How do I repay my EMIs?",
                  a: "EMIs are automatically debited on your chosen date from your linked bank account via RBI-approved e-NACH mandate.",
                },
              ].map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <Pressable
                    key={index}
                    onPress={() => setExpandedFaq(isOpen ? null : index)}
                    style={styles.faqCard}
                  >
                    <View style={styles.faqHeader}>
                      <Text style={styles.faqQuestion}>{faq.q}</Text>
                      <Text style={styles.faqToggle}>{isOpen ? "−" : "+"}</Text>
                    </View>
                    {isOpen ? <Text style={styles.faqAnswer}>{faq.a}</Text> : null}
                  </Pressable>
                );
              })}

              <View style={styles.supportContactCard}>
                <Text style={styles.supportTitle}>Need human help?</Text>
                <Text style={styles.supportSubtitle}>
                  Chat with our 1Fi support specialists. We are available Mon-Sat, 9AM-8PM.
                </Text>
                <Pressable
                  onPress={() => Alert.alert("1Fi Support", "Connecting to WhatsApp support: +91 80 4718 1111")}
                  style={styles.contactBtn}
                >
                  <Text style={styles.contactBtnText}>💬 Chat on WhatsApp</Text>
                </Pressable>
              </View>
            </ScrollView>

            <PrimaryButton label="Close" onPress={closeModal} style={styles.modalActionBtn} />
          </View>
        </View>
      </Modal>

      {/* 6. Privacy Policy Modal */}
      <Modal
        visible={activeModal === "privacy"}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Privacy & Security</Text>
              <Pressable onPress={closeModal} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody}>
              <View style={styles.privacyHighlight}>
                <Text style={styles.privacyEmoji}>🛡️</Text>
                <Text style={styles.privacyTitle}>Bank-Grade 256-Bit Security</Text>
                <Text style={styles.privacyText}>
                  Your data and investment folios are encrypted end-to-end and stored strictly in compliance with RBI digital lending guidelines.
                </Text>
              </View>

              <View style={styles.bulletItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>RBI Regulated NBFC Partners:</Text> Lending is fulfilled by registered NBFCs including Tata Capital, DSP Finance, and Bajaj Finserv.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>Depository Integration:</Text> Lien creation is handled directly via official SEBI depositories (CAMS, KFintech, and MFCentral).
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>No Data Selling:</Text> 1Fi never shares or sells your financial records to third-party advertisers.
                </Text>
              </View>
            </ScrollView>

            <PrimaryButton label="Understood & Close" onPress={closeModal} style={styles.modalActionBtn} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl + 60,
    gap: spacing.md,
  },
  header: {
    gap: 4,
  },
  title: {
    ...typography.hero,
    fontSize: 26,
    color: colors.textPrimary,
    fontWeight: "800",
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    marginTop: spacing.xs,
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.9,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brandMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    ...typography.h2,
    color: colors.brandPrimary,
    fontWeight: "800",
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  userNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  userName: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  kycVerifiedBadge: {
    backgroundColor: colors.successMuted,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  kycVerifiedText: {
    ...typography.tag,
    fontSize: 9,
    color: colors.success,
    fontWeight: "800",
  },
  userPhone: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 13,
  },
  successBanner: {
    backgroundColor: colors.successMuted,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  successBannerText: {
    ...typography.tag,
    color: colors.success,
    fontSize: 12,
    fontWeight: "700",
  },
  editPillBtn: {
    backgroundColor: colors.brandLilac,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: "rgba(98, 44, 224, 0.2)",
  },
  editPillText: {
    ...typography.tag,
    color: colors.brandPrimary,
    fontWeight: "700",
    fontSize: 12,
  },
  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  sessionTexts: {
    flex: 1,
    marginRight: spacing.sm,
  },
  sessionTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 14,
  },
  sessionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11.5,
    marginTop: 2,
  },
  authBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  authBtnSignOut: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  authBtnSignIn: {
    backgroundColor: colors.brandPrimary,
  },
  authBtnText: {
    ...typography.tag,
    fontWeight: "700",
    fontSize: 12,
  },
  authBtnTextSignOut: {
    color: "#DC2626",
  },
  authBtnTextSignIn: {
    color: colors.white,
  },
  sectionHeader: {
    ...typography.tag,
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  actionsList: {
    gap: spacing.sm,
  },

  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    ...shadow.card,
  },
  actionCardPressed: {
    opacity: 0.85,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.brandLilac,
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    fontSize: 18,
  },
  actionTexts: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 14.5,
  },
  actionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  badge: {
    backgroundColor: colors.brandMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  badgeText: {
    ...typography.tag,
    fontSize: 10,
    color: colors.brandPrimary,
    fontWeight: "800",
  },
  chevron: {
    fontSize: 20,
    color: colors.textMuted,
    fontWeight: "300",
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    maxHeight: "85%",
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow.modal,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 18,
  },
  modalCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "700",
  },
  modalBody: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  loadingWrapper: {
    paddingVertical: spacing.xxl,
  },
  fieldGroup: {
    gap: 2,
    paddingVertical: spacing.xxs,
  },
  fieldLabel: {
    ...typography.tag,
    color: colors.textMuted,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  fieldValue: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 14.5,
  },
  fieldValueHighlight: {
    ...typography.bodyStrong,
    color: colors.brandPrimary,
    fontSize: 16,
    fontWeight: "800",
  },
  editField: {
    gap: 4,
  },
  textInput: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  editActionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  cancelBtn: {
    flex: 1,
  },
  saveBtn: {
    flex: 1,
  },
  editTriggerRow: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  modalActionBtn: {
    marginTop: spacing.xxs,
  },
  orderCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
  },
  orderTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 15,
  },
  orderBadge: {
    backgroundColor: colors.brandMuted,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  orderBadgeText: {
    ...typography.tag,
    fontSize: 10,
    color: colors.brandPrimary,
    fontWeight: "700",
  },
  orderBadgeDelivered: {
    backgroundColor: colors.successMuted,
  },
  orderBadgeTextDelivered: {
    ...typography.tag,
    fontSize: 10,
    color: colors.success,
    fontWeight: "700",
  },
  orderMeta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  orderEmi: {
    ...typography.captionStrong,
    color: colors.textPrimary,
    marginTop: 2,
  },
  orderStatus: {
    ...typography.tag,
    color: colors.brandSecondary,
    marginTop: 2,
  },
  pledgeSummaryCard: {
    backgroundColor: colors.brandMuted,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: 4,
  },
  pledgeSummaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  pledgeSummaryAmount: {
    ...typography.hero,
    color: colors.brandPrimary,
    fontSize: 28,
    fontWeight: "800",
  },
  pledgeSummarySub: {
    ...typography.tag,
    color: colors.brandSecondary,
  },
  sheetSubheader: {
    ...typography.tag,
    color: colors.textMuted,
    letterSpacing: 0.8,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  schemeCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 2,
  },
  schemeName: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 13.5,
  },
  schemeDetail: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  schemeNote: {
    ...typography.tag,
    color: colors.success,
    marginTop: 2,
  },
  referralBanner: {
    alignItems: "center",
    backgroundColor: colors.brandLilac,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  referralEmoji: {
    fontSize: 32,
  },
  referralHeadline: {
    ...typography.h2,
    color: colors.brandPrimary,
  },
  referralDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  codeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.brandBorder,
  },
  codeLabel: {
    ...typography.tag,
    fontSize: 10,
    color: colors.textMuted,
  },
  codeText: {
    ...typography.h2,
    color: colors.brandPrimary,
    letterSpacing: 2,
    fontWeight: "800",
  },
  copyBtn: {
    backgroundColor: colors.brandPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
  },
  copyBtnText: {
    ...typography.tag,
    color: colors.white,
    fontWeight: "700",
  },
  referralStats: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
    gap: 2,
  },
  statNumber: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  faqCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
    fontSize: 13.5,
    flex: 1,
    paddingRight: spacing.sm,
  },
  faqToggle: {
    fontSize: 18,
    color: colors.brandPrimary,
    fontWeight: "700",
  },
  faqAnswer: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
  },
  supportContactCard: {
    backgroundColor: colors.brandMuted,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  supportTitle: {
    ...typography.bodyStrong,
    color: colors.brandPrimary,
  },
  supportSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
  contactBtn: {
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
    marginTop: spacing.xs,
  },
  contactBtnText: {
    ...typography.tag,
    color: colors.brandPrimary,
    fontWeight: "700",
  },
  privacyHighlight: {
    alignItems: "center",
    backgroundColor: colors.brandLilac,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  privacyEmoji: {
    fontSize: 32,
  },
  privacyTitle: {
    ...typography.bodyStrong,
    color: colors.brandPrimary,
    fontSize: 15,
  },
  privacyText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  bulletItem: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingVertical: 2,
  },
  bulletDot: {
    fontSize: 14,
    color: colors.brandPrimary,
    fontWeight: "800",
  },
  bulletText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  boldText: {
    color: colors.textPrimary,
    fontWeight: "700",
  },
});
