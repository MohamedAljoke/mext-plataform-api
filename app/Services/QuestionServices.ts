import Lecture from "App/Models/Lecture";
import Question from "App/Models/Question";
import { inject } from "@adonisjs/fold";
import AlternativasServices from "./AlternativasServices";
import Alternative from "App/Models/Alternative";

@inject()
export default class QuestionServices {
  constructor(private alternativasServices: AlternativasServices) {}
  public async createQuestionService({
    question,
    lectureId,
    alternatives,
  }: {
    question: Partial<Question>;
    lectureId: number[];
    alternatives: Partial<Alternative>[];
  }) {
    const addedQuestion = await Question.create(question);
    const lectrue = await Lecture.query().whereIn("id", lectureId);
    await addedQuestion
      .related("lectuers")
      .attach(lectrue.map((lectrue) => lectrue.id));
    await addedQuestion.load("lectuers");
    //add alternatives
    await Promise.all(
      alternatives.map(async (alternative) => {
        await this.alternativasServices.createAlternativeService({
          ...alternative,
          questionId: addedQuestion.id,
        });
      })
    );
    await addedQuestion.load("alternatives");
    return addedQuestion;
  }
}
