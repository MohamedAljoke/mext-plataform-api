import Chapter from "App/Models/Chapter";
import { chapterSerializer } from "App/Serializer/ChapterSerializer";

export default class ChapterServices {
  constructor() {}
  public async fetchChaptersService(subjectId: number): Promise<Chapter[]> {
    const chapters = await Chapter.query()
      .where({ subjectId })
      .preload("lectuers");

    return chapters;
  }
  public async getChapterService(id: number) {
    const chapters = await Chapter.query().where({ id }).preload("lectuers");
    const chapter = chapters[0];
    return chapter;
  }
  public async deleteChapterService(id: number) {
    const data = await Chapter.query().where({ id }).delete();
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
    return await Chapter.create({ chapterName, subjectId });
  }
}
