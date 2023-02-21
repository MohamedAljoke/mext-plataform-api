import { inject } from "@adonisjs/fold";
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
  public async getUserQuestionsForLectureService({
    lectureId,
    studentId,
  }: {
    lectureId: number;
    studentId?: number;
  }) {
    const lecture = await Lecture.find(lectureId);
    await lecture?.load("questions");
    const userAnsweredQuestions = await UserResponse.query()
      .where({
        questionId: 2,
      })
      .andWhere({ userId: studentId });
    await Promise.all(
      userAnsweredQuestions.map(async (answered) => {
        await answered.load("alternative");
      })
    );

    const userQuestionsInLecture = lecture?.questions.map((lectureQuestion) => {
      const didMatch = userAnsweredQuestions.find((answeredQuestion) => {
        return answeredQuestion.questionId === lectureQuestion.id;
      });
      const lectureQuestionSerialized = lectureQuestion.serialize();
      if (didMatch) {
        return {
          ...lectureQuestionSerialized,
          wasCorrect: didMatch.alternative.isCorrect,
        };
      } else {
        return { ...lectureQuestionSerialized, wasCorrect: null };
      }
    });
    return userQuestionsInLecture;
  }
}
