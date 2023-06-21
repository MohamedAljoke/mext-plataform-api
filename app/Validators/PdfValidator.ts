import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";
import Type from "App/Models/Type";
import Lecture from "App/Models/Lecture";

export default class PdfValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    lectureId: schema.number.optional([
      rules.exists({ table: Lecture.table, column: "id" }),
    ]),
    pdfName: schema.string(),
    pdfUrl: schema.string(),
    typesId: schema.array
      .optional()
      .members(
        schema.number([rules.exists({ table: Type.table, column: "id" })])
      ),
  });
}
export class PdfUpdateValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    pdfName: schema.string.optional(),
    pdfUrl: schema.string.optional(),
  });
}
