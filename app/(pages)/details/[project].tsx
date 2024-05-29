import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { PostType, ResourceType } from "@/types";
import { getPostById } from "@/lib/appwrite";
import PageWrapper from "@/components/PageWrapper";
import PostTypeTag from "@/components/PostTypeTag";
import DatePill from "@/components/DatePill";
import Tag from "@/components/Tag";
import HTMLRenderer from "@/components/HTMLRenderer";
import Step from "@/components/Step";
import ResourceLink from "@/components/ResourceLink";
import { useGlobalContext } from "@/context/GlobalProvider";
import LoadingGraphic from "@/components/LoadingGraphic";
import EditPostButton from "@/components/EditPostButton";

const Details = () => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<PostType | null>(null);
  const { project } = useLocalSearchParams();

  useEffect(() => {
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

  if (loading) {
    return (
      <PageWrapper>
        <LoadingGraphic />
      </PageWrapper>
    );
  }

  if (!post) return null;

  const {
    id,
    creatorId,
    createdAt,
    content,
    description,
    steps,
    tags,
    title,
    type,
    resources,
  } = post;

  const isCreator = user?.id === creatorId;

  return (
    <PageWrapper>
      <Text className="font-ibold text-white-100 text-2xl">{title}</Text>
      <View className="flex-row w-full justify-between mt-3 items-center">
        <PostTypeTag type={type} />
        {isCreator && <EditPostButton postId={id} />}
      </View>
      <Text className="text-white-300 text-sm font-iregular mt-3">
        {description}
      </Text>
      <DatePill date={createdAt} containerStyles="mt-6" />
      <View className="mt-4 flex-row flex-wrap">
        {tags?.map((tag: string) => <Tag key={tag} tag={tag} />)}
      </View>
      {type !== "component" && (
        <View className="mt-10 flex-col">
          <Text className="text-lg font-ibold text-white-100">
            {type === "knowledge" ? "Key Takeaways" : "Task Checklist"}
          </Text>
          {steps?.map((step: string) => <Step key={step} step={step} />)}
        </View>
      )}
      <HTMLRenderer containerStyles="mt-10" content={content} />
      <Text className="font-ibold text-white-100 text-lg mb-2 mt-6">
        Resources & Links
      </Text>
      {resources.map((resource: ResourceType) => (
        <ResourceLink key={resource.link} resource={resource} />
      ))}
    </PageWrapper>
  );
};

export default Details;
