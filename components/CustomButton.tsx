import { Text, TouchableOpacity } from "react-native";
import { CustomButtonProps } from "../types";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-primary-500 h-10 justify-center rounded items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`text-black-900 font-ibold text-sm ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
