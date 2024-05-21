import { View, Image } from "react-native";

import icons from "@/constants/icons";

const CompletedStage = () => {
  return (
    <View className="h-8 w-8 rounded-[5px] items-center justify-center bg-primary-500">
      <Image source={icons.check} className="h-4 w-4" resizeMode="contain" />
    </View>
  );
};

export default CompletedStage;
