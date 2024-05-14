import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Details = () => {
  const { project } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-primary h-full">
      <Text>Search Screen {project}</Text>
    </SafeAreaView>
  );
};

export default Details;
