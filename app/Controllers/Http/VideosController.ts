import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import {
  createdResponse,
  serverErrorResponse,
  successResponse,
  updatedResponse,
} from "App/utils/http-response";
import VidesServices from "App/Services/VideoServices";
import VideoValidator, {
  VideoUpdateValidator,
} from "App/Validators/VideoValidator";

@inject()
export default class VideosController {
  constructor(private videsServices: VidesServices) {}

  public async fetchVideosList({ response }: HttpContextContract) {
    try {
      const videosList = await this.videsServices.fetchVideosService();
      return createdResponse(response, videosList);
    } catch (error) {
      console.log("fetch video error", error);
      return serverErrorResponse(response);
    }
  }
  public async registerVideo({ response, request }: HttpContextContract) {
    const { videoName, videoUrl, typesId } = await request.validate(
      VideoValidator
    );
    try {
      const createdSubject = await this.videsServices.saveVideoService({
        video: { videoName, videoUrl },
        typesId,
      });
      return createdResponse(response, createdSubject);
    } catch (error) {
      console.log("register video error", error);
      return serverErrorResponse(response);
    }
  }
  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      await this.videsServices.deleteVideoService(id);

      return successResponse(response, {});
    } catch (error) {
      console.log("delete video error", error);
      return serverErrorResponse(response);
    }
  }
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { videoName, videoUrl, typesId } = await request.validate(
      VideoUpdateValidator
    );
    try {
      const updatedPdf = await this.videsServices.updateVideoService({
        id,
        videoName,
        videoUrl,
        typesId,
      });
      return updatedResponse(response, updatedPdf);
    } catch (error) {
      console.log("update video error", error);
      return serverErrorResponse(response);
    }
  }
}
