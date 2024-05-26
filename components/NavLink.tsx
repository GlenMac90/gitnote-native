import { Image, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { NavLinkProps } from "@/types";
import { signOut } from "@/lib/appwrite";

const NavLink = ({ link, setIsOpen }: NavLinkProps) => {
  const handlePress = async () => {
    if (link.title === "Logout") {
      setIsOpen(false);
      await signOut();
      router.replace("sign-in");
    }
  };

  return (
    <TouchableOpacity
      className="flex-row space-x-3 mt-5 items-center"
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image source={link.image} resizeMode="contain" className="w-4 h-4" />
      <Text className="text-sm text-white-300 font-imedium">{link.title}</Text>
    </TouchableOpacity>
  );
};

export default NavLink;
