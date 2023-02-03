import { schema } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";

export default class PdfValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    pdfName: schema.string(),
    pdfUrl: schema.string(),
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
