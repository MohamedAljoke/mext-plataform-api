import Subject from "App/Models/Subject";

export default class SubjectsServices {
  constructor() {}
  public async fetchSubjectsService(): Promise<Subject[]> {
    return await Subject.query();
  }
  public async createSubjectService(subject: string): Promise<Subject> {
    return await Subject.create({ subjectName: subject });
  }
}
