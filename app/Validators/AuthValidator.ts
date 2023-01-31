import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseValidator } from "./BaseValidator";

export class CreateUserValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(2),
      rules.maxLength(150),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.normalizeEmail({ allLowercase: true, gmailRemoveDots: false }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(50),
      rules.confirmed("password_confirmation"),
    ]),
  });
}
export class LoginUserValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super(ctx);
  }
  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.normalizeEmail({ allLowercase: true, gmailRemoveDots: false }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(50),
    ]),
  });
}
