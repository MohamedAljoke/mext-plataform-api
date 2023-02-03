import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import {
  badRequestResponse,
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
      const numberOfVideos = await this.videsServices.deleteVideoService(id);
      if (numberOfVideos[0] === 0) {
        return badRequestResponse(response, "video not found");
      }
      return successResponse<number>(response, numberOfVideos[0]);
    } catch (error) {
      console.log("delete video error", error);
      return serverErrorResponse(response);
    }
  }
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { videoName, videoUrl } = await request.validate(
      VideoUpdateValidator
    );
    try {
      const updatedPdf = await this.videsServices.updateVideoService({
        id,
        videoName,
        videoUrl,
      });
      return updatedResponse(response, updatedPdf);
    } catch (error) {
      console.log("update video error", error);
      return serverErrorResponse(response);
    }
  }
}
