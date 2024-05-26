import { View, Text, FlatList } from "react-native";

import NavPost from "./NavPost";
import { useGlobalContext } from "@/context/GlobalProvider";

const NavBarPostsList = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { posts } = useGlobalContext();
  console.log("POSTS", posts[0]);
  return (
    <View className="w-full flex-col">
      <Text className="text-white-500 text-[10px]">POSTS</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NavPost link={item} setIsOpen={setIsOpen} />}
      />
    </View>
  );
};

export default NavBarPostsList;
