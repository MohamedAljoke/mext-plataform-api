import Question from "App/Models/Question";

export default class QuestionServices {
  constructor() {}
  public async createQuestionService({
    question,
    lectureId,
  }: {
    question: Partial<Question>;
    lectureId: number;
  }) {
    const addedQuestion = await Question.create(question);
    return addedQuestion;
  }
}
