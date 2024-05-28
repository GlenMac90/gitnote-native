import { Text, View, Pressable } from "react-native";

import { getRecentPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createTypesData } from "@/constants";
import { postType } from "@/types";
import LoadingScreen from "@/components/LoadingScreen";
import PageWrapper from "@/components/PageWrapper";
import PostCard from "@/components/PostCard";
import PostTypeTag from "@/components/PostTypeTag";
import { seedData, deletePosts, deleteResources } from "@/lib/appwrite";

export default function HomeScreen() {
  const { user } = useGlobalContext();
  const { data: posts, loading } = useAppwrite({ fn: getRecentPosts });

  const firstName = user?.name.split(" ")[0];

  if (loading) return <LoadingScreen />;

  const handleSeedData = async () => {
    await seedData();
  };

  return (
    <PageWrapper>
      <Pressable onPress={handleSeedData}>
        <Text className="text-2xl text-white-100 font-ibold mt-7">
          Seed Data
        </Text>
      </Pressable>
      <Text className="text-3xl text-white-100 font-ibold">
        Hello {firstName},
      </Text>
      <Text className="text-lg text-white-300 font-iregular mt-2">
        Time to jot down your latest learnings today!
      </Text>
      <Text className="text-2xl text-white-100 font-ibold mt-7">
        Recent Posts,
      </Text>
      <View className="w-full flex-row flex-wrap mt-5">
        {createTypesData.map((type) => (
          <PostTypeTag
            key={type.title}
            type={type.title.toLowerCase() as postType}
          />
        ))}
      </View>

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
