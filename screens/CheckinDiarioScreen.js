import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { ScreenHeader } from "../components/Headers";
import { COLORS, SIZES } from "../styles/theme";

// Opções de humor, da esquerda (mais triste) para a direita (mais feliz),
// espelhando as cores do arco no protótipo Figma.
const MOODS = [
  { key: "muito_triste", label: "Me sinto muito mal", face: "︵", color: COLORS.moodVeryBad },
  { key: "triste", label: "Me sinto mal", face: "⌢", color: COLORS.moodSad },
  { key: "neutro", label: "Me sinto neutro", face: "—", color: COLORS.moodNeutral },
  { key: "bem", label: "Me sinto bem", face: "⌣", color: COLORS.moodHappy },
  { key: "muito_bem", label: "Me sinto muito bem", face: "◠", color: COLORS.moodHappy },
];

export default function CheckinDiarioScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(2); // começa em "neutro", como no print

  const selectedMood = MOODS[selectedIndex];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Check-in Diário" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.question}>Como você descreveria seu humor hoje?</Text>
        <Text style={styles.selectedLabel}>{selectedMood.label}</Text>

        <View style={[styles.faceCircle, { backgroundColor: selectedMood.color }]}>
          <Text style={styles.faceEmoji}>{selectedMood.face}</Text>
        </View>

        <MoodArc selectedIndex={selectedIndex} onSelect={setSelectedIndex} />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.confirmButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Arco de seleção de humor — 5 segmentos coloridos, tocáveis, com um indicador (gota) no centro
function MoodArc({ selectedIndex, onSelect }) {
  const width = 320;
  const height = 170;
  const cx = width / 2;
  const cy = height;
  const radius = 150;

  const segmentColors = [
    COLORS.moodVeryBad,
    COLORS.moodSad,
    COLORS.moodNeutral,
    COLORS.moodHappy,
    COLORS.moodHappy,
  ];

  const segments = segmentColors.map((color, index) => {
    const startAngle = Math.PI - (index / segmentColors.length) * Math.PI;
    const endAngle = Math.PI - ((index + 1) / segmentColors.length) * Math.PI;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy - radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy - radius * Math.sin(endAngle);

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 0 ${x2} ${y2} Z`;

    return { path, color, index };
  });

  // Ângulo do indicador (gota), apontando para o segmento selecionado
  const indicatorAngle =
    Math.PI - ((selectedIndex + 0.5) / segmentColors.length) * Math.PI;
  const indicatorX = cx + (radius - 18) * Math.cos(indicatorAngle);
  const indicatorY = cy - (radius - 18) * Math.sin(indicatorAngle);

  return (
    <View style={styles.arcWrapper}>
      <Svg width={width} height={height + 10}>
        {segments.map((seg) => (
          <Path
            key={seg.index}
            d={seg.path}
            fill={seg.color}
            opacity={seg.index === selectedIndex ? 1 : 0.45}
            onPress={() => onSelect(seg.index)}
          />
        ))}
      </Svg>
      <View
        style={[
          styles.indicatorDot,
          { left: indicatorX - 9, top: indicatorY - 9 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: SIZES.paddingScreen,
    paddingTop: 12,
  },
  question: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textBrown,
    textAlign: "center",
    marginBottom: 18,
  },
  selectedLabel: {
    fontSize: 14,
    color: COLORS.textGray,
    marginBottom: 24,
  },
  faceCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  faceEmoji: {
    fontSize: 38,
    color: COLORS.textBrown,
    fontWeight: "700",
  },
  arcWrapper: {
    position: "relative",
    marginBottom: 24,
  },
  indicatorDot: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.textBrown,
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusPill,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginTop: "auto",
    marginBottom: 24,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
