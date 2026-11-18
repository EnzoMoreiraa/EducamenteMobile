import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBar, { TAB_BAR_HEIGHT } from "../components/BottomTabBar";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import Icon, { ClockIcon } from "../components/IconSet";
import { CONTEUDOS, getConteudoById } from "../data/conteudosData";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";

export default function AutocuidadoScreen({ navigation, route }) {
  const conteudo = getConteudoById(route?.params?.conteudoId);
  const outros = CONTEUDOS.filter((item) => item.id !== conteudo.id);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Autocuidado" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={conteudo.cover} style={styles.heroCover} resizeMode="cover" />

          <View style={styles.heroTextBlock}>
            <View style={styles.heroTagRow}>
              <Icon name={conteudo.icon} size={16} color={COLORS.primary} />
              <Text style={styles.heroTag}>{conteudo.tag}</Text>
            </View>

            <Text style={styles.heroTitle}>{conteudo.title}</Text>

            <View style={styles.heroMetaRow}>
              <ClockIcon size={14} color={COLORS.textGray} />
              <Text style={styles.heroMeta}>{conteudo.readingTime}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.summary}>{conteudo.summary}</Text>
        <Text style={styles.body}>{conteudo.body}</Text>

        <Text style={styles.outrosTitle}>Continue lendo</Text>
        {outros.map((item) => (
          <PressableScale
            key={item.id}
            style={styles.outroCard}
            onPress={() => navigation.setParams({ conteudoId: item.id })}
            accessibilityRole="button"
            accessibilityLabel={item.title}
          >
            <View style={styles.outroBadge}>
              <Icon name={item.icon} size={18} color={COLORS.primary} />
            </View>
            <View style={styles.outroTextBlock}>
              <Text style={styles.outroTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.outroTag}>{item.tag}</Text>
            </View>
          </PressableScale>
        ))}
      </ScrollView>

      <FloatingHomeButton navigation={navigation} bottomOffset={TAB_BAR_HEIGHT} />
      <BottomTabBar navigation={navigation} active="Autocuidado" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xxl,
  },
  hero: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    overflow: "hidden",
    marginBottom: SPACING.xl,
    ...SHADOW,
  },
  heroCover: {
    width: "100%",
    height: 170,
    backgroundColor: COLORS.background,
  },
  heroTextBlock: {
    padding: SPACING.lg,
    gap: SPACING.xs,
  },
  heroTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxs + 2,
  },
  heroTag: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textBrown,
    letterSpacing: -0.3,
    lineHeight: 28,
  },
  heroMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xxs + 2,
  },
  heroMeta: {
    color: COLORS.textGray,
    fontSize: 12,
    fontWeight: "600",
  },
  summary: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "700",
    color: COLORS.textBrown,
    marginBottom: SPACING.md,
  },
  body: {
    fontSize: 15,
    lineHeight: 27,
    color: COLORS.textDark,
    letterSpacing: -0.1,
  },
  outrosTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textBrown,
    marginTop: SPACING.xxl,
    marginBottom: SPACING.sm,
  },
  outroCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW,
  },
  outroBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  outroTextBlock: {
    flex: 1,
  },
  outroTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    lineHeight: 19,
  },
  outroTag: {
    fontSize: 12,
    color: COLORS.textGray,
    marginTop: 2,
  },
});
