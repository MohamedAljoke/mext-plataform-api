import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";
import Pdf from "App/Models/Pdf";
import Video from "App/Models/Video";
import Chapter from "App/Models/Chapter";

export class CreateLectureValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    chapterId: schema.number([
      rules.exists({ table: Chapter.table, column: "id" }),
    ]),
    videoId: schema.number.optional([
      rules.exists({ table: Video.table, column: "id" }),
    ]),
    lectureName: schema.string(),
    pdfId: schema.array
      .optional()
      .members(
        schema.number([rules.exists({ table: Pdf.table, column: "id" })])
      ),
  });
}
