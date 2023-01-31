import { validator } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export class BaseValidator {
  constructor(protected ctx: HttpContextContract) {}
  public messages = {
    minLength:
      "{{ field }} must be at least {{ options.minLength }} characters long",
    maxLength:
      "{{ field }} must be less then {{ options.maxLength }} characters long",
    required: "{{ field }} is required",
    unique: "{{ field }} must be unique, and this value is already taken",
  };
  public reporter = validator.reporters.api;
  public cacheKey = this.ctx.routeKey;
}
