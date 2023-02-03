import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Lecture from "./Lecture";
import Type from "./Type";

export default class Pdf extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public pdfName: string;

  @column()
  public pdfUrl: string;

  @manyToMany(() => Lecture, {
    localKey: "id",
    pivotForeignKey: "pdf_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "lecture_id",
    pivotTable: "lecture_pdfs",
  })
  public lectuers: ManyToMany<typeof Lecture>;

  @manyToMany(() => Type, {
    localKey: "id",
    pivotForeignKey: "pdf_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "type_id",
    pivotTable: "pdf_types",
  })
  public types: ManyToMany<typeof Type>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
