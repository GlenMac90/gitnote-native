import { View, Text, FlatList } from "react-native";

import NavLink from "./NavLink";
import icons from "@/constants/icons";

const linkData = [
  {
    id: 1,
    title: "JSM Course",
    path: "https://docs.gitnote.app",
    image: icons.jsm,
  },
  {
    id: 2,
    title: "GitHub Organisation",
    path: "https://github.com/GlenMac90",
    image: icons.github,
  },
  {
    id: 3,
    title: "Logout",
    image: icons.logout,
  },
];

const QuickLinks = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <View className="w-full flex-col">
      <Text className="text-white-500 text-[10px]">QUICK LINKS</Text>
      <FlatList
        data={linkData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NavLink link={item} setIsOpen={setIsOpen} />}
      />
    </View>
  );
};

export default QuickLinks;
