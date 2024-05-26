import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { getUsersPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import LoadingScreen from "@/components/LoadingScreen";
import PageWrapper from "@/components/PageWrapper";

const User = () => {
  const { user } = useGlobalContext();
  const { id } = useLocalSearchParams();

  const { data: posts, loading } = useAppwrite({
    fn: () => getUsersPosts(user!.id),
  });

  console.log("PROFILE POSTS:", posts);
  if (loading) return <LoadingScreen />;

  return (
    <PageWrapper>
      <Text>Profile {id}</Text>
    </PageWrapper>
  );
};

export default User;
