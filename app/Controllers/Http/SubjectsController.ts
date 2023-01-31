import { inject } from "@adonisjs/fold";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Subject from "App/Models/Subject";
import SubjectsServices from "App/Services/SubjectsServices";
import SubjectValidator from "App/Validators/SubjectValidator";
import {
  createdResponse,
  serverErrorResponse,
  badRequestResponse,
} from "App/utils/http-response";

//so that we can inject the service in the class
@inject()
export default class SubjectsController {
  constructor(private subjectsServices: SubjectsServices) {}
  public async fetchSubjects({ response }: HttpContextContract) {
    try {
      const subjects = await this.subjectsServices.fetchSubjectsService();
      return createdResponse<Subject[]>(response, subjects);
    } catch (error) {
      console.log("fetch subjects error", error);
      return serverErrorResponse(response);
    }
  }
  public async getSubject({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      const subject = await this.subjectsServices.getSubjectService(id);
      if (!subject) {
        return badRequestResponse(response, "Subject not found");
      }
      return createdResponse<Subject | null>(response, subject);
    } catch (error) {
      console.log("fetch subjects error", error);
      return serverErrorResponse(response);
    }
  }
  public async create({ request, response }: HttpContextContract) {
    const { subjectName } = await request.validate(SubjectValidator);
    try {
      const subject = await this.subjectsServices.createSubjectService(
        subjectName
      );
      return createdResponse<Subject>(response, subject);
    } catch (error) {
      console.log("create subject error", error);
      return serverErrorResponse(response);
    }
  }
}
