import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "user_responses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
      table
        .integer("question_id")
        .unsigned()
        .references("questions.id")
        .onDelete("CASCADE");
      table
        .integer("alternative_id")
        .unsigned()
        .references("alternatives.id")
        .onDelete("CASCADE");
      table.boolean("is_correct");

      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
