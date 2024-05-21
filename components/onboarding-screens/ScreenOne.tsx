import { useState, useEffect } from "react";

import { View, Text } from "react-native";
import AvatarPicker from "./AvatarPicker";
import { ScreenOneProps } from "@/types";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { screenOneUpdateUser } from "@/lib/appwrite";

const ScreenOne = ({
  setOnboardedLevel,
}: {
  setOnboardedLevel: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<ScreenOneProps>({
    avatar: null,
    name: "",
    portfolio: "",
    id: user?.id,
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, id: user?.id }));
  }, [user]);

  const submitForm = async () => {
    try {
      const updatedUser = await screenOneUpdateUser(form);

      if (updatedUser?.success === true) {
        setOnboardedLevel(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="mt-6 w-full flex-col">
      <Text className="font-ibold text-2xl text-white-100">
        Basic Information
      </Text>
      <AvatarPicker form={form} setForm={setForm} />
      <FormField
        otherStyles="mt-6"
        title="Name"
        value={form.name}
        placeholder="Please enter your full name"
        handleChangeText={(text) => setForm({ ...form, name: text })}
      />
      <FormField
        otherStyles="mt-6"
        title="Portfolio"
        value={form.portfolio}
        placeholder="Please enter your portfolio link"
        handleChangeText={(text) => setForm({ ...form, portfolio: text })}
      />
      <CustomButton
        containerStyles="mt-6"
        title="Next"
        handlePress={submitForm}
      />
    </View>
  );
};

export default ScreenOne;
