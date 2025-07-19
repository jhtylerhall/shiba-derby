import { DogCard } from "@/components/DogCard";
import { generateDog } from "@/lib/dogGenerator";
import { ScrollView, Text } from "react-native";

// For now, create a few sample dogs (eventually use state or context)
const dogs = [generateDog("seed1"), generateDog("seed2"), generateDog("seed3")];

export function KennelScreen() {
  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">Your Kennel</Text>
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </ScrollView>
  );
}
