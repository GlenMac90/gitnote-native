import { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

import CustomButton from "../CustomButton";
import { OnboardingScreenProps } from "@/types";
import CheckBox from "../CheckBox";
import Picker from "../Picker";
import { updateUser } from "@/lib/appwrite";

const ScreenFour = ({ setOnboardedLevel, userId }: OnboardingScreenProps) => {
  const [availableToWork, setAvailableToWork] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    )
  );

  const submitForm = async () => {
    try {
      const updatedUser = await updateUser({
        userId,
        data: {
          availability: availableToWork,
          startDate,
          endDate,
          onboardedLevel: 4,
          onboarded: true,
        },
      });
      if (updatedUser?.success === true) {
        setOnboardedLevel(4);
        router.replace("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="mt-6 w-full flex-col">
      <Text className="font-ibold text-2xl text-white-100">
        Schedule & Availability
      </Text>
      <View className="flex-row space-x-2 mt-6 items-center">
        <CheckBox
          checked={availableToWork}
          onPress={() => setAvailableToWork((prev) => !prev)}
        />
        <Text className="text-sm text-white-300 font-imedium">
          Are you available to work?
        </Text>
      </View>

      {availableToWork && (
        <>
          <Picker
            containerStyles="mt-7"
            title="Start Date"
            date={startDate}
            setDate={setStartDate}
            minimumDate={new Date()}
            maximumDate={endDate}
          />
          <Picker
            containerStyles="mt-7"
            title="Start Date"
            date={endDate}
            setDate={setEndDate}
            minimumDate={startDate}
            maximumDate={
              new Date(
                new Date().getFullYear() + 1,
                new Date().getMonth(),
                new Date().getDate()
              )
            }
          />
        </>
      )}

      <CustomButton
        containerStyles="mt-6"
        title="Submit"
        handlePress={submitForm}
      />
    </View>
  );
};

export default ScreenFour;
