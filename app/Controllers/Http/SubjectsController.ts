import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SubjectValidator from "App/Validators/SubjectValidator";
import { createdResponse } from "App/utils/http-response";

export default class SubjectsController {
  public async create({ request, response }: HttpContextContract) {
    const { subjectName } = await request.validate(SubjectValidator);
    return createdResponse<string>(response, subjectName);
  }
}
