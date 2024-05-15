import { View, Text, FlatList } from "react-native";
import NavLink from "./NavLink";

const linkData = [
  {
    id: 1,
    title: "JSM Course",
    path: "https://docs.gitnote.app",
  },
  {
    id: 2,
    title: "GitHub Organisation",
    path: "f",
  },
  {
    id: 3,
    title: "Logout",
    path: "https://twitter.com/gitnoteapp",
  },
];

const QuickLinks = () => {
  return (
    <View className="w-full flex-col">
      <Text className="text-white-500 text-[10px]">QUICK LINKS</Text>
      <FlatList
        data={linkData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NavLink link={item} />}
      />
    </View>
  );
};

export default QuickLinks;
