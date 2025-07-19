import { DOG_SPEED_SCALE, FRAME_RATE, TRACK_LENGTH_PX } from "@/constants/race";
import { RaceDog, RaceState } from "@/types/race";
import { useEffect, useRef, useState } from "react";

export function useRaceSim(dogs: RaceDog[]) {
  const [raceState, setRaceState] = useState<RaceState>({
    dogs,
    trackLength: TRACK_LENGTH_PX,
    isRunning: false,
    winner: undefined,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRace = () => {
    setRaceState((prev) => ({ ...prev, isRunning: true }));
    intervalRef.current = setInterval(() => {
      setRaceState((prev) => {
        if (!prev.isRunning || prev.winner) return prev;

        const updatedDogs = prev.dogs.map((dog) => {
          const speedPx = dog.stats.speed * DOG_SPEED_SCALE;
          const newProgress = Math.min(
            dog.progress + speedPx / TRACK_LENGTH_PX,
            1
          );
          return { ...dog, progress: newProgress };
        });

        const winner = updatedDogs.find((d) => d.progress >= 1);

        if (winner && intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        return {
          ...prev,
          dogs: updatedDogs,
          winner: winner || prev.winner,
          isRunning: !winner,
        };
      });
    }, 1000 / FRAME_RATE);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { raceState, startRace };
}
