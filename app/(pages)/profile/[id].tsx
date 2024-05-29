import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { getUsersPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import PageWrapper from "@/components/PageWrapper";
import PostCard from "@/components/PostCard";
import LoadingGraphic from "@/components/LoadingGraphic";

const User = () => {
  const { id } = useLocalSearchParams();

  const { data: posts, loading } = useAppwrite({
    fn: getUsersPosts,
    userId: id as string,
  });

  return (
    <PageWrapper>
      {loading ? (
        <LoadingGraphic />
      ) : posts.length > 0 ? (
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
