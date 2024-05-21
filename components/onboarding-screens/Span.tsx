import { View } from "react-native";

const Span = ({ completed }: { completed: boolean }) => {
  return <View className="absolute h-[2px] w-1/4 z-10 left-5 bg-primary-500" />;
};

export default Span;
