import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import {
  CreateLectureValidator,
  LectureUpdateValidator,
} from "App/Validators/LectureValidator";
import LecturesServices from "App/Services/LectureService";
import {
  badRequestResponse,
  createdResponse,
  serverErrorResponse,
  successResponse,
  updatedResponse,
} from "App/utils/http-response";
import Lecture from "App/Models/Lecture";

@inject()
export default class LecturesController {
  constructor(private lecturesServices: LecturesServices) {}

  public async createLecture({ response, request }: HttpContextContract) {
    const { videoId, lectureName, pdfId, chapterId } = await request.validate(
      CreateLectureValidator
    );
    try {
      const createdSubject = await this.lecturesServices.createLectureService({
        lecture: { videoId, lectureName, chapterId },
        pdfId,
      });
      return createdResponse(response, createdSubject);
    } catch (error) {
      console.log("create lecture error", error);
      return serverErrorResponse(response);
    }
  }
  public async fetchLectuers({ response }: HttpContextContract) {
    try {
      const lectuers = await this.lecturesServices.fetchLectuerService();
      return successResponse<Lecture[]>(response, lectuers);
    } catch (error) {
      console.log("fetch lectuers error", error);
      return serverErrorResponse(response);
    }
  }
  public async getLectuer({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      const lectuer = await this.lecturesServices.getLectuerService(id);
      if (!lectuer) {
        return badRequestResponse(response, "lectuer not found");
      }
      return successResponse(response, lectuer);
    } catch (error) {
      console.log("get lectuer error", error);
      return serverErrorResponse(response);
    }
  }
  public async fetchChapterLectuers({
    request,
    response,
  }: HttpContextContract) {
    const { chapterId } = request.params();
    try {
      const chapters = await this.lecturesServices.fetchChapterLectuersService(
        chapterId
      );
      return successResponse<Lecture[]>(response, chapters);
    } catch (error) {
      console.log("fetch chapter lectuers error", error);
      return serverErrorResponse(response);
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      await this.lecturesServices.deleteLectureService(id);

      return successResponse(response, {});
    } catch (error) {
      console.log("delete lecture error", error);
      return serverErrorResponse(response);
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { lectureName } = await request.validate(LectureUpdateValidator);
    try {
      const updatedLecture = await this.lecturesServices.updateLectureService({
        id,
        lectureName,
      });
      return updatedResponse(response, updatedLecture);
    } catch (error) {
      console.log("update subject error", error);
      return serverErrorResponse(response);
    }
  }
}
