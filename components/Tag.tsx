import { View, Text } from "react-native";

const Tag = ({ tag }: { tag: string }) => {
  return (
    <View className="mr-2 self-start py-0.5 px-2 rounded-[3px] bg-black-700">
      <Text className="text-sm font-imedium text-white-300">{tag}</Text>
    </View>
  );
};

export default Tag;
