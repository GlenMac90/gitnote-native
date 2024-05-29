import { TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

import icons from "@/constants/icons";

const EditPostButton = ({ postId }: { postId: string }) => {
  const handlePress = () => {
    router.push(`/edit/${postId}`);
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
      <Image
        source={icons.dotsVertical}
        className="h-6 w-6"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default EditPostButton;
