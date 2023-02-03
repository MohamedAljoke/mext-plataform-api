import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Video from "./Video";
import Pdf from "./Pdf";
import Chapter from "./Chapter";

export default class Lecture extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public videoId: number;

  @column()
  public lectureName: string;

  @belongsTo(() => Video, { foreignKey: "videoId" })
  public video: BelongsTo<typeof Video>;

  @manyToMany(() => Pdf, {
    localKey: "id",
    pivotForeignKey: "lecture_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "pdf_id",
    pivotTable: "lecture_pdfs",
  })
  public pdfs: ManyToMany<typeof Pdf>;

  @belongsTo(() => Chapter, {
    localKey: "id",
  })
  public chapter: BelongsTo<typeof Chapter>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
