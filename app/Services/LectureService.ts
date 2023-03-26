import Lecture from "App/Models/Lecture";
import Pdf from "App/Models/Pdf";
import { lectureSerializer } from "App/Serializer/LectureSerializer";

export default class LecturesServices {
  constructor() {}

  public async updateLectureService({
    id,
    lectureName,
  }: {
    id: number;
    lectureName: string;
  }) {
    const lecture = await Lecture.findOrFail(id);
    const updatedLecture = await lecture.merge({ ...{ lectureName } }).save();
    const serialized = updatedLecture.serialize(lectureSerializer);
    return serialized;
  }

  public async deleteLectureService(id: number) {
    const data = await Lecture.query().where({ id }).delete();
    return data;
  }

  public async fetchChapterLectuersService(
    chapterId: number
  ): Promise<Lecture[]> {
    const lectuers = await Lecture.query().where({ chapterId });

    return lectuers;
  }
  public async fetchLectuerService() {
    const lectuers = await Lecture.query();

    return lectuers;
  }

  public async getLectuerService(id: number) {
    const lectuers = await Lecture.query()
      .where({ id })
      .preload("pdfs")
      .preload("video");
    const lectuer = lectuers[0];
    return lectuer;
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
    return lectuers;
  }
}
