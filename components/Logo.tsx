import { Text, View, Image } from "react-native";

import icons from "@/constants/icons";

const Logo = ({ large }: { large?: boolean }) => {
  return (
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
  );
};

export default Logo;
