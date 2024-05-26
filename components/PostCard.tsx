import { View, Text } from "react-native";

import { PostType } from "@/types";

import icons from "@/constants/icons";

const PostCard = ({ post }: { post: PostType }) => {
  const { id, title, tags, type } = post;
  return (
    <View className="w-full flex-col space-y-4 py-6 px-4 rounded-lg bg-black-800 mt-6">
      <Text>Post Card</Text>
    </View>
  );
};

export default PostCard;
