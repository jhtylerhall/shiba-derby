import { LANE_HEIGHT, TRACK_LENGTH_PX } from "@/constants/race";
import { useRaceSim } from "@/hooks/UseRaceSim";
import { RaceDog } from "@/types/race";
import { memo, useEffect, useRef } from "react";
import { Button, Text, View } from "react-native";

type Props = {
  dogs: RaceDog[];
};

const RaceCanvasComponent = ({ dogs }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { raceState, startRace } = useRaceSim(dogs);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      raceState.dogs.forEach((dog, i) => {
        const x = dog.progress * TRACK_LENGTH_PX;
        const y = dog.lane * LANE_HEIGHT + 20;

        // Draw Shiba as a rectangle for now
        ctx.fillStyle = "orange";
        ctx.fillRect(x, y, 40, 40);

        ctx.fillStyle = "black";
        ctx.fillText(dog.name, x, y - 5);
      });
    };

    draw();
    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, [raceState]);

  return (
    <View className="items-center">
      <canvas
        ref={canvasRef}
        width={TRACK_LENGTH_PX + 200}
        height={dogs.length * LANE_HEIGHT}
        style={{ border: "1px solid black", background: "#eef2f5" }}
      />
      {!raceState.isRunning && (
        <Button title="Start Race" onPress={startRace} />
      )}
      {raceState.winner && (
        <Text className="text-xl font-bold">
          🏆 Winner: {raceState.winner.name}
        </Text>
      )}
    </View>
  );
};

export const RaceCanvas = memo(RaceCanvasComponent);
