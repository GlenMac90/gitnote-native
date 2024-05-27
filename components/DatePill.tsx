import { View, Text, Image } from "react-native";

import { formatDate } from "@/utils";
import icons from "@/constants/icons";

const DatePill = ({
  date,
  containerStyles,
}: {
  date: number;
  containerStyles?: string;
}) => {
  const formattedDate = formatDate(date);
  return (
    <View className={`${containerStyles} items-center flex-row`}>
      <Image
        source={icons.calendar}
        className="h-3.5 w-3.5"
        resizeMode="contain"
      />
      <Text className="text-sm font-iregular text-white-300 ml-1">
        {formattedDate}
      </Text>
    </View>
  );
};

export default DatePill;
