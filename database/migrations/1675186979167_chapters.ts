import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "chapters";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("subject_id")
        .unsigned()
        .references("id")
        .inTable("subjects")
        .onDelete("CASCADE");

      table.string("chapter_name");
      table.dateTime("created_at", { useTz: true }).notNullable();
      table.dateTime("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
