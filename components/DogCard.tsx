import { Dog } from "@/types/dog";
import { memo } from "react";
import { Text, View } from "react-native";
import { ShibaFace } from "./ShibaFace";

const DogCardComponent = ({ dog }: { dog: Dog }) => (
  <View className="p-4 mb-3 rounded-xl bg-orange-100 shadow flex-row items-center">
    <ShibaFace
      furColor={dog.traits.furColor}
      personality={dog.traits.personality}
    />
    <View className="ml-4 flex-1">
      <Text className="text-xl font-bold">{dog.name}</Text>
      <Text className="mb-1 text-sm text-gray-700">
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
);

export const DogCard = memo(DogCardComponent);
