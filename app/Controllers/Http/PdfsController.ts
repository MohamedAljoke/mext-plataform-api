import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { inject } from "@adonisjs/fold";
import {
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

  public async fetchAllPdfsList({ response }: HttpContextContract) {
    try {
      const pdfs = await this.pdfsServices.fetchPdfsService();
      return createdResponse(response, pdfs);
    } catch (error) {
      console.log("register pdf error", error);
      return serverErrorResponse(response);
    }
  }
  public async registerPdf({ response, request }: HttpContextContract) {
    const { pdfName, pdfUrl, typesId, lectureId } = await request.validate(
      PdfValidator
    );
    try {
      const createdSubject = await this.pdfsServices.savePdfService({
        pdf: { pdfName, pdfUrl },
        lectureId,
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
      await this.pdfsServices.deletePdfService(id);

      return successResponse(response, {});
    } catch (error) {
      console.log("delete pdf error", error);
      return serverErrorResponse(response);
    }
  }
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const { pdfName, pdfUrl, typesId } = await request.validate(
      PdfUpdateValidator
    );
    try {
      const updatedPdf = await this.pdfsServices.updatePdfService({
        id,
        pdfUrl,
        pdfName,
        typesId,
      });
      return updatedResponse(response, updatedPdf);
    } catch (error) {
      console.log("update pdf error", error);
      return serverErrorResponse(response);
    }
  }
}
