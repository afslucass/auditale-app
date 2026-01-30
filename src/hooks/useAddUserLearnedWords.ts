import { useState } from "react";
import StoriesService from "../infra/services/stories";
import { useAuthContext } from "../contexts/auth";

type useAddUserLearnedWordssReturnType = [
  (learnedWordId: string[]) => Promise<void>,
  { error: boolean; loading: boolean },
];

const useAddUserLearnedWords = (): useAddUserLearnedWordssReturnType => {
  const { profile } = useAuthContext();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetch = async (learnedWordIds: string[]) => {
    try {
      setLoading(true);
      if (profile) {
        await StoriesService.addUserLearnedWord(profile.id, learnedWordIds);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return [fetch, { error, loading }];
};

export default useAddUserLearnedWords;
