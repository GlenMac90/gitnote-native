import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import { Link, router } from "expo-router";

import Logo from "@/components/Logo";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { createClient } from "@/lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlePress = async () => {
    if (!form.name || !form.email || !form.password) {
      return;
    }
    try {
      const newUser = await createClient({ form });

      if (newUser) {
        router.replace("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-black-900 px-6 h-full items-center pt-14">
      <Logo large />
      <View className="w-full">
        <Text className="text-2xl font-ibold text-white-100 mt-16">
          Sign Up
        </Text>
        <FormField
          title="Full Name"
          value={form.name}
          placeholder="Enter your email address"
          handleChangeText={(text) => setForm({ ...form, name: text })}
          otherStyles="mt-5"
        />
        <FormField
          title="Email"
          value={form.email}
          placeholder="Enter your email address"
          handleChangeText={(text) => setForm({ ...form, email: text })}
          otherStyles="mt-5"
        />
        <FormField
          title="Password"
          value={form.password}
          placeholder="Enter your password"
          handleChangeText={(text) => setForm({ ...form, password: text })}
          otherStyles="mt-5"
        />
        <CustomButton
          title="Sign Up"
          handlePress={handlePress}
          containerStyles="mt-5"
        />
        <Link
          className="underline self-center mt-5 text-sm font-imedium text-white-300"
          href={"/sign-in"}
        >
          I already have an account
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
