import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Chapter from "./Chapter";

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public subjectName: string;

  @hasMany(() => Chapter, {
    foreignKey: "subjectId",
  })
  public chapters: HasMany<typeof Chapter>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
