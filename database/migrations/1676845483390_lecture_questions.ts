import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "lecture_questions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("lecture_id").unsigned().references("lectures.id");
      table.integer("question_id").unsigned().references("questions.id");

      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
