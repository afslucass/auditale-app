import {
  STORY_THUMBNAILS_BUCKET_BASE_URL,
  STORY_THUMBNAILS_FILE_FORMAT,
} from "../constants/web/web";

export const getStoryThumbnailImageUrl = (id: string) =>
  `${STORY_THUMBNAILS_BUCKET_BASE_URL}${id}${STORY_THUMBNAILS_FILE_FORMAT}`;
