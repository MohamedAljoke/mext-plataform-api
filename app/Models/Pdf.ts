import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";

export default class Pdf extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public pdfName: string;

  @column()
  public pdfUrl: string;

  @manyToMany(() => Pdf, {
    localKey: "id",
    pivotForeignKey: "pdf_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "lecture_id",
    pivotTable: "lecture_pdfs",
  })
  public lectuers: ManyToMany<typeof Pdf>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
