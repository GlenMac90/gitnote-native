import { useState, useEffect } from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import PageWrapper from "@/components/PageWrapper";
import { getPostById } from "@/lib/appwrite";
import { PostType } from "@/types";
import PostForm from "@/components/PostForm";

const Edit = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostType>();
  const { project } = useLocalSearchParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(project as string);
        setPost(post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <Text>Loading...</Text>
      </PageWrapper>
    );
  }

  return <PostForm post={post} />;
};

export default Edit;
