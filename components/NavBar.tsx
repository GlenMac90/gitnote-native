import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "./Logo";
import NavBarModal from "./NavBarModal";

const NavBar = () => {
  return (
    <SafeAreaView className="fixed top-0 bg-black-800 p-5 flex-row justify-between w-full items-center">
      <Logo />
      <NavBarModal />
    </SafeAreaView>
  );
};

export default NavBar;
