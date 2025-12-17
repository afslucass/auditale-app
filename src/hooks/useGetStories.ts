import { useState } from "react";
import StoriesService from "../infra/services/stories";

type useGetStoriesReturnType = [
  () => Promise<void>,
  { data: any; error: boolean; loading: boolean }
];

const useGetStories = (): useGetStoriesReturnType => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await StoriesService.getStories();
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
