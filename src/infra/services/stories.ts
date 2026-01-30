import { Difficulty, Gender } from "../../types/story";
import { supabase } from "../setup/supabase";

const getStories = async (limit: number) => {
  const { data, error } = await supabase
    .from("Story")
    .select(
      `id, title, description, gender, duration, free, difficulty, created_at, language, thumbnail`,
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
  currentCreatedAtLastItem?: string | null,
) => {
  const query = supabase
    .from("Story")
    .select(
      `id, title, description, gender, duration, free, difficulty, created_at, language, thumbnail`,
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

const TWO_HOURS_IN_SECONDS = 7200;

const getStoryDetails = async (id: string) => {
  const { data: details, error: detailsError } = await supabase
    .from("Story")
    .select()
    .eq("id", id)
    .single();

  if (detailsError) {
    throw new Error(detailsError.message);
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("story audios")
    .createSignedUrl(`${id}.mp3`, TWO_HOURS_IN_SECONDS);

  if (signedUrlError) {
    throw new Error(`Erro ao obter URL do áudio: ${signedUrlError.message}`);
  }

  const output = { ...details, audio: signedUrlData.signedUrl };
  return output;
};

const getLearnedWordsByStory = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("story_learned_words")
      .select(
        `
        chapter_review_id,
        LearnedWords:learned_word_id (
          id,
          word,
          language,
          word_category,
          translated_word,
          translated_language,
          created_at,
          updated_at
        )
      `,
      )
      .eq("story_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    const learnedWords =
      data?.map((item) => ({
        ...item.LearnedWords,
        review_id: item.chapter_review_id,
      })) || [];
    return learnedWords;
  } catch (error) {
    console.error("Error fetching learned words by story:", error);
    throw error;
  }
};

const addUserLearnedWord = async (userId: string, learnedWordIds: string[]) => {
  const records = learnedWordIds.map((wordId) => ({
    user_id: userId,
    learned_word_id: wordId,
  }));

  const { error } = await supabase.from("user_learned_words").insert(records);

  if (error) {
    if (error.code === "23505") {
      console.error("Usuário já aprendeu esta palavra");
      throw error;
    }
  }
  return;
};

const StoriesService = {
  getStories,
  getPaginatedAndFilteredStoriesOrderingByCreation,
  getStoryDetails,
  getLearnedWordsByStory,
  addUserLearnedWord,
};

export default StoriesService;
