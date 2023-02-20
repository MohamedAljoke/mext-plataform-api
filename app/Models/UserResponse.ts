import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Question from "./Question";
import Alternative from "./Alternative";

export default class UserResponse extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public alternativeId: number;

  @column()
  public questionId: number;

  @belongsTo(() => User, { foreignKey: "userId" })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Alternative, { foreignKey: "alternativeId" })
  public alternative: BelongsTo<typeof Alternative>;

  @belongsTo(() => Question, { foreignKey: "questionId" })
  public question: BelongsTo<typeof Question>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
