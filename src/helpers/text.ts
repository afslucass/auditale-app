export const get20FirstWords = (text: string): string => {
  const clean = text.replace(/\s+/g, " ").trim();
  const words = clean.split(" ");
  if (words.length <= 20) {
    return clean;
  }

  const wordsFiltered = words.slice(0, 20);
  return wordsFiltered.join(" ") + "...";
};
