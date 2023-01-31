import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Subjects extends BaseSchema {
  protected tableName = "subjects";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("subject_name");
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
