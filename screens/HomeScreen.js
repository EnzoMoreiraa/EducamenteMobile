import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabBar from "../components/BottomTabBar";
import PressableScale from "../components/PressableScale";
import { BookIcon, ChevronRightIcon, SmileIcon } from "../components/IconSet";
import { CONTEUDOS } from "../data/conteudosData";
import { COLORS, SIZES, SPACING, SHADOW } from "../styles/theme";
import { getUsuarioLogado } from "../services/session";

const CARD_WIDTH = 250;
const CARD_GAP = SPACING.md - 2;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

// Acima dessa largura (tablet, web) o carrossel horizontal deixa muito espaço
// vazio embaixo — os conteúdos passam a ocupar uma grade de 2 colunas
const WIDE_LAYOUT_BREAKPOINT = 600;

export default function HomeScreen({ navigation }) {
  const usuario = getUsuarioLogado();
  const userName = usuario ? `${usuario.nome} ${usuario.sobrenome ?? ""}`.trim() : "Visitante";
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_LAYOUT_BREAKPOINT;

  // Índice do card centralizado, pra sincronizar os "dots" de paginação
  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SNAP_INTERVAL);
    if (index !== activeIndex && index >= 0 && index < CONTEUDOS.length) {
      setActiveIndex(index);
    }
  };

  const abrirConteudo = (id) => navigation.navigate("Autocuidado", { conteudoId: id });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.greetingBlock}>
            <Text style={styles.greeting}>Olá!</Text>
            <Text style={styles.userName} numberOfLines={1}>
              {userName}
            </Text>
            <Text style={styles.subGreeting}>Nossa jornada continua!</Text>
          </View>

          <PressableScale
            style={styles.avatar}
            onPress={() => navigation.navigate("Profile")}
            accessibilityRole="button"
            accessibilityLabel="Abrir perfil"
          >
            <Text style={styles.avatarLetter}>{userName.charAt(0)}</Text>
          </PressableScale>
        </View>

        <View style={styles.divider} />

        <SectionTitle icon={<SmileIcon size={20} color={COLORS.primary} filled />} label="Check-in" />

        <PressableScale
          style={styles.checkinCard}
          onPress={() => navigation.navigate("CheckinDiario")}
          accessibilityRole="button"
          accessibilityLabel="Abrir check-in diário"
        >
          <Image
            source={require("../assets/homePageAssets/checkinIcon.png")}
            style={styles.checkinIllustration}
            resizeMode="contain"
          />
          <View style={styles.checkinFooter}>
            <Text style={styles.checkinCardText}>
              Registre e acompanhe como você está se sentindo
            </Text>
            <ChevronRightIcon size={20} color={COLORS.primary} />
          </View>
        </PressableScale>

        <View style={styles.divider} />

        <SectionTitle icon={<BookIcon size={20} color={COLORS.primary} filled />} label="Autocuidado" />

        {isWide ? (
          <View style={styles.grid}>
            {CONTEUDOS.map((item) => (
              <ConteudoCard
                key={item.id}
                conteudo={item}
                style={styles.gridCard}
                onPress={() => abrirConteudo(item.id)}
              />
            ))}
          </View>
        ) : (
          <>
            <FlatList
              data={CONTEUDOS}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SNAP_INTERVAL}
              snapToAlignment="start"
              decelerationRate="fast"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              contentContainerStyle={styles.carouselContent}
              ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
              renderItem={({ item }) => (
                <ConteudoCard
                  conteudo={item}
                  style={styles.carouselCard}
                  onPress={() => abrirConteudo(item.id)}
                />
              )}
            />

            <View style={styles.dotsRow}>
              {CONTEUDOS.map((item, index) => (
                <View
                  key={item.id}
                  style={[styles.dot, index === activeIndex && styles.dotActive]}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <BottomTabBar navigation={navigation} active="Home" />
    </SafeAreaView>
  );
}

function SectionTitle({ icon, label }) {
  return (
    <View style={styles.sectionTitleRow}>
      {icon}
      <Text style={styles.sectionTitle}>{label}</Text>
    </View>
  );
}

// Card de conteúdo: a capa real exportada do Figma em cima e o texto embaixo,
// no card branco de sempre — sem fundo colorido gerado em código
function ConteudoCard({ conteudo, onPress, style }) {
  return (
    <PressableScale
      style={[styles.conteudoCard, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={conteudo.title}
    >
      <Image source={conteudo.cover} style={styles.conteudoCover} resizeMode="cover" />

      <View style={styles.conteudoTextBlock}>
        <Text style={styles.conteudoTag}>{conteudo.tag}</Text>
        <Text style={styles.conteudoTitle} numberOfLines={2}>
          {conteudo.title}
        </Text>
        <Text style={styles.conteudoMeta}>{conteudo.readingTime}</Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: SPACING.sm,
    paddingHorizontal: SIZES.paddingScreen,
  },
  greetingBlock: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textGray,
  },
  userName: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.accent,
    letterSpacing: -0.3,
  },
  subGreeting: {
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xl,
    marginHorizontal: SIZES.paddingScreen,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.md,
    paddingHorizontal: SIZES.paddingScreen,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textDark,
    letterSpacing: -0.4,
  },
  checkinCard: {
    marginHorizontal: SIZES.paddingScreen,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLarge,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    ...SHADOW,
  },
  checkinIllustration: {
    width: "100%",
    maxWidth: 220,
    height: 90,
    marginBottom: SPACING.sm,
  },
  checkinFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  checkinCardText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textDark,
  },
  carouselContent: {
    paddingHorizontal: SIZES.paddingScreen,
    paddingVertical: SPACING.xxs,
  },
  conteudoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    overflow: "hidden",
    ...SHADOW,
  },
  carouselCard: {
    width: CARD_WIDTH,
  },
  conteudoCover: {
    width: "100%",
    height: 118,
    backgroundColor: COLORS.background,
  },
  conteudoTextBlock: {
    padding: SPACING.md,
    gap: 2,
  },
  conteudoTag: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },
  conteudoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textBrown,
    letterSpacing: -0.2,
    lineHeight: 21,
  },
  conteudoMeta: {
    fontSize: 12,
    color: COLORS.textGray,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
    paddingHorizontal: SIZES.paddingScreen,
    // trava a largura pra que, num monitor grande, o card não vire um painel
    width: "100%",
    maxWidth: 820,
    alignSelf: "center",
  },
  gridCard: {
    width: "48%",
    flexGrow: 1,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xs,
    marginTop: SPACING.md,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 22,
    backgroundColor: COLORS.primary,
  },
});
