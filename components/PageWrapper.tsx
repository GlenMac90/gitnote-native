import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="bg-black-900 px-6 pb-6 h-full items-center">
      <ScrollView className="flex-col w-full">{children}</ScrollView>
    </SafeAreaView>
  );
};

export default PageWrapper;
