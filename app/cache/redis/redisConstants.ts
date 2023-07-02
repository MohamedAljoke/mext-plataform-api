export type RedisKeys = {
  //subject
  SUBJECTS_LIST: () => string;
  SUBJECT_BY_ID: (id: string) => string;
  //chapter
  CHPATERS_LIST: () => string;
  CHAPTER_BY_ID: (id: string) => string;
  CHAPTER_BY_SUBJECT_ID: (id: string) => string;
  //lecture
  LECTURES_LIST: () => string;
  LECTURE_BY_ID: (id: string) => string;
  LECTURE_BY_CHAPTER_ID: (id: string) => string;
  //users
  USERS_LIST: () => string;
  //pdf
  PDF_LIST: () => string;
  //types
  TYPE_LIST: () => string;
  //videos
  VIDEO_LIST: () => string;
};

export const redisKeys: RedisKeys = {
  //subject
  SUBJECTS_LIST: () => "SUBJECTS_LIST",
  SUBJECT_BY_ID: (id: string) => `${id}_SUBJECT`,
  //chapters
  CHPATERS_LIST: () => "CHAPTERS_LIST",
  CHAPTER_BY_ID: (id: string) => `${id}_CHAPTER`,
  CHAPTER_BY_SUBJECT_ID: (id: string) => `${id}_CHAPTER_BY_SUBJECT`,
  //lecture
  LECTURES_LIST: () => "LECTURES_LIST",
  LECTURE_BY_ID: (id: string) => `${id}_LECTURE`,
  LECTURE_BY_CHAPTER_ID: (id: string) => `${id}_LECTURE_BY_CHAPTER`,
  USERS_LIST: () => "USERS_LIST",
  PDF_LIST: () => "PDF_LIST",
  TYPE_LIST: () => "TYPE_LIST",
  VIDEO_LIST: () => "VIDEO_LIST",
};
export const timmerInSeconds: Record<string, number> = {
  ONE_HOUR: 3600,
  ONE_DAY: 86400,
  ONE_WEEK: 604800,
};
