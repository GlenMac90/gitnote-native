import { View, Image, Text } from "react-native";
import { Link } from "expo-router";

import icons from "@/constants/icons";

interface NavLinkProps {
  link: {
    id: number;
    title: string;
    image?: string;
    path: string;
  };
}

const NavLink = ({ link }: NavLinkProps) => {
  return (
    <View className="flex-row space-x-3 mt-5">
      <Image source={icons.burger} resizeMode="contain" className="w-4 h-4" />
      <Text className="text-sm text-white-300 font-imedium">{link.title}</Text>
    </View>
  );
};

export default NavLink;
