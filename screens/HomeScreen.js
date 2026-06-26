import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import BottomTabBar from "../components/BottomTabBar";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

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
          <Image
            source={require("../../assets/meter-icon.png")}
            style={styles.meterImage}
            resizeMode="contain"
          />
          <Text style={styles.checkinCardText}>
            Registre e acompanhe como você está se sentindo
          </Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Autocuidado</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.autocuidadoCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Autocuidado")}
          >
            <View style={styles.autocuidadoBadge}>
              <Image
                source={require("../../assets/check-icon.png")}
                style={styles.autocuidadoBadgeIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.autocuidadoCardLabel}>
              O Poder do Autogerenciamento Emocional
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      <BottomTabBar navigation={navigation} active="Home" />
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
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.accent,
  },
  subGreeting: {
    fontSize: 13,
    color: COLORS.textGray,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 14,
  },
  checkinCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: 20,
    alignItems: "center",
    ...SHADOW,
  },
  meterImage: {
    width: 160,
    height: 90,
    marginBottom: 12,
  },
  checkinCardText: {
    fontSize: 14,
    color: COLORS.textGray,
    textAlign: "center",
  },
  autocuidadoCard: {
    width: 150,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMedium,
    padding: 14,
    marginRight: 14,
    ...SHADOW,
  },
  autocuidadoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  autocuidadoBadgeIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.white,
  },
  autocuidadoCardLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
});
