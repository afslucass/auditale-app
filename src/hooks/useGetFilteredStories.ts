import { useState } from "react";
import StoriesService from "../infra/services/stories";
import { Difficulty, Gender, StoryWithoutContent } from "../types/story";

type useGetFilteredStoriesReturnType = [
  (
    pageSize: number,
    title?: string | null,
    gender?: Gender | null,
    difficulty?: Difficulty | null,
    currentCreatedAtLastItem?: string | null
  ) => Promise<void>,
  { data: any; error: boolean; loading: boolean }
];

const useGetFilteredStories = (): useGetFilteredStoriesReturnType => {
  const [data, setData] = useState<StoryWithoutContent[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetch = async (
    pageSize: number,
    title?: string | null,
    gender?: Gender | null,
    difficulty?: Difficulty | null,
    currentCreatedAtLastItem?: string | null
  ) => {
    try {
      setLoading(true);

      const titleNormalized = title !== "" ? title : null;
      const data =
        await StoriesService.getPaginatedAndFilteredStoriesOrderingByCreation(
          pageSize,
          titleNormalized,
          gender,
          difficulty,
          currentCreatedAtLastItem
        );
      setData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return [fetch, { data, error, loading }];
};

export default useGetFilteredStories;
