import { Image, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { NavPostProps } from "@/types";
import icons from "@/constants/icons";

const NavPost = ({ setIsOpen, link }: NavPostProps) => {
  const getIcon = () => {
    switch (link.type) {
      case "workflow":
        return icons.workflow;
      case "knowledge":
        return icons.knowledge;
      case "component":
        return icons.component;
      default:
        return icons.component;
    }
  };

  const handlePress = () => {
    setIsOpen(false);
    router.push(`/details/${link.id}`);
  };

  return (
    <TouchableOpacity
      className="flex-row space-x-3 mt-5"
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image
        source={getIcon()}
        resizeMode="contain"
        className="w-4 h-4 mt-0.5"
      />
      <Text className="text-sm text-white-300 font-imedium">{link.title}</Text>
    </TouchableOpacity>
  );
};

export default NavPost;
