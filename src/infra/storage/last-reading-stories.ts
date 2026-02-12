import AsyncStorage from "@react-native-async-storage/async-storage";
import { LastReadingStory } from "../../types/story";

const LAST_READING_STORIES_KEY = "LAST_READING_STORIES_KEY";
const MAX_ITEMS_TO_PERSIST = 12;

const getLastReadingStories = async () => {
  const currentLastStories = await AsyncStorage.getItem(
    LAST_READING_STORIES_KEY,
  );

  if (!currentLastStories) {
    await AsyncStorage.setItem(LAST_READING_STORIES_KEY, "[]");
    return [];
  }

  let currentLastStoriesJson: LastReadingStory[];
  try {
    currentLastStoriesJson = JSON.parse(currentLastStories);
  } catch (err) {
    await AsyncStorage.setItem(LAST_READING_STORIES_KEY, "[]");
    return [];
  }

  return currentLastStoriesJson;
};

const addLastReadingStories = async (lastStory: LastReadingStory) => {
  const currentLastStories = await AsyncStorage.getItem(
    LAST_READING_STORIES_KEY,
  );

  if (!currentLastStories) {
    await AsyncStorage.setItem(LAST_READING_STORIES_KEY, "[]");
    return [];
  }

  let currentLastStoriesJson: LastReadingStory[];
  try {
    currentLastStoriesJson = JSON.parse(currentLastStories);
  } catch (err) {
    await AsyncStorage.setItem(LAST_READING_STORIES_KEY, "[]");
    return [];
  }

  const currentStoriesFiltrated = currentLastStoriesJson.filter(
    (story) => story.story_id !== lastStory.story_id,
  );

  const newLastStories = [lastStory, ...currentStoriesFiltrated];

  const firstTwelveElements = newLastStories.slice(0, MAX_ITEMS_TO_PERSIST);

  await AsyncStorage.setItem(
    LAST_READING_STORIES_KEY,
    JSON.stringify(firstTwelveElements),
  );

  return firstTwelveElements;
};

const LastReadingStoriesStorage = {
  getLastReadingStories,
  addLastReadingStories,
};

export default LastReadingStoriesStorage;
