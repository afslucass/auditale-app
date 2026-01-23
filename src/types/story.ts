import { Language } from "./global";

export enum Gender {
  ROMANCE = "ROMANCE",
  SCI_FI = "SCI_FI",
  MYSTERIUM = "MYSTERIUM",
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

export type NewWords = {
  translate: TranslatedText[];
  word: string;
};

export type Caption = {
  id: string;
  text?: string;
  translate?: TranslatedText[];
  time: string;
  type: CaptionType;
  description: string;
  newWords: NewWords[];
};
