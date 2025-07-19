import { FUR_COLORS, PERSONALITIES } from "@/constants/dog";

export type FurColor = (typeof FUR_COLORS)[number];
export type Personality = (typeof PERSONALITIES)[number];

export type DogStats = {
  speed: number;
  stamina: number;
  acceleration: number;
  obedience: number;
  cleverness: number;
};

export type DogTraits = {
  furColor: FurColor;
  personality: Personality;
};

export type Dog = {
  id: string;
  name: string;
  seed: string;
  stats: DogStats;
  traits: DogTraits;
  generation: number;
};
