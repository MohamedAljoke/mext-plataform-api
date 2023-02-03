import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Type from "./Type";

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public videoName: string;

  @column()
  public videoUrl: string;

  @manyToMany(() => Type, {
    localKey: "id",
    pivotForeignKey: "video_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "type_id",
    pivotTable: "video_types",
  })
  public types: ManyToMany<typeof Type>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
