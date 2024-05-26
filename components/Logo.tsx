import { Text, View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import icons from "@/constants/icons";

const Logo = ({ large }: { large?: boolean }) => {
  const handlePress = () => {
    router.push("/home");
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <View className="flex-row gap-1">
        <Image
          source={icons.logo}
          resizeMode="contain"
          className={`${large ? "h-10 w-8" : "h-8 w-6"}`}
        />
        <Text
          className={`${large ? "text-[38px]" : "text-2xl"} font-ibold text-white-100`}
        >
          GitNote
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Logo;
