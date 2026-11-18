import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect } from "react-native-svg";
import { ScreenHeader } from "../components/Headers";
import FloatingHomeButton, { TRIGGER_HEIGHT } from "../components/FloatingHomeButton";
import PressableScale from "../components/PressableScale";
import Toast from "../components/Toast";
import { registrarCheckin } from "../services/checkins";
import { COLORS, SIZES, SPACING, TOUCH } from "../styles/theme";

const MOODS = [
  { key: "muito_triste", label: "Me sinto muito mal", mouth: "M28 68 Q50 48 72 68", color: COLORS.moodVeryBad },
  { key: "triste", label: "Me sinto mal", mouth: "M30 66 Q50 55 70 66", color: COLORS.moodSad },
  { key: "neutro", label: "Me sinto neutro", mouth: "M30 62 L70 62", color: COLORS.moodNeutral },
  { key: "bem", label: "Me sinto bem", mouth: "M30 58 Q50 76 70 58", color: COLORS.moodHappy },
  { key: "muito_bem", label: "Me sinto muito bem", mouth: "M26 56 Q50 84 74 56", color: COLORS.moodHappy },
];

const MAX_ARC_WIDTH = 320;

export default function CheckinDiarioScreen({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [registrado, setRegistrado] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  const arcWidth = Math.min(MAX_ARC_WIDTH, windowWidth - SIZES.paddingScreen * 2);
  const selectedMood = MOODS[selectedIndex];

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScreenHeader title="Check-in Diário" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.question}>Como você descreveria seu humor hoje?</Text>

        <View style={styles.moodBlock}>
          <Text style={styles.selectedLabel}>{selectedMood.label}</Text>

          <View style={[styles.faceCircle, { backgroundColor: selectedMood.color }]}>
            <FaceIcon mouth={selectedMood.mouth} />
          </View>

          <DoubleChevronDown />
        </View>

        <MoodArc width={arcWidth} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />

        <PressableScale
          style={styles.confirmButton}
          onPress={() => {
            registrarCheckin(selectedMood.key);
            setRegistrado(true);
          }}
          accessibilityRole="button"
        >
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </PressableScale>
      </View>

      <Toast
        visible={registrado}
        message="Check-in registrado. Obrigado por se olhar hoje!"
        onHide={() => {
          setRegistrado(false);
          navigation.navigate("Home");
        }}
      />

      <FloatingHomeButton navigation={navigation} />
    </SafeAreaView>
  );
}

function FaceIcon({ mouth, size = 62 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect x={27} y={32} width={11} height={23} rx={5.5} fill={COLORS.textBrown} />
      <Rect x={62} y={32} width={11} height={23} rx={5.5} fill={COLORS.textBrown} />
      <Path d={mouth} stroke={COLORS.textBrown} strokeWidth={7} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

function DoubleChevronDown() {
  return (
    <Svg width={26} height={18} viewBox="0 0 26 18">
      <Path d="M2 2 L13 9 L24 2" stroke={COLORS.border} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M2 9 L13 16 L24 9" stroke={COLORS.border} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

function MoodArc({ width, selectedIndex, onSelect }) {
  const radius = width / 2 - 10;
  const height = radius + 20;
  const cx = width / 2;
  const cy = height;

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

  const indicatorAngle = Math.PI - ((selectedIndex + 0.5) / segmentColors.length) * Math.PI;
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
      <View style={[styles.indicatorDot, { left: indicatorX - 9, top: indicatorY - 9 }]} />
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
    paddingTop: SPACING.sm,
  },
  question: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textBrown,
    textAlign: "center",
    letterSpacing: -0.3,
    lineHeight: 32,
    marginBottom: SPACING.xxl,
  },
  moodBlock: {
    alignItems: "center",
    gap: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textGray,
    letterSpacing: -0.1,
  },
  faceCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  arcWrapper: {
    position: "relative",
    marginBottom: SPACING.xl,
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
    minHeight: TOUCH.min + 12,
    paddingHorizontal: SPACING.huge + 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: SPACING.xl + TRIGGER_HEIGHT,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
