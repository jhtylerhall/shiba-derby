import { FUR_COLORS, PERSONALITIES, SHIBA_NAMES } from "@/constants/dog";
import { Dog, DogStats, FurColor, Personality } from "@/types/dog";

function seededRandom(seed: string, range: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rand = (Math.sin(hash) + 1) / 2;
  return Math.floor(rand * range);
}

function generateStat(seed: string, modifier: string): number {
  return seededRandom(seed + modifier + Math.random().toString(), 10) + 1;
}

export function generateDog(seed: string, generation = 1): Dog {
  const stats: DogStats = {
    speed: generateStat(seed, "speed"),
    stamina: generateStat(seed, "stamina"),
    acceleration: generateStat(seed, "accel"),
    obedience: generateStat(seed, "obed"),
    cleverness: generateStat(seed, "clever"),
  };

  const furColor: FurColor =
    FUR_COLORS[seededRandom(seed + "fur", FUR_COLORS.length)];
  const personality: Personality =
    PERSONALITIES[seededRandom(seed + "personality", PERSONALITIES.length)];
  const name = SHIBA_NAMES[seededRandom(seed + "name", SHIBA_NAMES.length)];
  return {
    id: `dog-${seed}`,
    name,
    seed,
    generation,
    stats,
    traits: {
      furColor,
      personality,
    },
  };
}
