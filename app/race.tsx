import { LANE_HEIGHT, TRACK_LENGTH_PX } from "@/constants/race";
import { generateDog } from "@/lib/dogGenerator";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";

// Helper for "selected" param parsing (default to two demo dogs if no params)
function getRaceDogs(selected?: string) {
  const allDogs = [
    generateDog("seed1"),
    generateDog("seed2"),
    generateDog("seed3"),
  ];
  if (selected) {
    const idxs = selected.split(",").map(Number);
    return idxs.map((i, lane) => ({
      ...allDogs[i % allDogs.length],
      progress: 0,
      lane,
    }));
  }
  return allDogs
    .slice(0, 2)
    .map((dog, i) => ({ ...dog, progress: 0, lane: i }));
}

export default function RaceScreen() {
  const params = useLocalSearchParams();
  const [raceDogs, setRaceDogs] = useState(() =>
    getRaceDogs(params.selected as string)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function startRace() {
    setIsRunning(true);
    setWinner(null);

    intervalRef.current = setInterval(() => {
      setRaceDogs((prev) => {
        let anyWin = false;
        const updated = prev.map((dog) => {
          if (dog.progress >= 1) {
            anyWin = true;
            return dog;
          }
          const px = dog.stats.speed * 2; // Use your DOG_SPEED_SCALE
          const newProgress = Math.min(dog.progress + px / TRACK_LENGTH_PX, 1);
          return { ...dog, progress: newProgress };
        });
        if (anyWin && intervalRef.current) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setWinner(updated.find((d) => d.progress >= 1)?.name || null);
        }
        return updated;
      });
    }, 1000 / 60);
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Simple SVG track (works for web + native)
  const trackWidth = TRACK_LENGTH_PX + 60;
  const trackHeight = raceDogs.length * LANE_HEIGHT + 40;

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Svg width={trackWidth} height={trackHeight}>
        {/* Draw lanes */}
        {raceDogs.map((dog, i) => (
          <Line
            key={i}
            x1={20}
            y1={dog.lane * LANE_HEIGHT + 50}
            x2={TRACK_LENGTH_PX + 40}
            y2={dog.lane * LANE_HEIGHT + 50}
            stroke="#ccc"
            strokeWidth={2}
          />
        ))}
        {/* Finish line */}
        <Line
          x1={TRACK_LENGTH_PX + 40}
          y1={30}
          x2={TRACK_LENGTH_PX + 40}
          y2={trackHeight - 10}
          stroke="black"
          strokeWidth={4}
        />
        {/* Dogs */}
        {raceDogs.map((dog, i) => (
          <Rect
            key={dog.id}
            x={40 + dog.progress * TRACK_LENGTH_PX}
            y={dog.lane * LANE_HEIGHT + 30}
            width={40}
            height={30}
            fill="orange"
            rx={10}
          />
        ))}
        {/* Dog names */}
        {raceDogs.map((dog, i) => (
          <SvgText
            key={dog.id + "-label"}
            x={40 + dog.progress * TRACK_LENGTH_PX}
            y={dog.lane * LANE_HEIGHT + 28}
            fontSize={12}
            fill="black"
          >
            {dog.name}
          </SvgText>
        ))}
      </Svg>
      {!isRunning && <Button title="Start Race" onPress={startRace} />}
      {winner && (
        <Text className="text-xl font-bold mt-3">🏆 Winner: {winner}</Text>
      )}
    </View>
  );
}
