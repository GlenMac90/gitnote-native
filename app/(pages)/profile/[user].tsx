import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const User = () => {
  const { user } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-primary h-full">
      <Text>Profile {user}</Text>
    </SafeAreaView>
  );
};

export default User;
