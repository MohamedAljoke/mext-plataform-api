import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";
import Lecture from "App/Models/Lecture";

export default class QuestionValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    lectureId: schema
      .array()
      .members(
        schema.number([rules.exists({ table: Lecture.table, column: "id" })])
      ),
    questionText: schema.string(),
    alternatives: schema.array().members(
      schema.object().members({
        alternativeText: schema.string(),
        isCorrect: schema.boolean(),
      })
    ),
  });
}
