// types/dog.ts

export type FurColor = "red" | "black" | "tan" | "cream" | "white";
export type Personality =
  | "loyal"
  | "playful"
  | "lazy"
  | "proud"
  | "chaotic"
  | "competitive";

export interface Dog {
  id: string;
  name: string;
  traits: {
    furColor: FurColor;
    personality: Personality;
    accessories?: string[]; // ["blue collar", "racing goggles"]
  };
  stats: {
    speed: number;
    stamina: number;
    acceleration: number;
    obedience: number;
    cleverness: number;
  };
  spritePrompt: string;
}
