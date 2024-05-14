import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function MainScreen() {
  return (
    <View className="h-full w-full items-center justify-center">
      <Text className="text-4xl font-imedium">Main Screen</Text>
      <Link href="/home" className="text-lg font-psemibold text-secondary">
        Home
      </Link>
    </View>
  );
}
