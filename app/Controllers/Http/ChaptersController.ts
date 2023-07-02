import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import {
  badRequestResponse,
  createdResponse,
  serverErrorResponse,
  successResponse,
  updatedResponse,
} from "App/utils/http-response";
import {
  ChapterUpdateValidator,
  ChapterValidator,
} from "App/Validators/ChapterValidator";
import ChapterServices from "App/Services/ChapterServices";
import Chapter from "App/Models/Chapter";

@inject()
export default class ChaptersController {
  constructor(private chapterServices: ChapterServices) {}
  public async fetchAllChapters({ response }: HttpContextContract) {
    try {
      const chapters = await this.chapterServices.fetchAllChaptersService();
      return successResponse<Chapter[]>(response, chapters);
    } catch (error) {
      console.log("fetch all chapters error", error);
      return serverErrorResponse(response);
    }
  }
  public async fetchChapters({ request, response }: HttpContextContract) {
    const { subjectId } = request.params();
    try {
      const chapters = await this.chapterServices.fetchChaptersService(
        subjectId
      );
      return successResponse<Chapter[]>(response, chapters);
    } catch (error) {
      console.log("fetch chapters error", error);
      return serverErrorResponse(response);
    }
  }
  public async getChapter({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      const chapter = await this.chapterServices.getChapterService(id);
      if (!chapter) {
        return badRequestResponse(response, "chapter not found");
      }
      return successResponse(response, chapter);
    } catch (error) {
      console.log("get chapter error", error);
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
  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      const numberOfChapters = await this.chapterServices.deleteChapterService(
        id
      );

      return successResponse(response, {});
    } catch (error) {
      console.log("delete chapter error", error);
      return serverErrorResponse(response);
    }
  }
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { chapterName } = await request.validate(ChapterUpdateValidator);
    try {
      const updatedSubject = await this.chapterServices.updateChapterService({
        id,
        chapterName: chapterName,
      });
      return updatedResponse(response, updatedSubject);
    } catch (error) {
      console.log("update subject error", error);
      return serverErrorResponse(response);
    }
  }
}
