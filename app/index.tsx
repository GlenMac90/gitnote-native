import { Redirect, router } from "expo-router";

import { useGlobalContext } from "@/context/GlobalProvider";
import LoadingScreen from "@/components/LoadingScreen";

export default function MainScreen() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (isLoading) return <LoadingScreen />;

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return <Redirect href="/sign-in" />;
}
