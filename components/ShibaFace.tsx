import { FurColor, Personality } from "@/types/dog";
import { memo } from "react";
import { Text, View } from "react-native";

// Simple mapping for fur color to hex (customize as you like)
const FUR_COLOR_MAP: Record<FurColor, string> = {
  red: "#E18A3C",
  black: "#262626",
  tan: "#D6B370",
  cream: "#F6E2B3",
  white: "#F9F9F7",
};

// Simple mapping for personality to emoji
const PERSONALITY_EMOJI: Record<Personality, string> = {
  loyal: "🦴",
  playful: "😆",
  lazy: "😴",
  proud: "😎",
  chaotic: "🤪",
  competitive: "💨",
};

const ShibaFaceComponent = ({
  furColor,
  personality,
}: {
  furColor: FurColor;
  personality: Personality;
}) => (
  <View
    className="items-center justify-center mb-2"
    style={{
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: FUR_COLOR_MAP[furColor] || "#EEE",
      borderWidth: 2,
      borderColor: "#999",
    }}
  >
    <Text style={{ fontSize: 28 }}>
      {PERSONALITY_EMOJI[personality] || "🐕"}
    </Text>
  </View>
);

export const ShibaFace = memo(ShibaFaceComponent);
