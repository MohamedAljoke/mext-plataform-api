import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import {
  badRequestResponse,
  createdResponse,
  serverErrorResponse,
  successResponse,
  updatedResponse,
} from "App/utils/http-response";
import PdfsServices from "App/Services/PdfServices";
import PdfValidator, { PdfUpdateValidator } from "App/Validators/PdfValidator";

@inject()
export default class PdfsController {
  constructor(private pdfsServices: PdfsServices) {}

  public async registerPdf({ response, request }: HttpContextContract) {
    const { pdfName, pdfUrl, typesId } = await request.validate(PdfValidator);
    try {
      const createdSubject = await this.pdfsServices.savePdfService({
        pdf: { pdfName, pdfUrl },
        typesId,
      });
      return createdResponse(response, createdSubject);
    } catch (error) {
      console.log("register pdf error", error);
      return serverErrorResponse(response);
    }
  }
  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    try {
      const numberOfPdfs = await this.pdfsServices.deletePdfService(id);
      if (numberOfPdfs[0] === 0) {
        return badRequestResponse(response, "Pdf not found");
      }
      return successResponse<number>(response, numberOfPdfs[0]);
    } catch (error) {
      console.log("delete pdf error", error);
      return serverErrorResponse(response);
    }
  }
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { pdfName, pdfUrl } = await request.validate(PdfUpdateValidator);
    try {
      const updatedPdf = await this.pdfsServices.updatePdfService({
        id,
        pdfUrl,
        pdfName,
      });
      return updatedResponse(response, updatedPdf);
    } catch (error) {
      console.log("update pdf error", error);
      return serverErrorResponse(response);
    }
  }
}
