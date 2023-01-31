import { schema } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";

export default class ChapterValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    subjectId: schema.number(),
    chapterName: schema.string(),
  });
}
