import { schema } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";

export class CreateLectureValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    videoId: schema.number(),
    lectureName: schema.string(),
  });
}
