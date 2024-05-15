import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

import icons from "@/constants/icons";
import SearchInput from "./SearchInput";
import Span from "./Span";
import QuickLinks from "./QuickLinks";

const NavBarModalContent = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const routeToCreatePost = () => {
    setIsOpen(false);
    router.push("/create");
  };

  return (
    <View className="flex-col w-full mt-10">
      <TouchableOpacity
        className="text-white-100 w-full bg-gradient-start items-center justify-center py-3 rounded-md"
        activeOpacity={0.8}
        onPress={routeToCreatePost}
      >
        <View className="flex-row gap-1 items-center">
          <Image
            source={icons.create}
            resizeMode="contain"
            className="w-3 h-3"
          />
          <Text className="font-imedium text-white-100 text-sm">
            Create Post
          </Text>
        </View>
      </TouchableOpacity>
      <SearchInput />
      <Span />
      <QuickLinks />
    </View>
  );
};

export default NavBarModalContent;
