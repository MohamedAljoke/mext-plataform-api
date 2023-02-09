import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Subject from "./Subject";
import Lecture from "./Lecture";

export default class Chapter extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public chapterName: string;

  @column()
  public subjectId: number;

  @hasMany(() => Lecture, {
    foreignKey: "chapterId",
  })
  public lectuers: HasMany<typeof Lecture>;

  @belongsTo(() => Subject, { foreignKey: "subjectId" })
  public subject: BelongsTo<typeof Subject>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
