import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";
import NavBarModal from "./NavBarModal";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <SafeAreaView className="fixed top-0 bg-black-800 p-5 flex-row justify-between w-full items-center">
      <Logo />
      <NavBarModal />
    </SafeAreaView>
  );
};

export default NavBar;
