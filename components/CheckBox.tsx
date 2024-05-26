import { View, Image, Pressable } from "react-native";

import icons from "@/constants/icons";
import { CheckBoxProps } from "@/types";

const CheckBox = ({ checked, onPress }: CheckBoxProps) => {
  return (
    <Pressable onPress={onPress}>
      {checked ? (
        <View className="h-4 w-4 rounded-sm bg-green-400 items-center justify-center">
          <Image
            source={icons.greenTick}
            className="h-[9px] w-[9px] rounded-sm"
          />
        </View>
      ) : (
        <View className="h-4 w-4 rounded-sm border border-black-600" />
      )}
    </Pressable>
  );
};

export default CheckBox;
