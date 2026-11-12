import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../components/Headers";
import BottomTabBar, { TAB_BAR_HEIGHT } from "../components/BottomTabBar";
import FloatingHomeButton from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import { ChevronRightIcon, MaskIcon, UserIcon } from "../components/IconSet";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";

// Hub de entrada do canal de comunicação — escolha entre mensagem anônima (RF07)
// ou identificada (RF06) antes de abrir o formulário
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

        <View style={styles.cardsRow}>
          {OPCOES.map(({ key, title, description, Icon, tint, color }) => (
            <PressableScale
              key={key}
              style={[styles.card, { backgroundColor: tint }]}
              onPress={() => navigation.navigate(key)}
              accessibilityRole="button"
              accessibilityLabel={`Mensagem ${title}`}
            >
              <View style={[styles.cardIcon, { backgroundColor: color }]}>
                <Icon size={26} color={COLORS.white} />
              </View>
              <Text style={[styles.cardTitle, { color }]}>{title}</Text>
              <Text style={styles.cardDescription}>{description}</Text>
              <View style={styles.cardArrow}>
                <ChevronRightIcon size={18} color={color} />
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
  cardsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  card: {
    flex: 1,
    borderRadius: SIZES.radiusMedium,
    padding: SPACING.md,
    minHeight: 180,
    ...SHADOW,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
    marginBottom: SPACING.xxs,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.textGray,
  },
  cardArrow: {
    marginTop: "auto",
    alignSelf: "flex-end",
  },
});
