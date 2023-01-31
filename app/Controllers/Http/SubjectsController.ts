import { inject } from "@adonisjs/fold";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Subject from "App/Models/Subject";
import SubjectsServices from "App/Services/SubjectsServices";
import SubjectValidator from "App/Validators/SubjectValidator";
import {
  createdResponse,
  serverErrorResponse,
  badRequestResponse,
  successResponse,
  updatedResponse,
} from "App/utils/http-response";

//so that we can inject the service in the class
@inject()
export default class SubjectsController {
  constructor(private subjectsServices: SubjectsServices) {}
  public async fetchSubjects({ response }: HttpContextContract) {
    try {
      const subjects = await this.subjectsServices.fetchSubjectsService();
      return successResponse<Subject[]>(response, subjects);
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
      return successResponse<Subject | null>(response, subject);
    } catch (error) {
      console.log("get subject error", error);
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
  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      const numberOfSubjects = await this.subjectsServices.deleteSubjectService(
        id
      );
      if (numberOfSubjects[0] === 0) {
        return badRequestResponse(response, "Subject not found");
      }
      return successResponse<number>(response, numberOfSubjects[0]);
    } catch (error) {
      console.log("delete subject error", error);
      return serverErrorResponse(response);
    }
  }
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { subjectName } = await request.validate(SubjectValidator);
    try {
      const updatedSubject = await this.subjectsServices.updateSubjectService({
        id,
        subjectName: subjectName,
      });
      return updatedResponse(response, updatedSubject);
    } catch (error) {
      console.log("update subject error", error);
      return serverErrorResponse(response);
    }
  }
}
