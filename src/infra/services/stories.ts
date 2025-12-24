import { Difficulty, Gender } from "../../types/story";
import { supabase } from "../setup/supabase";

const getStories = async (limit: number) => {
  const { data, error } = await supabase
    .from("Story")
    .select(
      `id, title, description, gender, duration, free, audio, difficulty, created_at, language, thumbnail`
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const getPaginatedAndFilteredStoriesOrderingByCreation = async (
  pageSize: number,
  title?: string | null,
  gender?: Gender | null,
  difficulty?: Difficulty | null,
  currentCreatedAtLastItem?: string | null
) => {
  const query = supabase
    .from("Story")
    .select(
      `id, title, description, gender, duration, free, audio, difficulty, created_at, language, thumbnail`
    )
    .order("created_at", { ascending: false })
    .limit(pageSize);
  if (currentCreatedAtLastItem) {
    query.lt("created_at", currentCreatedAtLastItem);
  }
  if (gender) {
    query.eq("gender", gender);
  }
  if (difficulty) {
    query.eq("difficulty", difficulty);
  }
  if (title) {
    query.ilike("title", `%${title}%`);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const getStoryDetails = async (id: string) => {
  const { data, error } = await supabase
    .from("Story")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const StoriesService = {
  getStories,
  getPaginatedAndFilteredStoriesOrderingByCreation,
  getStoryDetails,
};

export default StoriesService;
