import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  ManyToMany,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Lecture from "./Lecture";
import Alternative from "./Alternative";
import Type from "./Type";

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public questionText: string;

  @manyToMany(() => Type, {
    localKey: "id",
    pivotForeignKey: "question_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "type_id",
    pivotTable: "question_types",
  })
  public types: ManyToMany<typeof Type>;

  @manyToMany(() => Lecture, {
    localKey: "id",
    pivotForeignKey: "question_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "lecture_id",
    pivotTable: "lecture_questions",
  })
  public lectuers: ManyToMany<typeof Lecture>;

  @hasMany(() => Alternative, {
    foreignKey: "questionId",
  })
  public alternatives: HasMany<typeof Alternative>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
