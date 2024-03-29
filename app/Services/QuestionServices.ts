import Lecture from "App/Models/Lecture";
import Question from "App/Models/Question";
import { inject } from "@adonisjs/fold";
import AlternativasServices from "./AlternativasServices";
import Alternative from "App/Models/Alternative";
import Type from "App/Models/Type";

@inject()
export default class QuestionServices {
  constructor(private alternativasServices: AlternativasServices) {}
  public async getQuestionService(id: number) {
    const question = await Question.query()
      .where({ id })
      .preload("alternatives")
      .preload("lectuers")
      .preload("types");
    return question[0];
  }
  public async fetchAllQuestionsService() {
    const questions = await Question.query();
    return questions;
  }
  public async createQuestionService({
    question,
    lectureId,
    alternatives,
    typesId,
  }: {
    question: Partial<Question>;
    lectureId?: number[];
    typesId?: number[];
    alternatives: Partial<Alternative>[];
  }) {
    const addedQuestion = await Question.create(question);
    if (lectureId?.length) {
      const lectrue = await Lecture.query().whereIn("id", lectureId);
      await addedQuestion
        .related("lectuers")
        .attach(lectrue.map((lectrue) => lectrue.id));
      await addedQuestion.load("lectuers");
    }
    //add alternatives
    await Promise.all(
      alternatives.map(async (alternative) => {
        await this.alternativasServices.createAlternativeService({
          ...alternative,
          questionId: addedQuestion.id,
        });
      })
    );
    //add types
    if (typesId !== undefined) {
      const type = await Type.query().whereIn("id", typesId);
      await addedQuestion.related("types").attach(type.map((typ) => typ.id));
      await addedQuestion.load("types");
    }
    await addedQuestion.load("alternatives");
    return addedQuestion;
  }
  public async deleteQuestionService(id: number) {
    const data = await Question.query().where({ id }).delete();
    return data;
  }
}
