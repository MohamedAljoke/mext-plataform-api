import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";
import Type from "App/Models/Type";

export default class VideoValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    videoName: schema.string(),
    videoUrl: schema.string(),
    typesId: schema.array
      .optional()
      .members(
        schema.number([rules.exists({ table: Type.table, column: "id" })])
      ),
  });
}
export class VideoUpdateValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    videoName: schema.string.optional(),
    videoUrl: schema.string.optional(),
  });
}
