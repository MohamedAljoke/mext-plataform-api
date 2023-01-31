import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import { createdResponse, serverErrorResponse } from "App/utils/http-response";
import ChapterValidator from "App/Validators/ChapterValidator";
import ChapterServices from "App/Services/ChapterServices";

@inject()
export default class ChaptersController {
  constructor(private chapterServices: ChapterServices) {}
  public async create({ request, response }: HttpContextContract) {
    const { subjectId, chapterName } = await request.validate(ChapterValidator);
    try {
      await this.chapterServices.createChapterService({
        subjectId,
        chapterName,
      });
      return createdResponse(response, "subject");
    } catch (error) {
      console.log("create subject error", error);
      return serverErrorResponse(response);
    }
  }
}
