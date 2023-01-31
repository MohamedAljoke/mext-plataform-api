import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Subject from "./Subject";

export default class Chapter extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public chapterName: string;

  @column()
  public subjectId: number;

  @belongsTo(() => Subject, { foreignKey: "subjectId" })
  public role: BelongsTo<typeof Subject>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
