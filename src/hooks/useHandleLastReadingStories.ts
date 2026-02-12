import { useState } from "react";
import StoriesService from "../infra/services/stories";
import { LastReadingStory, StoryWithoutContent } from "../types/story";
import LastReadingStoriesStorage from "../infra/storage/last-reading-stories";

type useHandleLastReadingStoriesReturnType = {
  getLastReadingStories: () => void;
  addLastReadingStories: (story: LastReadingStory) => void;
  data: LastReadingStory[];
  error: boolean;
};

const useHandleLastReadingStories =
  (): useHandleLastReadingStoriesReturnType => {
    const [data, setData] = useState<LastReadingStory[]>([]);
    const [error, setError] = useState(false);

    const getLastReadingStories = async () => {
      try {
        setError(false);
        const data = await LastReadingStoriesStorage.getLastReadingStories();
        setData(data);
      } catch (err) {
        setError(true);
      }
    };

    const addLastReadingStories = async (story: LastReadingStory) => {
      try {
        setError(false);
        const data =
          await LastReadingStoriesStorage.addLastReadingStories(story);
        setData(data);
      } catch (err) {
        setError(true);
      }
    };

    return { getLastReadingStories, addLastReadingStories, data, error };
  };

export default useHandleLastReadingStories;
