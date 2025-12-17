import { supabase } from "../setup/supabase";

const StoriesService = {
  getStories: async () => {
    const { data, error } = await supabase
      .from("Story")
      .select(
        `id, title, description, gender, duration, free, audio, difficulty, created_at, language, thumbnail`
      );
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  getStoryDetails: async (id: string) => {
    const { data, error } = await supabase
      .from("Story")
      .select()
      .eq("id", id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
};

export default StoriesService;
