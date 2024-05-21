import { View } from "react-native";

const CurrentStage = () => {
  return (
    <View className="h-8 w-8 rounded-[5px] items-center z-20 justify-center p-1 bg-black-600">
      <View className="bg-primary-500 rounded-lg items-center justify-center w-full h-full">
        <View className="rounded-full h-2 w-2 bg-black-700" />
      </View>
    </View>
  );
};

export default CurrentStage;
