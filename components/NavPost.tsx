import { Image, Text, TouchableOpacity } from "react-native";

import { NavLinkProps } from "@/types";
import { Link } from "expo-router";

import icons from "@/constants/icons";

const NavPost = ({ link }: NavLinkProps) => {
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

  return (
    <TouchableOpacity
      className="flex-row space-x-3 mt-5 items-center"
      activeOpacity={0.8}
    >
      <Image source={getIcon()} resizeMode="contain" className="w-4 h-4" />
      <Text className="text-sm text-white-300 font-imedium">{link.title}</Text>
    </TouchableOpacity>
  );
};

export default NavPost;
