import * as Animatable from "react-native-animatable";
import { View } from "react-native";

const LoadingGraphic = () => {
  return (
    <View className="w-full items-center justify-center h-60">
      <View className="flex-row space-x-3">
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <Animatable.View
              key={i}
              iterationCount={"infinite"}
              className="rounded-full w-2 h-2 bg-white-300"
              duration={1000}
              delay={i * 100}
              animation={{
                0: {
                  transform: [{ translateY: 0 }, { scale: 1 }],
                },
                0.5: {
                  transform: [{ translateY: -10 }, { scale: 1.1 }],
                },
                1: {
                  transform: [{ translateY: 0 }, { scale: 1 }],
                },
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default LoadingGraphic;
