import { inject } from "@adonisjs/fold";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Subject from "App/Models/Subject";
import SubjectsServices from "App/Services/SubjectsServices";
import SubjectValidator from "App/Validators/SubjectValidator";
import { createdResponse } from "App/utils/http-response";

//so that we can inject the service in the class
@inject()
export default class SubjectsController {
  constructor(private subjectsServices: SubjectsServices) {}
  public async create({ request, response }: HttpContextContract) {
    const { subjectName } = await request.validate(SubjectValidator);
    const subject = await this.subjectsServices.createSubjectService(
      subjectName
    );
    return createdResponse<Subject>(response, subject);
  }
}
