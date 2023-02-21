import Lecture from "App/Models/Lecture";
import Pdf from "App/Models/Pdf";

export default class LecturesServices {
  constructor() {}

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
