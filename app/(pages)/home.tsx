import { Text, View } from "react-native";

import PageWrapper from "@/components/PageWrapper";
import { getRecentPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import LoadingScreen from "@/components/LoadingScreen";
import PostCard from "@/components/PostCard";

export default function HomeScreen() {
  const { data: posts, loading } = useAppwrite({ fn: getRecentPosts });

  if (loading) return <LoadingScreen />;

  console.log("POSTS:", posts);
  return (
    <PageWrapper>
      <Text className="text-4xl font-imedium">Home Screen</Text>

      {posts.length > 0 && (
        <View className="flex-col w-full">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      )}
    </PageWrapper>
  );
}
