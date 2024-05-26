import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import Logo from "@/components/Logo";
import OnboardingSequence from "@/components/OnboardingSequence";

const Onboarding = () => {
  return (
    <SafeAreaView className="bg-black-900 px-6 h-full items-center pt-14">
      <ScrollView>
        <Logo large />
        <OnboardingSequence />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;
