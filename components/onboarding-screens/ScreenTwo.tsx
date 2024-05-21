import { View, Text } from "react-native";

const ScreenTwo = ({
  setOnboardedLevel,
}: {
  setOnboardedLevel: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <View>
      <Text>Screen Two</Text>
    </View>
  );
};

export default ScreenTwo;
