import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";

const LoadingScreen = () => {
  return (
    <SafeAreaView className="flex-row gap-1 h-full w-full items-center justify-center bg-black-900">
      <Image source={icons.logo} resizeMode="contain" className="h-16 w-12" />
      <Text className="text-[60px] font-ibold text-white-100">GitNote</Text>
    </SafeAreaView>
  );
};

export default LoadingScreen;
