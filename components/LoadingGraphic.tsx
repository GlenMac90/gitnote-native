import * as Animatable from "react-native-animatable";
import { View } from "react-native";

const spin = {
  0: {
    transform: [{ rotate: "0deg" }],
  },
  1: {
    transform: [{ rotate: "360deg" }],
  },
};
const LoadingGraphic = () => {
  return (
    <View className="w-full items-center justify-center h-60">
      <Animatable.View
        duration={800}
        easing={"linear"}
        iterationCount={"infinite"}
        animation={spin}
        className="rounded-full w-24 h-24 border-t-4 border-l-4 border-b-4 animate-spin border-white-300"
      />
    </View>
  );
};

export default LoadingGraphic;
