import { View } from "react-native";

import { useGlobalContext } from "@/context/GlobalProvider";
import CompletedStage from "./CompletedStage";
import CurrentStage from "./CurrentStage";
import NextStage from "./NextStage";

const ProcessDiagram = ({ onboardedLevel }: { onboardedLevel: number }) => {
  return (
    <View className="flex-row w-full justify-between items-center relative">
      {onboardedLevel === 0 && (
        <>
          <CurrentStage />
          <View className="absolute h-[1.5px] w-1/4 z-10 left-5 bg-black-600" />
          <NextStage />
          <View className="absolute h-[1.5px] w-1/4 z-10 left-[37%] bg-black-600" />
          <NextStage />
          <View className="absolute h-[1.5px] w-1/4 z-10 left-[66%] bg-black-600" />
          <NextStage />
        </>
      )}

      {onboardedLevel === 1 && (
        <>
          <CompletedStage />
          <View className="absolute h-[1.5px] w-1/4 z-30 left-5 bg-primary-500" />
          <CurrentStage />
          <View className="absolute h-[1.5px] w-1/4 z-10 left-[37%] bg-black-600" />
          <NextStage />
          <View className="absolute h-[1.5px] w-1/4 z-10 left-[66%] bg-black-600" />
          <NextStage />
        </>
      )}

      {onboardedLevel === 2 && (
        <>
          <CompletedStage />
          <View className="absolute h-[1.5px] w-1/4 z-10 left-5 bg-primary-500" />
          <CompletedStage />
          <View className="absolute h-[1.5px] w-1/4 z-30 left-[37%] bg-primary-500" />
          <CurrentStage />
          <View className="absolute h-[1.5px] w-1/4 z-10 left-[66%] bg-black-600" />
          <NextStage />
        </>
      )}

      {onboardedLevel === 3 && (
        <>
          <CompletedStage />
          <View className="absolute h-[1.5px] w-1/4 z-10 left-5 bg-primary-500" />
          <CompletedStage />
          <View className="absolute h-[1.5px] w-1/4 z-30 left-[37%] bg-primary-500" />
          <CompletedStage />
          <View className="absolute h-[1.5px] w-1/4 z-30 left-[66%] bg-primary-500" />
          <CurrentStage />
        </>
      )}
    </View>
  );
};

export default ProcessDiagram;
