import { StyleSheet, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

export default function BackgroundPattern({
  height = 260,
  color = "#FFFFFF",
  opacity = 0.03,
  variant = "circles",
}) {
  return (
    <View style={[styles.layer, { height }]} pointerEvents="none">
      <Svg width="100%" height={height} viewBox="0 0 375 260" preserveAspectRatio="xMidYMin slice">
        {variant === "waves" ? (
          <>
            <Path
              d="M-20 70C60 30 130 110 210 70S350 30 400 80"
              stroke={color}
              strokeOpacity={opacity * 2.2}
              strokeWidth={26}
              fill="none"
            />
            <Path
              d="M-20 150C60 110 130 190 210 150S350 110 400 160"
              stroke={color}
              strokeOpacity={opacity * 1.6}
              strokeWidth={20}
              fill="none"
            />
          </>
        ) : (
          <>
            <Circle cx={300} cy={20} r={110} fill={color} fillOpacity={opacity} />
            <Circle cx={40} cy={120} r={90} fill={color} fillOpacity={opacity} />
            <Circle cx={250} cy={200} r={140} fill={color} fillOpacity={opacity * 0.7} />
            <Circle cx={330} cy={110} r={46} fill={color} fillOpacity={opacity * 1.6} />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFill,
    bottom: undefined,
    overflow: "hidden",
  },
});
