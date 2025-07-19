import { Dog } from "@/types/dog";

export type RaceDog = Dog & {
  progress: number; // 0 to 1
  lane: number;
};

export type RaceState = {
  dogs: RaceDog[];
  trackLength: number;
  isRunning: boolean;
  winner?: RaceDog;
};
