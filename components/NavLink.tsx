import { Image, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { NavLinkProps } from "@/types";

const NavLink = ({ link }: NavLinkProps) => {
  return (
    <TouchableOpacity
      className="flex-row space-x-3 mt-5 items-center"
      activeOpacity={0.8}
    >
      <Image source={link.image} resizeMode="contain" className="w-4 h-4" />
      <Text className="text-sm text-white-300 font-imedium">{link.title}</Text>
    </TouchableOpacity>
  );
};

export default NavLink;
