import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import QuestionServices from "App/Services/QuestionServices";
import QuestionValidator from "App/Validators/QuestionValidator";
import {
  badRequestResponse,
  createdResponse,
  serverErrorResponse,
  successResponse,
} from "App/utils/http-response";
import Question from "App/Models/Question";

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
  public async getQuestion({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      const question = await this.questionServices.getQuestionService(id);
      if (!question) {
        return badRequestResponse(response, "question not found");
      }
      return successResponse<Question | null>(response, question);
    } catch (error) {
      console.log("get question error", error);
      return serverErrorResponse(response);
    }
  }
}
