import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { getUsersPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import LoadingScreen from "@/components/LoadingScreen";
import PageWrapper from "@/components/PageWrapper";
import PostCard from "@/components/PostCard";

const User = () => {
  const { id } = useLocalSearchParams();

  const { data: posts, loading } = useAppwrite({
    fn: getUsersPosts,
    userId: id as string,
  });

  if (loading) return <LoadingScreen />;

  return (
    <PageWrapper>
      {posts.length > 0 ? (
        <View className="flex-col w-full">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      ) : (
        <Text className="text-white-100 text-center text-lg">
          No posts found.
        </Text>
      )}
    </PageWrapper>
  );
};

export default User;
