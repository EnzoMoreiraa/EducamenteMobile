import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import BottomTabBar from "../components/BottomTabBar";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

// Conteúdo de exemplo — virá da entidade "Conteúdos_educativos" do back-end
const ARTICLES = [
  {
    id: "1",
    title: "O Poder do Autogerenciamento Emocional",
    color: COLORS.primary,
  },
];

export default function HomeScreen({ navigation }) {
  // Nome do usuário viria do estado de autenticação/contexto futuramente
  const userName = "Enzo Moreira";

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
          <MiniMoodArc />
          <Text style={styles.checkinCardText}>
            Registre e acompanhe como você está se sentindo
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Autocuidado</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.autocuidadoScroll}>
          {/* Cards "peek" nas pontas — imagens reais do Figma ainda não exportadas, usando placeholder */}
          <Image
            source={require("../assets/images/placeholder.png")}
            style={styles.peekCard}
            resizeMode="cover"
          />
          {ARTICLES.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={[styles.autocuidadoCard, { backgroundColor: article.color }]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("Autocuidado")}
            >
              <View style={styles.autocuidadoBadge}>
                <Image
                  source={require("../assets/check-icon.png")}
                  style={styles.autocuidadoBadgeIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.autocuidadoCardLabel}>{article.title}</Text>
            </TouchableOpacity>
          ))}
          <Image
            source={require("../assets/images/placeholder.png")}
            style={styles.peekCard}
            resizeMode="cover"
          />
        </ScrollView>
      </ScrollView>

      <BottomTabBar navigation={navigation} active="Home" />
    </View>
  );
}

// Prévia em miniatura do arco de humor (Check-in), estático, só ilustrativo
function MiniMoodArc() {
  const width = 220;
  const height = 76;
  const cx = width / 2;
  const cy = height;
  const radius = 100;

  const segmentColors = [COLORS.moodSad, COLORS.moodNeutral, COLORS.moodHappy];

  const segments = segmentColors.map((color, index) => {
    const startAngle = Math.PI - (index / segmentColors.length) * Math.PI;
    const endAngle = Math.PI - ((index + 1) / segmentColors.length) * Math.PI;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy - radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy - radius * Math.sin(endAngle);

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 0 ${x2} ${y2} Z`;

    return { path, color, index };
  });

  return (
    <View style={styles.miniArcWrapper}>
      <Svg width={width} height={height + 6}>
        {segments.map((seg) => (
          <Path key={seg.index} d={seg.path} fill={seg.color} />
        ))}
      </Svg>
      <View style={styles.miniArcDot} />
    </View>
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
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    ...SHADOW,
  },
  miniArcWrapper: {
    position: "relative",
    alignItems: "center",
    marginBottom: 14,
  },
  miniArcDot: {
    position: "absolute",
    bottom: -3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.textBrown,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.6)",
  },
  checkinCardText: {
    fontSize: 13,
    color: COLORS.black,
    textAlign: "center",
  },
  autocuidadoScroll: {
    overflow: "visible",
  },
  peekCard: {
    width: 40,
    height: 160,
    borderRadius: SIZES.radiusMedium,
    marginRight: 14,
    opacity: 0.5,
  },
  autocuidadoCard: {
    width: 260,
    height: 160,
    borderRadius: SIZES.radiusMedium,
    padding: 16,
    justifyContent: "space-between",
    marginRight: 14,
    ...SHADOW,
  },
  autocuidadoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  autocuidadoBadgeIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.white,
  },
  autocuidadoCardLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    letterSpacing: -0.2,
  },
});
