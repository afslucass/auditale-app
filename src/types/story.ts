import { Language } from "./global";

export enum Gender {
  ROMANCE = "ROMANCE",
  SCI_FI = "SCI_FI",
  MYSTERIUM = "MYSTERIUM",
}

export enum WordCategory {
  NOUN = "NOUN",
  VERB = "VERB",
  ADJECTIVE = "ADJECTIVE",
  ADVERB = "ADVERB",
  INTERJECTION = "INTERJECTION",
  PHRASAL_VERB = "PHRASAL_VERB",
}

export enum Difficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum CaptionType {
  CAPTION = "CAPTION",
  REVIEW = "REVIEW",
}

export type Story = {
  id: string;
  title: string;
  description: string;
  duration: string;
  language: Language;
  difficulty: Difficulty;
  created_at: string;
  gender: Gender;
  free: boolean;
  content: Caption[];
};

export type StoryWithoutContent = Omit<Story, "content">;

export type TranslatedText = {
  language: Language;
  text: string;
};

export type Caption = {
  id: string;
  text?: string;
  translate?: TranslatedText[];
  time: string;
  type: CaptionType;
  description: string;
};

export type LearnedWords = {
  id: string;
  word_category: WordCategory;
  word: string;
  language: Language;
  translated_word: string;
  translated_language: Language;
  review_id: string;
};

export type LastReadingStory = {
  story_id: string;
  title: string;
  description: string;
  gender: Gender;
  time_user_left: number;
  duration: number;
  created_at: string;
};
