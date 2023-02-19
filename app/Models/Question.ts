import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Lecture from "./Lecture";

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public questionText: string;

  @manyToMany(() => Lecture, {
    localKey: "id",
    pivotForeignKey: "question_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "lecture_id",
    pivotTable: "lecture_questions",
  })
  public Lectuers: ManyToMany<typeof Lecture>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
