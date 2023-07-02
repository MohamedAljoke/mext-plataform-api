import Lecture from "App/Models/Lecture";
import Pdf from "App/Models/Pdf";
import { lectureSerializer } from "App/Serializer/LectureSerializer";
import { redisKeys, timmerInSeconds } from "App/cache/redis/redisConstants";
import {
  parseCachedData,
  removeCache,
  stringifyCacheData,
} from "App/cache/redis/redisUtils";

export default class LecturesServices {
  constructor() {}

  public async fetchLectuerService() {
    const cachedLectures = await parseCachedData({
      key: redisKeys.LECTURES_LIST,
    });
    if (cachedLectures) {
      return cachedLectures;
    }
    const lectuers = await Lecture.query();
    await stringifyCacheData({
      data: lectuers,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.LECTURES_LIST,
    });
    return lectuers;
  }

  public async fetchChapterLectuersService(
    chapterId: number
  ): Promise<Lecture[]> {
    const cachedLectureByChapterId = await parseCachedData({
      key: redisKeys.LECTURE_BY_CHAPTER_ID,
      id: chapterId.toString(),
    });
    if (cachedLectureByChapterId) {
      return cachedLectureByChapterId;
    }
    const lectuers = await Lecture.query().where({ chapterId });
    await stringifyCacheData({
      data: lectuers,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.CHAPTER_BY_SUBJECT_ID,
      id: chapterId.toString(),
    });
    return lectuers;
  }

  public async getLectuerService(id: number) {
    const cachedLectureById = await parseCachedData({
      key: redisKeys.LECTURE_BY_ID,
      id: id.toString(),
    });
    if (cachedLectureById) {
      return cachedLectureById;
    }
    const lectuers = await Lecture.query()
      .where({ id })
      .preload("pdfs")
      .preload("video")
      .preload("questions");
    const lecture = lectuers[0];
    if (lecture?.questions) {
      await Promise.all(
        lecture?.questions.map((question) => {
          question.load("alternatives");
          question.load("types");
        })
      );
    }
    if (lecture?.video) {
      await lecture.video.load("types");
    }
    if (lecture.pdfs) {
      await Promise.all(
        lecture.pdfs.map((pdf) => {
          pdf.load("types");
        })
      );
    }
    await stringifyCacheData({
      data: lecture,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.CHAPTER_BY_ID,
      id: id.toString(),
    });
    return lecture;
  }

  public async updateLectureService({
    id,
    lectureName,
  }: {
    id: number;
    lectureName: string;
  }) {
    const lecture = await Lecture.findOrFail(id);
    const updatedLecture = await lecture.merge({ ...{ lectureName } }).save();
    await removeCache({
      keys: [
        redisKeys.LECTURES_LIST(),
        redisKeys.LECTURE_BY_ID(id.toString()),
        redisKeys.LECTURE_BY_CHAPTER_ID(lecture.chapterId.toString()),
      ],
    });
    const serialized = updatedLecture.serialize(lectureSerializer);
    return serialized;
  }

  public async deleteLectureService(id: number) {
    const lecture = await Lecture.findOrFail(id);
    const data = await lecture.delete();
    await removeCache({
      keys: [
        redisKeys.LECTURES_LIST(),
        redisKeys.LECTURE_BY_ID(id.toString()),
        redisKeys.LECTURE_BY_CHAPTER_ID(lecture.chapterId.toString()),
      ],
    });
    return data;
  }
  public async createLectureService({
    lecture,
    pdfId,
  }: {
    pdfId: number[] | undefined;
    lecture: Partial<Lecture>;
  }) {
    const lectuers = await Lecture.create({ ...lecture });
    if (pdfId !== undefined) {
      const pdfs = await Pdf.query().whereIn("id", pdfId);
      await lectuers.related("pdfs").attach(pdfs.map((role) => role.id));
      await lectuers.load("pdfs");
    }
    await removeCache({
      keys: [redisKeys.LECTURES_LIST()],
    });
    return lectuers;
  }
}
