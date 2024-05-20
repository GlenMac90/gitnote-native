import { View, Text, FlatList } from "react-native";

import { postType } from "@/types";
import NavPost from "./NavPost";

const postsData: Array<{
  id: number;
  title: string;
  path: string;
  type: postType;
}> = [
  {
    id: 1,
    title: "Component Post",
    path: "https://docs.gitnote.app",
    type: "component",
  },
  {
    id: 2,
    title: "Workflow Post",
    path: "https://github.com/GlenMac90",
    type: "workflow",
  },
  {
    id: 3,
    title: "Knowledge Post",
    path: "https://twitter.com/gitnoteapp",
    type: "knowledge",
  },
];

const NavBarPostsList = () => {
  return (
    <View className="w-full flex-col">
      <Text className="text-white-500 text-[10px]">POSTS</Text>
      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NavPost link={item} />}
      />
    </View>
  );
};

export default NavBarPostsList;
