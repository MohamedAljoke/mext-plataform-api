import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import { createdResponse, serverErrorResponse } from "App/utils/http-response";
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
}
