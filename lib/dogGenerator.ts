// lib/dogGenerator.ts

import { Dog, FurColor, Personality } from "@/types/dog";
import { nanoid } from "nanoid";
import { buildSpritePrompt } from "./buildSpritePrompt";

// Optionally, random accessories/personality generators here...

export function generateDog(seed: string): Dog {
  // Replace with your RNG or use the seed for determinism
  const furColors: FurColor[] = ["red", "black", "tan", "cream", "white"];
  const personalities: Personality[] = [
    "loyal",
    "playful",
    "lazy",
    "proud",
    "chaotic",
    "competitive",
  ];
  // Pick at random or use seeded RNG
  const furColor = furColors[Math.floor(Math.random() * furColors.length)];
  const personality =
    personalities[Math.floor(Math.random() * personalities.length)];

  // Optionally random accessories:
  const allAccessories = ["blue collar", "racing goggles", "pink bow", "cape"];
  const accessories =
    Math.random() < 0.5
      ? [allAccessories[Math.floor(Math.random() * allAccessories.length)]]
      : [];

  // Optional: select animation type
  const animationType = "idle animation";

  // Build the sprite prompt
  const spritePrompt = buildSpritePrompt(
    furColor,
    personality,
    accessories,
    animationType
  );

  return {
    id: nanoid(),
    name: "Shiba", // Replace with your name generator
    traits: {
      furColor,
      personality,
      accessories,
    },
    stats: {
      speed: Math.ceil(Math.random() * 10),
      stamina: Math.ceil(Math.random() * 10),
      acceleration: Math.ceil(Math.random() * 10),
      obedience: Math.ceil(Math.random() * 10),
      cleverness: Math.ceil(Math.random() * 10),
    },
    spritePrompt,
  };
}
