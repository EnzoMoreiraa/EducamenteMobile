// Paleta e constantes visuais extraídas do protótipo Figma do EducaMente

export const COLORS = {
  primary: "#007D6E",        // Verde institucional (header, botões principais, splash)
  primaryDark: "#00695C",
  primarySoft: "rgba(0,125,110,0.10)",   // fundo de cards/realces sobre o bege
  primaryTab: "rgba(0,125,110,0.12)",    // fundo circular do item ativo da tab bar
  accent: "#D4A82F",         // Amarelo/dourado (slogan, botões splash)
  background: "#F4F1ED",     // Fundo claro (cards, telas de conteúdo)
  cardBackground: "#FFFFFF",
  textDark: "#1F2A28",
  textBrown: "#4F3422",       // Mindful Brown — texto usado em "Autocuidado" / "Check-in Diário"
  textGray: "#736B66",        // Optimistic Gray/60
  placeholder: "#A0A0A0",
  white: "#FFFFFF",
  black: "#000000",
  border: "#E0DDD8",
  moodNeutral: "#FFCE5C",     // Zen Yellow/40 — amarelo do medidor de humor
  moodSad: "#ED7E1C",         // Empathy Orange/40 — laranja (triste)
  moodHappy: "#9BB168",       // Serenity Green/50 — verde (feliz)
  moodVeryBad: "#A694F5",     // Gentle Purple/40 — roxo (extremos do medidor)
  anonimo: "#8B6BBF",         // Roxo do canal anônimo
  anonimoSoft: "rgba(139,107,191,0.10)",
  danger: "#C0392B",
  dangerSoft: "rgba(192,57,43,0.10)",
  success: "#2E7D32",
  warning: "#B26A00",
  warningSoft: "rgba(212,168,47,0.12)",
};

export const FONT = {
  regular: "System",
  bold: "System",
};

export const SIZES = {
  radiusLarge: 32,
  radiusMedium: 20,
  radiusSmall: 12,
  radiusPill: 999,
  paddingScreen: 24,
};

// Escala de espaçamento — usar sempre estas constantes em vez de números soltos
export const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  huge: 40,
};

// Alvo mínimo de toque recomendado (44x44pt, guideline de acessibilidade)
export const TOUCH = {
  min: 44,
  scaleOnPress: 0.97,
  activeOpacity: 0.85,
};

export const SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
};

// Mesma sutileza da SHADOW, só um pouco mais difusa — usada na barra de navegação
// flutuante e no botão de Home, que ficam sobre o conteúdo
export const SHADOW_FLOATING = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 6,
};
