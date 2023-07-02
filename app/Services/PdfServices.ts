import Lecture from "App/Models/Lecture";
import Pdf from "App/Models/Pdf";
import Type from "App/Models/Type";
import { redisKeys, timmerInSeconds } from "App/cache/redis/redisConstants";
import {
  parseCachedData,
  removeCache,
  stringifyCacheData,
} from "App/cache/redis/redisUtils";

export default class PdfsServices {
  constructor() {}
  public async fetchPdfsService() {
    const cachedPdf = await parseCachedData({
      key: redisKeys.PDF_LIST,
    });
    if (cachedPdf) {
      return cachedPdf;
    }
    const pdfs = await Pdf.query();
    await Promise.all(
      pdfs?.map(async (pdf) => {
        await pdf.load("types");
      })
    );
    await stringifyCacheData({
      data: pdfs,
      timmer: timmerInSeconds.ONE_DAY,
      key: redisKeys.PDF_LIST,
    });
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
    await removeCache({
      keys: [redisKeys.PDF_LIST()],
    });
    return addedPdf;
  }
  public async deletePdfService(id: number) {
    const data = await Pdf.query().where({ id }).delete();
    await removeCache({
      keys: [redisKeys.PDF_LIST()],
    });
    return data;
  }
  public async updatePdfService({
    id,
    pdfName,
    pdfUrl,
    typesId,
  }: {
    id: number;
    pdfName?: string;
    pdfUrl?: string;
    typesId: number[] | undefined;
  }) {
    const pdf = await Pdf.findOrFail(id);
    if (pdfName) {
      pdf.pdfName = pdfName; //
    }
    if (pdfUrl) {
      pdf.pdfUrl = pdfUrl; //
    }

    if (typesId !== undefined) {
      const types = await Type.query().whereIn("id", typesId);
      await pdf.related("types").sync(types.map((type) => type.id));
    }
    await pdf.save();
    await removeCache({
      keys: [redisKeys.PDF_LIST()],
    });
    return pdf;
  }
}
