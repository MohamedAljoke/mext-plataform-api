import Chapter from "App/Models/Chapter";
import { chapterSerializer } from "App/Serializer/ChapterSerializer";
import { redisKeys, timmerInSeconds } from "App/cache/redis/redisConstants";
import {
  parseCachedData,
  removeCache,
  stringifyCacheData,
} from "App/cache/redis/redisUtils";

export default class ChapterServices {
  constructor() {}
  public async fetchAllChaptersService(): Promise<Chapter[]> {
    const cachedChapters = await parseCachedData({
      key: redisKeys.CHPATERS_LIST,
    });
    if (cachedChapters) {
      return cachedChapters;
    }
    const chapters = await Chapter.query().preload("lectuers");
    await stringifyCacheData({
      data: chapters,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.CHPATERS_LIST(),
    });
    return chapters;
  }
  public async fetchChaptersService(subjectId: number): Promise<Chapter[]> {
    const cachedChapterBySubjectId = await parseCachedData({
      key: redisKeys.CHAPTER_BY_SUBJECT_ID,
      id: subjectId.toString(),
    });
    if (cachedChapterBySubjectId) {
      return cachedChapterBySubjectId;
    }
    const chapters = await Chapter.query()
      .where({ subjectId })
      .preload("lectuers");
    await stringifyCacheData({
      data: chapters,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.CHAPTER_BY_SUBJECT_ID(subjectId.toString()),
    });
    return chapters;
  }
  public async getChapterService(id: number) {
    const cachedChapterById = await parseCachedData({
      key: redisKeys.CHAPTER_BY_ID,
      id: id.toString(),
    });
    if (cachedChapterById) {
      return cachedChapterById;
    }
    const chapters = await Chapter.query().where({ id }).preload("lectuers");
    const chapter = chapters[0];
    await stringifyCacheData({
      data: chapter,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.CHAPTER_BY_ID(id.toString()),
    });
    return chapter;
  }
  public async deleteChapterService(id: number) {
    const chapter = await Chapter.findOrFail(id);
    const data = await chapter.delete();
    await removeCache({
      keys: [
        redisKeys.CHPATERS_LIST(),
        redisKeys.CHAPTER_BY_ID(id.toString()),
        redisKeys.CHAPTER_BY_SUBJECT_ID(chapter.subjectId.toString()),
      ],
      hardClean: true,
    });
    return data;
  }
  public async updateChapterService({
    id,
    chapterName,
  }: {
    id: number;
    chapterName: string;
  }) {
    const chapter = await Chapter.findOrFail(id);
    const updatedChapter = await chapter.merge({ ...{ chapterName } }).save();
    await removeCache({
      keys: [
        redisKeys.CHPATERS_LIST(),
        redisKeys.CHAPTER_BY_ID(id.toString()),
        redisKeys.CHAPTER_BY_SUBJECT_ID(chapter.subjectId.toString()),
      ],
    });
    const serialized = updatedChapter.serialize(chapterSerializer);
    return serialized;
  }
  public async createChapterService({
    subjectId,
    chapterName,
  }: {
    subjectId: number;
    chapterName: string;
  }): Promise<Chapter> {
    const created = await Chapter.create({ chapterName, subjectId });
    await removeCache({
      keys: [
        redisKeys.CHPATERS_LIST(),
        redisKeys.CHAPTER_BY_SUBJECT_ID(subjectId.toString()),
      ],
    });
    return created;
  }
}
