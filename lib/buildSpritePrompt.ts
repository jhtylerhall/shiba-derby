// lib/buildSpritePrompt.ts

import { FurColor, Personality } from "@/types/dog";

export function buildSpritePrompt(
  furColor: FurColor,
  personality: Personality,
  accessories: string[] = [],
  animation: string = "idle animation"
): string {
  const accessoriesText =
    accessories.length > 0 ? "with " + accessories.join(" and ") : "";
  return `A 2D pixel art sprite sheet of a Shiba Inu dog with ${furColor} fur${accessoriesText ? " " + accessoriesText : ""}, ${animation}, side view, 4 frames, transparent background, 32x32 pixels per frame, no text, simple clear outline, suitable for a video game, frame layout: left to right`;
}
