import { useState, useEffect } from "react";
import { PostType } from "../types";

type AppwriteFunction =
  | (() => Promise<PostType[]>)
  | ((userId: string) => Promise<PostType[]>);

const useAppwrite = ({
  fn,
  userId,
}: {
  fn: AppwriteFunction;
  userId?: string;
}) => {
  const [data, setData] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let response;
      if (userId) {
        response = await (fn as (userId: string) => Promise<PostType[]>)(
          userId
        );
      } else {
        response = await (fn as () => Promise<PostType[]>)();
      }
      setData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return { data, loading, refetch };
};

export default useAppwrite;
