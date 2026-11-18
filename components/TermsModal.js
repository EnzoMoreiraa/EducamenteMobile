import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CloseIcon } from "./IconSet";
import PressableScale from "./PressableScale";
import { LEGAL_DOCS } from "../data/legalTexts";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW } from "../styles/theme";

export default function TermsModal({ visible, doc = "termos", onAccept, onClose }) {
  const insets = useSafeAreaInsets();
  const content = LEGAL_DOCS[doc] ?? LEGAL_DOCS.termos;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, SPACING.lg) }]}>
          <View style={styles.grabber} />

          <View style={styles.header}>
            <View style={styles.headerTextBlock}>
              <Text style={styles.title}>{content.title}</Text>
              <Text style={styles.updatedAt}>{content.updatedAt}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={TOUCH.activeOpacity}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <CloseIcon size={20} color={COLORS.textGray} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator
          >
            {content.sections.map((section) => (
              <View key={section.heading} style={styles.section}>
                <Text style={styles.heading}>{section.heading}</Text>
                <Text style={styles.body}>{section.body}</Text>
              </View>
            ))}
          </ScrollView>

          <PressableScale
            style={styles.acceptButton}
            onPress={onAccept}
            accessibilityRole="button"
            accessibilityLabel="Li e aceito"
          >
            <Text style={styles.acceptText}>Li e aceito</Text>
          </PressableScale>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    maxHeight: "88%",
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.sm,
    ...SHADOW,
  },
  grabber: {
    alignSelf: "center",
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.sm,
  },
  headerTextBlock: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textDark,
    letterSpacing: -0.2,
  },
  updatedAt: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
  closeButton: {
    width: TOUCH.min,
    height: TOUCH.min,
    borderRadius: TOUCH.min / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  scroll: {
    marginTop: SPACING.md,
  },
  scrollContent: {
    paddingBottom: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  heading: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: SPACING.xxs + 2,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textDark,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    minHeight: TOUCH.min + 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xs,
  },
  acceptText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
