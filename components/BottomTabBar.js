import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { COLORS, SIZES, SHADOW } from "../styles/theme";

// Barra flutuante fixada no rodapé das telas internas do app (a partir da Home)
export default function BottomTabBar({ navigation, active }) {
  const tabs = [
    { key: "Calendar", icon: require("../assets/calendar-icon.png") },
    { key: "Chat", icon: require("../assets/chat-icon.png") },
    { key: "Home", icon: require("../assets/home-icon.png") },
    { key: "Autocuidado", icon: null, emoji: "♡" },
    { key: "Profile", icon: require("../assets/profile-icon.png") },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => navigation.navigate(tab.key)}
            >
              {tab.icon ? (
                <Image
                  source={tab.icon}
                  style={[styles.icon, isActive && styles.iconActive]}
                  resizeMode="contain"
                />
              ) : (
                // Sem asset específico de "Autocuidado" enviado — usando glifo temporário.
                // Trocar por ícone do Figma (Heart) quando disponível.
                <Text style={[styles.emojiIcon, isActive && styles.emojiIconActive]}>
                  {tab.emoji}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.background,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: "#F0F4F3",
    ...SHADOW,
  },
  tabButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: COLORS.textGray,
  },
  iconActive: {
    tintColor: COLORS.primary,
  },
  emojiIcon: {
    fontSize: 20,
    color: COLORS.textGray,
  },
  emojiIconActive: {
    color: COLORS.primary,
  },
});
