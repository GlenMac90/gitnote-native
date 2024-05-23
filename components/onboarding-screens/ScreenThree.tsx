import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import FormField from "../FormField";
import { updateUser } from "@/lib/appwrite";
import CustomButton from "../CustomButton";
import Goal from "./Goal";
import { OnboardingScreenProps } from "@/types";

const ScreenThree = ({ setOnboardedLevel, userId }: OnboardingScreenProps) => {
  const [knowledge, setKnowledge] = useState<string[]>([]);
  const [goal, setGoal] = useState<string>("");
  const [tagsString, setTagsString] = useState<string>("");

  const submitForm = async () => {
    const tags = tagsString.split(",").map((tag) => tag.trim());
    try {
      const updatedUser = await updateUser({
        userId,
        data: { knowledge, tags, onboardedLevel: 3 },
      });
      if (updatedUser?.success === true) {
        setOnboardedLevel(3);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = () => {
    if (!goal) return;
    if (knowledge.includes(goal)) return;
    setKnowledge([...knowledge, goal]);
    setGoal("");
  };

  return (
    <View className="mt-6 w-full flex-col">
      <Text className="font-ibold text-2xl text-white-100">
        Add your knowledge level
      </Text>
      <FormField
        otherStyles="mt-6"
        title="Knowledge level"
        value={goal}
        placeholder="Please enter your knowledge"
        handleChangeText={(text) => setGoal(text)}
      />
      <View className={`${knowledge.length > 0 ? "mt-3.5" : "mt-0"}`}>
        {knowledge.map((goal: string) => (
          <Goal key={goal} title={goal} setGoals={setKnowledge} />
        ))}
      </View>
      <TouchableOpacity
        className={`w-full rounded-[5px] bg-black-600 justify-center items-center py-2.5 ${knowledge.length > 0 ? "mt-0" : "mt-3.5"}`}
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <Text className="text-xs text-white-100 font-imedium">
          Add goal checkbox
        </Text>
      </TouchableOpacity>
      <FormField
        otherStyles="mt-6"
        title="Tech Stack"
        value={tagsString}
        placeholder="Please enter your tech stack"
        handleChangeText={(text) => setTagsString(text)}
      />
      <CustomButton
        containerStyles="mt-6"
        title="Next"
        handlePress={submitForm}
      />
    </View>
  );
};

export default ScreenThree;
