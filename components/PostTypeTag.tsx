import { View, Text, Image } from "react-native";

import icons from "@/constants/icons";
import { postType } from "@/types";

const PostTypeTag = ({ type }: { type: postType }) => {
  const backgroundColors = {
    component: "bg-purple-500/10",
    workflow: "bg-primary-500/10",
    knowledge: "bg-green-500/10",
  };

  const textColors = {
    component: "text-purple-500",
    workflow: "text-primary-500",
    knowledge: "text-green-500",
  };

  const icon = icons[type];
  const textColor = textColors[type];
  const backgroundColor = backgroundColors[type];

  return (
    <View
      className={`self-start mr-2 mb-2 flex-row rounded-[3px] items-center py-0.5 px-2 ${backgroundColor}`}
    >
      <Image source={icon} className="h-4 w-4" resizeMode="contain" />
      <Text className={`ml-2 capitalize text-sm font-imedium ${textColor}`}>
        {type}
      </Text>
    </View>
  );
};

export default PostTypeTag;
