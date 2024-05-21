import { View, Text } from "react-native";

const ScreenThree = ({
  setOnboardedLevel,
}: {
  setOnboardedLevel: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <View>
      <Text>Screen Three</Text>
    </View>
  );
};

export default ScreenThree;
