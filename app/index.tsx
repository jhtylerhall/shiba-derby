import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const onSelectKennel = useCallback(() => {
    router.push("./kennel");
  }, [router]);
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-extrabold mb-4 text-orange-600 text-center">
        Shiba Derby League 🐕
      </Text>
      <Text className="text-lg mb-8 text-center">
        Welcome to the ultimate Japanese dog racing experience!{"\n"}
        Breed, train, and race your own Shiba Inus for glory, DOGE, and SHIB!
      </Text>
      <Button title="Go to Kennel" onPress={onSelectKennel} />
      <View className="h-4" />
      <View className="h-8" />
      <Text className="text-center text-gray-400">
        🏁 Tap a tab below or use the buttons above to start!
      </Text>
    </View>
  );
}
