import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBar, { TAB_BAR_HEIGHT } from "../components/BottomTabBar";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import { ChevronRightIcon, MaskIcon, UserIcon } from "../components/IconSet";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";

const OPCOES = [
  {
    key: "Anonimo",
    title: "Anônima",
    description: "A equipe lê sua mensagem sem saber quem enviou.",
    Icon: MaskIcon,
    tint: COLORS.anonimoSoft,
    color: COLORS.anonimo,
  },
  {
    key: "Identificada",
    title: "Identificada",
    description: "Você se identifica e pode receber uma resposta.",
    Icon: UserIcon,
    tint: COLORS.primarySoft,
    color: COLORS.primary,
  },
];

export default function ChatScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Envie uma mensagem" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.intro}>
          Escolha como quer falar com a equipe pedagógica. Os dois caminhos chegam nas
          mesmas pessoas.
        </Text>

        <View style={styles.cardsList}>
          {OPCOES.map(({ key, title, description, Icon, tint, color }) => (
            <PressableScale
              key={key}
              style={styles.card}
              onPress={() => navigation.navigate(key)}
              accessibilityRole="button"
              accessibilityLabel={`Mensagem ${title}`}
            >
              <View style={[styles.cardInner, { backgroundColor: tint }]}>
                <View style={[styles.cardIcon, { backgroundColor: color }]}>
                  <Icon size={26} color={COLORS.white} />
                </View>
                <View style={styles.cardText}>
                  <Text style={[styles.cardTitle, { color }]}>{title}</Text>
                  <Text style={styles.cardDescription}>{description}</Text>
                </View>
                <ChevronRightIcon size={20} color={color} />
              </View>
            </PressableScale>
          ))}
        </View>
      </View>

      <FloatingHomeButton navigation={navigation} bottomOffset={TAB_BAR_HEIGHT} />
      <BottomTabBar navigation={navigation} active="Chat" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: SPACING.md,
  },
  intro: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textGray,
    marginBottom: SPACING.lg,
  },
  cardsList: {
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    ...SHADOW,
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    minHeight: 96,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
    marginBottom: SPACING.xxs,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textGray,
  },
});
