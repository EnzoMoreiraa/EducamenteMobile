import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { EyeIcon, EyeOffIcon } from "./IconSet";
import { COLORS, SIZES, SPACING, TOUCH } from "../styles/theme";

// Estados do contorno: 0 = repouso (cinza), 1 = foco (verde), 2 = erro (vermelho)
const BORDER_COLORS = [COLORS.border, COLORS.primary, COLORS.danger];

// Campo de texto padrão dos formulários: contorno animado (cinza -> verde no
// foco, vermelho quando há erro), alvo de toque de 44pt e, para senhas,
// botão de olho pra mostrar/ocultar.
export default function AnimatedInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  editable = true,
  containerStyle,
  onSubmitEditing,
  returnKeyType,
}) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const state = error ? 2 : focused ? 1 : 0;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: state,
      duration: 180,
      useNativeDriver: false, // borderColor não é animável pelo driver nativo
    }).start();
  }, [state, anim]);

  const borderColor = anim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: BORDER_COLORS,
  });

  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Animated.View style={[styles.field, { borderColor }, !editable && styles.fieldDisabled]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !revealed}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            style={styles.eyeButton}
            activeOpacity={TOUCH.activeOpacity}
            onPress={() => setRevealed((current) => !current)}
            accessibilityRole="button"
            accessibilityLabel={revealed ? "Ocultar senha" : "Mostrar senha"}
          >
            {revealed ? (
              <EyeOffIcon size={20} color={COLORS.textGray} />
            ) : (
              <EyeIcon size={20} color={COLORS.textGray} />
            )}
          </TouchableOpacity>
        ) : null}
      </Animated.View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: SPACING.xxs + 2,
    fontWeight: "600",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMedium,
    borderWidth: 1.5,
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xxs,
    minHeight: TOUCH.min + 6,
  },
  fieldDisabled: {
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingRight: SPACING.xs,
    fontSize: 15,
    color: COLORS.textDark,
  },
  eyeButton: {
    width: TOUCH.min,
    height: TOUCH.min,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: SPACING.xxs + 2,
    marginLeft: SPACING.xxs,
    fontWeight: "600",
  },
});
