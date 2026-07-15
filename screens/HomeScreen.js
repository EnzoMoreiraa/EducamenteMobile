import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, LayoutAnimation, UIManager, Platform } from "react-native";
import BottomTabBar from "../components/BottomTabBar";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Conteúdo de exemplo — virá da entidade "Conteúdos_educativos" do back-end
const ARTICLES = [
  { id: "1", title: "O Poder do Autogerenciamento Emocional" },
  { id: "2", title: "Respiração Consciente para Reduzir a Ansiedade" },
  { id: "3", title: "Construindo Rotinas de Autocuidado" },
];

export default function HomeScreen({ navigation }) {
  // Nome do usuário viria do estado de autenticação/contexto futuramente
  const userName = "Enzo Moreira";
  const [centerIndex, setCenterIndex] = useState(0);

  const shiftCarousel = (direction) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCenterIndex((current) => (current + direction + ARTICLES.length) % ARTICLES.length);
  };

  const prevArticle = ARTICLES[(centerIndex - 1 + ARTICLES.length) % ARTICLES.length];
  const centerArticle = ARTICLES[centerIndex];
  const nextArticle = ARTICLES[(centerIndex + 1) % ARTICLES.length];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Olá!</Text>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.subGreeting}>Nossa Jornada continua!</Text>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.avatarLetter}>{userName.charAt(0)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Check-in</Text>
        <TouchableOpacity
          style={styles.checkinCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("CheckinDiario")}
        >
          <Image
            source={require("../assets/homePageAssets/checkinIcon.png")}
            style={styles.checkinIcon}
            resizeMode="contain"
          />
          <Text style={styles.checkinCardText}>
            Registre e acompanhe como você está se sentindo
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Autocuidado</Text>
        <View style={styles.carousel}>
          <ArticleCard
            article={prevArticle}
            variant="side"
            onPress={() => shiftCarousel(-1)}
          />
          <ArticleCard
            article={centerArticle}
            variant="center"
            onPress={() => navigation.navigate("Autocuidado")}
          />
          <ArticleCard
            article={nextArticle}
            variant="side"
            onPress={() => shiftCarousel(1)}
          />
        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} active="Home" />
    </View>
  );
}

// Card de artigo do carrossel infinito — o card central fica em destaque
// (maior, opaco); os vizinhos (esquerda/direita) ficam menores e translúcidos
function ArticleCard({ article, variant, onPress }) {
  const isCenter = variant === "center";
  return (
    <TouchableOpacity
      style={[styles.articleCard, isCenter ? styles.articleCardCenter : styles.articleCardSide]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Image
        source={require("../assets/homePageAssets/autocuidadoCover.png")}
        style={styles.articleCover}
        resizeMode="cover"
      />
      {isCenter && (
        <View style={styles.articleScrim}>
          <Text style={styles.articleTitle} numberOfLines={2}>{article.title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 17,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textDark,
    textAlign: "center",
    letterSpacing: -0.4,
    marginBottom: 16,
  },
  checkinCard: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: SIZES.radiusLarge,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    ...SHADOW,
  },
  checkinIcon: {
    width: 200,
    height: 90,
    marginBottom: 10,
  },
  checkinCardText: {
    fontSize: 13,
    color: COLORS.black,
    textAlign: "center",
  },
  carousel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  articleCard: {
    borderRadius: SIZES.radiusMedium,
    overflow: "hidden",
    ...SHADOW,
  },
  articleCardCenter: {
    width: 220,
    height: 170,
    zIndex: 2,
  },
  articleCardSide: {
    width: 64,
    height: 130,
    opacity: 0.45,
    marginHorizontal: -14,
  },
  articleCover: {
    width: "100%",
    height: "100%",
  },
  articleScrim: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: -0.2,
  },
});
