import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";
import NavBarModal from "./NavBarModal";

const NavBar = () => {
  return (
    <SafeAreaView className="fixed top-0 bg-black-800 p-5 flex-row justify-between w-full items-center">
      <View className="flex-row gap-1">
        <Image source={icons.logo} resizeMode="contain" className="w-6 h-8" />
        <Text className="text-2xl font-ibold text-white-100">GitNote</Text>
      </View>
      <NavBarModal />
    </SafeAreaView>
  );
};

export default NavBar;
