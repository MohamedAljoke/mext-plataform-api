import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TypesServices from "App/Services/TypeServices";
import TypeValidator from "App/Validators/TypeValidator";
import { createdResponse, serverErrorResponse } from "App/utils/http-response";

export default class TypesController {
  constructor(private typesServices: TypesServices) {}
  public async createType({ request, response }: HttpContextContract) {
    const { typeName } = await request.validate(TypeValidator);
    try {
      const createdSubject = await this.typesServices.createTypeService({
        typeName,
      });
      return createdResponse(response, createdSubject);
    } catch (error) {
      console.log("create type error", error);
      return serverErrorResponse(response);
    }
  }
}
