import { FurColor, Personality } from "@/types/dog";
import { memo, useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Ellipse, G, Path, Rect, Svg, Text as SvgText } from "react-native-svg";

const FUR_COLOR_MAP: Record<FurColor, string> = {
  red: "#E18A3C",
  black: "#262626",
  tan: "#D6B370",
  cream: "#F6E2B3",
  white: "#F9F9F7",
};

const PERSONALITY_EMOJI: Record<Personality, string> = {
  loyal: "🦴",
  playful: "😆",
  lazy: "😴",
  proud: "😎",
  chaotic: "🤪",
  competitive: "💨",
};

function getAnimConfig(
  mode: "race" | "idle",
  personality: Personality,
  speedStat = 5
) {
  if (mode === "idle") {
    return {
      duration: 1200,
      bounceHeight: 2, // CLAMP bounce to a smaller range for kennel
      wiggleAmount: 2,
      tailWag: 1,
    };
  }
  const baseDuration =
    personality === "lazy"
      ? 480
      : personality === "chaotic"
        ? 100
        : personality === "playful"
          ? 140
          : 180;
  const bounceHeight =
    personality === "lazy"
      ? 3
      : personality === "chaotic"
        ? 10
        : 6 + Math.floor(speedStat / 2);
  const wiggleAmount =
    personality === "playful" || personality === "chaotic" ? 10 : 4;
  return {
    duration: baseDuration - speedStat * 10,
    bounceHeight,
    wiggleAmount,
    tailWag: 3,
  };
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedTail = Animated.createAnimatedComponent(Path);
const AnimatedGroup = Animated.createAnimatedComponent(G);

const AnimatedShibaComponent = ({
  furColor,
  personality,
  mode = "idle",
  speedStat = 5,
  size = 56,
}: {
  furColor: FurColor;
  personality: Personality;
  mode?: "idle" | "race";
  speedStat?: number;
  size?: number;
}) => {
  const bounce = useSharedValue(0);
  const wiggle = useSharedValue(0);
  const tailWag = useSharedValue(0);

  const {
    duration,
    bounceHeight,
    wiggleAmount,
    tailWag: tailWagFactor,
  } = getAnimConfig(mode, personality, speedStat);

  useEffect(() => {
    bounce.value = withRepeat(
      withTiming(-bounceHeight, { duration }),
      -1,
      true
    );
    wiggle.value = withRepeat(withTiming(wiggleAmount, { duration }), -1, true);
    tailWag.value = withRepeat(
      withTiming(tailWagFactor, { duration: duration }),
      -1,
      true
    );
    return () => {
      bounce.value = 0;
      wiggle.value = 0;
      tailWag.value = 0;
    };
  }, [mode, duration, bounceHeight, wiggleAmount, tailWagFactor]);

  // ANIMATION: body is always within viewBox
  const animatedGroupProps = useAnimatedProps(() => {
    const rotate = `${interpolate(
      wiggle.value,
      [-wiggleAmount, wiggleAmount],
      [-wiggleAmount, wiggleAmount]
    )}deg`;
    return {
      transform: [
        { translateX: size / 2 },
        { translateY: size / 2 },
        { rotate },
        { translateX: -size / 2 },
        { translateY: -size / 2 },
      ],
    };
  });

  // NEW: use a small, always-positive y (center the body)
  const animatedRectProps = useAnimatedProps(() => ({
    y: size / 2 - 15 + bounce.value, // center body vertically
  }));

  // Tail stays in bottom right
  const animatedTailProps = useAnimatedProps(() => ({
    d: `M${size - 12},${size - 18} Q${size - 2 + tailWag.value * 3},${size - 22 - tailWag.value * 4} ${
      size - 8 + tailWag.value * 2
    },${size - 34}`,
  }));

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Drop Shadow */}
      <Ellipse
        cx={size / 2}
        cy={size - 10}
        rx={size / 2 - 8}
        ry={size / 8}
        fill="#222"
        opacity={0.14}
      />
      <AnimatedGroup animatedProps={animatedGroupProps}>
        <AnimatedRect
          x={size / 2 - 20}
          animatedProps={animatedRectProps}
          width={40}
          height={30}
          rx={14}
          fill={FUR_COLOR_MAP[furColor]}
          stroke="#333"
          strokeWidth={1.5}
        />
        <AnimatedTail
          animatedProps={animatedTailProps}
          stroke="#B8860B"
          strokeWidth={3}
          fill="none"
        />
        <SvgText
          x={size / 2}
          y={size / 2 + 6}
          fontSize={18}
          fill="#222"
          textAnchor="middle"
        >
          {PERSONALITY_EMOJI[personality]}
        </SvgText>
      </AnimatedGroup>
    </Svg>
  );
};

export const AnimatedShiba = memo(AnimatedShibaComponent);
