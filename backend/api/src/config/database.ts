import { DB } from "../types/db";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import config from "./constants";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: config.DB_NAME,
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    port: config.DB_PORT,
    max: 10,
    password: config.DB_PASSWORD,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
});
