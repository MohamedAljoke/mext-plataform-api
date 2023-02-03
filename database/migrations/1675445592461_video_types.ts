import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "video_types";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("video_id").unsigned().references("videos.id");
      table.integer("type_id").unsigned().references("types.id");

      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
