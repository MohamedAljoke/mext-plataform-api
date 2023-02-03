import Pdf from "App/Models/Pdf";

export default class PdfsServices {
  constructor() {}
  public async savePdfService(pdf: Partial<Pdf>) {
    const addedPdf = await Pdf.create(pdf);

    return addedPdf;
  }
  public async deletePdfService(id: number) {
    const data = await Pdf.query().where({ id }).delete();
    return data;
  }
  public async updatePdfService({
    id,
    pdfName,
    pdfUrl,
  }: {
    id: number;
    pdfName?: string;
    pdfUrl?: string;
  }) {
    const pdf = await Pdf.findOrFail(id);
    if (pdfName) {
      pdf.pdfName = pdfName; //
    }
    if (pdfUrl) {
      pdf.pdfUrl = pdfUrl; //
    }
    await pdf.save();
    return pdf;
  }
}
