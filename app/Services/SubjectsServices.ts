import Subject from "App/Models/Subject";

export default class SubjectsServices {
  constructor() {}
  public async fetchSubjectsService(): Promise<Subject[]> {
    const subjects = await Subject.query();
    await Promise.all(subjects.map((subject) => subject.load("chapters")));
    return subjects;
  }
  public async getSubjectService(id: number) {
    return await Subject.find(id);
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
    return updatedSubject;
  }
  public async createSubjectService(subject: string): Promise<Subject> {
    return await Subject.create({ subjectName: subject });
  }
}
