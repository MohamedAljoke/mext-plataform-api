import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import QuestionServices from "App/Services/QuestionServices";
import QuestionValidator from "App/Validators/QuestionValidator";
import { createdResponse, serverErrorResponse } from "App/utils/http-response";

@inject()
export default class QuestionsController {
  constructor(private questionServices: QuestionServices) {}

  public async fetchAllQuestions({ response }: HttpContextContract) {
    try {
      const questions = await this.questionServices.fetchAllQuestionsService();
      return createdResponse(response, questions);
    } catch (error) {
      console.log("fetch question error", error);
      return serverErrorResponse(response);
    }
  }
  public async addQuestion({ response, request }: HttpContextContract) {
    const { lectureId, questionText, alternatives, typesId } =
      await request.validate(QuestionValidator);
    try {
      const createdQuestion = await this.questionServices.createQuestionService(
        {
          question: { questionText },
          lectureId,
          alternatives,
          typesId,
        }
      );
      return createdResponse(response, createdQuestion);
    } catch (error) {
      console.log("add question error", error);
      return serverErrorResponse(response);
    }
  }
}
