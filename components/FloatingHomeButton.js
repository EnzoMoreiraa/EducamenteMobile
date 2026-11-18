import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeIcon } from "./IconSet";
import { COLORS, SIZES, SPACING, TOUCH, SHADOW_FLOATING } from "../styles/theme";

export const TRIGGER_HEIGHT = 28;

const HIDDEN_OFFSET = 80;
const VISIBLE_FOR = 3000;

export default function FloatingHomeButton({
  navigation,
  bottomOffset = 0,
  homeRoute = "Home",
  label = "Home",
}) {
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(false);
  const translateY = useRef(new Animated.Value(HIDDEN_OFFSET)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timer = useRef(null);

  const base = bottomOffset > 0 ? bottomOffset : Math.max(insets.bottom, SPACING.sm);

  const hide = useCallback(() => {
    clearTimeout(timer.current);
    Animated.parallel([
      Animated.timing(translateY, { toValue: HIDDEN_OFFSET, duration: 240, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) setMounted(false);
    });
  }, [opacity, translateY]);

  const show = useCallback(() => {
    clearTimeout(timer.current);
    setMounted(true);
    translateY.setValue(HIDDEN_OFFSET);
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 7,
        tension: 90,
      }),
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
    timer.current = setTimeout(hide, VISIBLE_FOR);
  }, [hide, opacity, translateY]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const goHome = () => {
    clearTimeout(timer.current);
    setMounted(false);
    opacity.setValue(0);
    translateY.setValue(HIDDEN_OFFSET);
    navigation.navigate(homeRoute);
  };

  return (
    <>
      <Pressable
        style={[styles.trigger, { bottom: base }]}
        onPress={show}
        accessibilityRole="button"
        accessibilityLabel="Mostrar atalho para a Home"
      />

      {mounted ? (
        <Animated.View
          style={[styles.pillWrapper, { bottom: base + SPACING.xs, opacity, transform: [{ translateY }] }]}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            style={styles.pill}
            activeOpacity={TOUCH.activeOpacity}
            onPress={goHome}
            accessibilityRole="button"
            accessibilityLabel={`Ir para ${label}`}
          >
            <HomeIcon size={18} color={COLORS.white} filled />
            <Text style={styles.pillText}>{label}</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    position: "absolute",
    left: 0,
    right: 0,
    height: TRIGGER_HEIGHT,
  },
  pillWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    minHeight: TOUCH.min,
    paddingHorizontal: SPACING.xl,
    borderRadius: SIZES.radiusPill,
    backgroundColor: COLORS.primary,
    ...SHADOW_FLOATING,
  },
  pillText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },
});
