import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "question_types";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table
        .integer("question_id")
        .unsigned()
        .references("questions.id")
        .onDelete("CASCADE");
      table
        .integer("type_id")
        .unsigned()
        .references("types.id")
        .onDelete("CASCADE");

      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
