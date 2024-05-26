import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import icons from "@/constants/icons";
import { CreateFormType, DropdownProps } from "@/types";

const colorStyles: {
  component: string;
  knowledge: string;
  workflow: string;
} = {
  component: "text-purple-500",
  knowledge: "text-green-500",
  workflow: "text-primary-500",
};

const Dropdown = ({ title, data, containerStyles, setForm }: DropdownProps) => {
  const [selectedData, setSelectedData] = useState(data[0]);
  const [open, setOpen] = useState(false);

  const key: string = selectedData.title;
  const selectedColorClass =
    colorStyles[key.toLowerCase() as keyof typeof colorStyles];

  return (
    <View className={`${containerStyles} space-y-2 flex-col w-full`}>
      <Text className="text-sm text-white-300 font-imedium">{title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen((prev) => !prev)}
        onBlur={() => setOpen(false)}
        className="w-full bg-black-700 rounded flex-row items-center justify-between px-3 py-3.5"
      >
        <View className="flex-row space-x-1 items-center">
          <Image
            source={selectedData.icon}
            resizeMode="contain"
            className="h-4 w-4"
          />
          <Text className={`text-sm text-white-300 ${selectedColorClass}`}>
            {selectedData.title}
          </Text>
        </View>
        <Image
          source={icons.chevron}
          resizeMode="contain"
          className={`w-3 h-3 ${open ? "transform rotate-180" : ""}`}
        />
      </TouchableOpacity>
      {open && (
        <View className="w-full flex-col space-y-2 mt-2">
          {data.map((item) => {
            const colorClass =
              colorStyles[item.title.toLowerCase() as keyof typeof colorStyles];
            return (
              <TouchableOpacity
                onPress={() => {
                  setOpen(false);
                  setSelectedData(item);
                  setForm((prev) => ({
                    ...prev,
                    type: item.title.toLowerCase() as CreateFormType["type"],
                  }));
                }}
                activeOpacity={0.8}
                key={item.title}
                className="w-full bg-black-700 rounded flex-row items-center px-3 py-3.5"
              >
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  className="h-4 w-4"
                />
                <Text className={`ml-1 text-sm text-white-300 ${colorClass}`}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Dropdown;
