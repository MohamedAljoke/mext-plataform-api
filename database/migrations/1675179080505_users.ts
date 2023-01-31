import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import { Roles } from "App/Enums/Roles";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles")
        .defaultTo(Roles.USER);
      table.string("email", 255).notNullable().unique();
      table.string("name", 255).notNullable();
      table.string("password", 180).notNullable();
      table.string("remember_me_token").nullable();

      table.dateTime("created_at", { useTz: true }).notNullable();
      table.dateTime("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
