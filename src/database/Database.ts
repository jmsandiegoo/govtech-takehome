import { Kysely, PostgresDialect } from "kysely";
import { DB } from 'kysely-codegen';
import { Pool } from 'pg';

export class Database {
    private static db: Kysely<DB> = new Kysely<DB>({
        dialect: new PostgresDialect({
            pool: new Pool({
              database: process.env.DATABASE_NAME,
              host: process.env.HOST,
              user: process.env.USERNAME,
              password: process.env.PASSWORD,
              port: process.env.PORT ? Number(process.env.PORT) : undefined,
              max: 10,
            })
          })
    });

    public getInstance(): Kysely<DB>{
        return Database.db;
    }
}