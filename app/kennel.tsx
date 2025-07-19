import { DogCard } from "@/components/DogCard";
import { generateDog } from "@/lib/dogGenerator";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, ScrollView, Text } from "react-native";

export default function KennelScreen() {
  const [dogs, setDogs] = useState([
    generateDog("seed1"),
    generateDog("seed2"),
    generateDog("seed3"),
  ]);
  const router = useRouter();

  function addDog() {
    setDogs([...dogs, generateDog("seed" + (dogs.length + 1))]);
  }

  function goToRace() {
    router.push({ pathname: "/race", params: { selected: "0,1" } }); // pass first 2 dogs for now
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">Your Kennel</Text>
      <Button title="Add Dog" onPress={addDog} />
      <Button title="Race First Two Dogs" onPress={goToRace} />
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </ScrollView>
  );
}
