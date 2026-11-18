import { useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { TOUCH } from "../styles/theme";

export default function PressableScale({
  children,
  style,
  onPress,
  onPressIn,
  onPressOut,
  activeOpacity = TOUCH.activeOpacity,
  scaleTo = TOUCH.scaleOnPress,
  disabled = false,
  ...rest
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (value) =>
    Animated.spring(scale, {
      toValue: value,
      useNativeDriver: true,
      friction: 6,
      tension: 220,
    }).start();

  return (
    <TouchableOpacity
      style={[style, { transform: [{ scale }] }]}
      activeOpacity={activeOpacity}
      disabled={disabled}
      onPress={onPress}
      onPressIn={(event) => {
        animateTo(scaleTo);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateTo(1);
        onPressOut?.(event);
      }}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
