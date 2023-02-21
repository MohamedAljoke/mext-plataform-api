import { inject } from "@adonisjs/fold";
import Database from "@ioc:Adonis/Lucid/Database";
import Alternative from "App/Models/Alternative";
import Lecture from "App/Models/Lecture";
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
    const choosenAlternatives = await Alternative.query()
      .where({ id: answerId })
      .andWhere({ questionId: questionId });
    if (choosenAlternatives.length === 0) {
      throw Error("alternative not found");
    }
    const choosenAlternative = choosenAlternatives[0];
    await UserResponse.create({
      questionId: questionId,
      alternativeId: answerId,
      userId: studentId,
      isCorrect: choosenAlternative.isCorrect,
    });
    return choosenAlternative;
  }
  public async getUserQuestionsForLectureService({
    lectureId,
    studentId,
  }: {
    lectureId: number;
    studentId?: number;
  }) {
    const lecture = await Lecture.find(lectureId);
    await lecture?.load("questions");
    if (lecture?.questions) {
      await Promise.all(
        lecture.questions.map(async (question) => {
          await question.load("alternatives");
        })
      );
    }
    const userAnsweredQuestionsWithBuffer = await Database.rawQuery(
      `
      SELECT ur.*
      FROM user_responses ur
      INNER JOIN (
        SELECT user_id, question_id, MAX(created_at) AS max_created_at
        FROM user_responses
        WHERE user_id = ${studentId}
        GROUP BY user_id, question_id
      ) max_ur ON ur.user_id = max_ur.user_id
            AND ur.question_id = max_ur.question_id
            AND ur.created_at = max_ur.max_created_at;
    `
    );
    const userAnsweredQuestions: UserResponse[] =
      userAnsweredQuestionsWithBuffer[0];
    const userQuestionsInLecture = lecture?.questions.map((lectureQuestion) => {
      const didMatch = userAnsweredQuestions.find((answeredQuestion) => {
        return answeredQuestion["question_id"] === lectureQuestion.id;
      });
      const lectureQuestionSerialized = lectureQuestion.serialize();
      if (didMatch) {
        return {
          ...lectureQuestionSerialized,
          wasCorrect: didMatch["is_correct"],
          choosenAnswerId: didMatch["alternative_id"],
        };
      } else {
        return {
          ...lectureQuestionSerialized,
          wasCorrect: null,
          choosenAnswerId: null,
        };
      }
    });
    return userQuestionsInLecture;
  }
}
