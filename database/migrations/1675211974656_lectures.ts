import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "lectures";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("chapter_id")
        .unsigned()
        .references("id")
        .inTable("chapters")
        .onDelete("CASCADE");
      table
        .integer("video_id")
        .unsigned()
        .references("id")
        .inTable("videos")
        .onDelete("CASCADE");

      table.string("lecture_name");
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
