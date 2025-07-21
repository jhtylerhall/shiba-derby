import { AnimatedShiba } from "@/components/dog/AnimatedShiba";
import { generateDog } from "@/lib/dogGenerator";
import { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";

export default function KennelScreen() {
  const [dogs, setDogs] = useState([
    generateDog("seed1"),
    generateDog("seed2"),
    generateDog("seed3"),
  ]);

  function addDog() {
    setDogs([...dogs, generateDog("seed" + (dogs.length + 1))]);
  }

  return (
    <ScrollView className="p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Your Kennel</Text>
        <Button title="Add Dog" onPress={addDog} />
      </View>

      {dogs.length === 0 && (
        <Text className="text-center text-gray-500 mt-20">
          No dogs in your kennel yet. Tap "Add Dog" to get started!
        </Text>
      )}

      {dogs.map((dog, i) => (
        <View
          key={dog.id}
          className="flex-row items-center p-4 mb-4 bg-orange-50 rounded-2xl shadow"
        >
          {/* AnimatedShiba avatar in idle mode */}
          <View
            style={{
              width: 56,
              height: 56,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <AnimatedShiba
              furColor={dog.traits.furColor}
              personality={dog.traits.personality}
              x={0}
              y={0}
              mode="idle"
              speedStat={dog.stats.speed}
            />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold">{dog.name}</Text>
            <Text className="text-sm text-gray-700 mb-1">
              Fur: {dog.traits.furColor} | Personality: {dog.traits.personality}
            </Text>
            <Text className="text-xs text-gray-600">
              Speed: {dog.stats.speed} Stamina: {dog.stats.stamina}
            </Text>
            <Text className="text-xs text-gray-600">
              Accel: {dog.stats.acceleration} Obed: {dog.stats.obedience}
            </Text>
            <Text className="text-xs text-gray-600">
              Clever: {dog.stats.cleverness}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
