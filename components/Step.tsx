import { View, Image, Text } from "react-native";

import icons from "@/constants/icons";

const Step = ({ step }: { step: string }) => {
  return (
    <View className="items-center flex-row mt-2">
      <Image source={icons.stepIcon} className="h-5 w-5" resizeMode="contain" />
      <Text className="ml-1 text-white-300 font-iregular">{step}</Text>
    </View>
  );
};

export default Step;
