import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import { createdResponse, serverErrorResponse } from "App/utils/http-response";
import ChapterValidator from "App/Validators/ChapterValidator";
import ChapterServices from "App/Services/ChapterServices";
import Chapter from "App/Models/Chapter";

@inject()
export default class ChaptersController {
  constructor(private chapterServices: ChapterServices) {}
  public async fetchChapters({ request, response }: HttpContextContract) {
    const { subjectId } = request.params();
    try {
    } catch (error) {
      console.log("fetch chapters error", error);
      return serverErrorResponse(response);
    }
  }
  public async create({ request, response }: HttpContextContract) {
    const { subjectId, chapterName } = await request.validate(ChapterValidator);
    try {
      const createdSubject = await this.chapterServices.createChapterService({
        subjectId,
        chapterName,
      });
      return createdResponse<Chapter>(response, createdSubject);
    } catch (error) {
      console.log("create chapter error", error);
      return serverErrorResponse(response);
    }
  }
}
