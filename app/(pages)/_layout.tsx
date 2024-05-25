import NavBar from "@/components/NavBar";
import { Stack } from "expo-router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
        <Stack.Screen
          name="details/[project]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default Layout;
