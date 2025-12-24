import { useState } from "react";
import StoriesService from "../infra/services/stories";
import { StoryWithoutContent } from "../types/story";

type useGetStoriesReturnType = [
  (limit: number) => Promise<void>,
  { data: any; error: boolean; loading: boolean }
];

const useGetStories = (): useGetStoriesReturnType => {
  const [data, setData] = useState<StoryWithoutContent[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetch = async (limit: number) => {
    try {
      setLoading(true);
      const data = await StoriesService.getStories(limit);
      setData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return [fetch, { data, error, loading }];
};

export default useGetStories;
