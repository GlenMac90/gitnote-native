import { useState } from "react";
import { View } from "react-native";

import { useGlobalContext } from "@/context/GlobalProvider";
import ProcessDiagram from "./onboarding-screens/ProcessDiagram";
import ScreenFour from "./onboarding-screens/ScreenFour";
import ScreenOne from "./onboarding-screens/ScreenOne";
import ScreenThree from "./onboarding-screens/ScreenThree";
import ScreenTwo from "./onboarding-screens/ScreenTwo";

const OnboardingSequence = () => {
  const { user } = useGlobalContext();

  if (!user) return null;

  const [onboardedLevel, setOnboardedLevel] = useState(user.onboardedLevel);

  return (
    <View className="w-full mt-16 rounded-xl bg-black-800 px-5 py-8 flex-col">
      <ProcessDiagram onboardedLevel={onboardedLevel} />
      {onboardedLevel === 0 && (
        <ScreenOne setOnboardedLevel={setOnboardedLevel} userId={user.id} />
      )}
      {onboardedLevel === 1 && (
        <ScreenTwo setOnboardedLevel={setOnboardedLevel} userId={user.id} />
      )}
      {onboardedLevel === 2 && (
        <ScreenThree setOnboardedLevel={setOnboardedLevel} userId={user.id} />
      )}
      {onboardedLevel === 3 && (
        <ScreenFour setOnboardedLevel={setOnboardedLevel} userId={user.id} />
      )}
    </View>
  );
};

export default OnboardingSequence;
