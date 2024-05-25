import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getUsersPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const User = () => {
  const { user } = useGlobalContext();
  const { id } = useLocalSearchParams();

  const { data: posts, loading } = useAppwrite({
    fn: () => getUsersPosts(user!.id),
  });

  console.log("PROFILE POSTS:", posts);
  if (loading) return <Text>Loading...</Text>;

  return (
    <SafeAreaView className="bg-primary h-full">
      <Text>Profile {id}</Text>
    </SafeAreaView>
  );
};

export default User;
