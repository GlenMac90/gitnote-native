import { useState, useEffect } from "react";
import { PostType, useAppwriteProps } from "../types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { GetPostsType } from "./appwrite";

const useAppwrite = ({ fn, userId }: useAppwriteProps) => {
  const [skip, setSkip] = useState(0);
  const { setPosts } = useGlobalContext();
  const [data, setData] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const [totalDocuments, setTotalDocuments] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response;
      if (userId) {
        response = await (
          fn as (userId: string, skip: number) => Promise<GetPostsType>
        )(userId, skip);
      } else {
        response = await (fn as (skip: number) => Promise<GetPostsType>)(skip);
        setPosts(response.posts);
      }
      setSkip((prev) => prev + 5);
      setData(response.posts);
      setIsMore(response.moreDocuments);
      setTotalDocuments(response.totalDocuments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrevious = async () => {
    setLoading(true);
    try {
      let response;
      if (userId) {
        response = await (
          fn as (userId: string, skip: number) => Promise<GetPostsType>
        )(userId, skip - 10);
      } else {
        response = await (fn as (skip: number) => Promise<GetPostsType>)(
          skip - 10
        );
        setPosts(response.posts);
      }
      setSkip((prev) => prev - 5);
      setData(response.posts);
      setIsMore(response.moreDocuments);
      setTotalDocuments(response.totalDocuments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return {
    data,
    loading,
    refetch,
    isMore,
    setSkip,
    skip,
    totalDocuments,
    fetchPrevious,
  };
};

export default useAppwrite;
