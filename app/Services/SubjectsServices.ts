import Subject from "App/Models/Subject";
import { subjectSerializer } from "App/Serializer/SubjectsSerializer";

export default class SubjectsServices {
  constructor() {}
  public async fetchSubjectsService(): Promise<Subject[]> {
    const subjects = await Subject.query().preload("chapters");
    return subjects;
  }
  public async getSubjectService(id: number) {
    const subject = await Subject.find(id);
    await subject?.load("chapters");
    if (subject?.chapters) {
      await Promise.all(
        subject?.chapters.map((chapter) => chapter.load("lectuers"))
      );
    }

    return subject;
  }
  public async deleteSubjectService(id: number) {
    const data = await Subject.query().where({ id }).delete();
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
    const serialized = updatedSubject.serialize(subjectSerializer);
    return serialized;
  }
  public async createSubjectService(subject: string): Promise<Subject> {
    return await Subject.create({ subjectName: subject });
  }
}
