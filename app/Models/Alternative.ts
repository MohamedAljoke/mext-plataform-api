import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Question from "./Question";

export default class Alternative extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public questionId: number;

  @column()
  public alternativeText: string;

  @column()
  public isCorrect: boolean;

  @belongsTo(() => Question, { foreignKey: "questionId" })
  public question: BelongsTo<typeof Question>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
