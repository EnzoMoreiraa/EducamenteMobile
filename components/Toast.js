import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { CheckIcon } from "./IconSet";
import { COLORS, SIZES, SPACING, SHADOW_FLOATING } from "../styles/theme";

// Snackbar verde que sobe da base da tela, fica 2s e desce sozinho.
// Reutilizável: <Toast visible={x} message="..." onHide={() => setX(false)} />
export default function Toast({
  visible,
  message,
  onHide,
  duration = 2000,
  bottomOffset = SPACING.xxl,
}) {
  const translateY = useRef(new Animated.Value(80)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timer = useRef(null);

  useEffect(() => {
    if (!visible) return undefined;

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 90,
      }),
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();

    timer.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, { toValue: 80, duration: 220, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(() => onHide?.());
    }, duration);

    return () => clearTimeout(timer.current);
  }, [visible, duration, onHide, opacity, translateY]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.wrapper, { bottom: bottomOffset, opacity, transform: [{ translateY }] }]}
      pointerEvents="none"
    >
      <View style={styles.toast}>
        <CheckIcon size={18} color={COLORS.white} />
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: SPACING.lg,
    right: SPACING.lg,
    alignItems: "center",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    maxWidth: 420,
    ...SHADOW_FLOATING,
  },
  message: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
    flexShrink: 1,
  },
});
