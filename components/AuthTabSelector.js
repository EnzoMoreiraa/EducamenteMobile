import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES, SPACING, TOUCH } from "../styles/theme";

const TABS = ["Entrar", "Cadastrar-se"];
const PADDING = 4;

export default function AuthTabSelector({ activeIndex, onChange }) {
  const [trackWidth, setTrackWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const tabWidth = trackWidth > 0 ? (trackWidth - PADDING * 2) / TABS.length : 0;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: true,
      friction: 8,
      tension: 90,
    }).start();
  }, [activeIndex, tabWidth, translateX]);

  return (
    <View
      style={styles.track}
      onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
    >
      {tabWidth > 0 ? (
        <Animated.View
          style={[styles.indicator, { width: tabWidth, transform: [{ translateX }] }]}
          pointerEvents="none"
        />
      ) : null}

      {TABS.map((label, index) => (
        <TouchableOpacity
          key={label}
          style={styles.tab}
          activeOpacity={TOUCH.activeOpacity}
          onPress={() => index !== activeIndex && onChange(index)}
          accessibilityRole="tab"
          accessibilityState={{ selected: index === activeIndex }}
        >
          <Text style={index === activeIndex ? styles.tabTextActive : styles.tabText}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    backgroundColor: "#E4E1DC",
    borderRadius: SIZES.radiusPill,
    padding: PADDING,
    marginBottom: SPACING.xl,
  },
  indicator: {
    position: "absolute",
    top: PADDING,
    left: PADDING,
    bottom: PADDING,
    borderRadius: SIZES.radiusPill,
    backgroundColor: COLORS.white,
  },
  tab: {
    flex: 1,
    minHeight: TOUCH.min,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radiusPill,
  },
  tabText: {
    color: COLORS.textGray,
    fontWeight: "600",
  },
  tabTextActive: {
    fontWeight: "700",
    color: COLORS.textDark,
  },
});
