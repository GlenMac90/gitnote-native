import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HTMLRenderer from "@/components/HTMLRenderer";
import { getRecentPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";

export default function HomeScreen() {
  const { data: posts, loading } = useAppwrite({ fn: getRecentPosts });

  if (loading) return <Text>Loading...</Text>;
  return (
    <SafeAreaView className="h-full w-full">
      <ScrollView className="w-full flex-col">
        <Text className="text-4xl font-imedium">Home Screen</Text>
        {posts.length > 0 && (
          <View className="flex-col space-y-4">
            {posts.map((post) => (
              <HTMLRenderer key={post.id} content={post.content} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
