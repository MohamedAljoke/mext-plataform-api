import Env from "@ioc:Adonis/Core/Env";
import { DatabaseConfig } from "@ioc:Adonis/Lucid/Database";

const PROD_MYSQL_DB = new URL(
  Env.get("CLEARDB_DATABASE_URL") ||
    "mysql://mext:mextmysql@localhost:3306/mext"
);
const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get("DB_CONNECTION"),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql2
    |
    */
    mysql: {
      client: "mysql2",
      connection: {
        host:
          Env.get("NODE_ENV") === "development"
            ? Env.get("MYSQL_HOST")
            : Env.get("DB_HOST", PROD_MYSQL_DB.host),
        port:
          Env.get("NODE_ENV") === "development"
            ? Env.get("MYSQL_PORT")
            : Env.get("MYSQL_PORT"),
        user:
          Env.get("NODE_ENV") === "development"
            ? Env.get("MYSQL_USER")
            : Env.get("DB_USER", PROD_MYSQL_DB.username),
        password:
          Env.get("NODE_ENV") === "development"
            ? Env.get("MYSQL_PASSWORD", "")
            : Env.get("DB_PASSWORD", PROD_MYSQL_DB.password),
        database:
          Env.get("NODE_ENV") === "development"
            ? Env.get("MYSQL_DB_NAME")
            : Env.get("DB_DATABASE", PROD_MYSQL_DB.pathname.substr(1)),
        ssl: {
          rejectUnauthorized: false,
        },
      },
      migrations: {
        disableRollbacksInProduction: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
};

export default databaseConfig;
