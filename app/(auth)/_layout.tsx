import CustomStatusBar from "@/components/CustomStatusBar";
import { Stack } from "expo-router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
      <CustomStatusBar />
    </>
  );
};

export default Layout;
