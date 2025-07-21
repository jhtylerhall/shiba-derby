import { FurColor, Personality } from "@/types/dog";
import { memo, useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Ellipse, G, Path, Rect, Text as SvgText } from "react-native-svg";

// Color mapping
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

// Animation config by mode
function getAnimConfig(
  mode: "race" | "idle",
  personality: Personality,
  speedStat = 5
) {
  if (mode === "idle") {
    // Subtle, slow bounce, tail wag, almost no wiggle
    return {
      duration: 1200,
      bounceHeight: 3,
      wiggleAmount: 2,
      tailWag: 1,
    };
  }
  // Race mode
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
      ? 4
      : personality === "chaotic"
        ? 16
        : 8 + Math.floor(speedStat / 2);
  const wiggleAmount =
    personality === "playful" || personality === "chaotic" ? 10 : 4;
  return {
    duration: baseDuration - speedStat * 10,
    bounceHeight,
    wiggleAmount,
    tailWag: 3,
  };
}

// SVG path for a simple tail (right side, will wag)
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedTail = Animated.createAnimatedComponent(Path);
const AnimatedGroup = Animated.createAnimatedComponent(G);

const AnimatedShibaComponent = ({
  furColor,
  personality,
  x,
  y,
  mode = "idle", // "idle" or "race"
  speedStat = 5,
}: {
  furColor: FurColor;
  personality: Personality;
  x: number;
  y: number;
  mode?: "idle" | "race";
  speedStat?: number;
}) => {
  // Animate bounce
  const bounce = useSharedValue(0);
  // Animate wiggle
  const wiggle = useSharedValue(0);
  // Animate tail wag
  const tailWag = useSharedValue(0);

  // Get animation config for this dog/mode
  const {
    duration,
    bounceHeight,
    wiggleAmount,
    tailWag: tailWagFactor,
  } = getAnimConfig(mode, personality, speedStat);

  useEffect(() => {
    if (mode === "race") {
      bounce.value = withRepeat(
        withTiming(-bounceHeight, { duration }),
        -1,
        true
      );
      wiggle.value = withRepeat(
        withTiming(wiggleAmount, { duration }),
        -1,
        true
      );
      tailWag.value = withRepeat(
        withTiming(tailWagFactor, { duration: duration / 2 }),
        -1,
        true
      );
    } else {
      // Idle mode: subtle, slow, never fully still
      bounce.value = withRepeat(
        withTiming(-bounceHeight, { duration }),
        -1,
        true
      );
      wiggle.value = withRepeat(
        withTiming(wiggleAmount, { duration }),
        -1,
        true
      );
      tailWag.value = withRepeat(
        withTiming(tailWagFactor, { duration: duration }),
        -1,
        true
      );
    }
    // No animation on unmount
    return () => {
      bounce.value = 0;
      wiggle.value = 0;
      tailWag.value = 0;
    };
  }, [mode, duration, bounceHeight, wiggleAmount, tailWagFactor]);

  // Animated props for position and wiggle
  const animatedGroupProps = useAnimatedProps(() => {
    // Wiggle: oscillate between -wiggleAmount and +wiggleAmount degrees
    const rotate = `${interpolate(wiggle.value, [-wiggleAmount, wiggleAmount], [-wiggleAmount, wiggleAmount])}deg`;
    return {
      transform: [
        { translateX: x + 20 },
        { translateY: y + 15 },
        { rotate },
        { translateX: -20 },
        { translateY: -15 },
      ],
    };
  });

  // Animated bounce
  const animatedRectProps = useAnimatedProps(() => ({
    y: y + bounce.value,
  }));

  // Animated tail wag
  const animatedTailProps = useAnimatedProps(() => ({
    d: `M40,42 Q${52 + tailWag.value * 3},${34 - tailWag.value * 4} ${44 + tailWag.value * 2},24`,
  }));

  return (
    <>
      {/* Drop Shadow */}
      <Ellipse
        cx={x + 20}
        cy={y + 35}
        rx={20}
        ry={7}
        fill="#222"
        opacity={0.14}
      />
      <AnimatedGroup animatedProps={animatedGroupProps}>
        <AnimatedRect
          x={x}
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
          x={x + 20}
          y={y + 18}
          fontSize={18}
          fill="#222"
          textAnchor="middle"
        >
          {PERSONALITY_EMOJI[personality]}
        </SvgText>
      </AnimatedGroup>
    </>
  );
};

export const AnimatedShiba = memo(AnimatedShibaComponent);
