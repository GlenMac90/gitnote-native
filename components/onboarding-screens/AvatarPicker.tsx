import { View, Text, Image, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import icons from "@/constants/icons";
import { ScreenOneProps } from "@/types";

const AvatarPicker = ({
  form,
  setForm,
}: {
  form: ScreenOneProps;
  setForm: React.Dispatch<React.SetStateAction<ScreenOneProps>>;
}) => {
  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (result.assets) {
      setForm({ ...form, avatar: result.assets[0] });
    }
  };

  return (
    <View className="mt-6 w-full items-center flex-row space-x-3.5">
      <View className="h-[90px] w-[90px] rounded-[5px] bg-black-700 items-center justify-center">
        {form.avatar ? (
          <Image
            source={{ uri: form.avatar.uri }}
            className="w-full h-full rounded-[5px]"
            resizeMode="contain"
          />
        ) : (
          <Image
            source={icons.imagePicker}
            className="w-6 h-6"
            resizeMode="contain"
          />
        )}
      </View>
      <TouchableOpacity
        className="flex-row rounded-[5px] bg-black-700 px-3.5 py-2 space-x-2"
        activeOpacity={0.8}
        onPress={openPicker}
      >
        <Text className="font-imedium text-sm text-white-300">
          Update Profile Picture
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarPicker;
