import Chapter from "App/Models/Chapter";

export default class ChapterServices {
  constructor() {}
  public async fetchSubjectsService(): Promise<Chapter[]> {
    return await Chapter.query();
  }
  public async getChapterService(id: number) {
    return await Chapter.find(id);
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
    return updatedChapter;
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
