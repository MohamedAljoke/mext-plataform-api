import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TypesServices from "App/Services/TypeServices";
import TypeValidator from "App/Validators/TypeValidator";
import {
  createdResponse,
  serverErrorResponse,
  successResponse,
  updatedResponse,
} from "App/utils/http-response";
import { inject } from "@adonisjs/fold";

@inject()
export default class TypesController {
  constructor(private typesServices: TypesServices) {}

  public async fetchAllTypesList({ response }: HttpContextContract) {
    try {
      const types = await this.typesServices.fetchTypesService();
      return createdResponse(response, types);
    } catch (error) {
      console.log("register pdf error", error);
      return serverErrorResponse(response);
    }
  }

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

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      await this.typesServices.deleteTypeService(id);

      return successResponse(response, {});
    } catch (error) {
      console.log("delete type error", error);
      return serverErrorResponse(response);
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { typeName } = await request.validate(TypeValidator);
    try {
      const updatedType = await this.typesServices.updateTypeService({
        id,
        typeName: typeName,
      });
      return updatedResponse(response, updatedType);
    } catch (error) {
      console.log("update type error", error);
      return serverErrorResponse(response);
    }
  }
}
