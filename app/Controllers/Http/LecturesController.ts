import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import { CreateLectureValidator } from "App/Validators/LectureValidator";
import LecturesServices from "App/Services/LectureService";
import {
  createdResponse,
  serverErrorResponse,
  successResponse,
} from "App/utils/http-response";
import Lecture from "App/Models/Lecture";

@inject()
export default class LecturesController {
  constructor(private lecturesServices: LecturesServices) {}

  public async createLecture({ response, request }: HttpContextContract) {
    const { videoId, lectureName, pdfId } = await request.validate(
      CreateLectureValidator
    );
    try {
      const createdSubject = await this.lecturesServices.createLectureService({
        lecture: { videoId, lectureName },
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
}
