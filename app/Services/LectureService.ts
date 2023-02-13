import Lecture from "App/Models/Lecture";
import Pdf from "App/Models/Pdf";

export default class LecturesServices {
  constructor() {}

  public async fetchLectuerService() {
    const lectuers = await Lecture.query();
    await Promise.all(
      lectuers.map(async (lectuer) => {
        await lectuer.load("pdfs");
        await lectuer.load("video");
      })
    );
    return lectuers;
  }

  public async getLectuerService(id: number) {
    const lectuer = await Lecture.find(id);
    await Promise.all([lectuer?.load("video"), lectuer?.load("pdfs")]);
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
