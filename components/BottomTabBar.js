import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CalendarIcon, ChatIcon, HomeIcon, HeartIcon, ProfileIcon } from "./IconSet";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW_FLOATING } from "../styles/theme";

export const TAB_BAR_HEIGHT = 84;

const TABS = [
  { key: "Calendar", label: "Agenda", Icon: CalendarIcon },
  { key: "Chat", label: "Mensagens", Icon: ChatIcon },
  { key: "Home", label: "Início", Icon: HomeIcon },
  { key: "Autocuidado", label: "Autocuidado", Icon: HeartIcon },
  { key: "Profile", label: "Perfil", Icon: ProfileIcon },
];

export default function BottomTabBar({ navigation, active }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, SPACING.sm) }]}>
      <View style={styles.container}>
        {TABS.map((tab) => (
          <TabItem
            key={tab.key}
            tab={tab}
            isActive={active === tab.key}
            onPress={() => navigation.navigate(tab.key)}
          />
        ))}
      </View>
    </View>
  );
}

function TabItem({ tab, isActive, onPress }) {
  const { Icon, label } = tab;

  return (
    <TouchableOpacity
      style={styles.tabButton}
      activeOpacity={TOUCH.activeOpacity}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isActive }}
    >
      <View style={[styles.iconCircle, isActive && styles.iconCircleActive]}>
        <Icon size={24} color={isActive ? COLORS.primary : COLORS.textGray} filled={isActive} />
      </View>
      <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xxs,
    backgroundColor: COLORS.background,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.xxs,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.cardBackground,
    ...SHADOW_FLOATING,
  },
  tabButton: {
    flex: 1,
    minHeight: TOUCH.min,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xxs,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleActive: {
    backgroundColor: COLORS.primaryTab,
  },
  label: {
    fontSize: 9,
    marginTop: 2,
    color: COLORS.textGray,
    fontWeight: "600",
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: "800",
  },
});
