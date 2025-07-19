import { Dog } from "@/types/dog";
import { memo } from "react";
import { Text, View } from "react-native";

const DogCardComponent = ({
  dog,
  onPress,
}: {
  dog: Dog;
  onPress?: () => void;
}) => (
  <View
    className="p-4 mb-3 rounded-xl bg-orange-100 shadow"
    style={onPress ? { borderColor: "#FFA500", borderWidth: 2 } : undefined}
    // Add more touchable logic if you want to make selectable
  >
    <Text className="text-xl font-bold">{dog.name}</Text>
    <Text>Fur: {dog.traits.furColor}</Text>
    <Text>Personality: {dog.traits.personality}</Text>
    <Text>
      Speed: {dog.stats.speed} Stamina: {dog.stats.stamina}
    </Text>
    <Text>
      Accel: {dog.stats.acceleration} Obed: {dog.stats.obedience}
    </Text>
    <Text>Clever: {dog.stats.cleverness}</Text>
  </View>
);

export const DogCard = memo(DogCardComponent);
