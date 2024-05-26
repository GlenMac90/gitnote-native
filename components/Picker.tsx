import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import icons from "@/constants/icons";
import { PickerProps } from "@/types";

const Picker = ({
  title,
  date,
  setDate,
  minimumDate,
  maximumDate,
  containerStyles,
}: PickerProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event: any, selectedDate: Date | undefined) => {
    const { type } = event;
    if (type === "set") {
      setOpen(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    }
  };

  const displayText = date ? date.toDateString() : "Select Date & Time";

  return (
    <>
      <View className={`w-full flex-col space-y-2 ${containerStyles}`}>
        <Text className="text-sm text-white-300 font-imedium">{title}</Text>

        <Pressable
          onPress={() => {
            setOpen((prev) => !prev);
          }}
        >
          <View className="w-full px-3 py-3.5 bg-black-700 rounded flex-row space-x-2 items-center">
            <Image
              source={icons.calendar}
              className="h-4 w-4"
              resizeMode="contain"
            />
            <Text className="text-sm text-white-300">{displayText}</Text>
          </View>
        </Pressable>

        {open && (
          <DateTimePicker
            themeVariant="dark"
            mode="date"
            display="inline"
            value={date}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={handleChange}
            style={{ maxWidth: "100%" }}
            textColor="#ADB3CC"
          />
        )}
      </View>
    </>
  );
};

export default Picker;
