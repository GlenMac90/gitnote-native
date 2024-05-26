import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { PostType } from "@/types";
import { getPostById } from "@/lib/appwrite";
import LoadingScreen from "@/components/LoadingScreen";

const Details = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostType | null>(null);
  const { project } = useLocalSearchParams();

  useEffect(() => {
    if (project === null || project === undefined) return;
    const fetchPost = async () => {
      try {
        const postData = await getPostById(project as string);
        if (postData) {
          setPost(postData);
        }
      } catch (error) {
        console.error(error);
        router.replace("/home");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  console.log("POST DATA:", post);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Text>Search Screen {post?.content}</Text>
    </SafeAreaView>
  );
};

export default Details;
