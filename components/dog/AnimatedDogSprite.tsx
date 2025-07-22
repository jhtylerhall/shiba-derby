import React, { memo, useEffect, useState } from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";

type AnimatedDogSpriteProps = {
  spriteSheet: any; // require(...) or { uri }
  frameCount: number;
  frameRate?: number; // Frames per second, default: 6
  frameWidth: number; // Width of a single frame in px
  frameHeight: number; // Height of a single frame in px
  style?: StyleProp<ViewStyle>;
};

const AnimatedDogSpriteComponent: React.FC<AnimatedDogSpriteProps> = ({
  spriteSheet,
  frameCount,
  frameRate = 6,
  frameWidth,
  frameHeight,
  style,
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (frameCount <= 1) return; // Don't animate if single frame
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frameCount);
    }, 1000 / frameRate);
    return () => clearInterval(interval);
  }, [frameCount, frameRate]);

  return (
    <View
      style={[
        { width: frameWidth, height: frameHeight, overflow: "hidden" },
        style,
      ]}
    >
      <Image
        source={spriteSheet}
        style={{
          width: frameWidth * frameCount,
          height: frameHeight,
          transform: [{ translateX: -frame * frameWidth }],
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export const AnimatedDogSprite = memo(AnimatedDogSpriteComponent);
