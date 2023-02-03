import Lecture from "App/Models/Lecture";
import Pdf from "App/Models/Pdf";

export default class LecturesServices {
  constructor() {}
  public async createLectureService(lecture) {
    const lectuers = await Lecture.create({ ...lecture });
    const pdfs = await Pdf.query().whereIn("id", [1, 2]);
    await lectuers.related("pdfs").attach(pdfs.map((role) => role.id));
    return lectuers;
  }
}
