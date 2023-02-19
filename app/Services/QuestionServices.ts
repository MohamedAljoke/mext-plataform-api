import Lecture from "App/Models/Lecture";
import Question from "App/Models/Question";

export default class QuestionServices {
  constructor() {}
  public async createQuestionService({
    question,
    lectureId,
  }: {
    question: Partial<Question>;
    lectureId: number[];
  }) {
    const addedQuestion = await Question.create(question);
    const lectrue = await Lecture.query().whereIn("id", lectureId);
    await addedQuestion
      .related("lectuers")
      .attach(lectrue.map((lectrue) => lectrue.id));
    return addedQuestion;
  }
}
