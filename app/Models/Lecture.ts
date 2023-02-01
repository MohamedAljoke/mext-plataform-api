import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Video from "./Video";
import Pdf from "./Pdf";

export default class Lecture extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public videoId: number;

  @belongsTo(() => Video, { foreignKey: "videoId" })
  public video: BelongsTo<typeof Video>;

  @column()
  public pdfId: number;

  @belongsTo(() => Pdf, { foreignKey: "pdfId" })
  public pdf: BelongsTo<typeof Pdf>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
