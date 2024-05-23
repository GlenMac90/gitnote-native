import { View, Text, Image, Pressable } from "react-native";

import icons from "@/constants/icons";

const Goal = ({
  learningGoal = false,
  title,
  setGoals,
}: {
  learningGoal?: boolean;
  title: string;
  setGoals: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const removeGoal = () => {
    setGoals((prev) => prev.filter((goal) => goal !== title));
  };

  return (
    <View className="w-full flex-row items-center rounded justify-between px-3 py-3.5 bg-black-700 mb-3.5">
      <View className="flex-row space-x-2 items-center">
        {learningGoal ? (
          <View className="h-4 w-4 rounded-sm bg-green-400 items-center justify-center">
            <Image
              source={icons.greenTick}
              className="h-2.5 w-2.5"
              resizeMode="contain"
            />
          </View>
        ) : (
          <Image
            source={icons.knowledgeIcon}
            className="h-4 w-4"
            resizeMode="contain"
          />
        )}

        <Text className="text-sm text-white-100 font-iregular">{title}</Text>
      </View>
      <Pressable onPress={removeGoal}>
        <Image
          source={icons.closeDark}
          className="h-3 w-3"
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default Goal;
