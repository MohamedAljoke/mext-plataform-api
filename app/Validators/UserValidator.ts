import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";

export default class UpdateUserValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    userName: schema.string(),
    userEmail: schema.string({ trim: true }, [
      rules.email(),
      rules.normalizeEmail({ allLowercase: true, gmailRemoveDots: false }),
    ]),
  });
}
