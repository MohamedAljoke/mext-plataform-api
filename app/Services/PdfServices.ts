import Lecture from "App/Models/Lecture";
import Pdf from "App/Models/Pdf";
import Type from "App/Models/Type";

export default class PdfsServices {
  constructor() {}
  public async fetchPdfsService() {
    const pdfs = await Pdf.query();
    return pdfs;
  }
  public async savePdfService({
    pdf,
    typesId,
    lectureId,
  }: {
    lectureId?: number;
    pdf: Partial<Pdf>;
    typesId: number[] | undefined;
  }) {
    const addedPdf = await Pdf.create(pdf);
    if (typesId !== undefined) {
      const type = await Type.query().whereIn("id", typesId);
      await addedPdf.related("types").attach(type.map((role) => role.id));
      await addedPdf.load("types");
    }
    if (lectureId) {
      const lectrue = await Lecture.query().where("id", lectureId);
      await addedPdf
        .related("lectuers")
        .attach(lectrue.map((lectrue) => lectrue.id));
    }
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
