import Subject from "App/Models/Subject";
import { subjectSerializer } from "App/Serializer/SubjectsSerializer";
import { redisKeys, timmerInSeconds } from "App/cache/redis/redisConstants";
import {
  parseCachedData,
  removeCache,
  stringifyCacheData,
} from "App/cache/redis/redisUtils";

export default class SubjectsServices {
  constructor() {}
  public async fetchSubjectsService(): Promise<Subject[]> {
    const cachedSubjects = await parseCachedData({
      key: redisKeys.SUBJECTS_LIST,
    });
    if (cachedSubjects) {
      return cachedSubjects;
    }
    const subjects = await Subject.query().preload("chapters");
    await stringifyCacheData({
      data: subjects,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.SUBJECTS_LIST(),
    });
    return subjects;
  }
  public async getSubjectService(id: number) {
    const cachedSubject = await parseCachedData({
      key: redisKeys.SUBJECT_BY_ID,
      id: id.toString(),
    });
    if (cachedSubject) {
      return cachedSubject;
    }
    const subject = await Subject.find(id);
    await subject?.load("chapters");
    if (subject?.chapters) {
      await Promise.all(
        subject?.chapters.map((chapter) => chapter.load("lectuers"))
      );
    }
    await stringifyCacheData({
      data: subject,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.SUBJECT_BY_ID(id.toString()),
    });
    return subject;
  }
  public async deleteSubjectService(id: number) {
    const subject = await Subject.findOrFail(id);
    const data = await subject.delete();
    await removeCache({
      keys: [
        redisKeys.SUBJECTS_LIST(),
        redisKeys.SUBJECT_BY_ID(id.toString()),
        redisKeys.CHAPTER_BY_SUBJECT_ID(id.toString()),
      ],
      hardClean: true,
    });
    return data;
  }
  public async updateSubjectService({
    id,
    subjectName,
  }: {
    id: number;
    subjectName: string;
  }) {
    const subject = await Subject.findOrFail(id);
    const updatedSubject = await subject.merge({ ...{ subjectName } }).save();
    await removeCache({
      keys: [
        redisKeys.SUBJECTS_LIST(),
        redisKeys.SUBJECT_BY_ID(id.toString()),
        redisKeys.CHAPTER_BY_SUBJECT_ID(id.toString()),
      ],
    });
    const serialized = updatedSubject.serialize(subjectSerializer);
    return serialized;
  }
  public async createSubjectService(subject: string): Promise<Subject> {
    const created = await Subject.create({ subjectName: subject });
    await removeCache({
      keys: [redisKeys.SUBJECTS_LIST()],
    });
    return created;
  }
}
