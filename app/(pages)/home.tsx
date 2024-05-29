import { Text, View, TouchableOpacity } from "react-native";

import { getRecentPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createTypesData } from "@/constants";
import { postType } from "@/types";
import PageWrapper from "@/components/PageWrapper";
import PostCard from "@/components/PostCard";
import PostTypeTag from "@/components/PostTypeTag";
import LoadingGraphic from "@/components/LoadingGraphic";

export default function HomeScreen() {
  const { user } = useGlobalContext();
  const {
    data: posts,
    loading,
    refetch,
    isMore,
    skip,
    totalDocuments,
    fetchPrevious,
  } = useAppwrite({ fn: getRecentPosts });

  const firstName = user?.name.split(" ")[0];

  const pageNumber = skip / 5;
  const numberOfPages = Math.round(totalDocuments / 5 + 1);

  return (
    <PageWrapper>
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

      {loading ? (
        <LoadingGraphic />
      ) : (
        posts.length > 0 && (
          <View className="flex-col w-full">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </View>
        )
      )}

      {!loading && (
        <View className="w-full flex-row items-center justify-center space-x-3 mt-6">
          {skip > 5 && (
            <TouchableOpacity
              className="px-3.5 py-2.5 rounded-[5px] bg-black-700"
              activeOpacity={0.8}
              onPress={() => {
                fetchPrevious();
              }}
            >
              <Text className="text-xs text-white-100 font-imedium">Prev</Text>
            </TouchableOpacity>
          )}
          <Text className="text-sx text-white-300 font-imedium">
            {pageNumber}/{numberOfPages}
          </Text>
          {isMore && (
            <TouchableOpacity
              className="px-3.5 py-2.5 rounded-[5px] bg-black-700"
              activeOpacity={0.8}
              onPress={() => {
                refetch();
              }}
            >
              <Text className="text-xs text-white-100 font-imedium">Next</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </PageWrapper>
  );
}
