import { useState } from "react";
import { Text, View } from "react-native";

import {
  ScreenOne,
  ScreenTwo,
  ScreenThree,
  ScreenFour,
} from "./onboarding-screens";
import { useGlobalContext } from "@/context/GlobalProvider";
import ProcessDiagram from "./onboarding-screens/ProcessDiagram";

const OnboardingSequence = () => {
  const { user } = useGlobalContext();
  const [onboardedLevel, setOnboardedLevel] = useState(user.onboardedLevel);

  return (
    <View className="w-full mt-16 rounded-xl bg-black-800 px-5 py-8 flex-col">
      <ProcessDiagram onboardedLevel={onboardedLevel} />
      {onboardedLevel === 0 && (
        <ScreenOne setOnboardedLevel={setOnboardedLevel} />
      )}
      {onboardedLevel === 1 && (
        <ScreenTwo setOnboardedLevel={setOnboardedLevel} />
      )}
      {onboardedLevel === 2 && (
        <ScreenThree setOnboardedLevel={setOnboardedLevel} />
      )}
      {onboardedLevel === 3 && (
        <ScreenFour setOnboardedLevel={setOnboardedLevel} />
      )}
    </View>
  );
};

export default OnboardingSequence;
