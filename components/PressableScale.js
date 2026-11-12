import { useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { TOUCH } from "../styles/theme";

// Área tocável padrão do app: além do activeOpacity, encolhe levemente ao toque
// (scale 0.97) pra dar retorno tátil. Usar no lugar de TouchableOpacity em
// botões, cards e itens de lista.
//
// O transform vai junto do `style` do próprio TouchableOpacity (a raiz dele já
// é uma Animated.View). Assim o componente continua sendo uma peça só no
// layout — se ele fosse embrulhado numa View extra, estilos de layout como
// `flex: 1` ficariam no filho e o pai não flexionaria, quebrando linhas de
// cards lado a lado.
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
