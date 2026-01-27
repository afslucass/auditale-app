// hooks/useGetStories.ts
import { useState, useCallback, useRef } from "react";
import StoriesService from "../infra/services/stories";
import { Difficulty, Gender, StoryWithoutContent } from "../types/story";

type UseGetStoriesOptions = {
  initialPageSize?: number;
  initialFilters?: {
    title?: string | null;
    gender?: Gender | null;
    difficulty?: Difficulty | null;
  };
};

export type UseGetStoriesReturn = {
  fetchStories: () => void;
  stories: StoryWithoutContent[];
  loading: boolean;
  error: boolean;
  loadingMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  applyFilters: (filters: {
    title?: string | null;
    gender?: Gender | null;
    difficulty?: Difficulty | null;
  }) => Promise<void>;
  hasMore: boolean;
  totalLoaded: number;
};

const useGetStories = (
  options: UseGetStoriesOptions = {},
): UseGetStoriesReturn => {
  const { initialPageSize = 10, initialFilters = {} } = options;

  const [stories, setStories] = useState<StoryWithoutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageSize = useRef(initialPageSize);
  const cursor = useRef<string | null>(null);
  const currentFilters = useRef(initialFilters);
  const isInitialLoad = useRef(true);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || loading) return;

    setLoadingMore(true);

    try {
      const data =
        await StoriesService.getPaginatedAndFilteredStoriesOrderingByCreation(
          pageSize.current,
          currentFilters.current.title,
          currentFilters.current.gender,
          currentFilters.current.difficulty,
          cursor.current,
        );

      if (!data || data.length === 0) {
        setHasMore(false);
        return;
      }

      if (data.length > 0) {
        cursor.current = data[data.length - 1].created_at;
      }

      if (data.length < pageSize.current) {
        setHasMore(false);
      }

      setStories((prev) => [...prev, ...data]);
    } catch (err) {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  }, [loading, loadingMore, hasMore]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(false);

    cursor.current = null;
    setHasMore(true);
    setStories([]);

    try {
      const data =
        await StoriesService.getPaginatedAndFilteredStoriesOrderingByCreation(
          pageSize.current,
          currentFilters.current.title,
          currentFilters.current.gender,
          currentFilters.current.difficulty,
          null,
        );

      if (data && data.length > 0) {
        cursor.current = data[data.length - 1].created_at;
        setHasMore(data.length >= pageSize.current);
        setStories(data);
      } else {
        setHasMore(false);
        setStories([]);
      }
    } catch (err) {
      console.error("Erro ao refresh:", err);
      setError(true);
      setStories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback(
    async (filters: {
      title?: string | null;
      gender?: Gender | null;
      difficulty?: Difficulty | null;
    }) => {
      currentFilters.current = { ...currentFilters.current, ...filters };
      await refresh();
    },
    [refresh],
  );

  const fetchStories = useCallback(async () => {
    if (!isInitialLoad.current) return;

    isInitialLoad.current = false;
    await refresh();
  }, [refresh]);

  return {
    fetchStories,
    stories,
    loading,
    error,
    loadingMore,
    loadMore,
    refresh,
    applyFilters,
    hasMore,
    totalLoaded: stories.length,
  };
};

export default useGetStories;
