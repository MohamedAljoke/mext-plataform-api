import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Video from "./Video";
import Pdf from "./Pdf";
import Question from "./Question";

export default class Type extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public typeName: string;

  @manyToMany(() => Video, {
    localKey: "id",
    pivotForeignKey: "type_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "video_id",
    pivotTable: "video_types",
  })
  public videos: ManyToMany<typeof Video>;

  @manyToMany(() => Pdf, {
    localKey: "id",
    pivotForeignKey: "type_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "pdf_id",
    pivotTable: "pdf_types",
  })
  public pdfs: ManyToMany<typeof Pdf>;

  @manyToMany(() => Question, {
    localKey: "id",
    pivotForeignKey: "type_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "question_id",
    pivotTable: "question_types",
  })
  public questions: ManyToMany<typeof Question>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
