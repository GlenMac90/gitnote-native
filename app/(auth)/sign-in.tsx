import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Link, router } from "expo-router";

import { signIn } from "@/lib/appwrite";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Logo from "@/components/Logo";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handlePress = async () => {
    try {
      const user = await signIn({ email: form.email, password: form.password });
      if (user) {
        router.push("/home");
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
          Sign In
        </Text>
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
          title="Login"
          handlePress={handlePress}
          containerStyles="mt-5"
        />
        <Link
          className="underline self-center mt-5 text-sm font-imedium text-white-300"
          href={"/sign-up"}
        >
          I don't have an account
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
