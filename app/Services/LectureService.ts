import Lecture from "App/Models/Lecture";

export default class LecturesServices {
  constructor() {}
  public async createLectureService(lecture) {
    const lectuers = await Lecture.create({ ...lecture });
    return lectuers;
  }
}
