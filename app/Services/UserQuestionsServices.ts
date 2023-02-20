import { inject } from "@adonisjs/fold";
import Alternative from "App/Models/Alternative";
import UserResponse from "App/Models/UserResponse";

@inject()
export default class UserQuestionServices {
  public async answerQuestion({
    questionId,
    answerId,
    studentId,
  }: {
    questionId: number;
    answerId: number;
    studentId?: number;
  }) {
    const choosenAlternative = await Alternative.query()
      .where({ id: answerId })
      .andWhere({ questionId: questionId });
    await UserResponse.create({
      questionId: questionId,
      alternativeId: answerId,
      userId: studentId,
    });
    return choosenAlternative;
  }
}
