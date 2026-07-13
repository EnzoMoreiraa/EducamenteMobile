// Paleta e constantes visuais extraídas do protótipo Figma do EducaMente

export const COLORS = {
  primary: "#007D6E",        // Verde institucional (header, botões principais, splash)
  primaryDark: "#00695C",
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

export const SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
};
