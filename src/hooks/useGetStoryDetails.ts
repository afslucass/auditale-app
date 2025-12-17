import { useState } from "react";
import StoriesService from "../infra/services/stories";

type useGetStoriesReturnType = [
  (id: string) => Promise<void>,
  { data: any; error: boolean; loading: boolean }
];

const useGetStoryDetails = (): useGetStoriesReturnType => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetch = async (id: string) => {
    try {
      setLoading(true);
      const data = await StoriesService.getStoryDetails(id);
      setData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return [fetch, { data, error, loading }];
};

export default useGetStoryDetails;
