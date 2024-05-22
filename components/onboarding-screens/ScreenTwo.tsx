import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import CustomButton from "../CustomButton";
import FormField from "../FormField";
import Goal from "./Goal";
import { updateUser } from "@/lib/appwrite";
import { OnboardingScreenProps } from "@/types";

const ScreenTwo = ({ setOnboardedLevel, userId }: OnboardingScreenProps) => {
  const [goals, setGoals] = useState<string[]>([]);
  const [goal, setGoal] = useState<string>("");

  const submitForm = async () => {
    try {
      const updatedUser = await updateUser({
        userId,
        data: { goals, onboardedLevel: 2 },
      });
      if (updatedUser?.success === true) {
        setOnboardedLevel(2);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = () => {
    if (!goal) return;
    if (goals.includes(goal)) return;
    setGoals([...goals, goal]);
    setGoal("");
  };

  return (
    <View className="mt-6 w-full flex-col">
      <Text className="font-ibold text-2xl text-white-100">
        Add your learning goals
      </Text>
      <FormField
        otherStyles="mt-6"
        title="Learning Goals"
        value={goal}
        placeholder="Please enter your goal"
        handleChangeText={(text) => setGoal(text)}
      />
      <View className={`${goals.length > 0 ? "mt-3.5" : "mt-0"}`}>
        {goals.map((goal: string) => (
          <Goal key={goal} title={goal} learningGoal setGoals={setGoals} />
        ))}
      </View>
      <TouchableOpacity
        className={`w-full rounded-[5px] bg-black-600 justify-center items-center py-2.5 ${goals.length > 0 ? "mt-0" : "mt-3.5"}`}
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <Text className="text-xs text-white-100 font-imedium">
          Add goal checkbox
        </Text>
      </TouchableOpacity>
      <CustomButton
        containerStyles="mt-6"
        title="Next"
        handlePress={submitForm}
      />
    </View>
  );
};

export default ScreenTwo;
