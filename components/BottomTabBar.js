import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { COLORS } from "../styles/theme";

// Bottom bar fixa usada nas telas internas do app (a partir da Home)
export default function BottomTabBar({ navigation, active }) {
  const tabs = [
    { key: "Calendar", icon: require("../../assets/calendar-icon.png") },
    { key: "Chat", icon: require("../../assets/chat-icon.png") },
    { key: "Home", icon: require("../../assets/home-icon.png") },
    { key: "Autocuidado", icon: null, emoji: "♡" },
    { key: "Profile", icon: require("../../assets/profile-icon.png") },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
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
              // Trocar por ícone do Figma quando disponível.
              <Text style={[styles.emojiIcon, isActive && styles.emojiIconActive]}>
                {tab.emoji}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.textGray,
  },
  iconActive: {
    tintColor: COLORS.primary,
  },
  emojiIcon: {
    fontSize: 22,
    color: COLORS.textGray,
  },
  emojiIconActive: {
    color: COLORS.primary,
  },
});
