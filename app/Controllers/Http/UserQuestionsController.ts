import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import {
  createdResponse,
  serverErrorResponse,
  successResponse,
} from "App/utils/http-response";
import UserQuestionValidator from "App/Validators/UserQuestionValidator";
import UserQuestionServices from "App/Services/UserQuestionsServices";

@inject()
export default class UserQuestionsController {
  constructor(private userQuestionServices: UserQuestionServices) {}
  public async answerQuestion({
    response,
    request,
    auth,
  }: HttpContextContract) {
    const studentId = auth.user?.id;
    const { questionId, answerId } = await request.validate(
      UserQuestionValidator
    );
    try {
      const createdQuestion = await this.userQuestionServices.answerQuestion({
        questionId,
        answerId,
        studentId,
      });
      return createdResponse(response, createdQuestion);
    } catch (error) {
      console.log("answer question error", error);
      return serverErrorResponse(response);
    }
  }
  public async getLectureQuestionsForUser({
    response,
    request,
    auth,
  }: HttpContextContract) {
    const { lectureId } = request.params();
    const studentId = auth.user?.id;
    try {
      const userQuestions =
        await this.userQuestionServices.getUserQuestionsForLectureService({
          studentId,
          lectureId,
        });
      return successResponse(response, userQuestions);
    } catch (error) {
      console.log("get questions error", error);
      return serverErrorResponse(response);
    }
  }
}
