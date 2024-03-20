import { Database } from "./models"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

export const instanceOfDB = (): Kysely<Database> => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: process.env.DATABASE,
      host: process.env.HOST,
      port: Number(process.env.PORT) || 5432,
      max: 10,
      user: process.env.DBUSER,
      password: process.env.PASSWORD,
      ssl: Boolean(process.env.SSL),
    }),
  });

  // Database interface is passed to Kysely's constructor, and from now on, Kysely
  // knows your database structure.
  // Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
  // to communicate with your database.
  const db = new Kysely<Database>({
    dialect,
  });

  return db;
};
