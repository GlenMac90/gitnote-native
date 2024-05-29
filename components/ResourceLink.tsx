import { View, Text, Image } from "react-native";
import { Link } from "expo-router";

import { ResourceType } from "@/types";
import icons from "@/constants/icons";
import { truncateText } from "@/utils";

const ResourceLink = ({ resource }: { resource: ResourceType }) => {
  const truncatedLabel = truncateText(resource.label, 45);

  return (
    <Link href={`${resource.link}`}>
      <View className="flex-row w-full h-full mb-1">
        <Text className="text-sm text-white-300 underline truncate">
          {truncatedLabel}
        </Text>
        <Image source={icons.link} className="h-4 w-4 ml-2 mt-0.5" />
      </View>
    </Link>
  );
};

export default ResourceLink;
