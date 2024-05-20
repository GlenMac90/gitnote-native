import { Redirect } from "expo-router";

import { useGlobalContext } from "@/context/GlobalProvider";
import LoadingScreen from "@/components/LoadingScreen";

export default function MainScreen() {
  const globalContext = useGlobalContext();

  if (!globalContext) {
    return <LoadingScreen />;
  }
  const { isLoading, isLoggedIn } = globalContext;

  if (isLoading) return <LoadingScreen />;

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return <Redirect href="/sign-in" />;
}
