import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import PostTypeTag from "./PostTypeTag";
import { PostType } from "@/types";
import Tag from "./Tag";

const PostCard = ({ post }: { post: PostType }) => {
  const { id, title, tags, type } = post;

  const handlePress = () => {
    router.push(`/details/${id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="w-full flex-col space-y-4 py-6 px-4 rounded-lg bg-black-800 mt-6"
      activeOpacity={0.8}
    >
      <PostTypeTag type={type} />
      <Text className="text-xl font-imedium text-white-100">{title}</Text>
      <View className="w-full flex-row flex-wrap space-2.5">
        {tags?.map((tag) => <Tag key={tag} tag={tag} />)}
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
