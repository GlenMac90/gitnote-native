import { View, Text, Image } from "react-native";
import { Link } from "expo-router";

import { ResourceType } from "@/types";
import icons from "@/constants/icons";

const ResourceLink = ({ resource }: { resource: ResourceType }) => {
  return (
    <Link href={`${resource.link}`}>
      <View className="flex-row h-full items-center mb-1">
        <Text className="text-sm text-white-300 underline">
          {resource.label}
        </Text>
        <Image source={icons.link} className="h-4 w-4 ml-2" />
      </View>
    </Link>
  );
};

export default ResourceLink;
